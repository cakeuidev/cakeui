import { cls } from '../../../utils'

export type ButtonProps = React.ComponentPropsWithRef<'button'> & {
  variant?: 'outlined' | 'filled' | 'text' | 'icon'            // default: outlined
  color?: 'default' | 'info' | 'success' | 'warning' | 'error' // default: 'default'
}

function Button(props: ButtonProps) {
  const {
    variant = 'outlined',
    color = 'default',
    ...rest
  } = props

  return (
    <button
      type='button'
      {...rest}
      className={cls('ui-button', {
        [`ui-button-${variant}`]: variant,
        [`ui-button-${color}`]: color && color !== 'default'
      }, props.className)}
    >
      {props.children}
    </button>
  )
}

export default Button
