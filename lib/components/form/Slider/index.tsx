import { useMemo } from 'react'
import { cls } from '../../../utils/index.js'
import { useInputState } from '../../tools'

export type SliderProps = Omit<
  React.JSX.IntrinsicElements['input'], 'defaultValue' | 'value' | 'onChange'
> & {
  defaultValue?: number
  value?: number
  onChange?: (event: CustomEvent<{ value: number }>) => any
}

function Slider(props: SliderProps) {
  const {
    className, style,
    defaultValue, value, onChange,
    ...rest
  } = props

  const { ref, v, setV } = useInputState(rest, defaultValue, value, onChange)

  const percent = useMemo(() => {
    return (Number(rest.max ?? 100) - Number(rest.min ?? 0)) * Number(v ?? 0) / 100
  }, [v])

  return (
    <label
      className={cls('ui-input ui-slider', className)}
      style={style}
    >
      <div className='ui-slider-bg'>
        <div style={{ width: `${percent}%` }}></div>
      </div>
      <input
        {...rest}
        type='range'
        ref={ref}
        value={v ?? 0}
        onChange={(e) => setV(Number(e.target.value))}
      />
    </label>
  )
}

export default Slider
