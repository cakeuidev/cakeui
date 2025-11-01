import { cls } from '../../../utils'
import { useInputState } from '../../tools'

export type ColorPickerProps = Omit<
  React.ComponentPropsWithRef<'input'>, 'defaultValue' | 'value'
> & {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
}

function ColorPicker(props: ColorPickerProps) {
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
      className={cls('ui-input ui-color-picker', className)}
      style={style}
    >
      <input
        {...rest}
        type='color'
        value={value ?? '#000000'}
        onChange={(e) => {
          props.onChange?.(e)
          setValue(e.target.value)
        }}
      />
    </span>
  )
}

export default ColorPicker
