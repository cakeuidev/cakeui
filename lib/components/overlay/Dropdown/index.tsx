import React, { useLayoutEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { cls, useEventListener, useOutsideEvent, useResizeObserver } from '../../../utils'
import { inWindow, useComponentRef, useOverlayState } from '../../tools'

export type DropdownProps = React.ComponentPropsWithRef<'div'> & {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  render?: React.ReactNode
  trigger?: 'hover' | 'click'            // default: 'hover'
  position?: 'left' | 'right' | 'center' // default: 'left'
  offset?: number                        // default: 4
}

function Dropdown(props: DropdownProps) {
  const {
    open,
    onOpenChange,
    render,
    trigger = 'hover',
    position = 'left',
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
    const trigger = triggerEl.current.getBoundingClientRect()
    const clone = renderEl.current.cloneNode(true) as HTMLElement
    document.body.append(clone)
    let { height, width } = clone.getBoundingClientRect()
    clone.remove()
    if (width < trigger.width) {
      width = trigger.width
    }
    const style = {
      left: {
        top: trigger.bottom + offset,
        left: trigger.left,
        minWidth: trigger.width
      },
      right: {
        top: trigger.bottom + offset,
        left: trigger.left + trigger.width - width,
        minWidth: trigger.width
      },
      center: {
        top: trigger.bottom + offset,
        left: trigger.left + trigger.width / 2 - width / 2,
        minWidth: trigger.width
      }
    }[position]
    if (style.top + height > window.innerHeight) {
      style.top = trigger.top - height - offset
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
    renderEl.current.style.minWidth = `${style.minWidth}px`
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
      timer.current = setTimeout(api.close, 200)
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
          className={cls('ui-dropdown', {
            'ui-dropdown-close': state.close
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
          <div>{render}</div>
        </div>
      ), document.body)}
    </>
  )
}

export default Dropdown
