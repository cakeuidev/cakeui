import { useMemo, useRef, useState } from 'react'

const isProxiable = (obj: any) => {
  return obj && typeof obj === 'object' || typeof obj === 'function'
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

export function useProxy<T extends object>(initialState: T | (() => T)): T {
  const [, setUpdate] = useState(0)
  const state = useRef(typeof initialState === 'function' ? initialState() : initialState)

  const proxy = useMemo(() => {
    const cache = new WeakMap<object, any>()
    const getTarget = (path: (string | symbol)[], base: any = state.current) => {
      let value = base
      for (const key of path) {
        value = Reflect.get(value, key)
      }
      return value
    }
    const createProxy = (path: (string | symbol)[]) => {
      const target = getTarget(path)
      if (!isProxiable(target)) {
        return target
      }
      if (cache.has(target)) {
        return cache.get(target)
      }
      const handler: ProxyHandler<object> = {
        get: (_, prop, receiver) => {
          const target = getTarget(path)
          const result = Reflect.get(target, prop, receiver)
          if (
            !isProxiable(result) ||
            prop === 'prototype' && typeof target === 'function'
          ) {
            return result
          }
          return createProxy([...path, prop])
        },
        set: (_, prop, value, receiver) => {
          const result = Reflect.set(getTarget(path), prop, value, receiver)
          setUpdate((prev) => prev + 1)
          return result
        },
        apply: (_, __, args) => {
          const thisArg = getTarget(path.slice(0, -1))
          const method = path[path.length - 1] as string
          if (isMutating(thisArg, method)) {
            const result = Reflect.apply(getTarget(path), thisArg, args)
            setUpdate((prev) => prev + 1)
            return result
          } else {
            return Reflect.apply(getTarget(path), thisArg, args)
          }
        },
        deleteProperty: (_, prop) => {
          const result = Reflect.deleteProperty(getTarget(path), prop)
          setUpdate((prev) => prev + 1)
          return result
        },
        defineProperty: (_, prop, attrs) => {
          const result = Reflect.defineProperty(getTarget(path), prop, attrs)
          setUpdate((prev) => prev + 1)
          return result
        },
        setPrototypeOf: (_, proto) => {
          const result = Reflect.setPrototypeOf(getTarget(path), proto)
          setUpdate((prev) => prev + 1)
          return result
        },
        preventExtensions: () => {
          const result = Reflect.preventExtensions(getTarget(path))
          setUpdate((prev) => prev + 1)
          return result
        },
        has: (_, prop) => Reflect.has(getTarget(path), prop),
        ownKeys: () => Reflect.ownKeys(getTarget(path)),
        getPrototypeOf: () => Reflect.getPrototypeOf(getTarget(path)),
        getOwnPropertyDescriptor: (_, prop) => Reflect.getOwnPropertyDescriptor(getTarget(path), prop),
        isExtensible: () => Reflect.isExtensible(getTarget(path)),
        construct: (_, args, newTarget) => Reflect.construct(getTarget(path), args, newTarget)
      }
      const proxy = new Proxy(target, handler)
      cache.set(target, proxy)
      return proxy
    }
    return createProxy([])
  }, [])

  return proxy
}
