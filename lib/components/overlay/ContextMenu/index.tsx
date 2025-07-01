import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { cls } from '../../../utils/index.js'
import { useClickOutside, useEventListener, useFirstRender, useResizeObserver } from '../../../hooks/index.js'
import { inWindow, useComponentRef, useOverlayState } from '../../tools'

export type ContextMenuProps = React.JSX.IntrinsicElements['div'] & {
  onChangeOpen?: (open: boolean) => any
}

function ContextMenu(props: ContextMenuProps) {
  const {
    onChangeOpen,
    ...rest
  } = props

  const firstRender = useFirstRender()
  const parent = useRef<HTMLElement>(null)
  const [el, ref] = useComponentRef(rest.ref)
  const [position, setPosition] = useState<[number, number]>([0, 0])

  const render = () => {
    if (!parent.current || !el.current || !inWindow(parent.current)) {
      api.close()
      return
    }
    const [left, top] = position
    const { height, width } = el.current.getBoundingClientRect()
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
    el.current.style.top = `${style.top}px`
    el.current.style.left = `${style.left}px`
  }

  const [state, api] = useOverlayState(el, void 0, onChangeOpen, render)

  useEffect(() => {
    parent.current = el.current?.parentElement ?? null
    if (!parent.current) {
      return
    }
    const open = (e: MouseEvent) => {
      e.preventDefault()
      api.open()
      setPosition([e.clientX, e.clientY])
    }
    parent.current.addEventListener('contextmenu', open)
    return () => parent.current?.removeEventListener('contextmenu', open)
  }, [])
  useEffect(() => {
    if (!firstRender && el.current) {
      render()
    }
  }, [position])

  useEventListener('resize', api.close)
  useEventListener('scroll', api.close, void 0, true)
  useResizeObserver(parent, api.close)
  useClickOutside(el, api.close)

  return firstRender ? (
    <div ref={el} hidden></div>
  ) : !state.remove && createPortal((
    <div
      {...rest}
      className={cls('ui-context-menu', {
        'ui-context-menu-close': state.close
      }, rest.className)}
      ref={ref}
    >
      {rest.children}
    </div>
  ), document.body)
}

export default ContextMenu
