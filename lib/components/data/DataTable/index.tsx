import React, { useEffect, useMemo, useRef, useState } from 'react'
import { cls, delay } from '../../../utils/index.js'
import { useEventListener, useIntersectionObserver, useMutationObserver, useResizeObserver } from '../../../hooks/index.js'
import { useStateListner } from '../../tools'
import Button from '../../general/Button'
import Icon from '../../general/Icon'
import Popover from '../../overlay/Popover'
import Input from '../../form/Input'
import Checkbox from '../../form/Checkbox'
import Pagination from '../Pagination'
import Table from '../Table'
import VirtualScroll from '../VirtualScroll'

export type DataTableProps = React.JSX.IntrinsicElements['div'] & {
  fields?: DataTableField[]
  data?: DataTableItem[]
  idKey?: string                      // default: 'id'
  gridlines?: boolean                 // default: true
  pageSize?: number
  page?: number
  onChangePage?: (page: number) => any
  virtualScroll?: boolean             // default: false
  overscan?: number
  fieldHeight?: number                // default: 32
  fieldWidth?: (field: DataTableField) => number
  itemHeight?: (item: DataTableItem) => number
  selection?: DataTableTarget
  onSelect?: (selection: DataTableTarget) => any
  onHover?: (hover: DataTableTarget) => any
  defaultSort?: DataTableSort
  sort?: DataTableSort
  onSort?: (sort: DataTableSort) => any
  defaultFilter?: DataTableFilter
  filter?: DataTableFilter
  onFilter?: (filter: DataTableFilter) => any
  filterMode?: 'and' | 'or'           // default: 'and'
  onResize?: (field: DataTableField, width: number) => any
  onDragField?: (result: DataTableDragResult) => any
  fieldRender?: (field: DataTableField) => React.ReactNode
  cellRender?: (field: DataTableField, item: DataTableItem) => React.ReactNode
  footer?: (field: DataTableField) => React.ReactNode
}
export type DataTableField = {
  key: string
  name: string
  fixed?: 'left' | 'right'
  align?: 'left' | 'right' | 'center' // default: 'left'
  sortable?: boolean                  // default: true
  filterable?: boolean                // default: true
  filterOptions?: DataTableFilterOption[]
  resizable?: boolean                 // default: false
  draggable?: boolean                 // default: false
}
export type DataTableItem = {
  [k: string]: any
}
export type DataTableTarget = {
  key?: string
  id?: any
}
export type DataTableSort = {
  key?: string
  order?: 'asc' | 'desc'
}
export type DataTableFilter = {
  [k: string]: any[]
}
export type DataTableFilterOption = {
  value: any,
  label: React.ReactNode
  rule?: (item: DataTableItem) => boolean
}
export type DataTableDragResult = {
  newFields: DataTableField[]
  sourceField: DataTableField
  sourceIndex: number
  targetIndex: number
}

const convert = (value: any) => typeof value === 'string' ? value : JSON.stringify(value) ?? ''

