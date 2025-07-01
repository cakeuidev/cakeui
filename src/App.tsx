import React, { useEffect } from 'react'
import Router, { lazyRoutes, useRouter } from '../lib/router'
import { useFirstRender, useWindowSize } from '../lib/hooks'

const modules = import.meta.glob<{ default: React.FC }>('./routes/**/*.tsx')
const routes = [
  ...lazyRoutes(modules),
  {
    path: '*',
    component: () => {
      const { navigate } = useRouter()!
      useEffect(() => {
        navigate('/')
      }, [])
      return null
    }
  }
]

export const AppContext = React.createContext<{
  rwd: {
    sm: number
    md: number
    lg: number
    xl: number
    xxl: number
  }
  windowSize: {
    width: number
    height: number
  }
  firstRender: boolean
} | null>(null)

const rwd = { sm: 640, md: 768, lg: 1024, xl: 1280, xxl: 1536 }

function App() {
  const windowSize = useWindowSize()
  const firstRender = useFirstRender()

  return (
    <AppContext.Provider value={{ rwd, windowSize, firstRender }}>
      <Router routes={routes} />
    </AppContext.Provider>
  )
}

export default App
