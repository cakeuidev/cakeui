import { cls } from '../../../utils'
import { useInputState } from '../../tools'
import Icon from '../../general/Icon'

export type InputNumberProps = Omit<
  React.JSX.IntrinsicElements['input'], 'defaultValue' | 'value' | 'onChange'
> & {
  defaultValue?: number
  value?: number
  onChange?: (event: CustomEvent<{ value: number }>) => void
  controls?: boolean // default: true
  before?: React.ReactNode
  after?: React.ReactNode
}

function InputNumber(props: InputNumberProps) {
  const {
    className, style,
    defaultValue, value, onChange,
    controls = true,
    before,
    after,
    ...rest
  } = props

  const { el, ref, v, setV } = useInputState(rest, defaultValue, value, onChange)

  const step = (n: number) => {
    if (el.current) {
      el.current[n < 0 ? 'stepDown' : 'stepUp']()
      setV(Number(el.current.value))
    }
  }

  return (
    <label
      className={cls('ui-input ui-input-box ui-input-number', className)}
      style={style}
      tabIndex={-1}
    >
      {before ?? (controls && (
        <Icon className='ui-input-button' onClick={() => step(-1)}>remove</Icon>
      ))}
      <input
        inputMode='decimal'
        {...rest}
        type='number'
        ref={ref}
        value={v ?? ''}
        onChange={(e) => setV(Number(e.target.value))}
      />
      {after ?? (controls && (
        <Icon className='ui-input-button' onClick={() => step(1)}>add</Icon>
      ))}
    </label>
  )
}

export default InputNumber
