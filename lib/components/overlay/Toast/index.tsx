import React, { use, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { cls } from '../../../utils/index.js'
import { useComponentRef, useOverlayState } from '../../tools'
import Icon from '../../general/Icon'

type ToastProps = React.JSX.IntrinsicElements['div'] & {
  position?: ToastPosition // default: 'top-right'
}
type ToastItemProps = React.JSX.IntrinsicElements['div'] & {
  open?: boolean
  onClose?: () => any
  type?: ToastType         // default: ''
  body?: ToastBody
  duration?: number        // default: 5000
}
export type ToastOptions = {
  position?: ToastPosition // default: 'top-right'
}
export type ToastAPI = {
  open: (
    type: ToastType,       // default: ''
    body: ToastBody,
    duration?: number      // default: 5000
  ) => number
  close: (id: number) => void,
  clear: () => void
}
export type ToastPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
export type ToastType = '' | 'info' | 'success' | 'error' | 'warning' | 'loading'
export type ToastBody = {
  title?: React.ReactNode
  description?: React.ReactNode
}

const ToastContext = React.createContext<{
  render: () => void
} | null>(null)

function Toast(props: ToastProps) {
  const {
    position = 'top-right',
    ...rest
  } = props

  const [el, ref] = useComponentRef(rest.ref)
  const [hover, setHover] = useState(false)

  useEffect(() => {
    render()
  }, [hover])

  const render = () => {
    if (!el.current) {
      return
    }
    const els = el.current.querySelectorAll<HTMLElement>('.ui-toast-item:not(.ui-toast-close)')
    for (let i = 0; i < els.length; i++) {
      els[i].style.scale = ''
      els[i].style.opacity = ''
    }
    const property: 'top' | 'bottom' = position.includes('top') ? 'top' : 'bottom'
    let totalHeight = 0
    if (hover) {
      for (let i = els.length - 1; i >= 0; i--) {
        els[i].style[property] = `${totalHeight}px`
        totalHeight += els[i].offsetHeight + 12
      }
    } else {
      for (let i = 0; i < els.length; i++) {
        if (i < els.length - 3) {
          els[i].style[property] = '0px'
          els[i].style.opacity = '0'
        } else if (i < els.length - 1) {
          const index = els.length - 1 - i
          els[i].style[property] = `${6 * index}px`
          els[i].style.scale = `${1 - 0.025 * index}`
          totalHeight += 6
        } else {
          els[i].style[property] = '0px'
          totalHeight = els[i].offsetHeight
        }
      }
    }
    if (totalHeight) {
      el.current.style.height = `${totalHeight}px`
    }
  }

  return createPortal((
    <div
      {...rest}
      className={cls('ui-toast', {
        [`ui-toast-${position}`]: position
      }, rest.className)}
      ref={ref}
      onMouseEnter={(e) => {
        setHover(true)
        rest.onMouseEnter?.(e)
      }}
      onMouseLeave={(e) => {
        setHover(false)
        rest.onMouseLeave?.(e)
      }}
    >
      <ToastContext.Provider value={{ render }}>
        {rest.children}
      </ToastContext.Provider>
    </div>
  ), document.body)
}

function ToastItem(props: ToastItemProps) {
  const {
    open,
    onClose,
    type,
    body,
    duration = 5000,
    ...rest
  } = props

  const { render } = use(ToastContext)!
  const [el, ref] = useComponentRef(rest.ref)
  const [state, api] = useOverlayState(
    el,
    open,
    (open) => !open && onClose?.(),
    () => el.current?.getBoundingClientRect()
  )

  useEffect(() => {
    if (state.open && duration) {
      const timer = setTimeout(api.close, duration)
      return () => clearTimeout(timer)
    }
  }, [state.open])
  useEffect(() => {
    render()
  }, [state.close])

  return !state.remove && (
    <div
      {...rest}
      className={cls('ui-toast-item', {
        [`ui-toast-${type}`]: type,
        'ui-toast-close': state.close
      }, rest.className)}
      ref={ref}
    >
      {type && (
        <Icon className='ui-toast-icon'>
          {{
            info: 'info',
            success: 'check_circle',
            error: 'cancel',
            warning: 'error',
            loading: 'progress_activity'
          }[type]}
        </Icon>
      )}
      <div className='ui-toast-body'>
        <div className='ui-toast-title'>
          <span>{body?.title}</span>
          <Icon className='ui-toast-icon' onClick={api.close}>close</Icon>
        </div>
        {body?.description && (
          <div className='ui-toast-description'>
            {body.description}
          </div>
        )}
      </div>
    </div>
  )
}

function useToast(options?: ToastOptions): [ToastAPI, React.ReactNode] {
  const [open, setOpen] = useState<{ [k: string]: boolean }>({})
  const [items, setItems] = useState<{
    id: number
    type?: ToastType,
    body?: ToastBody
    duration?: number
  }[]>([])
  const ids = useRef<number[]>([])

  const api: ToastAPI = useMemo(() => ({
    open: (type, body, duration) => {
      const id = ids.current.length ? ids.current[ids.current.length - 1] + 1 : 0
      const item = { id, type, body, duration }
      setOpen((prev) => ({ ...prev, [item.id]: true }))
      setItems((prev) => [...prev, item])
      ids.current.push(id)
      return id
    },
    close: (id: number) => setOpen((prev) => ({ ...prev, [id]: false })),
    clear: () => ids.current.forEach(api.close)
  }), [])

  return [api, !!items?.length && (
    <Toast position={options?.position}>
      {items.map((item) => (
        <ToastItem
          key={item.id}
          open={open[item.id]}
          onClose={() => api.close(item.id)}
          type={item.type}
          body={item.body}
          duration={item.duration}
          onTransitionEnd={() => {
            if (!Object.values(open).includes(true)) {
              setOpen({})
              setItems([])
              ids.current = []
            }
          }}
        />
      ))}
    </Toast>
  )]
}

export default useToast
