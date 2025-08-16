import { cls } from '../../../utils'
import { useInputState } from '../../tools'

export type RadioProps = Omit<
  React.ComponentPropsWithRef<'input'>, 'defaultValue' | 'value'
> & {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
}
export type RadioGroupProps = Omit<
  React.ComponentPropsWithRef<'input'>, 'defaultValue' | 'value'
> & {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  options?: RadioOption[]
}
export type RadioOption = {
  value: string
  label: React.ReactNode
  disabled?: boolean
}

function Radio(props: RadioProps) {
  const {
    className,
    style,
    defaultValue,
    value: propsValue,
    onValueChange,
    children,
    ...rest
  } = props

  const [value, setValue] = useInputState(props)

  return (
    <label
      className={cls('ui-input ui-radio', className)}
      style={style}
    >
      <input
        {...rest}
        type='radio'
        value={value ?? ''}
        onChange={(e) => {
          props.onChange?.(e)
          setValue(e.target.value)
        }}
      />
      {children && <span>{children}</span>}
    </label>
  )
}

function RadioGroup(props: RadioGroupProps) {
  const {
    className,
    style,
    defaultValue,
    value: propsValue,
    onValueChange,
    options,
    ...rest
  } = props

  const [value, setValue] = useInputState(props)

  return (
    <div
      className={cls('ui-input ui-radio-group', className)}
      style={style}
    >
      <input {...rest} type='hidden' value={value ?? ''} />
      {options?.map((option) => (
        <Radio
          key={option.value}
          value={option.value}
          checked={option.value === value}
          onChange={() => setValue(option.value)}
          disabled={props.disabled || option.disabled}
        >
          {option.label}
        </Radio>
      ))}
    </div>
  )
}

Radio.Group = RadioGroup

export default Radio
