import { useEffect, useMemo, useRef, useState } from 'react'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { cls } from '../../../utils/index.js'
import { useEventListener, useResizeObserver } from '../../../hooks/index.js'
import { useInputState, useStateListner } from '../../tools'
import Button from '../../general/Button'
import Icon from '../../general/Icon'
import Popover from '../../overlay/Popover'
import Calendar from '../../data/Calendar'

dayjs.extend(customParseFormat)

export type DatePickerProps = Omit<
  React.JSX.IntrinsicElements['input'], 'defaultValue' | 'value' | 'onChange'
> & {
  defaultValue?: dayjs.ConfigType
  value?: dayjs.ConfigType
  onChange?: (event: CustomEvent<{ value: dayjs.Dayjs | null }>) => any
  open?: boolean
  onChangeOpen?: (open: boolean) => any
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
  footer?: React.ReactNode
  monthRender?: (year: number, month: number) => React.ReactNode
  weekRender?: (week: number) => React.ReactNode
  dateRender?: (date: dayjs.Dayjs) => React.ReactNode
  timeRender?: (type: 'hour' | 'minute' | 'second', n: number) => React.ReactNode
}

function DatePicker(props: DatePickerProps) {
  const {
    style, className,
    defaultValue, value, onChange,
    type = 'date',
    open: propsOpen,
    onChangeOpen,
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
    footer,
    monthRender,
    weekRender,
    dateRender,
    timeRender,
    ...rest
  } = props

  const { ref, v, setV } = useInputState(rest, defaultValue ?? null, value, onChange as any)
  const labelEl = useRef<HTMLLabelElement>(null)
  const inputEl = useRef<HTMLInputElement>(null)
  const popoverEl = useRef<HTMLDivElement>(null)
  const calendarEl = useRef<HTMLDivElement>(null)
  const timeEl = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useStateListner(propsOpen, onChangeOpen, false)
  const [text, setText] = useState('')
  const stayOpen = useRef(false)
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
    return dayjs(v).isValid() ? dayjs(v).format(format) : ''
  }, [v, format])
  const [hours, minutes, seconds] = useMemo(() => {
    const hours = [...Array(use12Hour ? 12 : 24)].map((_, i) => i)
    const minutes = [...Array(60)].map((_, i) => i)
    const seconds = [...Array(60)].map((_, i) => i)
    return [hours, minutes, seconds]
  }, [use12Hour])
  const [disabledH, disabledM, disabledS] = useMemo(() => {
    const hour = dayjs(v).hour()
    const minute = dayjs(v).minute()
    return [disabledHours?.(), disabledMinutes?.(hour), disabledSeconds?.(hour, minute)]
  }, [v])

  useEffect(() => {
    setText(formatDate)
    A.current = dayjs(v).isValid() ? dayjs(v).format('A') : 'AM'
    scrollToActive()
  }, [v])
  useEffect(() => {
    if (open) {
      const ob = new MutationObserver(() => {
        if (timeEl.current) {
          scrollToActive('instant')
        }
      })
      ob.observe(document.body, { childList: true })
      return () => ob.disconnect()
    }
  }, [open])

  const changeValue = (date: dayjs.Dayjs | null) => {
    if (date === null) {
      setV(null)
      return
    }
    if (date.isBefore(minDate, 'day') || date.isAfter(maxDate, 'day')) {
      setText(formatDate)
      return
    }
    if (!date.isSame(v)) {
      setV(date)
    } else {
      setText(formatDate)
    }
  }
  const onClickTime = (type: 'hour' | 'minute' | 'second' | 'AM' | 'PM', n: number) => {
    let newValue: dayjs.Dayjs
    if (dayjs(v).isValid()) {
      newValue = dayjs(v)
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
      const els = document.querySelectorAll('.ui-date-picker-time-active')
      for (let i = 0; i < els.length; i++) {
        els[i].scrollIntoView({ behavior, block: 'start' })
      }
    })
  }
  const renderTimePicker = () => {
    if (!calendarEl.current || !timeEl.current) {
      return
    }
    const rect = calendarEl.current.getBoundingClientRect()
    timeEl.current.style.height = `${rect.height}px`
  }

  const observer = useResizeObserver(calendarEl, renderTimePicker)
  useEventListener('mousedown', (e) => {
    const el = e.target as HTMLElement
    if (labelEl.current?.contains(el)) {
      setOpen(!open)
      if (!open && !inputEl.current?.contains(el)) {
        stayOpen.current = true
      }
    } else if (popoverEl.current?.contains(el)) {
      stayOpen.current = true
    } else {
      setOpen(false)
    }
  })

  return (
    <label
      className={cls('ui-input ui-input-box ui-date-picker', {
        'ui-input-clearable': clearable
      }, className)}
      style={style}
      tabIndex={-1}
      ref={labelEl}
    >
      {before}
      <input {...rest} type='hidden' ref={ref} value={dayjs(v).isValid() ? dayjs(v).format() : ''} />
      <div>
        <input
          ref={inputEl}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={rest.placeholder ?? format}
          disabled={rest.disabled}
          onBlur={() => {
            if (stayOpen.current) {
              stayOpen.current = false
              inputEl.current?.focus()
              return
            }
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
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setOpen(!open)
            } else if (e.key === 'Escape') {
              setOpen(false)
            }
          }}
        />
      </div>
      {after ?? (
        <>
          <Icon className='ui-input-icon' size={16}>calendar_today</Icon>
          {clearable && (
            <Icon
              className='ui-input-button'
              size={16}
              onClick={() => changeValue(null)}
              onMouseDown={(e) => e.stopPropagation()}
            >
              close
            </Icon>
          )}
        </>
      )}
      <Popover
        ref={popoverEl}
        className={cls('ui-date-picker-popover', {
          'ui-disabled': rest.disabled
        })}
        open={open}
        trigger='custom'
        position='bottom-left'
      >
        <div className='ui-date-picker-body'>
          {type !== 'time' && (
            <Calendar
              ref={(el) => {
                calendarEl.current = el
                observer.observe()
              }}
              date={dayjs(v).isValid() ? dayjs(v).startOf('d') : null}
              onChangeDate={(date) => {
                if (type === 'date') {
                  setOpen(false)
                } else if (type === 'datetime') {
                  if (dayjs(v).isValid()) {
                    date = date.add(dayjs(v).diff(dayjs(v).startOf('day')))
                  }
                }
                changeValue(date)
              }}
              minDate={minDate}
              maxDate={maxDate}
              disabledDate={disabledDate}
              monthRender={monthRender}
              weekRender={weekRender}
              dateRender={dateRender}
            />
          )}
          {type !== 'date' && (
            <div
              ref={timeEl}
              className='ui-date-picker-time-options'
              style={{ height: 232 }}
            >
              <div className='ui-date-picker-time-unit'>
                {hours.map((n) => !(hideDisabled && disabledH?.includes(n)) && (
                  <div
                    key={n}
                    className={cls({
                      'ui-date-picker-time-active': n === (use12Hour ? dayjs(v).hour() % 12 : dayjs(v).hour()),
                      'ui-disabled': disabledH?.includes(n)
                    })}
                    onClick={() => onClickTime('hour', n)}
                  >
                    {timeRender ? (
                      timeRender('hour', n)
                    ) : (
                      use12Hour && n === 0 ? 12 : String(n).padStart(2, '0')
                    )}
                  </div>
                ))}
                <div></div>
              </div>
              <div className='ui-date-picker-time-unit'>
                {minutes.map((n) => !(hideDisabled && disabledM?.includes(n)) && (
                  <div
                    key={n}
                    className={cls({
                      'ui-date-picker-time-active': n === dayjs(v).minute(),
                      'ui-disabled': disabledM?.includes(n)
                    })}
                    onClick={() => onClickTime('minute', n)}
                  >
                    {timeRender ? timeRender('minute', n) : String(n).padStart(2, '0')}
                  </div>
                ))}
                <div></div>
              </div>
              {showSeconds && (
                <div className='ui-date-picker-time-unit'>
                  {seconds.map((n) => !(hideDisabled && disabledS?.includes(n)) && (
                    <div
                      key={n}
                      className={cls({
                        'ui-date-picker-time-active': n === dayjs(v).second(),
                        'ui-disabled': disabledS?.includes(n)
                      })}
                      onClick={() => onClickTime('second', n)}
                    >
                      {timeRender ? timeRender('second', n) : String(n).padStart(2, '0')}
                    </div>
                  ))}
                  <div></div>
                </div>
              )}
              {use12Hour && (
                <div className='ui-date-picker-time-unit'>
                  {['AM', 'PM'].map((x) => (
                    <div
                      key={x}
                      className={cls({
                        'ui-date-picker-time-active': x === dayjs(v).format('A')
                      })}
                      onClick={() => onClickTime(x as any, 0)}
                    >
                      {x}
                    </div>
                  ))}
                  <div hidden></div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className='ui-date-picker-footer'>
          {footer ?? (
            <div
              className='ui-date-picker-action'
              style={{ justifyContent: type === 'date' ? 'center' : 'space-between' }}
            >
              <Button
                className='ui-date-picker-button'
                disabled={rest.disabled}
                onClick={() => {
                  changeValue(type === 'date' ? dayjs().startOf('day') : dayjs())
                  setOpen(false)
                }}
              >
                {type === 'date' ? 'Today' : 'Now'}
              </Button>
              {type !== 'date' && (
                <Button
                  className='ui-date-picker-button'
                  disabled={rest.disabled}
                  onClick={() => {
                    if (!dayjs(v).isValid()) {
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
        </div>
      </Popover>
    </label>
  )
}

export default DatePicker
