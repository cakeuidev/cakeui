import { cls } from '../../../utils/index.js'
import { useInputState, useStateListner } from '../../tools'

export type RadioProps = Omit<
  React.JSX.IntrinsicElements['input'], 'defaultValue' | 'value' | 'onChange'
> & {
  defaultValue?: string
  value?: string
  onChange?: (event: CustomEvent<{ value: string }>) => any
}
export type RadioGroupProps = Omit<
  React.JSX.IntrinsicElements['input'], 'defaultValue' | 'value' | 'onChange'
> & {
  defaultValue?: string
  value?: string
  onChange?: (event: CustomEvent<{ value: string }>) => any
  options?: RadioOption[]
}
export type RadioOption = {
  value: string
  label: React.ReactNode
  disabled?: boolean
}

function Radio(props: RadioProps) {
  const {
    className, style, children,
    defaultValue, value, onChange,
    ...rest
  } = props

  const checkedValue = value ?? defaultValue ?? 'on'
  const [checked, setChecked] = useStateListner(rest.checked, void 0, rest.defaultChecked)
  const { ref, v, setV } = useInputState(rest, void 0, checked ? checkedValue : '', onChange)

  return (
    <label
      className={cls('ui-input ui-radio', className)}
      style={style}
    >
      <input
        {...rest}
        type='radio'
        ref={ref}
        checked={!!v}
        value={v || checkedValue}
        onChange={(e) => {
          setChecked(e.target.checked)
          setV(e.target.checked ? e.target.value : '')
        }}
      />
      {children && <span>{children}</span>}
    </label>
  )
}

function RadioGroup(props: RadioGroupProps) {
  const {
    className, style,
    defaultValue, value, onChange,
    options,
    ...rest
  } = props

  const { ref, v, setV } = useInputState(rest, defaultValue, value, onChange)

  return (
    <span
      className={cls('ui-input ui-radio-group', className)}
      style={style}
    >
      <input {...rest} type='hidden' ref={ref} />
      {options?.map((option) => (
        <Radio
          key={option.value}
          value={option.value}
          checked={option.value === v}
          onChange={(e) => e.detail.value && setV(e.detail.value)}
          disabled={rest.disabled || option.disabled}
        >
          {option.label}
        </Radio>
      ))}
    </span>
  )
}

Radio.Group = RadioGroup

export default Radio
