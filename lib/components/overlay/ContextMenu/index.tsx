import React, { useLayoutEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { cls, useEventListener, useOutsideEvent, useResizeObserver } from '../../../utils'
import { inWindow, useComponentRef, useOverlayState } from '../../tools'

export type ContextMenuProps = React.ComponentPropsWithRef<'div'> & {
  open?: boolean,
  onOpenChange?: (open: boolean) => void
  render?: React.ReactNode
}

function ContextMenu(props: ContextMenuProps) {
  const {
    open,
    onOpenChange,
    render,
    ...rest
  } = props

  const child = React.Children.only<any>(props.children)
  const [triggerEl, triggerRef] = useComponentRef(child.props.ref)
  const [renderEl, renderRef] = useComponentRef(props.ref)
  const [state, api] = useOverlayState(renderEl, open, onOpenChange)
  const [position, setPosition] = useState<[number, number]>([0, 0])
  const observer = useResizeObserver(renderEl, () => onRender())

  useLayoutEffect(() => {
    if (!state.close && !state.remove) {
      onRender()
      observer.observe()
    }
  }, [state.close, state.remove, position])

  const onRender = () => {
    if (state.close || state.remove) {
      return
    }
    if (!triggerEl.current || !renderEl.current || !inWindow(triggerEl.current)) {
      api.close()
      return
    }
    const [left, top] = position
    const { height, width } = renderEl.current.getBoundingClientRect()
    const style = { top, left }
    if (style.top + height > window.innerHeight) {
      style.top -= height
    }
    if (style.top < 0) {
      style.top = 0
    }
    if (style.left + width > window.innerWidth) {
      style.left -= width
    }
    if (style.left < 0) {
      style.left = 0
    }
    renderEl.current.style.top = `${style.top}px`
    renderEl.current.style.left = `${style.left}px`
  }
  const onContextMenu = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault()
    api.open()
    setPosition([e.clientX, e.clientY])
  }

  useEventListener('resize', api.close, true)
  useEventListener('scroll', api.close, true)
  useResizeObserver(triggerEl, api.close)
  useOutsideEvent('click', api.close, renderEl)

  return (
    <>
      {React.cloneElement(child, {
        ref: triggerRef,
        onContextMenu: (e) => {
          child.props.onContextMenu?.(e)
          onContextMenu(e)
        }
      })}
      {!state.remove && createPortal((
        <div
          {...rest}
          ref={renderRef}
          className={cls('ui-context-menu', {
            'ui-context-menu-close': state.close
          }, props.className)}
        >
          {render}
        </div>
      ), document.body)}
    </>
  )
}

export default ContextMenu
