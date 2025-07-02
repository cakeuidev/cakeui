import { useEffect, useState } from 'react'
import { useEventListener, useFunction } from '../../../hooks/index.js'

export type ThemeToggleOptions = 'light' | 'dark'

function useThemeToggle(
  localStorageKey: string = 'theme'
): [ThemeToggleOptions, () => any] {
  const getTheme = () => {
    if (typeof window === 'undefined') {
      return 'light'
    }
    const mediaQueryList = matchMedia("(prefers-color-scheme: dark)")
    const theme = localStorage.getItem(localStorageKey)
    return theme === 'dark' || theme !== 'light' && mediaQueryList.matches ? 'dark' : 'light'
  }
  const [theme, setTheme] = useState<ThemeToggleOptions>(getTheme)

  useEffect(() => {
    const mediaQueryList = matchMedia('(prefers-color-scheme: dark)')
    const toggleDark = () => {
      const theme = getTheme()
      setTheme(theme)
      document.documentElement.classList.toggle('dark', theme === 'dark')
    }
    toggleDark()
    mediaQueryList.addEventListener('change', toggleDark)
    return () => mediaQueryList.removeEventListener('change', toggleDark)
  }, [])

  const toggle = useFunction(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
    localStorage.setItem(localStorageKey, newTheme)
    dispatchEvent(new CustomEvent('ui-theme-change', { detail: { theme: newTheme } }))
  })

  useEventListener('ui-theme-change', (e) => {
    const event = e as CustomEvent<{ theme: ThemeToggleOptions }>
    setTheme(event.detail.theme)
  })

  return [theme, toggle]
}

export default useThemeToggle