function DataTable(props: DataTableProps) {
  const {
    fields,
    data,
    idKey = 'id',
    gridlines = true,
    pageSize,
    page: propsPage,
    onChangePage,
    virtualScroll = false,
    overscan = 0,
    fieldHeight = 32,
    fieldWidth,
    itemHeight,
    selection: propsSelection,
    onSelect,
    onHover,
    defaultSort,
    sort: propsSort,
    onSort,
    defaultFilter,
    filter: propsFilter,
    onFilter,
    filterMode = 'and',
    onResize,
    onDragField,
    fieldRender,
    cellRender,
    footer,
    ...rest
  } = props

  const groupEl = useRef<HTMLDivElement>(null)
  const thEl = useRef<{ [k: string]: HTMLTableCellElement | null }>({})
  const splitLineEl = useRef<HTMLDivElement>(null)
  const dragBlockEl = useRef<HTMLDivElement>(null)
  const scrollAnimation = useRef<number>(0)
  const resizeRef = useRef<{ field: DataTableField, startX: number, scrollLeft: number, width: number }>(null)
  const dragRef = useRef<{ field: DataTableField, startX: number, targetIndex: number }>(null)
  const [rendering, setRendering] = useState(true)
  const [view, setView] = useState({ height: 0, width: 0 })
  const [scrollView, setScrollView] = useState({ height: 0, width: 0 })
  const [scroll, setScroll] = useState({ top: 0, left: 0 })
  const [fitWidth, setFitWidth] = useState<{ [k: string]: number }>({})
  const [minWidth, setMinWidth] = useState<{ [k: string]: number }>({})
  const [extendWidth, setExtendWidth] = useState<{ [k: string]: number }>()
  const [resizeWidth, setResizeWidth] = useState<{ [k: string]: number }>({})
  const [page, setPage] = useStateListner(propsPage, onChangePage, 1)
  const [selection, setSelection] = useStateListner(propsSelection, onSelect)
  const [hover, setHover] = useStateListner<DataTableTarget>(void 0, onHover)
  const [sort, setSort] = useStateListner(propsSort, onSort, defaultSort)
  const [filter, setFilter] = useStateListner(propsFilter, onFilter, defaultFilter)
  const [filterOpen, setFilterOpen] = useState('')
  const [filterSearch, setFilterSearch] = useState('')
  const [filterOptions, setFilterOptions] = useState<DataTableFilterOption[]>([])
  const [splitLine, setSplitLine] = useState<React.CSSProperties>()
  const [dragBlock, setDragBlock] = useState<React.CSSProperties>()
  const [resizing, setResizing] = useState(false)
  const [dragging, setDragging] = useState(false)

  const searchFitler = useMemo(() => {
    if (!filterSearch) {
      return filterOptions
    }
    return filterOptions.filter((x) => convert(x.value).toUpperCase().includes(filterSearch.toUpperCase()))
  }, [filterOptions, filterSearch])
  const filterData = useMemo(() => {
    if (!data) {
      return []
    }
    let filterData = [...data]
    if (fields && filter && Object.values(filter).find((x) => x.length)) {
      const fieldMap = new Map(fields.map((x) => [x.key, x]))
      filterData = filterData.filter((x) => {
        let find = true
        for (let [key, values] of Object.entries(filter)) {
          const field = fieldMap.get(key)
          if (field && values.length) {
            find = false
            const ruleMap = new Map(field.filterOptions?.map((x) => [x.value, x.rule]))
            for (let i = 0; i < values.length; i++) {
              const value = values[i]
              const rule = ruleMap.get(value)
              find = rule ? rule(x) : convert(value) === convert(x[key])
              if (find) {
                break
              }
            }
            if (filterMode === 'and' && !find || filterMode === 'or' && find) {
              break
            }
          }
        }
        return find
      })
    }
    if (sort?.key && sort?.order) {
      filterData.sort((a, b) => {
        let A = a[sort.key as string]
        let B = b[sort.key as string]
        let C: number | undefined = void 0
        if (typeof A === 'string' && typeof B === 'string') {
          C = A.localeCompare(B)
        } else if (
          Number.isFinite(A) && (Number.isFinite(B) || typeof B === 'string') ||
          Number.isFinite(B) && (Number.isFinite(A) || typeof B === 'string') ||
          typeof A === 'boolean' && typeof B === 'boolean'
        ) {
          C = A - B
        }
        if (C !== void 0) {
          return sort.order === 'desc' ? C * -1 : C
        }
        A = convert(A)
        B = convert(B)
        return Number(!A || A === 'null') - Number(!B || B === 'null')
      })
    }
    return filterData
  }, [fields, data, filter, filterMode, sort])
  const pageData = useMemo(() => {
    let pageData = filterData
    if (pageSize && pageSize > 0 && page && page > 0) {
      const start = (page - 1) * pageSize
      pageData = pageData.slice(start, start + pageSize)
    }
    return pageData
  }, [filterData, pageSize, page])
  const fieldWidths = useMemo(() => {
    if (!fields) {
      return {}
    }
    const fieldWidths: { [k: string]: number | undefined } = {}
    for (let i = 0; i < fields.length; i++) {
      fieldWidths[fields[i].key] = fieldWidth?.(fields[i])
    }
    return fieldWidths
  }, [fields, fieldWidth])
  const [itemHeights, dataHeight] = useMemo(() => {
    const itemHeights = pageData.map((x) => Math.max(itemHeight?.(x) ?? 32, 24))
    const dataHeight = itemHeights.reduce((prev, curr) => prev + curr, 0)
    return [itemHeights, dataHeight]
  }, [pageData, itemHeight])
  const colHeight = useMemo(() => {
    return Math.max(fieldHeight, 24)
  }, [fieldHeight])
  const colWidths = useMemo(() => {
    if (!fields) {
      return {}
    }
    const widths: { [k: string]: number } = {}
    for (let i = 0; i < fields.length; i++) {
      const key = fields[i].key
      widths[key] = Math.max(
        fieldWidths[key] ?? resizeWidth[key] ?? extendWidth?.[key] ?? fitWidth[key] ?? 0,
        minWidth[key] ?? 0
      )
    }
    return widths
  }, [fields, fieldWidths, fitWidth, minWidth, extendWidth, resizeWidth])
  const [lCols, mCols, rCols] = useMemo(() => {
    if (!fields) {
      return [[], [], []]
    }
    let lCols = [], mCols = [], rCols = []
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i]
      const width = colWidths[field.key]
      if (field.fixed === 'left') {
        lCols.push({ field, width })
      } else if (field.fixed === 'right') {
        rCols.push({ field, width })
      } else {
        mCols.push({ field, width })
      }
    }
    return [lCols, mCols, rCols]
  }, [fields, colWidths])
  const rows = useMemo(() => {
    let rows = [], top = colHeight, start = -1, end = -1
    for (let i = 0; i < itemHeights.length; i++) {
      const bottom = top + itemHeights[i]
      rows.push({ item: pageData[i], top: top - colHeight, height: itemHeights[i] })
      if (
        virtualScroll ? (
          rendering ? (
            i < 10 + overscan
          ) : (
            scroll.top + view.height > top && scroll.top < bottom
          )
        ) : true
      ) {
        if (start === -1) {
          start = Math.max(i - overscan, 0)
        }
        end = Math.min(i + overscan + 1, itemHeights.length)
      }
      top = bottom
    }
    return rows.slice(start, end)
  }, [pageData, view.height, scroll.top, colHeight, itemHeights, overscan, rendering])

  useEffect(() => {
    renderFields()
  }, [fields])
  useEffect(() => {
    setFilterOpen('')
  }, [fields, data])
  useEffect(() => {
    const keys = Object.keys(fitWidth)
    const currWidth = keys.reduce((prev, curr) => prev + fitWidth[curr], 0)
    const extendWidth: { [k: string]: number } = {}
    if (currWidth < view.width) {
      let remain = view.width
      for (let i = 0; i < keys.length; i++) {
        extendWidth[keys[i]] = Math.floor(fitWidth[keys[i]] * view.width / currWidth)
        remain -= extendWidth[keys[i]]
        if (i === keys.length - 1) {
          extendWidth[keys[i]] += remain
        }
      }
      setExtendWidth(extendWidth)
    } else {
      setExtendWidth(void 0)
    }
  }, [view.width, fitWidth, rendering])
  useEffect(() => {
    setPage(1)
    groupEl.current?.scrollTo({ top: 0 })
  }, [filterData])

  const renderView = () => {
    if (!groupEl.current) {
      return
    }
    const { clientHeight, clientWidth, scrollWidth, scrollHeight } = groupEl.current
    if (clientHeight && clientWidth) {
      setView({ height: clientHeight, width: clientWidth })
      setScrollView({ height: scrollHeight, width: scrollWidth })
    }
  }
  const renderFields = () => {
    if (!groupEl.current?.clientWidth) {
      return
    }
    setRendering(true)
    setTimeout(() => {
      const fitWidth: { [k: string]: number } = {}
      const minWidth: { [k: string]: number } = {}
      for (let [key, el] of Object.entries(thEl.current)) {
        if (el) {
          fitWidth[key] = el.offsetWidth
          minWidth[key] = (el.firstElementChild as HTMLElement).offsetWidth
        }
      }
      setFitWidth(fitWidth)
      setMinWidth(minWidth)
      setRendering(false)
    })
  }
  const renderFilterOptions = (field: DataTableField) => {
    if (!data) {
      setFilterOptions([])
      return
    }
    delay(100).then(() => {
      if (field.filterOptions) {
        setFilterOptions(field.filterOptions)
      } else {
        const values: any[] = []
        const labels: string[] = []
        for (let i = 0; i < data.length; i++) {
          const value = data[i][field.key]
          const label = convert(data[i][field.key])
          if (label && !labels.includes(label)) {
            values.push(value)
            labels.push(label)
          }
        }
        setFilterOptions(values.map((x, i) => ({ value: x, label: labels[i] })))
      }
    })
  }
  const changeFilter = (key: string, value: any) => {
    const newFitler: DataTableFilter = { [key]: [], ...filter }
    const values = newFitler[key]
    newFitler[key] = values.includes(value) ? values.filter((x) => x !== value) : [...values, value]
    setFilter(newFitler)
  }
  const startScroll = (speed: number) => {
    if (scrollAnimation.current) {
      return
    }
    function scrollStep() {
      if (!groupEl.current) {
        return
      }
      groupEl.current.scrollLeft += speed
      scrollAnimation.current = requestAnimationFrame(scrollStep)
    }
    scrollAnimation.current = requestAnimationFrame(scrollStep)
  }
  const stopScroll = () => {
    cancelAnimationFrame(scrollAnimation.current)
    scrollAnimation.current = 0
  }

  useResizeObserver(groupEl, renderView)
  useMutationObserver(groupEl, renderView, { childList: true })
  useIntersectionObserver(groupEl, ([entry]) => entry.isIntersecting && rendering && renderFields())

  useEventListener('mousemove', (e) => {
    if (!resizeRef.current || !groupEl.current) {
      return
    }
    const event = e as MouseEvent
    const { field, startX, scrollLeft } = resizeRef.current
    const scrollOffset = groupEl.current.scrollLeft - scrollLeft
    const offset = event.clientX - (startX - scrollOffset)
    const n = field.fixed !== 'right' ? 1 : -1
    resizeRef.current.width = Math.max(colWidths[field.key] + offset * n, minWidth[field.key])
    if (splitLineEl.current) {
      const translate = Math[n > 0 ? 'max' : 'min'](offset, (minWidth[field.key] - colWidths[field.key]) * n)
      splitLineEl.current.style.translate = `${translate - scrollOffset}px`
    }
    const p = groupEl.current.getBoundingClientRect()
    if (resizeRef.current.width > minWidth[field.key]) {
      if (event.clientX > p.right) {
        startScroll(5)
      } else if (event.clientX < p.left) {
        startScroll(-5)
      } else {
        stopScroll()
      }
    }
  }, void 0, true)
  useEventListener('mouseup', () => {
    if (!resizeRef.current) {
      return
    }
    const { field, width } = resizeRef.current
    if (width !== colWidths[field.key]) {
      setResizeWidth({ ...resizeWidth, [field.key]: width })
      onResize?.(field, width)
    }
    stopScroll()
    setSplitLine(void 0)
    setResizing(false)
    resizeRef.current = null
  }, void 0, true)

  useEventListener('mousemove', (e) => {
    if (!dragRef.current || !groupEl.current || !fields) {
      return
    }
    const event = e as MouseEvent
    const { field, startX } = dragRef.current
    const offset = event.clientX - startX
    const p = groupEl.current.getBoundingClientRect()
    const el = thEl.current[field.key]
    if (!dragBlock && el) {
      const rect = el.getBoundingClientRect()
      setDragBlock({ left: rect.left - p.left, width: colWidths[field.key] })
    }
    if (dragBlockEl.current) {
      dragBlockEl.current.style.translate = `${offset}px`
      const blockRect = dragBlockEl.current.getBoundingClientRect()
      const tableFields = fields.filter((x) => x.fixed === field.fixed)
      const index = tableFields.indexOf(field)
      let targetIndex = -1
      if (offset < 0) {
        for (let i = 0; i < index; i++) {
          const rect = thEl.current[tableFields[i].key]?.getBoundingClientRect()
          if (rect && rect.left >= blockRect.left) {
            targetIndex = i
            break
          }
        }
      } else {
        for (let i = tableFields.length - 1; i > index; i--) {
          const rect = thEl.current[tableFields[i].key]?.getBoundingClientRect()
          if (rect && rect.right <= blockRect.right) {
            targetIndex = i
            break
          }
        }
      }
      if (targetIndex !== -1) {
        const field = tableFields[targetIndex]
        const rect = thEl.current[field.key]?.getBoundingClientRect()
        if (rect) {
          let top = groupEl.current.clientTop
          let left = offset < 0 ? rect.left - p.left : rect.right - p.left
          let zIndex = field.fixed ? 10 : 9
          if (field.fixed !== 'left' && targetIndex === tableFields.length - 1) {
            left -= 2
          }
          setSplitLine({ top, left, zIndex })
          dragRef.current.targetIndex = fields.indexOf(field)
        }
      } else {
        setSplitLine(void 0)
        dragRef.current.targetIndex = -1
      }
    }
    if (event.clientX > p.right) {
      startScroll(5)
    } else if (event.clientX < p.left) {
      startScroll(-5)
    } else {
      stopScroll()
    }
  }, void 0, true)
  useEventListener('mouseup', () => {
    if (!dragRef.current || !fields) {
      return
    }
    const { field, targetIndex } = dragRef.current
    if (targetIndex !== -1) {
      const sourceIndex = fields.indexOf(field)
      const newFields = [...fields]
      newFields.splice(sourceIndex, 1)
      newFields.splice(targetIndex, 0, field)
      onDragField?.({ sourceField: field, sourceIndex, targetIndex, newFields })
    }
    stopScroll()
    setSplitLine(void 0)
    setDragBlock(void 0)
    setDragging(false)
    dragRef.current = null
  }, void 0, true)

  return (
    <div
      {...rest}
      className={cls('ui-data-table', {
        'ui-data-table-gridlines': gridlines,
        'ui-data-table-rendering': rendering,
        'ui-data-table-resizing': resizing,
        'ui-data-table-dragging': dragging
      }, rest.className)}
    >
      <div
        ref={groupEl}
        className='ui-data-table-group'
        onScroll={(e) => {
          const el = e.target as HTMLElement
          setScroll({ top: el.scrollTop, left: el.scrollLeft })
          rest.onScroll?.(e)
        }}
      >
        {[lCols, mCols, rCols].map((cols, i) => !!cols.length && (
          <div
            key={['left', 'main', 'right'][i]}
            className={cls({
              'ui-data-table-left': cols === lCols,
              'ui-data-table-right': cols === rCols,
              'ui-data-table-main': cols === mCols,
              'ui-data-table-shadow':
                cols === lCols && scroll.left >= 1 ||
                cols === rCols && scroll.left + view.width <= scrollView.width - 1
            })}
          >
            <Table>
              <thead>
                <tr>
                  {cols.map(({ field, width }) => (
                    <th
                      key={field.key}
                      ref={(el) => {
                        thEl.current[field.key] = el
                      }}
                      align={field.align}
                      className={cls({
                        'ui-data-table-hover': field.key === hover?.key && hover.id === void 0,
                        'ui-data-table-selected': field.key === selection?.key && selection.id === void 0
                      })}
                      style={{
                        cursor: field.draggable &&
                          field.key === selection?.key && selection.id === void 0 ? 'grab' : ''
                      }}
                    >
                      <div
                        className='ui-data-table-field'
                        style={{ height: colHeight, width }}
                        onClick={() => setSelection({ key: field.key })}
                        onMouseEnter={() => setHover({ key: field.key })}
                        onMouseLeave={() => setHover({})}
                        onMouseDown={(e) => {
                          const el = thEl.current[field.key]
                          if (
                            !field.draggable || !el ||
                            !(field.key === selection?.key && selection.id === void 0)
                          ) {
                            return
                          }
                          // el.style.cursor = 'grabbing'
                          dragRef.current = { field, startX: e.clientX, targetIndex: -1 }
                          setDragging(true)
                        }}
                      >
                        <div>{fieldRender ? fieldRender(field) : field.name}</div>
                        {field.sortable !== false && (
                          <div
                            className='ui-data-table-sort'
                            data-sort={field.key === sort?.key ? sort?.order : void 0}
                            onMouseDown={(e) => e.stopPropagation()}
                            onClick={(e) => {
                              e.stopPropagation()
                              if (field.key === sort?.key) {
                                const seq: any[] = [void 0, 'asc', 'desc']
                                setSort({ key: field.key, order: seq[seq.indexOf(sort.order) + 1] })
                              } else {
                                setSort({ key: field.key, order: 'asc' })
                              }
                            }}
                          >
                            <Icon>arrow_drop_up</Icon>
                            <Icon>arrow_drop_down</Icon>
                          </div>
                        )}
                        {field.filterable !== false && (
                          <div
                            className={cls('ui-data-table-filter', {
                              'ui-data-table-filter-active': filter?.[field.key]?.length
                            })}
                            onMouseDown={(e) => e.stopPropagation()}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Icon size={16}>filter_alt</Icon>
                            <Popover
                              className='ui-data-table-filter-popover'
                              open={field.key === filterOpen}
                              onChangeOpen={(open) => {
                                setFilterOpen(open ? field.key : '')
                                if (open) {
                                  renderFilterOptions(field)
                                } else {
                                  setFilterOptions([])
                                }
                              }}
                              trigger='click'
                              position='bottom'
                            >
                              <div className='ui-data-table-filter-body'>
                                <Input
                                  onChange={(e) => setFilterSearch(e.detail.value)}
                                  placeholder='Search'
                                />
                                <VirtualScroll
                                  style={{ height: 140 }}
                                  rowLength={searchFitler.length}
                                  rowHeight={() => 28}
                                  overscan={10}
                                >
                                  {(rowIndex) => (
                                    <Checkbox
                                      checked={filter?.[field.key]?.includes(searchFitler[rowIndex].value)}
                                      onChange={() => changeFilter(field.key, searchFitler[rowIndex].value)}
                                    >
                                      {searchFitler[rowIndex].label}
                                    </Checkbox>
                                  )}
                                </VirtualScroll>
                              </div>
                              <div className='ui-data-table-filter-action'>
                                <Button onClick={() => {
                                  setFilter({ ...filter, [field.key]: defaultFilter?.[field.key] ?? [] })
                                }}>
                                  Reset
                                </Button>
                                <Button onClick={() => {
                                  setFilter({ ...filter })
                                  setFilterOpen('')
                                }}>
                                  OK
                                </Button>
                              </div>
                            </Popover>
                          </div>
                        )}
                      </div>
                      {field.resizable && (
                        <div
                          className='ui-data-table-resize'
                          style={{
                            left: cols === rCols ? -7 : void 0,
                            right: cols !== rCols ? -7 : void 0,
                            width: 15
                          }}
                          onMouseEnter={() => {
                            const el = thEl.current[field.key]
                            if (!groupEl.current || !el) {
                              return
                            }
                            const p = groupEl.current.getBoundingClientRect()
                            const rect = el.getBoundingClientRect()
                            setSplitLine({
                              top: groupEl.current.clientTop,
                              left: cols !== rCols ? rect.right - p.left - 2 : rect.left - p.left,
                              zIndex: cols !== mCols ? 10 : 9
                            })
                          }}
                          onMouseLeave={() => !resizeRef.current && setSplitLine(void 0)}
                          onMouseDown={() => {
                            const el = thEl.current[field.key]
                            if (!el) {
                              return
                            }
                            const rect = el.getBoundingClientRect()
                            resizeRef.current = {
                              field,
                              startX: cols !== rCols ? rect.right - 1 : rect.left + 1,
                              scrollLeft: scroll.left,
                              width
                            }
                            setResizing(true)
                          }}
                        ></div>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody style={rendering ? void 0 : { height: dataHeight }}>
                {rows.map(({ item, top, height }) => (
                  <tr
                    key={item[idKey]}
                    className={cls({
                      'ui-data-table-hover': item[idKey] === hover?.id,
                      'ui-data-table-selected': item[idKey] === selection?.id
                    })}
                    style={{ top }}
                  >
                    {cols.map(({ field, width }) => (
                      <td
                        key={field.key}
                        align={field.align}
                        className={cls({
                          'ui-data-table-selected': field.key === selection?.key && selection.id === void 0
                        })}
                        onClick={() => setSelection({ key: field.key, id: item[idKey] })}
                        onMouseEnter={() => setHover({ key: field.key, id: item[idKey] })}
                        onMouseLeave={() => setHover({})}
                      >
                        <div
                          className='ui-data-table-cell'
                          style={{ height, width }}
                        >
                          {cellRender ? cellRender(field, item) : convert(item[field.key])}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
              {footer && (
                <tfoot>
                  <tr>
                    {cols.map(({ field, width }) => (
                      <td
                        key={field.key}
                        align={field.align}
                        className={cls({
                          'ui-data-table-selected': field.key === selection?.key && selection.id === void 0
                        })}
                      >
                        <div style={{ width }}>
                          {footer(field)}
                        </div>
                      </td>
                    ))}
                  </tr>
                </tfoot>
              )}
            </Table>
          </div>
        ))}
      </div>
      {splitLine && (
        <div
          ref={splitLineEl}
          className='ui-data-table-split-line'
          style={{ height: view.height, width: 2, ...splitLine }}
        ></div>
      )}
      {dragBlock && (
        <div
          ref={dragBlockEl}
          className='ui-data-table-drag-block'
          style={{ height: view.height, ...dragBlock }}
        ></div>
      )}
      {pageSize && (
        <Pagination
          total={filterData.length && pageSize ? Math.ceil(filterData.length / pageSize) : 1}
          page={page}
          onChangePage={setPage}
        />
      )}
    </div>
  )
}

export default DataTable
