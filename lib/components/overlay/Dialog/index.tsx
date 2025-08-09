import React, { use } from 'react'
import { createPortal } from 'react-dom'
import { cls, useOutsideEvent } from '../../../utils'
import { useComponentRef, useOverlayState } from '../../tools'
import Overlay from '../Overlay'
import Icon from '../../general/Icon'

export type DialogProps = React.JSX.IntrinsicElements['div'] & {
  open?: boolean
  onClose?: () => void
  overlay?: boolean         // default: true
  outsideClosable?: boolean // default: true
}
export type DialogTitleProps = React.JSX.IntrinsicElements['div']
export type DialogContentProps = React.JSX.IntrinsicElements['div']
export type DialogFooterProps = React.JSX.IntrinsicElements['div']

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

  const [el, ref] = useComponentRef(rest.ref)
  const [state, api] = useOverlayState(
    el,
    open,
    (open) => !open && onClose?.(),
    () => el.current?.getBoundingClientRect()
  )

  useOutsideEvent('click', () => outsideClosable && api.close(), el)

  return (
    <>
      {overlay && <Overlay open={open} />}
      {!state.remove && createPortal((
        <div
          {...rest}
          className={cls('ui-dialog', {
            'ui-dialog-close': state.close
          }, rest.className)}
          ref={ref}
        >
          <DialogContext.Provider value={{ onClose: api.close }}>
            {rest.children}
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
      <Icon button onClick={onClose}>close</Icon>
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
