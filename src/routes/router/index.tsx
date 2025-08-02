import React from 'react'
import Code from '../../common/Code'

const code = {
  usage: `
import { Router, StaticRouter, useRouter, lazyRoutes } from '@cakeui/react'
  `,
  methods: [
    {
      name: 'Router',
      code: `
type RouterProps = {
  routes: Route[]
  basename?: string
}
type Route = {
  path: string
  component?: Component
  children?: Route[]
}
type Component = React.ComponentType<React.PropsWithChildren<any>>
      `,
      example: `
import { Router } from '@cakeui/react'
import Home from './pages/Home'
import About from './pages/About'
import User from './pages/User'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/users/:id', component: User },
  { path: '*', component: () => <>404 Not Found</> }
]

function App() {
  return (
    <Router routes={routes} />
  )
}

export default App
      `
    },
    {
      name: 'StaticRouter',
      code: `
type StaticRouterProps = React.PropsWithChildren<{
  url: string
  basename?: string
}>
      `,
      example: `
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from '@cakeui/react'
import App from './App'

function requestHandler(req, res) {
  const html = ReactDOMServer.renderToString(
    <StaticRouter url={req.url}>
      <App />
    </StaticRouter>
  )
  res.send(\`<!DOCTYPE html><html><body><div id="root">\${html}</div></body></html>\`)
}
      `
    },
    {
      name: 'useRouter',
      code: `
function useRouter(): RouterContext

type RouterContext = {
  pathname: string
  params: { [k: string]: string }
  query: { [k: string]: string }
  navigate: (path: string) => void
} | null
      `,
      example: `
import { useRouter } from '@cakeui/react'

function User() {
  const router = useRouter()
  if (!router) {
    return null
  }
  const { params, navigate } = router

  return (
    <>
      <h1>User: {params.id}</h1>
      <button onClick={() => navigate('/')}>Home</button>
      <button onClick={() => navigate('/about')}>About</button>
    </>
  )
}

export default User
      `
    },
    {
      name: 'lazyRoutes',
      code: `
function lazyRoutes(
  modules: Record<string, () => Promise<{ default: Component }>>
): Route[]
      `,
      example: `
/*
src/
├── pages/
│   ├── index.tsx       // -> /
│   ├── about.tsx       // -> /about
│   ├── users/
│   │   ├── index.tsx   // -> /users
│   │   └── [id].tsx    // -> /users/:id
│   └── _layout.tsx     // Ignored
└── App.tsx
*/
import { Router, lazyRoutes } from '@cakeui/react'

// With Vite:
const modules = import.meta.glob('./pages/**/*.tsx')
const routes = lazyRoutes<{ default: React.FC }>(modules)

function App() {
  return (
    <>
      <Router routes={routes} />
    </>
  )
}

export default App
      `
    }
  ]
}

function Router() {
  return (
    <>
      <h1>Router</h1>
      <p>
        A minimalist, dependency-free routing library for React.
        It supports nested routes, dynamic parameters, server-side rendering,
        and automatic route generation from your file system.
      </p>
      <h2>Usage</h2>
      <hr />
      <Code>{code.usage}</Code>
      <h2>Methods</h2>
      <hr />
      <ul>
        {code.methods.map((item) => (
          <React.Fragment key={item.name}>
            <li>
              <a href={`#${item.name.toLowerCase()}`}>{item.name}</a>
            </li>
          </React.Fragment>
        ))}
      </ul>
      {code.methods.map((item) => (
        <React.Fragment key={item.name}>
          <h2 id={item.name.toLowerCase()}>
            <code>{item.name}</code>
          </h2>
          <hr />
          <Code>{item.code}</Code>
          <h3>Example</h3>
          <Code>{item.example}</Code>
        </React.Fragment>
      ))}
    </>
  )
}

export default Router
