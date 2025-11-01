import dayjs from 'dayjs'
import { useMemo, useRef, useState } from 'react'
import { cls, useOutsideEvent } from '../../../utils'
import { useStateListner } from '../../tools'
import Button from '../../general/Button'
import Icon from '../../general/Icon'
import Select from '../../form/Select'

export type CalendarProps = React.ComponentPropsWithRef<'div'> & {
  month?: dayjs.ConfigType
  onMonthChange?: (month: dayjs.Dayjs) => void
  min?: dayjs.ConfigType // default: null
  max?: dayjs.ConfigType // default: null
  header?: React.ReactNode
  weekRender?: (week: number) => React.ReactNode
  dateRender?: (date: dayjs.Dayjs) => React.ReactNode
}

function Calendar(props: CalendarProps) {
  const {
    month: propsMonth,
    onMonthChange,
    min = null,
    max = null,
    header,
    weekRender,
    dateRender,
    ...rest
  } = props

  const yearEl = useRef<HTMLButtonElement>(null)
  const monthEl = useRef<HTMLButtonElement>(null)
  const [month, setMonth] = useStateListner(propsMonth, onMonthChange as any)
  const [yearOpen, setYearOpen] = useState(false)
  const [monthOpen, setMonthOpen] = useState(false)

  const date = useMemo(() => {
    const date = dayjs(month).isValid() ? dayjs(month) : dayjs()
    return date.startOf('month')
  }, [month])
  const year = useMemo(() => {
    let year = date
    if (year.isBefore(min, 'year')) {
      year = dayjs(min)
    } else if (year.isAfter(max, 'year')) {
      year = dayjs(max)
    }
    return year.startOf('year')
  }, [date])
  const years = useMemo(() => {
    const minYear = dayjs(min).isValid() ? dayjs(min).year() : date.subtract(10, 'year').year()
    const maxYear = dayjs(max).isValid() ? dayjs(max).year() : date.add(10, 'year').year()
    const years = []
    for (let i = minYear; i <= maxYear; i++) {
      years.push(dayjs(String(i)))
    }
    if (!years.length) {
      years.push(date.startOf('year'))
    }
    return years
  }, [min, max])
  const months = useMemo(() => {
    const months = []
    for (let i = 0; i < 12; i++) {
      months.push(year.add(i, 'month'))
    }
    return months
  }, [year])
  const weeks = useMemo(() => {
    const weeks = []
    for (let i = 0; i < 7; i++) {
      weeks.push(date.startOf('week').add(i, 'day'))
    }
    return weeks
  }, [date])
  const days = useMemo(() => {
    const days = []
    const start = date.day()
    const end = date.endOf('month').day()
    const daysInMonth = date.daysInMonth()
    for (let i = 0 - start; i < daysInMonth + 6 - end; i++) {
      days.push(date.add(i, 'day'))
    }
    return days
  }, [date])

  const changeMonth = (month: dayjs.Dayjs) => {
    let newMonth = month
    if (newMonth.isBefore(min, 'month')) {
      newMonth = dayjs(min)
    } else if (newMonth.isAfter(max, 'month')) {
      newMonth = dayjs(max)
    }
    setMonth(newMonth)
  }

  useOutsideEvent('click', (e) => {
    const el = e.target as HTMLElement
    if (!el.classList.contains('ui-select-options')) {
      setTimeout(() => setYearOpen(false))
    }
  }, yearEl)
  useOutsideEvent('click', (e) => {
    const el = e.target as HTMLElement
    if (!el.classList.contains('ui-select-options')) {
      setTimeout(() => setMonthOpen(false))
    }
  }, monthEl)

  return (
    <div
      {...rest}
      className={cls('ui-calendar', props.className)}
      translate='no'
    >
      <div className='ui-calendar-header'>
        {header ?? (
          <>
            <Button
              variant='icon'
              onClick={() => changeMonth(date.add(-1, 'month'))}
              disabled={date.isSame(min, 'month') || date.isBefore(min, 'month')}
            >
              <Icon>keyboard_arrow_left</Icon>
            </Button>
            <div>
              <Button
                ref={yearEl}
                color='info'
                className='ui-calandar-year'
                onClick={(e) => {
                  const el = e.target as HTMLElement
                  if (!el.classList.contains('ui-select-options')) {
                    setYearOpen(!yearOpen)
                  }
                }}
              >
                <Select
                  disabled
                  open={yearOpen}
                  value={year.format('YYYY')}
                  onValueChange={(v) => changeMonth(dayjs(v).add(date.month(), 'month'))}
                  options={years.map((y) => ({
                    value: y.format('YYYY'),
                    label: y.format('YYYY'),
                    disabled: y.isBefore(min, 'year') || y.isAfter(max, 'year')
                  }))}
                  translate='no'
                />
              </Button>
              <Button
                ref={monthEl}
                color='info'
                className='ui-calandar-month'
                onClick={(e) => {
                  const el = e.target as HTMLElement
                  if (!el.classList.contains('ui-select-options')) {
                    setMonthOpen(!monthOpen)
                  }
                }}
              >
                <Select
                  disabled
                  open={monthOpen}
                  value={date.format()}
                  onValueChange={(v) => changeMonth(dayjs(v))}
                  options={months.map((m) => ({
                    value: m.format(),
                    label: m.format('MMM'),
                    disabled: m.isBefore(min, 'month') || m.isAfter(max, 'month')
                  }))}
                  translate='no'
                />
              </Button>
            </div>
            <Button
              variant='icon'
              onClick={() => changeMonth(date.add(1, 'month'))}
              disabled={date.isSame(max, 'month') || date.isAfter(max, 'month')}
            >
              <Icon>keyboard_arrow_right</Icon>
            </Button>
          </>
        )}
      </div>
      <div className='ui-calendar-weeks'>
        {weeks.map((w) => (
          <div key={w.format()}>
            {weekRender ? weekRender(w.day()) : w.format('dd')}
          </div>
        ))}
      </div>
      <div className='ui-calendar-days'>
        {days.map((d) => (
          <div
            key={d.format()}
            className={cls({
              'ui-calendar-day': !(d.isBefore(month, 'month') || d.isAfter(month, 'month'))
            })}
          >
            {dateRender ? dateRender(d) : d.format('DD')}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Calendar
