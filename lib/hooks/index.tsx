import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { debounce, throttle } from '../utils/index.js'

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
  }, [ref?.current, type, fn, options])
}

export function useClickOutside(
  ref: React.RefObject<HTMLElement | null>,
  listener: EventListener
): void {
  useEventListener('click', (e: Event) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      listener(e)
    }
  }, void 0, true)
}

export function useWindowSize(): {
  width: number
  height: number
} {
  const getSize = () => {
    if (typeof window === 'undefined') {
      return { width: 0, height: 0 }
    }
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }
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
  const observer = useRef(new ResizeObserver(fn))

  useEffect(() => {
    observe()
    return () => disconnect()
  }, [ref.current])

  const observe = useFunction(() => {
    if (ref.current) {
      observer.current.observe(ref.current, options)
    }
  })
  const disconnect = useFunction(() => {
    observer.current.disconnect()
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
  const observer = useRef(new MutationObserver(fn))

  useEffect(() => {
    observe()
    return () => disconnect()
  }, [ref.current])

  const observe = useFunction(() => {
    if (ref.current) {
      observer.current.observe(ref.current, options)
    }
  })
  const disconnect = useFunction(() => {
    observer.current.disconnect()
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
  }, [ref.current])

  const observe = useFunction(() => {
    if (ref.current) {
      observer.current = new IntersectionObserver(fn, options)
      observer.current.observe(ref.current)
    }
  })
  const disconnect = useFunction(() => {
    observer.current?.disconnect()
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

export function useThrottle<T extends (...args: Parameters<T>) => any>(
  callback: T,
  delay?: number
): (...args: Parameters<T>) => void {
  const fn = useFunction(callback)

  return useCallback(throttle(fn, delay), [])
}

export function useDebounce<T extends (...args: Parameters<T>) => any>(
  callback: T,
  delay?: number
): (...args: Parameters<T>) => void {
  const fn = useFunction(callback)

  return useCallback(debounce(fn, delay), [])
}

export function useLocalStorage<T>(
  key: string,
  defaultValue?: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') {
      return null
    }
    let v: any = localStorage.getItem(key)
    try {
      v = JSON.parse(v)
    } catch {}
    return v ?? defaultValue
  })

  useEffect(() => {
    if (typeof value === 'object') {
      localStorage.setItem(key, JSON.stringify(value))
    } else if (value !== void 0) {
      localStorage.setItem(key, value)
    } else {
      localStorage.removeItem(key)
    }
  }, [value])

  return [value, setValue]
}

export function useSessionStorage<T>(
  key: string,
  defaultValue?: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') {
      return null
    }
    let v: any = sessionStorage.getItem(key)
    try {
      v = JSON.parse(v)
    } catch {}
    return v ?? defaultValue
  })

  useEffect(() => {
    if (typeof value === 'object') {
      localStorage.setItem(key, JSON.stringify(value))
    } else if (value !== void 0) {
      localStorage.setItem(key, value)
    } else {
      localStorage.removeItem(key)
    }
  }, [value])

  return [value, setValue]
}
