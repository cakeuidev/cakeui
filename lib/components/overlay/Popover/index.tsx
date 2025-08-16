import React, { useLayoutEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { cls, useEventListener, useOutsideEvent, useResizeObserver } from '../../../utils'
import { inWindow, useComponentRef, useOverlayState } from '../../tools'

export type PopoverProps =React.ComponentPropsWithRef<'div'> & {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  render?: React.ReactNode
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
    onOpenChange,
    render,
    trigger = 'hover',
    position = 'top',
    offset = 4,
    ...rest
  } = props

  const child = React.Children.only<any>(props.children)
  const [triggerEl, triggerRef] = useComponentRef(child.props.ref)
  const [renderEl, renderRef] = useComponentRef(props.ref)
  const [state, api] = useOverlayState(renderEl, open, onOpenChange)
  const timer = useRef<ReturnType<typeof setTimeout>>(null)
  const observer = useResizeObserver(renderEl, () => onRender())

  useLayoutEffect(() => {
    if (!state.close && !state.remove) {
      onRender()
      observer.observe()
    }
  }, [state.close, state.remove])

  const onRender = () => {
    if (state.close || state.remove) {
      return
    }
    if (!triggerEl.current || !renderEl.current || !inWindow(triggerEl.current)) {
      api.close()
      return
    }
    const p = triggerEl.current.getBoundingClientRect()
    const { height, width } = renderEl.current.getBoundingClientRect()
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
    renderEl.current.style.top = `${style.top}px`
    renderEl.current.style.left = `${style.left}px`
  }
  const onPointerEnter = () => {
    if (trigger === 'hover') {
      if (timer.current) {
        clearTimeout(timer.current)
      }
      api.open()
    }
  }
  const onPointerLeave = () => {
    if (trigger === 'hover') {
      timer.current = setTimeout(() => {
        api.close()
      }, 200)
    }
  }
  const onClick = () => {
    if (trigger === 'click') {
      api.toggle()
    }
  }

  useEventListener('resize', onRender, true)
  useEventListener('scroll', onRender, true)
  useResizeObserver(triggerEl, onRender)
  useOutsideEvent('click', (e) => {
    const el = e.target as HTMLElement
    if (trigger === 'click' && !triggerEl.current?.contains(el)) {
      api.close()
    }
  }, renderEl)

  return (
    <>
      {React.cloneElement(child, {
        ref: (el: HTMLElement) => {
          triggerRef(el)
          triggerEl.current = el
        },
        onPointerEnter: (e) => {
          child.props.onPointerEnter?.(e)
          onPointerEnter()
        },
        onPointerLeave: (e) => {
          child.props.onPointerLeave?.(e)
          onPointerLeave()
        },
        onClick: (e) => {
          child.props.onClick?.(e)
          onClick()
        }
      })}
      {!state.remove && createPortal((
        <div
          {...rest}
          className={cls('ui-popover', {
            'ui-popover-close': state.close
          }, props.className)}
          ref={renderRef}
          onPointerEnter={(e) => {
            onPointerEnter()
            props.onPointerEnter?.(e)
          }}
          onPointerLeave={(e) => {
            onPointerLeave()
            props.onPointerLeave?.(e)
          }}
        >
          {render}
        </div>
      ), document.body)}
    </>
  )
}

export default Popover
