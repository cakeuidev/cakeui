import '../lib/components/styles.css'
import './index.css'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'

const root = document.getElementById('root') as HTMLElement

if ((window as any).__SSR__) {
  hydrateRoot(root, <App />)
} else {
  createRoot(root).render(<App />)
}

const mediaQueryList = matchMedia('(prefers-color-scheme: dark)')
const changeFavicon = () => {
  const favicon = document.querySelector<HTMLLinkElement>('link[rel=icon]')
  if (favicon) {
    favicon.href = mediaQueryList.matches ? '/favicon-white.svg' : '/favicon.svg'
  }
}
changeFavicon()
mediaQueryList.addEventListener('change', changeFavicon)

