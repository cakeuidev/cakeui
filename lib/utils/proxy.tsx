import { useMemo, useSyncExternalStore } from 'react'

const isProxiable = (obj: any) => {
  return obj && typeof obj === 'object'
}
const isMutating = (obj: any, method: string) => {
  const mutatingMethods = {
    Map: new Set(['set', 'delete', 'clear']),
    Set: new Set(['add', 'delete', 'clear']),
    Array: new Set(['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse', 'copyWithin', 'fill'])
  }
  if (obj instanceof Map) {
    return mutatingMethods.Map.has(method)
  } else if (obj instanceof Set) {
    return mutatingMethods.Set.has(method)
  } else if (Array.isArray(obj)) {
    return mutatingMethods.Array.has(method)
  }
  return false
}

function createProxyStore<T extends object>(initialState: T | (() => T)): {
  proxy: any
  subscribe: (listener: () => void) => () => void
  getSnapshot: () => number
} {
  const state = typeof initialState === 'function' ? initialState() : initialState
  const listeners = new Set<() => void>()
  const cache = new WeakMap<object, any>()
  let snapshot = 0

  const emitChange = () => {
    snapshot += 1
    for (const listener of listeners) {
      listener()
    }
  }

  const createProxy = (target: T) => {
    if (cache.has(target)) {
      return cache.get(target)
    }
    const proxy = new Proxy(target, {
      get(target: any, prop) {
        const value = Reflect.get(target, prop)
        if (typeof value === 'function') {
          if (isMutating(target, prop as string)) {
            return function(...args: any[]) {
              const result = Reflect.apply(value, target, args)
              emitChange()
              return result
            }
          } else {
            return value.bind(target)
          }
        }
        if (isProxiable(value)) {
          return createProxy(value)
        }
        return value
      },
      set: (target: any, prop, value) => {
        const result = Reflect.set(target, prop, value)
        emitChange()
        return result
      },
      deleteProperty: (target, prop) => {
        const result = Reflect.deleteProperty(target, prop)
        emitChange()
        return result
      },
      defineProperty: (target, prop, attrs) => {
        const result = Reflect.defineProperty(target, prop, attrs)
        emitChange()
        return result
      },
      setPrototypeOf: (target, proto) => {
        const result = Reflect.setPrototypeOf(target, proto)
        emitChange()
        return result
      },
      preventExtensions: (target) => {
        const result = Reflect.preventExtensions(target)
        emitChange()
        return result
      },
      apply: Reflect.apply,
      has: Reflect.has,
      ownKeys: Reflect.ownKeys,
      getPrototypeOf: Reflect.getPrototypeOf,
      getOwnPropertyDescriptor: Reflect.getOwnPropertyDescriptor,
      isExtensible: Reflect.isExtensible,
      construct: Reflect.construct
    })
    cache.set(target, proxy)
    return proxy
  }

  const proxy = isProxiable(state) ? createProxy(state) : state

  return {
    proxy,
    subscribe: (listener: () => void) => {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    getSnapshot: () => snapshot
  }
}

export function useProxy<T extends object>(initialState: T | (() => T)): T {
  const store = useMemo(() => createProxyStore(initialState), [])

  useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot)

  return store.proxy
}
