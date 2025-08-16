import React, { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { cls } from '../../../utils'
import { useComponentRef, useOverlayState } from '../../tools'
import Icon from '../../general/Icon'

type MessageProps = React.ComponentPropsWithRef<'div'> & {
  open?: boolean
  onClose?: () => void
  position?: MessagePosition  // default: 'top
  type?: MessageType          // default: ''
  duration?: number           // default: 3000
}
export type MessageOptions = {
  position?: MessagePosition  // default: 'top
}
export type MessageApi = {
  open: (
    type: MessageType,
    message: React.ReactNode,
    duration?: number         // default: 3000
  ) => void
  close: () => void
}
export type MessagePosition = 'top' | 'bottom'
export type MessageType = '' | 'info' | 'success' | 'error' | 'warning' | 'loading'

function Message(props: MessageProps) {
  const {
    open,
    onClose,
    position = 'top',
    type,
    duration = 3000,
    ...rest
  } = props

  const [el, ref] = useComponentRef(props.ref)
  const [state, api] = useOverlayState(el, open, (open) => !open && onClose?.())

  useEffect(() => {
    if (!state.remove && duration) {
      const timer = setTimeout(api.close, duration)
      return () => clearTimeout(timer)
    }
  }, [state.remove])

  return !state.remove && createPortal((
    <div
      {...rest}
      ref={ref}
      className={cls('ui-message', {
        [`ui-message-${position}`]: position,
        [`ui-message-${type}`]: type,
        'ui-message-close': state.close
      }, props.className)}
    >
      {type && (
        <Icon className='ui-message-icon'>
          {{
            info: 'info',
            success: 'check_circle',
            error: 'cancel',
            warning: 'error',
            loading: 'progress_activity'
          }[type]}
        </Icon>
      )}
      <span>{props.children}</span>
    </div>
  ), document.body)
}

function useMessage(options?: MessageOptions): [MessageApi, React.ReactNode] {
  const [open, setOpen] = useState(false)
  const [update, setUpdate] = useState(0)
  const [message, setMessage] = useState<{
    type: MessageType
    content: React.ReactNode
    duration?: number
  }>()

  const api: MessageApi = useMemo(() => ({
    open: (type, content, duration) => {
      setOpen(true)
      setUpdate((prev) => prev + 1)
      setMessage({ type, content, duration })
    },
    close: () => setOpen(false)
  }), [])

  return [api, (
    <React.Fragment key={update}>
      {message && (
        <Message
          open={open}
          onClose={() => setOpen(false)}
          position={options?.position}
          type={message.type}
          duration={message.duration}
        >
          {message.content}
        </Message>
      )}
    </React.Fragment>
  )]
}

export default useMessage
