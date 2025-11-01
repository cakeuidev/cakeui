import React, { useEffect, useMemo, useRef, useState } from 'react'
import { cls } from '../../../utils'
import { useInputBox, useInputState, useStateListner } from '../../tools'
import Button from '../../general/Button'
import Icon from '../../general/Icon'
import Dropdown from '../../overlay/Dropdown'

export type SelectProps = SelectCommonProps & (SelectSingleProps | SelectMultipleProps)
export type SelectCommonProps = Omit<
  React.ComponentPropsWithRef<'input'>, 'defaultValue' | 'value'
> & {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  options?: SelectOption[]
  clearable?: boolean  // default: true
  before?: React.ReactNode
  after?: React.ReactNode
  tagRender?: (option: SelectOption) => React.ReactNode
  optionRender?: (option: SelectOption) => React.ReactNode
}
export type SelectSingleProps = {
  multiple?: false
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
}
export type SelectMultipleProps = {
  multiple: true
  defaultValue?: string[]
  value?: string[]
  onValueChange?: (value: string[]) => void
}
export type SelectOption = {
  value: string
  label: string
  disabled?: boolean
}

function Select(props: SelectProps) {
  const {
    style,
    className,
    multiple,
    defaultValue,
    value: propsValue,
    onValueChange,
    open: propsOpen,
    onOpenChange,
    options,
    clearable = true,
    before,
    after,
    optionRender,
    tagRender,
    ...rest
  } = props

  const inputEl = useRef<HTMLInputElement>(null)
  const dropdownEl = useRef<HTMLDivElement>(null)
  const { onClick, onMouseDown } = useInputBox(inputEl)
  const [value, setValue] = useInputState(props as any) as [string | string[] | undefined, any]
  const [open, setOpen] = useStateListner(propsOpen, onOpenChange)
  const [closing, setClosing] = useState(false)
  const [search, setSearch] = useState('')
  const [hover, setHover] = useState(false)
  const [index, setIndex] = useState(0)

  const activeOptions = useMemo(() => {
    if (!options) {
      return []
    }
    const list = Array.isArray(value) ? value : [value]
    return list.map((v) => options.find((x) => x.value === v))
  }, [options, value, multiple])
  const searchOptions = useMemo(() => {
    if (!options || !search) {
      return options ?? []
    }
    return options.filter((x) => x.label.toUpperCase().includes(search.toUpperCase()))
  }, [options, search])

  useEffect(() => {
    if (open) {
      if (closing) {
        setClosing(false)
        setSearch('')
      }
      changeIndex(0)
      renderInput()
    } else {
      setClosing(true)
      const timer = setTimeout(() => {
        setClosing(false)
        setSearch('')
        inputEl.current?.style.removeProperty('width')
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [open])

  const changeValue = (v: string) => {
    if (!v) {
      setValue(multiple ? [] : '')
      return
    }
    if (multiple) {
      const prev = (Array.isArray(value) ? value : [value]).filter((x) => x)
      const newValue = prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]
      setValue(newValue)
    } else {
      setValue(v)
    }
    renderInput()
  }
  const changeIndex = (n: number) => {
    let newIndex = (index + n) % searchOptions.length
    if (n === 0) {
      const option = activeOptions[activeOptions.length - 1]
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
    requestAnimationFrame(() => {
      const el = document.querySelector('.ui-select-target')
      el?.scrollIntoView({ behavior, block: 'nearest' })
    })
  }
  const renderInput = () => {
    if (!inputEl.current || !multiple) {
      return
    }
    const span = document.createElement('span')
    span.textContent = inputEl.current.value
    document.body.append(span)
    inputEl.current.style.width = `${span.offsetWidth + 1}px`
    span.remove()
  }

  return (
    <span
      className={cls('ui-input ui-input-box ui-select', className)}
      style={style}
      onClick={onClick}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      onMouseDown={(e) => {
        onMouseDown(e)
        setOpen(true)
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
      <input {...rest} type='hidden' value={value ?? ''} />
      <div className='ui-select-wrapper'>
        {multiple ? (
          activeOptions.map((option) => option && (
            <React.Fragment key={option.value}>
              {tagRender ? (
                tagRender(option)
              ) : (
                <div className='ui-select-tag'>
                  <span>{option.label}</span>
                  <Button
                    tabIndex={-1}
                    variant='icon'
                    onClick={() => changeValue(option.value)}
                  >
                    <Icon size={16}>close</Icon>
                  </Button>
                </div>
              )}
            </React.Fragment>
          ))
        ) : (
          <input disabled value={open && search ? '' : activeOptions[0]?.label ?? ''} />
        )}
        <input
          ref={inputEl}
          inputMode='none'
          className={cls({ 'ui-select-search': !multiple })}
          value={closing ? '' : search}
          onChange={(e) => {
            setSearch(e.target.value)
            setOpen(true)
            renderInput()
          }}
          onBlur={() => setOpen(false)}
          disabled={props.disabled}
          placeholder={value?.length ? undefined : props.placeholder}
        />
      </div>
      {after ?? (
        !props.disabled && clearable && (hover || open) && value?.length ? (
          <Button
            tabIndex={-1}
            variant='icon'
            onClick={() => {
              changeValue('')
              setOpen(false)
              inputEl.current?.focus()
            }}
            onMouseDown={(e) => {
              e.stopPropagation()
              e.preventDefault()
            }}
          >
            <Icon size={16}>close</Icon>
          </Button>
        ) : (
          <Icon size={16}>keyboard_arrow_down</Icon>
        )
      )}
      <Dropdown
        ref={dropdownEl}
        className='ui-select-dropdown'
        translate={props.translate}
        open={open}
        onPointerEnter={() => setHover(false)}
        render={(
          searchOptions.length ? (
            <div className='ui-select-options'>
              {searchOptions.map((option, i) => (
                <React.Fragment key={option.value}>
                  {optionRender ? (
                    optionRender(option)
                  ) : (
                    <Button
                      variant='text'
                      color={(
                        multiple ? value?.includes(option.value) : option.value === value
                      ) ? 'info' : 'default'}
                      className={cls({ 'ui-select-target': i === index && !option.disabled })}
                      disabled={option.disabled}
                      onPointerMove={() => setIndex(i)}
                      onClick={() => {
                        changeValue(option.value)
                        if (!multiple) {
                          setOpen(false)
                        }
                      }}
                    >
                      <span>{option.label}</span>
                      {multiple && value?.includes(option.value) && (
                        <Icon size={16}>check</Icon>
                      )}
                    </Button>
                  )}
                </React.Fragment>
              ))}
            </div>
          ) : (
            <div className='ui-select-no-data'>No data</div>
          )
        )}
      >
        <div className='ui-select-trigger'></div>
      </Dropdown>
    </span>
  )
}

export default Select
