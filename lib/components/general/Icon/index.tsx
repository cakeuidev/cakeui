import { useEffect, useState } from 'react'
import { cls } from '../../../utils/index.js'

// https://fonts.google.com/icons
export type IconProps = React.JSX.IntrinsicElements['span'] & {
  family?: string // default: 'Material Symbols Rounded'
  size?: number   // default: 20
}

const Loaded = new Map<string, boolean>()

function Icon(props: IconProps) {
  const {
    family = 'Material Symbols Rounded',
    size = 20,
    ...rest
  } = props

  const [loaded, setLoaded] = useState(Loaded.get(family))

  useEffect(() => {
    if (!rest.children || Loaded.get(family)) {
      setLoaded(true)
      return
    }
    setLoaded(false)
    const href = 'https://fonts.googleapis.com/icon?family=' + family.replace(/\s/g, '+')
    if (!document.querySelector(`link[href="${href}"]`)) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = href
      document.head.append(link)
    }
    let retries = 0
    const maxRetries = 10
    const check = () => {
      if (document.fonts.check(`1em "${family}"`)) {
        setLoaded(true)
      } else if (retries < maxRetries) {
        setTimeout(check, retries * 100)
        retries += 1
      }
    }
    check()
  }, [family, rest.children])

  return (
    <span
      {...rest}
      className={cls('ui-icon', rest.className)}
      style={rest.style}
      translate='no'
    >
      <span
        className={family.replace(/\s/g, '-').toLowerCase()}
        style={loaded ? {
          fontSize: size
        } : {
          width: size,
          height: size,
          overflow: 'hidden',
          visibility: 'hidden'
        }}
      >
        {rest.children}
      </span>
    </span>
  )
}

export default Icon
