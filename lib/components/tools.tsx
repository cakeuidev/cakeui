import { use, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import dayjs from 'dayjs'
import { useFirstRender, useFunction } from '../utils'
import { FormContext } from './form/Form'

export function inWindow(el: HTMLElement): boolean {
  const rect = el.getBoundingClientRect()

  return !!(
    rect.height && rect.width &&
    rect.top < window.innerHeight && rect.bottom > 0 &&
    rect.left < window.innerWidth && rect.right > 0
  )
}

export function isNotSame(a: any, b: any): boolean {
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

export function useComponentRef<T extends HTMLElement>(
  ref?: React.Ref<T>
): [React.RefObject<T | null>, React.RefCallback<T>] {
  const refObject = useRef<T>(null)

  const refCallback = (el: T) => {
    refObject.current = el
    if (typeof ref === 'function') {
      ref(el)
    } else if (ref) {
      ref.current = el
    }
  }

  return [refObject, refCallback]
}

export function useStateListner<T>(
  state?: T,
  onStateChange?: (v: T) => void,
  initialState?: T | (() => T)
): [T | undefined, (v: T) => void] {
  const [value, setValue] = useState(state !== undefined ? state : initialState)

  useEffect(() => {
    if (state !== undefined && isNotSame(state, value)) {
      setValue(state)
    }
  }, [state, value])

  const changeValue = useFunction((v: T) => {
    if (isNotSame(v, value)) {
      onStateChange?.(v)
      setValue(v)
    }
  })

  return [state !== undefined ? state : value, changeValue]
}

export function useOverlayState(
  el: React.RefObject<HTMLDivElement | null>,
  openState?: boolean,
  onOpenChange?: (open: boolean) => void
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
  }
] {
  const firstRender = useFirstRender()
  const [open, setOpen] = useStateListner(openState, onOpenChange, false)
  const [close, setClose] = useState(false)
  const [remove, setRemove] = useState(true)

  const toggle = useFunction(() => setOpen(!open))
  const api = useMemo(() => ({
    open: () => setOpen(true),
    close: () => setOpen(false),
    toggle
  }), [])

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
      requestAnimationFrame(() => setClose(false))
    }
  }, [remove])

  return [{ open: !!open, close, remove }, api]
}

export function useInputState<T>(props: {
  name?: string,
  defaultValue?: T,
  value?: T,
  onValueChange?: (v: T) => void
}): [T | undefined, (v: T) => void] {
  const { values, syncValue } = use(FormContext) ?? {}
  const formValue = values?.[props.name as string]

  const [value, setValue] = useStateListner(
    props.value !== undefined ? (
      props.value
    ) : (
      formValue !== undefined ? formValue : undefined
    ),
    (v) => {
      props.onValueChange?.(v)
      if (props.name) {
        syncValue?.(props.name, v)
      }
    },
    props.defaultValue
  )

  return [value, setValue]
}

export function useInputBox(
  el: React.RefObject<HTMLInputElement | null>
): {
  onClick: () => void
  onMouseDown: (e: React.MouseEvent) => void
} {
  const [update, setUpdate] = useState(0)
  const selection = useRef<{ start: number | null, end: number | null }>(null)

  useLayoutEffect(() => {
    requestAnimationFrame(() => {
      if (el.current && selection.current) {
        const { start, end } = selection.current
        if (start !== null && end !== null) {
          el.current.setSelectionRange(start, end)
        }
        selection.current = null
      }
    })
  }, [update])

  const api = useMemo(() => ({
    onClick: () => {
      if (el.current && selection.current) {
        setUpdate((prev) => prev + 1)
      }
    },
    onMouseDown: (e: React.MouseEvent) => {
      if (!el.current) {
        return
      }
      el.current.focus()
      if (el.current !== e.target) {
        e.preventDefault()
        selection.current = {
          start: el.current.selectionStart,
          end: el.current.selectionEnd
        }
      }
    }
  }),[])

  return api
}
