import React, { use, useMemo, useState } from 'react'
import { useEventListener, useFunction } from '../utils'

export type RouterProps = {
  routes: Route[]
  basename?: string
}
export type StaticRouterProps = React.PropsWithChildren<{
  url: string
  basename?: string
}>
export type Route = {
  path: string
  component?: Component
  children?: Route[]
}
export type Component = React.ComponentType<React.PropsWithChildren<any>>
export type RouterContext = {
  pathname: string
  params: { [k: string]: string }
  query: { [k: string]: string }
  navigate: (path: string) => void
} | null

const RouterContext = React.createContext<RouterContext>(null)
const StaticRouterContext = React.createContext<{
  url: string
  basename: string
  query: { [k: string]: string }
} | null>(null)

const convert = (str: string) => {
  return !str || str === '/' ? '/' : str.replace(/^([^\/])/, '/$1').replace(/\/$/g, '')
}

export function Router(props: RouterProps) {
  const {
    routes,
    basename = ''
  } = props

  const staticRouterContext = use(StaticRouterContext)
  if (typeof window === 'undefined' && !staticRouterContext) {
    throw Error('Server-side rendering requires a static router')
  }

  const getPathname = (pathname: string) => {
    pathname = convert(pathname)
    if (!pathname.startsWith(base)) {
      return ''
    }
    pathname = pathname.replace(new RegExp(`^${base}`), '')
    return pathname ? pathname.replace(/^([^\/])/, '/$1') : '/'
  }

  const base = convert(staticRouterContext ? staticRouterContext.basename : basename)
  const [pathname, setPathname] = useState(() => (
    getPathname(staticRouterContext ? staticRouterContext.url : location.pathname)
  ))

  const [element, params] = useMemo(() => {
    if (!pathname) {
      return [null, {}]
    }
    const flat = (routes: Route[], parent: string = '', components: Component[] = []) => {
      const result: { path: string, components: Component[] }[] = []
      for (const route of routes) {
        const { path, component, children } = route
        const currPath = parent + convert(path)
        const currComponents = [...components]
        if (component) {
          currComponents.push(component)
        }
        if (children?.length) {
          result.push(...flat(children, currPath === '/' ? '' : currPath, currComponents))
        }
        if (currComponents.length) {
          result.push({
            path: currPath,
            components: currComponents
          })
        }
      }
      return result
    }
    const flatRoutes = flat(routes)
    let element = null
    const params: { [k: string]: string } = {}
    for (const route of flatRoutes) {
      const { path, components } = route
      const regex = path === '/' ?
        /^\/$/ : new RegExp(`^${path.replace(/\.?\*\/?/, '.*').replace(/:(\w+)/g, '([^\/]+)')}$`)
      const match = pathname.match(regex)
      if (match) {
        const keys = (path.match(/:(\w+)/g) ?? []).map((k) => k.replace(/^:/, ''))
        for (let i = 0; i < keys.length; i++) {
          params[keys[i]] = match[i + 1]
        }
        for (let i = components.length - 1; i >= 0; i--) {
          const Component = components[i]
          element = <Component>{element}</Component>
        }
        break
      }
    }
    return [element, params]
  }, [pathname])

  const navigate = useFunction((path: string) => {
    path = convert(path)
    if (path !== pathname) {
      history.pushState(null, '', (base === '/' ? '' : base) + path)
      setPathname(getPathname(location.pathname))
    }
  })

  useEventListener('popstate', () => setPathname(getPathname(location.pathname)))

  return (
    <RouterContext.Provider
      value={{
        pathname,
        params,
        query: staticRouterContext ?
          staticRouterContext.query :
          Object.fromEntries(new URLSearchParams(location.search)),
        navigate
      }}
    >
      {element}
    </RouterContext.Provider>
  )
}

export function StaticRouter(props: StaticRouterProps) {
  const {
    url,
    basename = ''
  } = props

  return (
    <StaticRouterContext.Provider
      value={{
        url,
        basename,
        query: Object.fromEntries(new URL(url, 'http://localhost').searchParams)
      }}
    >
      {props.children}
    </StaticRouterContext.Provider>
  )
}

export function useRouter(): RouterContext {
  return use(RouterContext)
}

export function lazyRoutes(
  modules: Record<string, () => Promise<{ default: Component }>>
): Route[] {
  const findPrefix = (arr: string[]) => {
    if (arr.length === 1) {
      return arr[0].replace(/\/(\w+).(jsx|tsx)$/, '/')
    }
    let first = arr[0] ?? ''
    let prefix = ''
    for (let i = 0; i < first.length; i++) {
      const char = first[i]
      for (let j = 1; j < arr.length; j++) {
        const str = arr[j]
        if (i >= str.length || str[i] !== char) {
          return prefix
        }
      }
      prefix += char
    }
    return prefix
  }

  const prefix = findPrefix(Object.keys(modules))
  const routes: Route[] = []
  const routeMap = new Map<string, Route>()

  for (let [path, module] of Object.entries(modules)) {
    path = path
      .replace(new RegExp(`^${prefix}(.*)\.(jsx|tsx)$`), '/$1')
      .replace(/\/index$/, '')
      .replace(/\[(.+)\]/, ':$1')
    if (!/_.*/.test(path)) {
      let parentPath = ''
      const paths = path.split('/')
      for (let i = 0; i < paths.length; i++) {
        const path = convert(paths[i])
        const route: Route = { path, children: [] }
        if (i === paths.length - 1) {
          const Component = React.lazy(module)
          route.component = ({ children }) => (
            <React.Suspense>
              <Component>{children}</Component>
            </React.Suspense>
          )
        }
        const currPath = parentPath + path
        const parentRoute = routeMap.get(parentPath)
        const currRoute = routeMap.get(currPath)
        if (currRoute) {
          if (i === paths.length - 1) {
            currRoute.component = route.component
          }
        } else if (parentRoute) {
          parentRoute.children?.push(route)
          routeMap.set(currPath, route)
        } else {
          routes.push(route)
          routeMap.set(currPath, route)
        }
        parentPath = currPath
      }
    }
  }

  return routes
}
