import React, { use } from 'react'
import { createPortal } from 'react-dom'
import { cls } from '../../../utils/index.js'
import { useClickOutside } from '../../../hooks/index.js'
import { useComponentRef, useOverlayState } from '../../tools'
import Overlay from '../Overlay'
import Icon from '../../general/Icon'

export type DrawerProps = React.JSX.IntrinsicElements['div'] & {
  open?: boolean
  onClose?: () => any
  position?: 'left' | 'right' | 'top' | 'bottom' // default: 'right'
  overlay?: boolean                              // default: true
  outsideClosable?: boolean                      // default: true
}
export type DrawerTitleProps = React.JSX.IntrinsicElements['div']
export type DrawerContentProps = React.JSX.IntrinsicElements['div']
export type DrawerFooterProps = React.JSX.IntrinsicElements['div']

const DrawerContext = React.createContext<{
  onClose: () => void
} | null>(null)

function Drawer(props: DrawerProps) {
  const {
    open,
    onClose,
    position = 'right',
    overlay = true,
    outsideClosable = true,
    ...rest
  } = props

  const [el, ref] = useComponentRef(rest.ref)
  const [state, api] = useOverlayState(
    el,
    open,
    (open) => !open && onClose?.(),
    () => el.current?.getBoundingClientRect()
  )

  useClickOutside(el, () => outsideClosable && api.close())

  return (
    <>
      {overlay && <Overlay className='ui-drawer-overlay' open={open} />}
      {!state.remove && createPortal((
        <div
          {...rest}
          className={cls('ui-drawer', {
            [`ui-drawer-${position}`]: position,
            'ui-drawer-close': state.close
          }, rest.className)}
          ref={ref}
        >
          <DrawerContext.Provider value={{ onClose: api.close }}>
            {rest.children}
          </DrawerContext.Provider>
        </div>
      ), document.body)}
    </>
  )
}

function DrawerTitle(props: DrawerTitleProps) {
  const { onClose } = use(DrawerContext)!

  return (
    <div
      {...props}
      className={cls('ui-drawer-title', props.className)}
    >
      <Icon className='ui-drawer-icon' onClick={onClose}>close</Icon>
      <span>{props.children}</span>
    </div>
  )
}

function DrawerContent(props: DrawerContentProps) {
  return (
    <div
      {...props}
      className={cls('ui-drawer-content', props.className)}
    >
      {props.children}
    </div>
  )
}

function DrawerFooter(props: DrawerFooterProps) {
  return (
    <div
      {...props}
      className={cls('ui-drawer-footer', props.className)}
    >
      {props.children}
    </div>
  )
}

Drawer.Title = DrawerTitle
Drawer.Content = DrawerContent
Drawer.Footer = DrawerFooter

export default Drawer
