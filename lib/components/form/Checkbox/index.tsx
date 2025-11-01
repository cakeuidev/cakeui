import { useEffect } from 'react'
import { cls } from '../../../utils'
import { useComponentRef, useInputState } from '../../tools'

export type CheckboxProps = Omit<
  React.ComponentPropsWithRef<'input'>, 'defaultValue' | 'value'
> & {
  defaultValue?: boolean
  value?: boolean
  onValueChange?: (value: boolean) => void
  indeterminate?: boolean // default: false
}
export type CheckboxGroupProps = Omit<
  React.ComponentPropsWithRef<'input'>, 'defaultValue' | 'value'
> & {
  defaultValue?: string[]
  value?: string[]
  onValueChange?: (value: string[]) => void
  options?: CheckboxOption[]
}
export type CheckboxOption = {
  value: string
  label: React.ReactNode
  disabled?: boolean
}

function Checkbox(props: CheckboxProps) {
  const {
    className,
    style,
    defaultValue,
    value: propsValue,
    onValueChange,
    indeterminate = false,
    children,
    ...rest
  } = props

  const [el, ref] = useComponentRef(props.ref)
  const [value, setValue] = useInputState(props)

  useEffect(() => {
    if (el.current) {
      el.current.indeterminate = !!indeterminate
    }
  }, [indeterminate])

  return (
    <label
      className={cls('ui-input ui-checkbox', className)}
      style={style}
    >
      <input
        {...rest}
        ref={ref}
        type='checkbox'
        checked={!!value}
        onChange={(e) => {
          props.onChange?.(e)
          setValue(e.target.checked)
        }}
      />
      {children && <span>{children}</span>}
    </label>
  )
}

function CheckboxGroup(props: CheckboxGroupProps) {
  const {
    className,
    style,
    options,
    ...rest
  } = props

  const [value, setValue] = useInputState(props)

  const changeValue = (v: string) => {
    const prev = value ?? []
    setValue(prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v])
  }

  return (
    <div
      className={cls('ui-input ui-checkbox-group', className)}
      style={style}
    >
      <input {...rest} type='hidden' value={value ?? ''} />
      {options?.map((option) => (
        <Checkbox
          key={option.value}
          value={!!value?.includes(option.value)}
          onValueChange={() => changeValue(option.value)}
          disabled={props.disabled || option.disabled}
        >
          {option.label}
        </Checkbox>
      ))}
    </div>
  )
}

Checkbox.Group = CheckboxGroup

export default Checkbox
