import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { cls } from '../../../utils'
import { useComponentRef, useOverlayState } from '../../tools'

export type OverlayProps = React.JSX.IntrinsicElements['div'] & {
  open?: boolean
}

let overlayCount = 0
let bodyStyle: string | null = null

function Overlay(props: OverlayProps) {
  const {
    open,
    ...rest
  } = props

  const [el, ref] = useComponentRef(rest.ref)
  const [state] = useOverlayState(
    el,
    open,
    undefined,
    () => el.current?.getBoundingClientRect()
  )

  useEffect(() => {
    if (state.open) {
      overlayCount += 1
      if (overlayCount === 1 && document.body.scrollHeight > window.innerHeight) {
        bodyStyle = document.body.getAttribute('style')
        document.body.style.marginRight = `${window.innerWidth - document.body.clientWidth}px`
        document.body.style.overflow = 'hidden'
      }
      return () => {
        overlayCount -= 1
        if (!overlayCount) {
          if (bodyStyle === null) {
            document.body.removeAttribute('style')
          } else {
            document.body.style = bodyStyle
          }
        }
      }
    }
  }, [open])

  return (
    <>
      {!state.remove && createPortal((
        <div
          {...rest}
          className={cls('ui-overlay', {
            'ui-overlay-close': state.close
          }, rest.className)}
          ref={ref}
        >
          {rest.children}
        </div>
      ), document.body)}
    </>
  )
}

export default Overlay
