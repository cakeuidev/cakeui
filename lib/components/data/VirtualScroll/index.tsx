import { useMemo, useState } from 'react'
import { cls, useResizeObserver } from '../../../utils'
import { useComponentRef } from '../../tools'

export type VirtualScrollProps = Omit<
  React.ComponentPropsWithRef<'div'>, 'children'
> & {
  rowLength?: number
  colLength?: number
  rowHeight?: (index: number) => number
  colWidth?: (index: number) => number
  children?: (rowIndex: number, colIndex: number) => React.ReactNode
  overscan?: number
}

function VirtualScroll(props: VirtualScrollProps) {
  const {
    rowLength = 1,
    colLength = 1,
    rowHeight,
    colWidth,
    children,
    overscan = 0,
    ...rest
  } = props

  const [el, ref] = useComponentRef(props.ref)
  const [view, setView] = useState({ height: 0, width: 0 })
  const [scroll, setScroll] = useState({ top: 0, left: 0 })

  const [rowHeights, colWidths, scrollHeight, scrollWidth] = useMemo(() => {
    const rowHeights = Array.from({ length: rowLength }).map((_, i) => rowHeight?.(i))
    const colWidths = Array.from({ length: colLength }).map((_, i) => colWidth?.(i))
    const scrollHeight = rowHeights.reduce((prev: number, curr) => prev + (curr ?? 0), 0)
    const scrollWidth = colWidths.reduce((prev: number, curr) => prev + (curr ?? 0), 0)
    return [rowHeights, colWidths, scrollHeight, scrollWidth]
  }, [rowLength, colLength, rowHeight, colWidth])
  const [rows, cols] = useMemo(() => {
    let rows = [], top = 0, start = -1, end = -1
    for (let i = 0; i < rowHeights.length; i++) {
      const bottom = top + (rowHeights[i] ?? Infinity)
      rows.push({ rowIndex: i, top, height: rowHeights[i] })
      if (scroll.top + view.height > top && scroll.top < bottom) {
        if (start === -1) {
          start = Math.max(i - overscan, 0)
        }
        end = Math.min(i + overscan + 1, rowHeights.length)
      }
      top = bottom
    }
    rows = rows.slice(start, end)
    let cols = [], left = 0
    start = -1, end = -1
    for (let i = 0; i < colWidths.length; i++) {
      const right = left + (colWidths[i] ?? Infinity)
      cols.push({ colIndex: i, left, width: colWidths[i] })
      if (scroll.left + view.width > left && scroll.left < right) {
        if (start === -1) {
          start = Math.max(i - overscan, 0)
        }
        end = Math.min(i + overscan + 1, colWidths.length)
      }
      left = right
    }
    cols = cols.slice(start, end)
    return [rows, cols]
  }, [view.height, view.width, scroll.top, scroll.left, rowHeights, colWidths, overscan])

  useResizeObserver(el, () => {
    if (el.current) {
      setView({ height: el.current.clientHeight, width: el.current.clientWidth })
    }
  })

  return (
    <div
      {...rest}
      ref={ref}
      className={cls('ui-virtual-scroll', props.className)}
      onScroll={(e) => {
        const el = e.target as HTMLElement
        setScroll({ top: el.scrollTop, left: el.scrollLeft })
        props.onScroll?.(e)
      }}
    >
      <div
        style={{
          height: scrollHeight || undefined,
          width: scrollWidth || undefined
        }}
      >
        {rows.map(({ rowIndex, top, height }) => (
          cols.map(({ colIndex, left, width }) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              style={{ top, left, height, width: width || '100%' }}
            >
              {children?.(rowIndex, colIndex)}
            </div>
          ))
        ))}
      </div>
    </div>
  )
}

export default VirtualScroll
