import { cls } from '../../../utils/index.js'
import { useInputState } from '../../tools'

export type SwitchProps = Omit<
  React.JSX.IntrinsicElements['input'], 'defaultValue' | 'value' | 'onChange'
> & {
  defaultValue?: boolean
  value?: boolean
  onChange?: (event: CustomEvent<{ value: boolean }>) => any
}

function Switch(props: SwitchProps) {
  const {
    className, style,
    defaultValue, value, onChange,
    ...rest
  } = props

  const { ref, setV } = useInputState(rest, defaultValue, value, onChange)

  return (
    <label
      className={cls('ui-input ui-switch', className)}
      style={style}
    >
      <input
        {...rest}
        type='checkbox'
        ref={ref}
        onChange={(e) => setV(e.target.checked)}
      />
      <span></span>
    </label>
  )
}

export default Switch
