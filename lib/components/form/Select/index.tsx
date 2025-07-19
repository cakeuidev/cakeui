import React, { useEffect, useMemo, useRef, useState } from 'react'
import { cls } from '../../../utils/index.js'
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
  searchable?: boolean // default: true
  clearable?: boolean  // default: true
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
    searchable = true,
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
      if (activeOptions.length) {
        renderInput()
      }
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

  const changeValue = (value: string) => {
    if (!value) {
      setV(multiple ? [] : '')
      return
    }
    if (multiple) {
      const prev = Array.isArray(v) ? v : []
      const newValue = prev.includes(value) ? prev.filter((x) => x !== value) : [...prev, value]
      setV(newValue)
      if (newValue.length) {
        renderInput()
      }
    } else {
      setV(value)
    }
  }
  const changeIndex = (n: number) => {
    let newIndex = (index + n) % searchOptions.length
    if (n === 0) {
      const option = multiple ? activeOptions[activeOptions.length - 1] : activeOption
      newIndex = option ? searchOptions.indexOf(option) : -1
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
    if (n === 0 && newIndex) {
      const observer = new MutationObserver(() => {
        if (dropdownEl.current) {
          scrollToActive('instant')
          observer.disconnect()
        }
      })
      observer.observe(document.body, { childList: true })
    } else {
      scrollToActive()
    }
  }
  const scrollToActive = (behavior: ScrollBehavior = 'smooth') => {
    moveIndex.current = true
    requestAnimationFrame(() => {
      const el = document.querySelector('.ui-select-hover:not(:first-child)')
      if (el) {
        el.scrollIntoView({ behavior, block: 'nearest' })
      }
    })
  }
  const renderInput = () => {
    if (!inputEl.current) {
      return
    }
    const span = document.createElement('span')
    span.textContent = inputEl.current.value
    document.body.append(span)
    inputEl.current.style.width = `${span.offsetWidth + 1}px`
    span.remove()
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
      onPointerDown={(e) => {
        const el = e.target as HTMLElement
        if (open && !inputEl.current?.contains(el)) {
          stayOpen.current = true
        }
        if (labelEl.current?.contains(el)) {
          setTimeout(() => setOpen(!open))
        }
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
            }
            if (!multiple) {
              setOpen(false)
            }
          }
        }
      }}
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
                  onPointerDown={(e) => {
                    e.stopPropagation()
                    stayOpen.current = !!open
                    changeValue(option.value)
                  }}
                >
                  close
                </Icon>
              </span>
            )}
          </React.Fragment>
        ))}
        {searchable ? (
          <input
            inputMode='none'
            ref={inputEl}
            className={cls('ui-select-search', {
              'ui-select-has-value': !multiple && v
            })}
            value={clear ? '' : search}
            onChange={(e) => {
              setSearch(e.target.value)
              setOpen(true)
              if (activeOptions.length) {
                renderInput()
              }
            }}
            disabled={rest.disabled}
            placeholder={(multiple ? void 0 : activeOption?.label) ?? rest.placeholder}
            onBlur={() => {
              if (stayOpen.current) {
                stayOpen.current = false
                inputEl.current?.focus()
                return
              }
              setOpen(false)
            }}
          />
        ) : (
          multiple ? void 0 : activeOption?.label
        )}
      </div>
      {after ?? (
        <>
          <Icon className='ui-input-icon'>keyboard_arrow_down</Icon>
          {clearable && (
            <Icon
              className='ui-input-button'
              size={16}
              onPointerDown={(e) => {
                e.stopPropagation()
                changeValue('')
              }}
            >
              close
            </Icon>
          )}
        </>
      )}
      <Dropdown open={open}>
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
                  onMouseMove={() => {
                    if (!moveIndex.current) {
                      setIndex(i)
                    }
                    moveIndex.current = false
                  }}
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
