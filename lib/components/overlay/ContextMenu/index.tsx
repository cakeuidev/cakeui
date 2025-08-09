import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { cls, useEventListener, useFirstRender, useOutsideEvent, useResizeObserver } from '../../../utils'
import { inWindow, useComponentRef, useOverlayState } from '../../tools'

export type ContextMenuProps = React.JSX.IntrinsicElements['div'] & {
  open?: boolean,
  onChangeOpen?: (open: boolean) => void
}

function ContextMenu(props: ContextMenuProps) {
  const {
    open,
    onChangeOpen,
    ...rest
  } = props


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
  const firstRender = useFirstRender()
  const parent = useRef<HTMLElement>(null)
  const [el, ref] = useComponentRef(rest.ref)
  const [state, api] = useOverlayState(el, open, onChangeOpen, render)
  const [position, setPosition] = useState<[number, number]>([0, 0])

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

  useOutsideEvent('click', api.close, el)
  useEventListener('resize', api.close)
  useEventListener('scroll', api.close, null, true)
  useResizeObserver(parent, api.close)
  const observer = useResizeObserver(el, () => {
    if (state.open && !state.close && !state.remove) {
      render()
    }
  })

  return (
    <>
      {firstRender ? (
        <div ref={el} hidden></div>
      ) : !state.remove && createPortal((
        <div
          {...rest}
          className={cls('ui-context-menu', {
            'ui-context-menu-close': state.close
          }, rest.className)}
          ref={(el) => {
            ref(el)
            observer.observe()
          }}
        >
          {rest.children}
        </div>
      ), document.body)}
    </>
  )
}

export default ContextMenu
