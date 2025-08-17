import { cls } from '../../../utils'
import { useInputState } from '../../tools'

export type SwitchProps = Omit<
  React.ComponentPropsWithRef<'input'>, 'defaultValue' | 'value'
> & {
  defaultValue?: boolean
  value?: boolean
  onValueChange?: (value: boolean) => void
}

function Switch(props: SwitchProps) {
  const {
    className,
    style,
    defaultValue,
    value: propsValue,
    onValueChange,
    ...rest
  } = props

  const [value, setValue] = useInputState(props)

  return (
    <span
      className={cls('ui-input ui-switch', className)}
      style={style}
      onClick={() => setValue(!value)}
    >
      <input
        {...rest}
        type='checkbox'
        checked={!!value}
        onChange={(e) => {
          props.onChange?.(e)
          onValueChange?.(e.target.checked)
        }}
      />
      <span></span>
    </span>
  )
}

export default Switch
