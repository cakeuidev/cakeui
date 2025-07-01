import { useEffect } from 'react'
import { cls } from '../../../utils/index.js'
import { useEventListener, useLocalStorage } from '../../../hooks/index.js'
import Icon from '../Icon/index.js'

export type ThemeToggleProps = React.JSX.IntrinsicElements['span'] & {
  localStorageKey?: string          // default: 'theme'
  defaultTheme?: ThemeToggleOptions // default: 'light'
  onChangeTheme?: (theme: ThemeToggleOptions) => any
}
export type ThemeToggleOptions = 'light' | 'dark'

function ThemeToggle(props: ThemeToggleProps) {
  const {
    localStorageKey = 'theme',
    defaultTheme = 'light',
    onChangeTheme,
    ...rest
  } = props

  const [theme, setTheme] = useLocalStorage(localStorageKey, defaultTheme)

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    onChangeTheme?.(theme)
    dispatchEvent(new CustomEvent('ui-theme-change', { detail: { theme } }))
  }, [theme])

  useEventListener('ui-theme-change', (e) => {
    const event = e as CustomEvent<{ theme: ThemeToggleOptions }>
    setTheme(event.detail.theme)
  })

  return rest.children ? (
    <span
      {...rest}
      className={cls('ui-theme-toggle', rest.className)}
      onClick={(e) => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
        rest.onClick?.(e)
      }}
    >
      {rest.children}
    </span>
  ) : (
    <Icon
      {...rest}
      className={cls('ui-theme-toggle', rest.className)}
      onClick={(e) => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
        rest.onClick?.(e)
      }}
    >
      {theme === 'dark' ? 'light_mode' : 'dark_mode'}
    </Icon>
  )
}

export default ThemeToggle
