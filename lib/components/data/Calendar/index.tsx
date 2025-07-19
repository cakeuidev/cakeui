import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
import { cls } from '../../../utils/index.js'
import { useStateListner } from '../../tools'
import Icon from '../../general/Icon'
import Select from '../../form/Select'

export type CalendarProps = React.JSX.IntrinsicElements['div'] & {
  date?: dayjs.ConfigType
  onChangeDate?: (date: dayjs.Dayjs) => any
  arrows?: boolean // default: true
  minDate?: dayjs.ConfigType
  maxDate?: dayjs.ConfigType
  disabledDate?: (date: dayjs.Dayjs) => boolean
  monthRender?: (year: number, month: number) => React.ReactNode
  weekRender?: (week: number) => React.ReactNode
  dateRender?: (date: dayjs.Dayjs) => React.ReactNode
}

function Calendar(props: CalendarProps) {
  const {
    date: propsDate,
    onChangeDate,
    arrows = true,
    minDate = null,
    maxDate = null,
    disabledDate,
    monthRender,
    weekRender,
    dateRender,
    ...rest
  } = props

  const [date, setDate] = useStateListner(propsDate, onChangeDate as any)
  const [year, setYear] = useState(() => {
    let y = dayjs(date).isValid() ? dayjs(date) : dayjs()
    if (y.isBefore(minDate, 'year')) {
      y = dayjs(minDate)
    } else if (y.isAfter(maxDate, 'year')) {
      y = dayjs(maxDate)
    }
    return y.startOf('year')
  })
  const [month, setMonth] = useState(() => {
    let m = dayjs(date).isValid() ? dayjs(date) : dayjs()
    if (m.isBefore(minDate, 'month')) {
      m = dayjs(minDate)
    } else if (m.isAfter(maxDate, 'month')) {
      m = dayjs(maxDate)
    }
    return m.startOf('month')
  })

  const years = useMemo(() => {
    const d = dayjs(date).isValid() ? dayjs(date) : dayjs()
    const min = dayjs(minDate)
    const max = dayjs(maxDate)
    const years = []
    const minYear = min.isValid() ? min.year() : d.subtract(10, 'year').year()
    const maxYear = max.isValid() ? max.year() : d.add(10, 'year').year()
    for (let i = minYear; i <= maxYear; i++) {
      years.push(dayjs(String(i)))
    }
    if (!years.length) {
      years.push(d.startOf('year'))
    }
    return years
  }, [date, minDate, maxDate])
  const months = useMemo(() => {
    const months = []
    for (let i = 0; i < 12; i++) {
      months.push(year.add(i, 'month'))
    }
    return months
  }, [year])
  const weeks = useMemo(() => {
    const d = dayjs(date).isValid() ? dayjs(date) : dayjs()
    const weeks = []
    for (let i = 0; i < 7; i++) {
      weeks.push(d.startOf('week').add(i, 'day'))
    }
    return weeks
  }, [date])
  const days = useMemo(() => {
    const days = []
    const start = month.day()
    const end = month.endOf('month').day()
    const daysInMonth = month.daysInMonth()
    for (let i = 0 - start; i < daysInMonth + 6 - end; i++) {
      days.push(month.add(i, 'day'))
    }
    return days
  }, [month])

  const onClickDate = (d: dayjs.Dayjs) => {
    if (d.isBefore(minDate, 'day') || d.isAfter(maxDate, 'day')) {
      return
    }
    if (!d.isSame(date, 'day')) {
      setDate(d)
    }
    if (!d.isSame(month, 'month')) {
      setYear(d.startOf('year'))
      setMonth(d.startOf('month'))
    }
  }
  const onClickArrow = (n: number) => {
    const m = month.add(n, 'month')
    if (m.isBefore(minDate, 'month') || m.isAfter(maxDate, 'month')) {
      return
    }
    if (!m.isSame(month, 'month')) {
      setYear(m.startOf('year'))
      setMonth(m)
    }
  }

  return (
    <div
      {...rest}
      className={cls('ui-calendar', rest.className)}
      translate='no'
    >
      <div className='ui-calendar-title'>
        {arrows && (
          <Icon
            className={cls('ui-calendar-icon', {
              'ui-disabled': month.isSame(minDate, 'month') || month.isBefore(minDate, 'month')
            })}
            onClick={() => onClickArrow(-1)}
          >
            keyboard_arrow_left
          </Icon>
        )}
        <span className='ui-calendar-year-month'>
          <span className='ui-calendar-year'>
            <Select
              value={year.format('YYYY')}
              onChange={(e) => {
                const y = dayjs(e.detail.value)
                setYear(y)
                setMonth(y.add(month.month(), 'month'))
              }}
              options={years.map((y) => ({
                value: y.format('YYYY'),
                label: y.format('YYYY'),
                disabled: !y.isSame(year) && (y.isBefore(minDate, 'year') || y.isAfter(maxDate, 'year'))
              }))}
              optionsMaxHeight={200}
              searchable={false}
              clearable={false}
            />
          </span>
          <span className='ui-calendar-month'>
            <Select
              value={String(month.month())}
              onChange={(e) => setMonth(dayjs(year.format('YYYY') + e.detail.value))}
              onPointerDown={(e) => e.stopPropagation()}
              options={months.map((m) => ({
                value: String(m.month()),
                label: m.format('MMM'),
                disabled: !m.isSame(month) && (m.isBefore(minDate, 'month') || m.isAfter(maxDate, 'month'))
              }))}
              optionsMaxHeight={200}
              searchable={false}
              clearable={false}
              optionRender={monthRender ? (
                (option) => monthRender(year.year(), Number(option.value))
              ) : void 0}
            />
          </span>
        </span>
        {arrows && (
          <Icon
            className={cls('ui-calendar-icon', {
              'ui-disabled': month.isSame(maxDate, 'month') || month.isAfter(maxDate, 'month')
            })}
            onClick={() => onClickArrow(1)}
          >
            keyboard_arrow_right
          </Icon>
        )}
      </div>
      <div className='ui-calendar-weeks'>
        {weeks.map((w) => (
          <span key={w.format('dd')}>
            {weekRender ? weekRender(w.day()) : w.format('dd')}
          </span>
        ))}
      </div>
      <div className='ui-calendar-days'>
        {days.map((d) => (
          <span
            key={d.format('YYYYMMDD')}
            className={cls({
              'ui-calendar-day': !(d.isBefore(month, 'month') || d.isAfter(month, 'month')),
              'ui-calendar-active': d.isSame(date, 'day'),
              'ui-disabled': d.isBefore(minDate, 'day') || d.isAfter(maxDate, 'day') || disabledDate?.(d)
            })}
            onClick={() => onClickDate(d)}
          >
            {dateRender ? dateRender(d) : d.format('DD')}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Calendar
