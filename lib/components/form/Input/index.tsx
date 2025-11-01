import { useState } from 'react'
import { cls } from '../../../utils'
import { useComponentRef, useInputBox, useInputState } from '../../tools'
import Button from '../../general/Button'
import Icon from '../../general/Icon'

export type InputProps = Omit<
  React.ComponentPropsWithRef<'input'>, 'defaultValue' | 'value'
> & {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  before?: React.ReactNode
  after?: React.ReactNode
}
export type InputPasswordProps = InputProps & {
  visibilityToggle?: boolean // default: true
}

function Input(props: InputProps) {
  const {
    className,
    style,
    defaultValue,
    value: propsValue,
    onValueChange,
    before,
    after,
    ...rest
  } = props

  const [el, ref] = useComponentRef(props.ref)
  const { onClick, onMouseDown } = useInputBox(el)
  const [value, setValue] = useInputState(props)

  return (
    <span
      className={cls('ui-input ui-input-box', className)}
      style={style}
      onClick={onClick}
      onMouseDown={onMouseDown}
    >
      {before}
      <input
        {...rest}
        ref={ref}
        value={value ?? ''}
        onChange={(e) => {
          props.onChange?.(e)
          setValue(e.target.value)
        }}
      />
      {after}
    </span>
  )
}

function InputPassword(props: InputPasswordProps) {
  const {
    visibilityToggle = true,
    ...rest
  } = props

  const [visibility, setVisibility] = useState(false)

  return (
    <Input
      autoComplete='on'
      {...rest}
      className={cls('ui-input-password', props.className)}
      type={visibility ? 'text' : 'password'}
      after={props.after ?? (visibilityToggle && (
        <Button
          tabIndex={-1}
          variant='icon'
          onClick={() => setVisibility(!visibility)}
        >
          <Icon size={16}>{visibility ? 'visibility' : 'visibility_off'}</Icon>
        </Button>
      ))}
    />
  )
}

Input.Password = InputPassword

export default Input
