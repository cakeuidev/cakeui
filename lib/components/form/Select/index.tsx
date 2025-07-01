import React, { useEffect, useMemo, useRef, useState } from 'react'
import { cls } from '../../../utils/index.js'
import { useEventListener } from '../../../hooks/index.js'
import { useInputState, useStateListner } from '../../tools'
import Icon from '../../general/Icon'
import Dropdown from '../../overlay/Dropdown'

export type SelectProps = SelectCommonProps & (SelectSingleProps | SelectMultipleProps)
export type SelectCommonProps = Omit<
  React.JSX.IntrinsicElements['input'], 'defaultValue' | 'value' | 'onChange'
> & {
  open?: boolean
  onChangeOpen?: (open: boolean) => any
  options?: SelectOption[]
  optionsMaxHeight?: number
  clearable?: boolean
  before?: React.ReactNode
  after?: React.ReactNode
  optionRender?: (option: SelectOption) => React.ReactNode
  tagRender?: (option: SelectOption) => React.ReactNode
}
export type SelectSingleProps = {
  multiple?: false
  defaultValue?: string
  value?: string
  onChange?: (event: CustomEvent<{ value: string }>) => any
}
export type SelectMultipleProps = {
  multiple: true
  defaultValue?: string[]
  value?: string[]
  onChange?: (event: CustomEvent<{ value: string[] }>) => any
}
export type SelectOption = {
  value: string
  label: string
  disabled?: boolean
}

