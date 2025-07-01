import { cls } from '../../../utils/index.js'

export type ButtonProps = React.JSX.IntrinsicElements['button']

function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      className={cls('ui-button', props.className)}
    >
      {props.children}
    </button>
  )
}

export default Button
