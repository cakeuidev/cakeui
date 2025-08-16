import { useEffect, useState } from 'react'
import { cls } from '../../../utils'

// https://fonts.google.com/icons
export type IconProps = React.ComponentPropsWithRef<'span'> & {
  family?: string  // default: 'Material Symbols Rounded'
  size?: number    // default: 20
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
    const loaded = Loaded.get(family)
    if (loaded || !props.children) {
      setLoaded(loaded)
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
      document.fonts.ready.then((fontFaceSet) => {
        const font = [...fontFaceSet].find((x) => x.family === family)
        if (font?.status === 'loaded') {
          setLoaded(true)
          Loaded.set(family, true)
        } else if (retries < maxRetries) {
          setTimeout(check, retries * 100)
          retries += 1
        }
      })
    }
    check()
  }, [family, props.children])

  return (
    <span
      {...rest}
      className={cls('ui-icon', family.replace(/\s/g, '-').toLowerCase(), props.className)}
      style={loaded ? {
        fontSize: size,
        ...props.style
      } : {
        width: size,
        height: size,
        overflow: 'hidden',
        visibility: 'hidden',
        ...props.style
      }}
      translate='no'
    >
      {props.children}
    </span>
  )
}

export default Icon