function Select(props: SelectProps) {
  const {
    style, className,
    defaultValue, value, onChange,
    multiple,
    open: propsOpen,
    onChangeOpen,
    options,
    optionsMaxHeight,
    clearable = true,
    before,
    after,
    optionRender,
    tagRender,
    ...rest
  } = props

  const { ref, v, setV } = useInputState(rest, defaultValue, value, onChange as any)
  const labelEl = useRef<HTMLLabelElement>(null)
  const inputEl = useRef<HTMLInputElement>(null)
  const dropdownEl = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useStateListner(propsOpen, onChangeOpen, false)
  const [search, setSearch] = useState('')
  const [clear, setClear] = useState(false)
  const [index, setIndex] = useState(0)
  const stayOpen = useRef(false)
  const moveIndex = useRef(false)

  const activeOption = useMemo(() => {
    if (!options || multiple) {
      return void 0
    }
    return options.find((x) => x.value === v)
  }, [options, v, multiple])
  const activeOptions = useMemo(() => {
    if (!options || !multiple) {
      return []
    }
    const list = Array.isArray(v) ? v : []
    return list.map((value) => options.find((x) => x.value === value))
  }, [options, v, multiple])
  const searchOptions = useMemo(() => {
    if (!options || !search) {
      return options ?? []
    }
    return options.filter((x) => x.label.toUpperCase().includes(search.toUpperCase()))
  }, [options, search])

  useEffect(() => {
    if (open) {
      setClear(false)
    } else {
      setClear(true)
      const timer = setTimeout(() => {
        setSearch('')
        setClear(false)
        inputEl.current?.removeAttribute('style')
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [open])
  useEffect(() => {
    if (open) {
      changeIndex(0)
    }
  }, [open, searchOptions])

  useEventListener('mousedown', (e) => {
    const el = e.target as HTMLElement
    if (labelEl.current?.contains(el)) {
      setOpen(!open)
      if (!open && !inputEl.current?.contains(el)) {
        stayOpen.current = true
      }
    } else if (dropdownEl.current?.contains(el)) {
      stayOpen.current = true
    } else {
      setOpen(false)
    }
  })

  const changeValue = (value: string) => {
    if (!value) {
      setV(multiple ? [] : '')
      return
    }
    if (multiple) {
      const prev = Array.isArray(v) ? v : []
      setV(prev.includes(value) ? prev.filter((x) => x !== value) : [...prev, value])
    } else {
      setV(value)
    }
  }
  const changeIndex = (n: number) => {
    let newIndex = (index + n) % searchOptions.length
    if (n === 0) {
      newIndex = 0
    }
    for (let i = 0; i < searchOptions.length; i++) {
      const option = searchOptions[newIndex]
      if (option && !option.disabled) {
        break
      }
      newIndex += n >= 0 ? 1 : -1
      if (newIndex < 0) {
        newIndex = searchOptions.findLastIndex((x) => !x.disabled)
      } else if (newIndex > searchOptions.length) {
        newIndex = searchOptions.findIndex((x) => !x.disabled)
      }
    }
    setIndex(newIndex)
    moveIndex.current = false
    if (n) {
      moveIndex.current = true
      setTimeout(() => {
        const el = document.querySelector('.ui-select-hover')
        el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
        setTimeout(() => moveIndex.current = false)
      })
    }
  }

  return (
    <label
      className={cls('ui-input ui-input-box ui-select', {
        'ui-select-open': open,
        'ui-input-clearable': clearable
      }, className)}
      style={style}
      tabIndex={-1}
      ref={labelEl}
    >
      {before}
      <input {...rest} type='hidden' ref={ref} value={v ?? ''} />
      <div className={cls({ 'ui-select-tags': activeOptions.length })}>
        {activeOptions.map((option) => option && (
          <React.Fragment key={option.value}>
            {tagRender ? (
              tagRender(option)
            ) : (
              <span className='ui-select-tag'>
                <span>{option.label}</span>
                <Icon
                  className='ui-input-button'
                  size={16}
                  onClick={() => changeValue(option.value)}
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  close
                </Icon>
              </span>
            )}
          </React.Fragment>
        ))}
        <input
          ref={inputEl}
          className={cls('ui-select-search', {
            'ui-select-has-value': !multiple && v
          })}
          value={clear ? '' : search}
          onChange={(e) => {
            setSearch(e.target.value)
            setOpen(true)
            if (activeOptions.length) {
              const span = document.createElement('span')
              span.textContent = e.target.value
              document.body.append(span)
              if (inputEl.current) {
                inputEl.current.style.width = `${span.offsetWidth}px`
              }
              span.remove()
            }
          }}
          disabled={rest.disabled}
          placeholder={!multiple && activeOption?.label || rest.placeholder}
          onBlur={() => {
            if (stayOpen.current) {
              stayOpen.current = false
              inputEl.current?.focus()
              return
            }
            setOpen(false)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key.startsWith('Arrow')) {
              setOpen(true)
            } else if (e.key === 'Escape') {
              setOpen(false)
            }
            if (open) {
              if (e.key === 'ArrowUp') {
                changeIndex(-1)
              } else if (e.key === 'ArrowDown') {
                changeIndex(1)
              } else if (e.key === 'Enter') {
                if (searchOptions[index]) {
                  changeValue(searchOptions[index].value)
                  setSearch('')
                }
                if (!multiple) {
                  setOpen(false)
                }
              }
            }
          }}
        />
      </div>
      {after ?? (
        <>
          <Icon className='ui-input-icon'>keyboard_arrow_down</Icon>
          {clearable && (
            <Icon
              className='ui-input-button'
              size={16}
              onClick={() => changeValue('')}
              onMouseDown={(e) => e.stopPropagation()}
            >
              close
            </Icon>
          )}
        </>
      )}
      <Dropdown open={open} trigger='custom'>
        <Dropdown.Content ref={dropdownEl} className='ui-select-dropdown'>
          {searchOptions.length ? (
            <div
              className='ui-select-options'
              style={{ maxHeight: optionsMaxHeight }}
            >
              {searchOptions.map((option, i) => (
                <div
                  key={option.value}
                  className={cls({
                    'ui-select-hover': i === index && !(rest.disabled || option.disabled),
                    'ui-select-active': multiple ? v?.includes(option.value) : option.value === v,
                    'ui-select-disabled': rest.disabled || option.disabled
                  })}
                  onMouseMove={() => !moveIndex.current && setIndex(i)}
                  onClick={() => {
                    if (rest.disabled || option.disabled) {
                      return
                    }
                    changeValue(option.value)
                    if (!multiple) {
                      setOpen(false)
                    }
                  }}
                >
                  {optionRender ? (
                    optionRender(option)
                  ) : (
                    <>
                      <span>{option.label}</span>
                      {multiple && v?.includes(option.value) && (
                        <Icon className='ui-input-icon' size={16}>check</Icon>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className='ui-select-no-data'>No data</div>
          )}
        </Dropdown.Content>
      </Dropdown>
    </label>
  )
}

export default Select
