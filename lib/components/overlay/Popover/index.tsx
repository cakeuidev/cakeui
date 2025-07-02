import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { cls } from '../../../utils/index.js'
import { useClickOutside, useEventListener, useFirstRender, useResizeObserver } from '../../../hooks/index.js'
import { inWindow, useComponentRef, useOverlayState } from '../../tools'

export type PopoverProps = React.JSX.IntrinsicElements['div'] & {
  open?: boolean
  onChangeOpen?: (open: boolean) => any
  trigger?: 'hover' | 'click'                   // default: 'hover'
  position?:                                    // default: 'top'
    'top' | 'top-left' | 'top-right' |
    'bottom' | 'bottom-left' | 'bottom-right' |
    'left' | 'left-top' | 'left-bottom' |
    'right' | 'right-top' | 'right-bottom'
  offset?: number                               // default: 4
}

function Popover(props: PopoverProps) {
  const {
    open,
    onChangeOpen,
    trigger = 'hover',
    position = 'top',
    offset = 4,
    ...rest
  } = props

  const firstRender = useFirstRender()
  const parent = useRef<HTMLElement>(null)
  const [el, ref] = useComponentRef(rest.ref)

  const render = () => {
    if (!parent.current || !el.current || !inWindow(parent.current)) {
      api.close()
      return
    }
    const p = parent.current.getBoundingClientRect()
    const { height, width } = el.current.getBoundingClientRect()
    const styles: any = {
      'top': {
        top: p.top - height - offset,
        left: p.left + p.width / 2 - width / 2
      },
      'top-left': {
        top: p.top - height - offset,
        left: p.left
      },
      'top-right': {
        top: p.top - height - offset,
        left: p.left + p.width - width,
      },
      'bottom': {
        top: p.bottom + offset,
        left: p.left + p.width / 2 - width / 2
      },
      'bottom-left': {
        top: p.bottom + offset,
        left: p.left
      },
      'bottom-right': {
        top: p.bottom + offset,
        left: p.left + p.width - width
      },
      'left': {
        top: p.top + p.height / 2 - height / 2,
        left: p.left - width - offset
      },
      'left-top': {
        top: p.top,
        left: p.left - width - offset
      },
      'left-bottom': {
        top: p.top + p.height - height,
        left: p.left - width - offset
      },
      'right': {
        top: p.top + p.height / 2 - height / 2,
        left: p.right + offset
      },
      'right-top': {
        top: p.top,
        left: p.right + offset
      },
      'right-bottom': {
        top: p.top + p.height - height,
        left: p.right + offset
      }
    }
    let newPosition: string = position
    let style = styles[position]
    if (style.top < 0) {
      newPosition = newPosition.replace(/^top/, 'bottom')
      newPosition = newPosition.replace(/(?<=^(left|right))(|-bottom)$/, '-top')
    } else if (style.top + height > window.innerHeight) {
      newPosition = newPosition.replace(/^bottom/, 'top')
      newPosition = newPosition.replace(/(?<=^(left|right))(|-top)$/, '-bottom')
    }
    if (style.left < 0) {
      newPosition = newPosition.replace(/^left/, 'right')
      newPosition = newPosition.replace(/(?<=^(top|bottom))(|-right)$/, '-left')
    } else if (style.left + width > window.innerWidth) {
      newPosition = newPosition.replace(/^right/, 'left')
      newPosition = newPosition.replace(/(?<=^(top|bottom))(|-left)$/, '-right')
    }
    style = styles[newPosition]
    if (style.top + height > window.innerHeight) {
      style.top = window.innerHeight - height
    }
    if (style.top < 0) {
      style.top = 0
    }
    if (style.left + width > window.innerWidth) {
      style.left = window.innerWidth - width
    }
    if (style.left < 0) {
      style.left = 0
    }
    el.current.style.top = `${style.top}px`
    el.current.style.left = `${style.left}px`
  }

  const [state, api] = useOverlayState(el, open, onChangeOpen, render)
  const timer = useRef<ReturnType<typeof setTimeout>>(null)

  const onMouseEnter = () => {
    if (trigger === 'hover') {
      setTimeout(() => timer.current && clearTimeout(timer.current))
      api.open()
    }
  }
  const onMouseLeave = () => {
    if (trigger === 'hover') {
      timer.current = setTimeout(api.close, 200)
    }
  }

  useEffect(() => {
    parent.current = el.current?.parentElement ?? null
  }, [])
  useEffect(() => {
    if (!parent.current) {
      return
    }
    if (trigger === 'hover') {
      parent.current.addEventListener('mouseenter', onMouseEnter)
      parent.current.addEventListener('mouseleave', onMouseLeave)
      return () => {
        parent.current?.removeEventListener('mouseenter', onMouseEnter)
        parent.current?.removeEventListener('mouseleave', onMouseLeave)
      }
    } else if (trigger === 'click') {
      parent.current.addEventListener('click', api.toggle)
      return () => parent.current?.removeEventListener('click', api.toggle)
    }
  }, [trigger])

  useEventListener('resize', render)
  useEventListener('scroll', render, void 0, true)
  useResizeObserver(parent, render)
  useResizeObserver(el, () => state.open && !state.close && !state.remove && render())
  useClickOutside(el, (e) => trigger === 'click' &&
    !parent.current?.contains(e.target as HTMLElement) && api.close())

  return firstRender ? (
    <div ref={el} hidden></div>
  ) : !state.remove && createPortal((
    <div
      {...rest}
      className={cls('ui-popover', {
        'ui-popover-close': state.close
      }, rest.className)}
      ref={ref}
      onMouseEnter={(e) => {
        onMouseEnter()
        rest.onMouseEnter?.(e)
      }}
      onMouseLeave={(e) => {
        onMouseLeave()
        rest.onMouseLeave?.(e)
      }}
    >
      {rest.children}
    </div>
  ), document.body)
}

export default Popover
