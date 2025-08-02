import { cls } from '../../../utils'

export type ButtonProps = React.JSX.IntrinsicElements['button']

function Button(props: ButtonProps) {
  return (
    <button
      type='button'
      {...props}
      className={cls('ui-button', props.className)}
    >
      {props.children}
    </button>
  )
}

export default Button
