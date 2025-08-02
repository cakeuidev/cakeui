import { cls } from '../../../utils'
import { useInputState } from '../../tools'

export type ColorPickerProps = Omit<
  React.JSX.IntrinsicElements['input'], 'defaultValue' | 'value' | 'onChange'
> & {
  defaultValue?: string
  value?: string
  onChange?: (event: CustomEvent<{ value: string }>) => void
}

function ColorPicker(props: ColorPickerProps) {
  const {
    className, style,
    defaultValue, value, onChange,
    ...rest
  } = props

  const { ref, v, setV } = useInputState(rest, defaultValue, value, onChange)

  return (
    <label
      className={cls('ui-input ui-color-picker', className)}
      style={style}
    >
      <input
        {...rest}
        type='color'
        ref={ref}
        value={v ?? '#000000'}
        onChange={(e) => setV(e.target.value)}
      />
    </label>
  )
}

export default ColorPicker
