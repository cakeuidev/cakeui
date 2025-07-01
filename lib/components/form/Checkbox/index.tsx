import { useEffect } from 'react'
import { cls } from '../../../utils/index.js'
import { useInputState, useStateListner } from '../../tools'

export type CheckboxProps = Omit<
  React.JSX.IntrinsicElements['input'], 'defaultValue' | 'value' | 'onChange'
> & {
  defaultValue?: string
  value?: string
  onChange?: (event: CustomEvent<{ value: string }>) => any
  indeterminate?: boolean // default: false
}
export type CheckboxGroupProps = Omit<
  React.JSX.IntrinsicElements['input'], 'defaultValue' | 'value' | 'onChange'
> & {
  defaultValue?: string[]
  value?: string[]
  onChange?: (event: CustomEvent<{ value: string[] }>) => any
  options?: CheckboxOption[]
}
export type CheckboxOption = {
  value: string
  label: React.ReactNode
  disabled?: boolean
}

function Checkbox(props: CheckboxProps) {
  const {
    className, style, children,
    defaultValue, value, onChange,
    indeterminate = false,
    ...rest
  } = props

  const checkedValue = value ?? defaultValue ?? 'on'
  const [checked, setChecked] = useStateListner(rest.checked, void 0, rest.defaultChecked)
  const { el, ref, v, setV } = useInputState(rest, void 0, checked ? checkedValue : '', onChange)

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
        type='checkbox'
        ref={ref}
        checked={!!checked}
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

function CheckboxGroup(props: CheckboxGroupProps) {
  const {
    className, style,
    defaultValue,
    value,
    onChange,
    options,
    ...rest
  } = props

  const { ref, v, setV } = useInputState(rest, defaultValue, value, onChange)

  const changeValue = (value: string) => {
    const prev = v ?? []
    setV(prev.includes(value) ? prev.filter((x) => x !== value) : [...prev, value])
  }

  return (
    <span
      className={cls('ui-input ui-checkbox-group', className)}
      style={style}
    >
      <input {...rest} type='hidden' ref={ref} />
      {options?.map((option) => (
        <Checkbox
          key={option.value}
          value={option.value}
          checked={v?.includes(option.value) ?? false}
          onChange={() => changeValue(option.value)}
          disabled={rest.disabled || option.disabled}
        >
          {option.label}
        </Checkbox>
      ))}
    </span>
  )
}

Checkbox.Group = CheckboxGroup

export default Checkbox
