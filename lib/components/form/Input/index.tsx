import { useState } from 'react'
import { cls } from '../../../utils'
import { useInputState } from '../../tools'
import Icon from '../../general/Icon'

export type InputProps = Omit<
  React.JSX.IntrinsicElements['input'], 'defaultValue' | 'value' | 'onChange'
> & {
  defaultValue?: string
  value?: string
  onChange?: (event: CustomEvent<{ value: string }>) => void
  before?: React.ReactNode
  after?: React.ReactNode
}
export type InputPasswordProps = InputProps & {
  visibilityToggle?: boolean // default: true
}

function Input(props: InputProps) {
  const {
    className, style,
    defaultValue, value, onChange,
    before,
    after,
    ...rest
  } = props

  const { ref, v, setV } = useInputState(rest, defaultValue, value, onChange)

  return (
    <label
      className={cls('ui-input ui-input-box', className)}
      style={style}
      tabIndex={-1}
    >
      {before}
      <input
        {...rest}
        ref={ref}
        value={v ?? ''}
        onChange={(e) => setV(e.target.value)}
      />
      {after}
    </label>
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
      className={cls('ui-input-password', rest.className)}
      type={visibility ? 'text' : 'password'}
      after={rest.after ?? (visibilityToggle && (
        <Icon className='ui-input-button' onClick={() => setVisibility(!visibility)}>
          {visibility ? 'visibility' : 'visibility_off'}
        </Icon>
      ))}
    />
  )
}

Input.Password = InputPassword

export default Input
