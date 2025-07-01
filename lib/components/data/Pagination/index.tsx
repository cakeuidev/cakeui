import { useEffect, useMemo } from 'react'
import { cls } from '../../../utils/index.js'
import { useStateListner } from '../../tools'
import Icon from '../../general/Icon'

export type PaginationProps = React.JSX.IntrinsicElements['div'] & {
  total?: number // default: 10
  page?: number
  onChangePage?: (page: number) => any
}

function Pagination(props: PaginationProps) {
  const {
    total = 10,
    page: propsPage,
    onChangePage,
    ...rest
  } = props

  const [page, setPage] = useStateListner(propsPage, onChangePage, 1)

  const pages = useMemo(() => {
    const result: any[] = []
    let p = page ?? 1
    const curr = p < 1 || p > total ? 1 : p
    for (let i = curr - 4; i <= total; i++) {
      if (result.length === 5) {
        if (curr < i - 2) {
          break
        }
        result.shift()
      }
      if (i > 0) {
        result.push(i)
      }
    }
    if (result[0] !== 1) {
      result.unshift(1)
    }
    if (result[result.length - 1] !== total && total > 0) {
      result.push(total)
    }
    if (result.length <= 5) {
      return result
    }
    if (result[0] + 1 !== result[1]) {
      result.splice(1, 0, 'prev')
    }
    if (result[result.length - 1] - 1 !== result[result.length - 2]) {
      result.splice(result.length - 1, 0, 'next')
    }
    return result
  }, [total, page])

  useEffect(() => {
    if (!page || page < 1 || page > total) {
      setPage(1)
    }
  }, [page, total])

  const onClickArrow = (n: number) => {
    let newPage = (page ?? 1) + n
    if (newPage < 1) {
      newPage = 1
    } else if (newPage > total) {
      newPage = total
    }
    setPage(newPage)
  }

  return (
    <div
      {...rest}
      className={cls('ui-pagination', rest.className)}
    >
      <Icon
        className={cls('ui-pagination-icon .ui-pagination-ellipsis', {
          'ui-disabled': page === 1
        })}
        onClick={() => onClickArrow(-1)}
      >
        keyboard_arrow_left
      </Icon>
      <span className='ui-pagination-group'>
        {pages.map((x, i) => typeof x === 'string' ? (
          <Icon
            key={x}
            className='ui-pagination-icon'
            onClick={() => setPage(x === 'prev' ? pages[i + 1] - 1 : pages[i - 1] + 1)}
          >
            more_horiz
          </Icon>
        ) : (
          <span
            key={x}
            className={cls('ui-pagination-item', {
              'ui-pagination-active': x === page
            })}
            onClick={() => setPage(x)}
          >
            {x}
          </span>
        ))}
      </span>
      <Icon
        className={cls('ui-pagination-icon', {
          'ui-disabled': page === total
        })}
        onClick={() => onClickArrow(1)}
      >
        keyboard_arrow_right
      </Icon>
    </div>
  )
}

export default Pagination
