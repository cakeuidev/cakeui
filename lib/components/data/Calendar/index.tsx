import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
import { cls } from '../../../utils/index.js'
import { useStateListner } from '../../tools'
import Icon from '../../general/Icon'

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
  const [month, setMonth] = useState(() => {
    let M = dayjs(date).isValid() ? dayjs(date) : dayjs()
    if (M.isBefore(minDate, 'month')) {
      M = dayjs(minDate)
    } else if (M.isAfter(maxDate, 'month')) {
      M = dayjs(maxDate)
    }
    return M.startOf('month')
  })

  const [week, days] = useMemo(() => {
    const week = []
    for (let i = 0; i < 7; i++) {
      week.push(dayjs().startOf('week').add(i, 'day').format('dd'))
    }
    const days = []
    const monthStart = Number(month.startOf('month').format('d'))
    const monthEnd = Number(month.endOf('month').format('d'))
    const daysInMonth = month.daysInMonth()
    for (let i = 0 - monthStart; i < daysInMonth + 6 - monthEnd; i++) {
      days.push(month.startOf('month').add(i, 'day'))
    }
    return [week, days]
  }, [month])

  const onClickDate = (d: dayjs.Dayjs) => {
    if (d.isBefore(minDate, 'day') || d.isAfter(maxDate, 'day')) {
      return
    }
    if (!d.isSame(date, 'day')) {
      setDate(d)
    }
    if (!d.isSame(month, 'month')) {
      setMonth(d.startOf('month'))
    }
  }
  const onClickArrow = (n: number) => {
    const M = month.add(n, 'month')
    if (M.isBefore(minDate, 'month') || M.isAfter(maxDate, 'month')) {
      return
    }
    if (!M.isSame(month, 'month')) {
      setMonth(M)
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
          <>
            <Icon
              className={cls('ui-calendar-icon', {
                'ui-disabled': month.isSame(minDate, 'year') || month.isBefore(minDate, 'year')
              })}
              onClick={() => onClickArrow(-12)}
            >
              keyboard_double_arrow_left
            </Icon>
            <Icon
              className={cls('ui-calendar-icon', {
                'ui-disabled': month.isSame(minDate, 'month') || month.isBefore(minDate, 'month')
              })}
              onClick={() => onClickArrow(-1)}
            >
              keyboard_arrow_left
            </Icon>
          </>
        )}
        <span className='ui-calendar-month'>
          {monthRender ? monthRender(month.year(), month.month()) : month.format('MMMM YYYY')}
        </span>
        {arrows && (
          <>
            <Icon
              className={cls('ui-calendar-icon', {
                'ui-disabled': month.isSame(maxDate, 'month') || month.isAfter(maxDate, 'month')
              })}
              onClick={() => onClickArrow(1)}
            >
              keyboard_arrow_right
            </Icon>
            <Icon
              className={cls('ui-calendar-icon', {
                'ui-disabled': month.isSame(maxDate, 'year') || month.isAfter(maxDate, 'year')
              })}
              onClick={() => onClickArrow(12)}
            >
              keyboard_double_arrow_right
             </Icon>
          </>
        )}
      </div>
      <div className='ui-calendar-week'>
        {week.map((name, i) => (
          <span key={name}>
            {weekRender ? weekRender(i) : name}
          </span>
        ))}
      </div>
      <div className='ui-calendar-days'>
        {days.map((day) => (
          <span
            key={day.format('YYYYMMDD')}
            className={cls({
              'ui-calendar-day': !(day.isBefore(month, 'month') || day.isAfter(month, 'month')),
              'ui-calendar-active': day.isSame(date, 'day'),
              'ui-disabled': day.isBefore(minDate, 'day') || day.isAfter(maxDate, 'day') || disabledDate?.(day)
            })}
            onClick={() => onClickDate(day)}
          >
            {dateRender ? dateRender(day) : day.format('DD')}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Calendar
