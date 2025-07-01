import React, { use, useRef } from 'react'
import { createPortal } from 'react-dom'
import { cls } from '../../../utils/index.js'
import { useClickOutside, useEventListener, useResizeObserver } from '../../../hooks/index.js'
import { inWindow, useComponentRef, useOverlayState } from '../../tools'
import Icon from '../../general/Icon'

export type DropdownProps = React.JSX.IntrinsicElements['div'] & {
  open?: boolean
  onChangeOpen?: (open: boolean) => any
  trigger?: 'hover' | 'click' | 'custom' // default: 'hover'
  position?: 'left' | 'right' | 'center' // default: 'left'
  offset?: number                        // default: 4
}
export type DropdownTriggerProps = React.JSX.IntrinsicElements['div']
export type DropdownContentProps = React.JSX.IntrinsicElements['div']

const DropdownContext = React.createContext<{
  el: React.RefObject<HTMLDivElement | null>
  state: ReturnType<typeof useOverlayState>[0]
  onMouseEnter: () => void
  onMouseLeave: () => void
  onClick: () => void
} | null>(null)

function Dropdown(props: DropdownProps) {
  const {
    open,
    onChangeOpen,
    trigger = 'hover',
    position = 'left',
    offset = 4,
    ...rest
  } = props

  const [parent, ref] = useComponentRef(rest.ref)
  const el = useRef<HTMLDivElement>(null)

  const render = () => {
    if (!parent.current || !el.current || !inWindow(parent.current)) {
      api.close()
      return
    }
    const p = parent.current.getBoundingClientRect()
    const clone = el.current.cloneNode(true) as HTMLElement
    document.body.append(clone)
    let { height, width } = clone.getBoundingClientRect()
    clone.remove()
    if (width < p.width) {
      width = p.width
    }
    const style = {
      left: {
        top: p.bottom + offset,
        left: p.left,
        minWidth: p.width
      },
      right: {
        top: p.bottom + offset,
        left: p.left + p.width - width,
        minWidth: p.width
      },
      center: {
        top: p.bottom + offset,
        left: p.left + p.width / 2 - width / 2,
        minWidth: p.width
      }
    }[position]
    if (style.top + height > window.innerHeight) {
      style.top = p.top - height - offset
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
    el.current.style.minWidth = `${style.minWidth}px`
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
  const onClick = () => {
    if (trigger === 'click') {
      api.toggle()
    }
  }

  useEventListener('resize', render)
  useEventListener('scroll', render, void 0, true)
  useResizeObserver(parent, render)
  useResizeObserver(el, () => state.open && !state.close && !state.remove && render())
  useClickOutside(el, (e) => trigger === 'click' &&
    !parent.current?.contains(e.target as HTMLElement) && api.close())

  return (
    <div
      {...rest}
      className={cls('ui-dropdown', {
        'ui-dropdown-open': state.open
      }, rest.className)}
      ref={ref}
    >
      <DropdownContext.Provider value={{ el, state, onMouseEnter, onMouseLeave, onClick }}>
        {rest.children}
      </DropdownContext.Provider>
    </div>
  )
}

function DropdownTrigger(props: DropdownTriggerProps) {
  const { onMouseEnter, onMouseLeave, onClick } = use(DropdownContext)!

  return (
    <div
      {...props}
      className={cls('ui-dropdown-trigger', props.className)}
      onMouseEnter={(e) => {
        onMouseEnter()
        props.onMouseEnter?.(e)
      }}
      onMouseLeave={(e) => {
        onMouseLeave()
        props.onMouseLeave?.(e)
      }}
      onClick={(e) => {
        onClick()
        props.onClick?.(e)
      }}
    >
      <span>{props.children}</span>
      <Icon className='ui-dropdown-icon'>keyboard_arrow_down</Icon>
    </div>
  )
}

function DropdownContent(props: DropdownContentProps) {
  const { state, el, onMouseEnter, onMouseLeave } = use(DropdownContext)!
  const [, ref] = useComponentRef(props.ref)

  return !state.remove && createPortal((
    <div
      {...props}
      className={cls('ui-dropdown-content', {
        'ui-dropdown-close': state.close
      }, props.className)}
      ref={(target) => {
        ref(target)
        el.current = target
      }}
      onMouseEnter={(e) => {
        onMouseEnter()
        props.onMouseEnter?.(e)
      }}
      onMouseLeave={(e) => {
        onMouseLeave()
        props.onMouseLeave?.(e)
      }}
    >
      <div>{props.children}</div>
    </div>
  ), document.body)
}

Dropdown.Trigger = DropdownTrigger
Dropdown.Content = DropdownContent

export default Dropdown
