import { use, useEffect, useMemo, useRef, useState } from 'react'
import { useEventListener, useFirstRender, useFunction } from '../hooks/index.js'
import { FormContext } from './form/Form'
import dayjs from 'dayjs'

export function inWindow(el: HTMLElement) {
  const rect = el.getBoundingClientRect()

  return !!(
    rect.height && rect.width &&
    rect.top < window.innerHeight && rect.bottom > 0 &&
    rect.left < window.innerWidth && rect.right > 0
  )
}

export function isNone(value: any) {
  return value === void 0 || value === null || value === ''
}

export function isNotSame(a: any, b: any) {
  if (dayjs.isDayjs(a) || dayjs.isDayjs(b)) {
    return !dayjs(a).isSame(b)
  } else if (a && b && typeof a === 'object' && typeof b === 'object') {
    if (Object.keys(a).length !== Object.keys(b).length) {
      return true
    }
    for (const [k, v] of Object.entries(a)) {
      if (v !== b[k]) {
        return true
      }
    }
    return false
  } else {
    return a !== b
  }
}

export function useComponentRef<T = HTMLElement>(
  ref?: React.Ref<T>
): [React.RefObject<T | null>, React.RefCallback<T>] {
  const refObject = useRef<T>(null)

  const refCallback = (el: T) => {
    refObject.current = el
    if (ref) {
      if (typeof ref === 'function') {
        ref(el)
      } else {
        ref.current = el
      }
    }
  }

  return [refObject, refCallback]
}

export function useStateListner<T>(
  state?: T,
  onChangeState?: (v: T) => any,
  initialState?: T | (() => T)
): [T | undefined, (v: T) => void] {
  const [value, setValue] = useState(state !== void 0 ? state : initialState)

  useEffect(() => {
    if (state !== void 0 && isNotSame(state, value)) {
      setValue(state)
    }
  }, [state])

  const changeValue = useFunction((v: T) => {
    if (isNotSame(v, value)) {
      setValue(v)
      onChangeState?.(v)
    }
  })

  return [state !== void 0 ? state : value, changeValue]
}

export function useOverlayState(
  el: React.RefObject<HTMLDivElement | null>,
  openState?: boolean,
  onChangeOpen?: (open: boolean) => any,
  onRender?: () => any
): [
  {
    open: boolean
    close: boolean
    remove: boolean
  },
  {
    open: () => void
    close: () => void
    toggle: () => void
    remove: () => void
  }
] {
  const firstRender = useFirstRender()
  const [open, setOpen] = useStateListner(openState, onChangeOpen, false)
  const [close, setClose] = useState(false)
  const [remove, setRemove] = useState(true)

  const toggle = useFunction(() => setOpen(!open))
  const api = useMemo(() => ({
    open: () => setOpen(true),
    close: () => setOpen(false),
    toggle,
    remove: () => {
      setOpen(false)
      setClose(false)
      setRemove(true)
    }
  }), [open])

  useEffect(() => {
    if (open) {
      setClose(!close)
      setRemove(false)
    } else if (!firstRender && el.current) {
      setClose(true)
      const listener = () => {
        setClose(false)
        setRemove(true)
      }
      el.current.addEventListener('transitionend', listener)
      return () => el.current?.removeEventListener('transitionend', listener)
    }
  }, [open])
  useEffect(() => {
    if (!remove) {
      onRender?.()
      setClose(false)
    }
  }, [remove])

  return [{ open: !!open, close, remove }, api]
}

export function useInputState<T extends HTMLInputElement | HTMLTextAreaElement, V extends any>(
  props?: React.DetailedHTMLProps<React.InputHTMLAttributes<T>, T>,
  defaultValue?: V,
  value?: V,
  onChange?: (event: CustomEvent<{ value: V }>) => any
): {
  el: React.RefObject<T | null>,
  ref: React.RefCallback<T>,
  v: V | undefined,
  setV: (v: V) => void
} {
  const changeValue = (value: any) => {
    if (el.current) {
      const target = el.current as HTMLInputElement
      if (target.type === 'radio' || target.type === 'checkbox') {
        target.checked = !!value
      } else if (target.parentElement?.classList.contains('ui-date-picker')) {
        target.value = dayjs(value).isValid() ? dayjs(value).format() : ''
      } else if (target.type === 'file') {
        const files = Array.isArray(value) ? value : []
        const dataTransfer = new DataTransfer()
        for (const file of files) {
          dataTransfer.items.add(file)
        }
        target.files = dataTransfer.files
      } else {
        target.value = String(value ?? '')
      }
    }
  }
  const onChangeValue = (value: any) => {
    changeValue(value)
    el.current?.dispatchEvent(new CustomEvent('ui-input-change', { detail: { value } }))
  }

  const [el, refCallback] = useComponentRef(props?.ref)
  const [v, setV] = useStateListner(value, onChangeValue, defaultValue)
  const formContext = use(FormContext)
  const { values } = formContext ?? {}
  const formValue = props?.name ? values?.[props.name] : void 0

  useEffect(() => {
    if(!formContext || !props?.name) {
      return
    }
    if (
      formValue !== void 0 && isNotSame(formValue, v) ||
      isNone(formValue) && !isNone(v)
    ) {
      changeValue(formValue)
    }
  }, [values])

  useEventListener('ui-input-change', (e) => onChange?.(e as CustomEvent), el)

  return {
    el,
    ref: refCallback,
    v: formValue !== void 0 ? formValue : v,
    setV
  }
}
