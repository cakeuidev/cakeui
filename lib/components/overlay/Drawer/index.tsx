import React, { use } from 'react'
import { createPortal } from 'react-dom'
import { cls, useOutsideEvent } from '../../../utils'
import { useComponentRef, useOverlayState } from '../../tools'
import Button from '../../general/Button'
import Icon from '../../general/Icon'
import Overlay from '../Overlay'

export type DrawerProps = React.ComponentPropsWithRef<'div'> & {
  open?: boolean
  onClose?: () => void
  position?: 'left' | 'right' | 'top' | 'bottom' // default: 'right'
  overlay?: boolean                              // default: true
  outsideClosable?: boolean                      // default: true
}
export type DrawerTitleProps = React.ComponentPropsWithRef<'div'>
export type DrawerContentProps = React.ComponentPropsWithRef<'div'>
export type DrawerFooterProps = React.ComponentPropsWithRef<'div'>

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

  const [el, ref] = useComponentRef(props.ref)
  const [state, api] = useOverlayState(el, open, (open) => !open && onClose?.())

  useOutsideEvent('click', () => outsideClosable && api.close(), el)

  return (
    <>
      {overlay && <Overlay className='ui-drawer-overlay' open={open} />}
      {!state.remove && createPortal((
        <div
          {...rest}
          ref={ref}
          className={cls('ui-drawer', {
            [`ui-drawer-${position}`]: position,
            'ui-drawer-close': state.close
          }, props.className)}
        >
          <DrawerContext.Provider value={{ onClose: api.close }}>
            {props.children}
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
      <Button variant='icon' onClick={onClose}>
        <Icon>close</Icon>
      </Button>
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
