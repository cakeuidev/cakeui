import React, { useEffect, useMemo, useRef, useState } from 'react'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { cls, useResizeObserver } from '../../../utils'
import { useInputBox, useInputState, useStateListner } from '../../tools'
import Button from '../../general/Button'
import Icon from '../../general/Icon'
import Popover from '../../overlay/Popover'
import Card from '../../data/Card'
import Calendar from '../../data/Calendar'

dayjs.extend(customParseFormat)

export type DatePickerProps = Omit<
  React.ComponentPropsWithRef<'input'>, 'defaultValue' | 'value'
> & {
  defaultValue?: dayjs.ConfigType
  value?: dayjs.ConfigType
  onValueChange?: (value: dayjs.Dayjs | null) => void
  open?: boolean
  onOpenChange?: (open: boolean) => void
  type?: 'date' | 'datetime' | 'time' // default: 'date'
  format?: string
  showSeconds?: boolean               // default: false
  use12Hour?: boolean                 // default: true
  minDate?: dayjs.ConfigType
  maxDate?: dayjs.ConfigType
  disabledDate?: (date: dayjs.Dayjs) => boolean
  disabledHours?: () => number[]
  disabledMinutes?: (hour?: number) => number[]
  disabledSeconds?: (hour?: number, minute?: number) => number[]
  hideDisabled?: boolean              // default: false
  clearable?: boolean                 // default: true
  before?: React.ReactNode
  after?: React.ReactNode
  header?: React.ReactNode
  footer?: React.ReactNode
  weekRender?: (week: number) => React.ReactNode
  dateRender?: (date: dayjs.Dayjs) => React.ReactNode
  timeRender?: (type: 'hour' | 'minute' | 'second', n: number) => React.ReactNode
}

