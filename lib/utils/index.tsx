import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

export  { useProxy } from './proxy'

export function cls(
  ...args: (undefined | string | string[] | { [k: string]: any })[]
): string | undefined {
  const classList = []
  for (const arg of args) {
    if (typeof arg === 'string') {
      classList.push(arg)
    } else if (Array.isArray(arg)) {
      classList.push(cls(...arg))
    } else if (arg && typeof arg === 'object') {
      for (const [k, v] of Object.entries(arg)) {
        if (v) {
          classList.push(k)
        }
      }
    }
  }
  return classList.join(' ').replace(/\s+/g, ' ').trim() || undefined
}

const DocumentTitle = typeof window !== 'undefined' ? document.title : ''
export function useDocumentTitle(title: string): void {
  useEffect(() => {
    document.title = title || DocumentTitle
    return () => {
      document.title = DocumentTitle
    }
  }, [title])
}

export function useFirstRender(): boolean {
  const [first, setFirst] = useState(true)

  useEffect(() => {
    setFirst(false)
  }, [])

  return first
}

export function useFunction<T extends (...args: Parameters<T>) => ReturnType<T>>(
  fn: T
): (...args: Parameters<T>) => ReturnType<T> {
  const ref = useRef(fn)

  useLayoutEffect(() => {
    ref.current = fn
  }, [fn])

  return useCallback((...args) => ref.current(...args), [])
}

export function useEventListener(
  type: string,
  listener: EventListener,
  ref?: React.RefObject<HTMLElement | null>,
  options?: boolean | AddEventListenerOptions
): void {
  const fn = useFunction(listener)

  useEffect(() => {
    const el = ref ? ref.current : window
    el?.addEventListener(type, fn, options)
    return () => el?.removeEventListener(type, fn, options)
  }, [ref, type, fn, options])
}

export function useOutsideEvent(
  type: string,
  listener: EventListener,
  ref: React.RefObject<HTMLElement | null>,
  options?: boolean | AddEventListenerOptions
): void {
  useEventListener(type, (e: Event) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      listener(e)
    }
  }, undefined, options)
}

export function useWindowSize(): {
  width: number
  height: number
} {
  const getSize = useFunction(() => {
    if (typeof window === 'undefined') {
      return { width: 0, height: 0 }
    }
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  })
  const [size, setSize] = useState(getSize)

  useEventListener('resize', () => setSize(getSize))

  return size
}

export function useResizeObserver(
  ref: React.RefObject<HTMLElement | null>,
  callback: ResizeObserverCallback,
  options?: ResizeObserverOptions
): {
  observe: () => void
  disconnect: () => void
} {
  const fn = useFunction(callback)
  const observer = useRef<ResizeObserver>(null)

  useEffect(() => {
    observe()
    return () => disconnect()
  }, [ref])

  const observe = useFunction(() => {
    disconnect()
    if (ref.current) {
      observer.current = new ResizeObserver(fn)
      observer.current.observe(ref.current, options)
    }
  })
  const disconnect = useFunction(() => {
    observer.current?.disconnect()
    observer.current = null
  })

  return { observe, disconnect }
}

export function useMutationObserver(
  ref: React.RefObject<HTMLElement | null>,
  callback: MutationCallback,
  options?: MutationObserverInit
): {
  observe: () => void
  disconnect: () => void
} {
  const fn = useFunction(callback)
  const observer = useRef<MutationObserver>(null)

  useEffect(() => {
    observe()
    return () => disconnect()
  }, [ref])

  const observe = useFunction(() => {
    disconnect()
    if (ref.current) {
      observer.current = new MutationObserver(fn)
      observer.current.observe(ref.current, options)
    }
  })
  const disconnect = useFunction(() => {
    observer.current?.disconnect()
    observer.current = null
  })

  return { observe, disconnect }
}

export function useIntersectionObserver(
  ref: React.RefObject<HTMLElement | null>,
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
): {
  observe: () => void
  disconnect: () => void
} {
  const fn = useFunction(callback)
  const observer = useRef<IntersectionObserver>(null)

  useEffect(() => {
    observe()
    return () => disconnect()
  }, [ref])

  const observe = useFunction(() => {
    disconnect()
    if (ref.current) {
      observer.current = new IntersectionObserver(fn, options)
      observer.current.observe(ref.current)
    }
  })
  const disconnect = useFunction(() => {
    observer.current?.disconnect()
    observer.current = null
  })

  return { observe, disconnect }
}

export function useTimeout(
  callback: () => any,
  delay?: number
): {
  start: () => void
  stop: () => void
} {
  const fn = useFunction(callback)
  const timer = useRef<ReturnType<typeof setTimeout>>(null)

  useEffect(() => {
    start()
    return () => stop()
  }, [delay])

  const start = useFunction(() => {
    if (!timer.current) {
      timer.current = setTimeout(fn, delay)
    }
  })
  const stop = useFunction(() => {
    if (timer.current) {
      clearTimeout(timer.current)
      timer.current = null
    }
  })

  return { start, stop }
}

export function useInterval(
  callback: () => any,
  delay?: number
): {
  start: () => void
  stop: () => void
} {
  const fn = useFunction(callback)
  const timer = useRef<ReturnType<typeof setInterval>>(null)

  useEffect(() => {
    start()
    return () => stop()
  }, [delay])

  const start = useFunction(() => {
    if (!timer.current) {
      timer.current = setInterval(fn, delay)
    }
  })
  const stop = useFunction(() => {
    if (timer.current) {
      clearInterval(timer.current)
      timer.current = null
    }
  })

  return { start, stop }
}

export function useLocalStorage<T>(
  key: string,
  initialState?: T | (() => T)
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState(() => {
    const initial = () => {
      return typeof initialState === 'function' ? (initialState as () => T)() : initialState
    }
    if (typeof window === 'undefined') {
      return initial()
    }
    let v: any = localStorage.getItem(key)
    try {
      v = JSON.parse(v)
    } catch {}
    return v ?? initial()
  })

  useEffect(() => {
    if (typeof value === 'object') {
      localStorage.setItem(key, JSON.stringify(value))
    } else if (value !== undefined) {
      localStorage.setItem(key, value)
    } else {
      localStorage.removeItem(key)
    }
  }, [value])

  return [value, setValue]
}

export function useSessionStorage<T>(
  key: string,
  initialState?: T | (() => T)
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState(() => {
    const initial = () => {
      return typeof initialState === 'function' ? (initialState as () => T)() : initialState
    }
    if (typeof window === 'undefined') {
      return initial()
    }
    let v: any = sessionStorage.getItem(key)
    try {
      v = JSON.parse(v)
    } catch {}
    return v ?? initial()
  })

  useEffect(() => {
    if (typeof value === 'object') {
      sessionStorage.setItem(key, JSON.stringify(value))
    } else if (value !== undefined) {
      sessionStorage.setItem(key, value)
    } else {
      sessionStorage.removeItem(key)
    }
  }, [value])

  return [value, setValue]
}
