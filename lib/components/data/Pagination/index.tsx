import { useEffect, useMemo } from 'react'
import { cls } from '../../../utils'
import { useStateListner } from '../../tools'
import Button from '../../general/Button'
import Icon from '../../general/Icon'

export type PaginationProps = React.ComponentPropsWithRef<'div'> & {
  total?: number // default: 10
  page?: number
  onPageChange?: (page: number) => void
}

function Pagination(props: PaginationProps) {
  const {
    total = 10,
    page: propsPage,
    onPageChange,
    ...rest
  } = props

  const [page, setPage] = useStateListner(propsPage, onPageChange, 1)

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
      className={cls('ui-pagination', props.className)}
      translate='no'
    >
      <Button
        variant='text'
        onClick={() => onClickArrow(-1)}
        disabled={page === 1}
      >
        <Icon>keyboard_arrow_left</Icon>
      </Button>
      <div className='ui-pagination-group'>
        {pages.map((x, i) => typeof x === 'string' ? (
          <Button
            key={x}
            variant='text'
            onClick={() => setPage(x === 'prev' ? pages[i + 1] - 1 : pages[i - 1] + 1)}
          >
            <Icon>more_horiz</Icon>
          </Button>
        ) : (
          <Button
            key={x}
            variant={x === page ? 'outlined' : 'text'}
            onClick={() => setPage(x)}
          >
            {x}
          </Button>
        ))}
      </div>
      <Button
        variant='text'
        onClick={() => onClickArrow(1)}
        disabled={page === total}
      >
        <Icon>keyboard_arrow_right</Icon>
      </Button>
    </div>
  )
}

export default Pagination