function DatePicker(props: DatePickerProps) {
  const {
    style,
    className,
    defaultValue,
    value: propsValue,
    onValueChange,
    type = 'date',
    open: propsOpen,
    onOpenChange,
    format: propsFormat,
    showSeconds = false,
    use12Hour = true,
    minDate = null,
    maxDate = null,
    disabledDate,
    disabledHours,
    disabledMinutes,
    disabledSeconds,
    hideDisabled = false,
    clearable = true,
    before,
    after,
    header,
    footer,
    weekRender,
    dateRender,
    timeRender,
    ...rest
  } = props

  const inputEl = useRef<HTMLInputElement>(null)
  const calendarEl = useRef<HTMLDivElement>(null)
  const timeEl = useRef<HTMLDivElement>(null)
  const { onClick, onMouseDown } = useInputBox(inputEl)
  const [value, setValue] = useInputState({
    ...props,
    defaultValue: null
  } as any) as [dayjs.ConfigType, any]
  const [open, setOpen] = useStateListner(propsOpen, onOpenChange)
  const [text, setText] = useState('')
  const [hover, setHover] = useState(false)
  const A = useRef('AM')

  const format = useMemo(() => {
    if (propsFormat) {
      return propsFormat
    }
    const timeFormat = showSeconds ? (
      use12Hour ? 'hh:mm:ss A' : 'HH:mm:ss'
    ) : (
      use12Hour ? 'hh:mm A' : 'HH:mm'
    )
    const f = {
      date: `YYYY-MM-DD`,
      datetime: `YYYY-MM-DD ${timeFormat}`,
      time: timeFormat
    }
    return f[type]
  }, [propsFormat, type, showSeconds])
  const formatDate = useMemo(() => {
    return dayjs(value).isValid() ? dayjs(value).format(format) : ''
  }, [value, format])
  const [hours, minutes, seconds] = useMemo(() => {
    const hours = Array.from({ length: use12Hour ? 12 : 24 }).map((_, i) => i)
    const minutes = Array.from({ length: 60 }).map((_, i) => i)
    const seconds = Array.from({ length: 60 }).map((_, i) => i)
    return [hours, minutes, seconds]
  }, [use12Hour])
  const [disabledH, disabledM, disabledS] = useMemo(() => {
    const hour = dayjs(value).hour()
    const minute = dayjs(value).minute()
    return [disabledHours?.(), disabledMinutes?.(hour), disabledSeconds?.(hour, minute)]
  }, [value])

  useEffect(() => {
    setText(formatDate)
    A.current = dayjs(value).isValid() ? dayjs(value).format('A') : 'AM'
    scrollToActive()
  }, [value])
  useEffect(() => {
    if (open) {
      const observer = new MutationObserver(() => {
        if (timeEl.current) {
          scrollToActive('instant')
        }
      })
      observer.observe(document.body, { childList: true })
      return () => observer.disconnect()
    }
  }, [open])

  const changeValue = (date: dayjs.Dayjs | null) => {
    if (date === null) {
      setValue(null)
      setText('')
      return
    }
    if (date.isBefore(minDate, 'day') || date.isAfter(maxDate, 'day') || date.isSame(value)) {
      setText(formatDate)
      return
    }
    setValue(date)
  }
  const onClickTime = (type: 'hour' | 'minute' | 'second' | 'AM' | 'PM', n: number) => {
    let newValue: dayjs.Dayjs
    if (dayjs(value).isValid()) {
      newValue = dayjs(value)
    } else {
      const h = Array(24).findIndex((_, i) => !disabledH?.includes(i))
      const m = Array(60).findIndex((_, i) => !disabledM?.includes(i))
      const s = Array(60).findIndex((_, i) => !disabledS?.includes(i))
      newValue = dayjs().hour(Math.max(h, 0)).minute(Math.max(m, 0)).second(Math.max(s, 0))
    }
    if (type !== 'AM' && type !== 'PM') {
      newValue = newValue[type](n)
    } else {
      A.current = type
    }
    if (use12Hour) {
      const f = 'YYYY-MM-DD hh:mm:ss '
      changeValue(dayjs(newValue.format(f) + A.current, `${f}A`))
    } else {
      changeValue(newValue)
    }
  }
  const scrollToActive = (behavior: ScrollBehavior = 'smooth') => {
    requestAnimationFrame(() => {
      if (timeEl.current) {
        const els = timeEl.current?.querySelectorAll('.ui-button-info')
        for (const el of els) {
          el.scrollIntoView({ behavior, block: 'start' })
        }
      }
    })
  }

  const observer = useResizeObserver(calendarEl, () => {
    if (!calendarEl.current || !timeEl.current) {
      return
    }
    const rect = calendarEl.current.getBoundingClientRect()
    timeEl.current.style.height = `${rect.height}px`
  })

  return (
    <span
      tabIndex={-1}
      className={cls('ui-input ui-input-box ui-date-picker', {
        'ui-input-clearable': clearable
      }, className)}
      style={style}
      onClick={onClick}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      onMouseDown={(e) => {
        onMouseDown(e)
        setOpen(true)
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          setOpen(!open)
        } else if (e.key === 'Escape') {
          setOpen(false)
        }
      }}
    >
      {before}
      <input {...rest} type='hidden' value={dayjs(value).isValid() ? dayjs(value).format() : ''} />
      <input
        inputMode='none'
        ref={inputEl}
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={props.disabled}
        placeholder={props.placeholder ?? format}
        onBlur={() => {
          setOpen(false)
          if (!text) {
            changeValue(null)
            return
          }
          const str = type !== 'time' ? text : dayjs().format('YYYY-MM-DD ') + text
          if (dayjs(str).isValid()) {
            changeValue(dayjs(str))
          } else {
            setText(formatDate)
          }
        }}
      />
      {after ?? (
        clearable && (hover || open) && value ? (
          <Button
            tabIndex={-1}
            variant='icon'
            onClick={() => {
              changeValue(null)
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
          <Icon size={16} className='ui-input-icon'>calendar_today</Icon>
        )
      )}
      <Popover
        position='bottom-left'
        translate={props.translate}
        className='ui-date-picker-popover'
        open={open}
        onPointerEnter={() => setHover(false)}
        render={(
          <Card>
            <Card.Content>
              {type !== 'time' && (
                <Calendar
                  ref={(el) => {
                    calendarEl.current = el
                    observer.observe()
                  }}
                  min={minDate}
                  max={maxDate}
                  header={header}
                  weekRender={weekRender}
                  dateRender={dateRender ?? ((date) => (
                    <Button
                      variant={dayjs(date).isSame(value, 'day') ? 'filled' : 'text'}
                      color={dayjs(date).isSame(value, 'day') ? 'info' : 'default'}
                      disabled={
                        disabledDate?.(date) ||
                        date.isBefore(minDate) || date.isAfter(maxDate)
                      }
                      onClick={() => {
                        if (type === 'date') {
                          setOpen(false)
                        } else if (type === 'datetime') {
                          const v = dayjs(value)
                          if (v.isValid()) {
                            date = date.add(v.diff(v.startOf('day')))
                          }
                        }
                        changeValue(date)
                      }}
                    >
                      {date.format('DD')}
                    </Button>
                  ))}
                />
              )}
              {type !== 'date' && (
                <div
                  ref={timeEl}
                  className='ui-date-picker-time'
                  style={{ height: 232 }}
                >
                  <div className='ui-date-picker-col'>
                    {hours.map((n) => !(hideDisabled && disabledH?.includes(n)) && (
                      <React.Fragment key={n}>
                        {timeRender ? (
                          timeRender('hour', n)
                        ) : (
                          <Button
                            variant='text'
                            color={n === (
                              use12Hour ? dayjs(value).hour() % 12 : dayjs(value).hour()
                            ) ? 'info' : 'default'}
                            disabled={disabledH?.includes(n)}
                            onClick={() => onClickTime('hour', n)}
                          >
                            {use12Hour && n === 0 ? 12 : String(n).padStart(2, '0')}
                          </Button>
                        )}
                      </React.Fragment>
                    ))}
                    <div></div>
                  </div>
                  <div className='ui-date-picker-col'>
                    {minutes.map((n) => !(hideDisabled && disabledM?.includes(n)) && (
                      <React.Fragment key={n}>
                        {timeRender ? (
                          timeRender('minute', n)
                        ) : (
                          <Button
                            variant='text'
                            color={n === dayjs(value).minute() ? 'info' : 'default'}
                            disabled={disabledM?.includes(n)}
                            onClick={() => onClickTime('minute', n)}
                          >
                            {String(n).padStart(2, '0')}
                          </Button>
                        )}
                      </React.Fragment>
                    ))}
                    <div></div>
                  </div>
                  {showSeconds && (
                    <div className='ui-date-picker-col'>
                      {seconds.map((n) => !(hideDisabled && disabledS?.includes(n)) && (
                        <React.Fragment key={n}>
                          {timeRender ? (
                            timeRender('second', n)
                          ) : (
                            <Button
                              key={n}
                              variant='text'
                              color={n === dayjs(value).second() ? 'info' : 'default'}
                              disabled={disabledS?.includes(n)}
                              onClick={() => onClickTime('second', n)}
                            >
                              {String(n).padStart(2, '0')}
                            </Button>
                          )}
                        </React.Fragment>
                      ))}
                      <div></div>
                    </div>
                  )}
                  {use12Hour && (
                    <div className='ui-date-picker-col'>
                      {['AM', 'PM'].map((x) => (
                        <Button
                          key={x}
                          variant='text'
                          color={x === dayjs(value).format('A') ? 'info' : 'default'}
                          onClick={() => onClickTime(x as any, 0)}
                        >
                          {x}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </Card.Content>
            <Card.Footer>
              {footer ?? (
                <div
                  className='ui-date-picker-action'
                  style={{ justifyContent: type === 'date' ? 'center' : 'space-between' }}
                >
                  <Button
                    variant='text'
                    color='info'
                    onClick={() => {
                      changeValue(type === 'date' ? dayjs().startOf('day') : dayjs())
                      setOpen(false)
                    }}
                  >
                    {type === 'date' ? 'Today' : 'Now'}
                  </Button>
                  {type !== 'date' && (
                    <Button
                      variant='text'
                      color='info'
                      onClick={() => {
                        if (!dayjs(value).isValid()) {
                          changeValue(dayjs().startOf('day'))
                        }
                        setOpen(false)
                      }}
                    >
                      OK
                    </Button>
                  )}
                </div>
              )}
            </Card.Footer>
          </Card>
        )}
      >
        <div className='ui-date-picker-trigger'></div>
      </Popover>
    </span>
  )
}

export default DatePicker
