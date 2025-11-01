import { cls } from '../../../utils'
import { useComponentRef, useInputBox, useInputState } from '../../tools'
import Button from '../../general/Button'
import Icon from '../../general/Icon'

export type InputNumberProps = Omit<
  React.ComponentPropsWithRef<'input'>, 'defaultValue' | 'value'
> & {
  defaultValue?: number
  value?: number
  onValueChange?: (value: number | null) => void
  controls?: boolean // default: true
  before?: React.ReactNode
  after?: React.ReactNode
}

function InputNumber(props: InputNumberProps) {
  const {
    className,
    style,
    defaultValue,
    value: propsValue,
    onValueChange,
    controls = true,
    before,
    after,
    ...rest
  } = props

  const [el, ref] = useComponentRef(props.ref)
  const { onClick, onMouseDown } = useInputBox(el)
  const [value, setValue] = useInputState(props)

  const step = (n: number) => {
    if (el.current) {
      el.current[n < 0 ? 'stepDown' : 'stepUp']()
      setValue(Number(el.current.value))
    }
  }

  return (
    <span
      className={cls('ui-input ui-input-box ui-input-number', className)}
      style={style}
      onClick={onClick}
      onMouseDown={onMouseDown}
    >
      {before ?? (controls && (
        <Button
          tabIndex={-1}
          variant='icon'
          onClick={() => step(-1)}
        >
          <Icon size={16}>remove</Icon>
        </Button>
      ))}
      <input
        inputMode='decimal'
        {...rest}
        ref={ref}
        type='number'
        value={value ? String(value) : ''}
        onChange={(e) => {
          props.onChange?.(e)
          setValue(e.target.value ? Number(e.target.value) : null as any)
        }}
      />
      {after ?? (controls && (
        <Button
          tabIndex={-1}
          variant='icon'
          onClick={() => step(1)}
        >
          <Icon size={16}>add</Icon>
        </Button>
      ))}
    </span>
  )
}

export default InputNumber
