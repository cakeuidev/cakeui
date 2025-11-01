import { useEffect, useState } from 'react'
import { useEventListener, useFunction } from '../../../utils'

export type ThemeToggleState = 'light' | 'dark'
export type ThemeToggleFunction = () => void

function useThemeToggle(
  localStorageKey: string = 'theme'
): [ThemeToggleState, ThemeToggleFunction] {
  const getTheme = () => {
    if (typeof window === 'undefined') {
      return 'light'
    }
    const mql = matchMedia("(prefers-color-scheme: dark)")
    const theme = localStorage.getItem(localStorageKey)
    return theme === 'dark' || theme !== 'light' && mql.matches ? 'dark' : 'light'
  }

  const [theme, setTheme] = useState<ThemeToggleState>(getTheme)

  useEffect(() => {
    const mql = matchMedia('(prefers-color-scheme: dark)')
    const toggleDark = () => {
      const theme = getTheme()
      setTheme(theme)
      document.documentElement.classList.toggle('dark', theme === 'dark')
    }
    toggleDark()
    mql.addEventListener('change', toggleDark)
    return () => mql.removeEventListener('change', toggleDark)
  }, [])

  const toggle = useFunction(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
    localStorage.setItem(localStorageKey, newTheme)
    dispatchEvent(new CustomEvent('ui-theme-change', { detail: { theme: newTheme } }))
  })

  useEventListener('ui-theme-change', (e) => {
    const event = e as CustomEvent<{ theme: ThemeToggleState }>
    setTheme(event.detail.theme)
  })

  return [theme, toggle]
}

export default useThemeToggle
