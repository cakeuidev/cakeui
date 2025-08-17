import React, { use } from 'react'
import { createPortal } from 'react-dom'
import { cls, useOutsideEvent } from '../../../utils'
import { useComponentRef, useOverlayState } from '../../tools'
import Button from '../../general/Button'
import Icon from '../../general/Icon'
import Overlay from '../Overlay'

export type DialogProps = React.ComponentPropsWithRef<'div'> & {
  open?: boolean
  onClose?: () => void
  overlay?: boolean         // default: true
  outsideClosable?: boolean // default: true
}
export type DialogTitleProps = React.ComponentPropsWithRef<'div'>
export type DialogContentProps = React.ComponentPropsWithRef<'div'>
export type DialogFooterProps = React.ComponentPropsWithRef<'div'>

const DialogContext = React.createContext<{
  onClose: () => void
} | null>(null)

function Dialog(props: DialogProps) {
  const {
    open,
    onClose,
    overlay = true,
    outsideClosable = true,
    ...rest
  } = props

  const [el, ref] = useComponentRef(props.ref)
  const [state, api] = useOverlayState(el, open, (open) => !open && onClose?.())

  useOutsideEvent('click', () => outsideClosable && api.close(), el)

  return (
    <>
      {overlay && <Overlay open={open} />}
      {!state.remove && createPortal((
        <div
          {...rest}
          ref={ref}
          className={cls('ui-dialog', {
            'ui-dialog-close': state.close
          }, props.className)}
        >
          <DialogContext.Provider value={{ onClose: api.close }}>
            {props.children}
          </DialogContext.Provider>
        </div>
      ), document.body)}
    </>
  )
}

function DialogTitle(props: DialogTitleProps) {
  const { onClose } = use(DialogContext)!

  return (
    <div
      {...props}
      className={cls('ui-dialog-title', props.className)}
    >
      <span>{props.children}</span>
      <Button variant='icon' onClick={onClose}>
        <Icon>close</Icon>
      </Button>
    </div>
  )
}

function DialogContent(props: DialogContentProps) {
  return (
    <div
      {...props}
      className={cls('ui-dialog-content', props.className)}
    >
      {props.children}
    </div>
  )
}

function DialogFooter(props: DialogFooterProps) {
  return (
    <div
      {...props}
      className={cls('ui-dialog-footer', props.className)}
    >
      {props.children}
    </div>
  )
}

Dialog.Title = DialogTitle
Dialog.Content = DialogContent
Dialog.Footer = DialogFooter

export default Dialog
