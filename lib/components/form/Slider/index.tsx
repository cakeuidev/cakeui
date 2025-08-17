import { useMemo } from 'react'
import { cls } from '../../../utils'
import { useInputState } from '../../tools'

export type SliderProps = Omit<
  React.ComponentPropsWithRef<'input'>, 'defaultValue' | 'value'
> & {
  defaultValue?: number
  value?: number
  onValueChange?: (value: number | null) => void
}

function Slider(props: SliderProps) {
  const {
    className,
    style,
    defaultValue,
    value: propsValue,
    onValueChange,
    ...rest
  } = props

  const [value, setValue] = useInputState(props)

  const percent = useMemo(() => {
    return (Number(props.max ?? 100) - Number(props.min ?? 0)) * Number(value ?? 0) / 100
  }, [value])

  return (
    <span
      className={cls('ui-input ui-slider', className)}
      style={style}
    >
      <div className='ui-slider-track'>
        <div style={{ width: `${percent}%` }}></div>
      </div>
      <input
        {...rest}
        type='range'
        value={value ?? 0}
        onChange={(e) => {
          props.onChange?.(e)
          setValue(Number(e.target.value))
        }}
      />
    </span>
  )
}

export default Slider
