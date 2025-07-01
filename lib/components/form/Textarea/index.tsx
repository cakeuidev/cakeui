import { useMemo } from 'react'
import { cls } from '../../../utils/index.js'
import { useInputState } from '../../tools'

export type TextareaProps = Omit<
  React.JSX.IntrinsicElements['textarea'], 'defaultValue' | 'value' | 'onChange'
> &  {
  defaultValue?: string
  value?: string
  onChange?: (event: CustomEvent<{ value: string }>) => any
  autoRows?: boolean // default: false
}

function Textarea(props: TextareaProps) {
  const {
    className, style,
    defaultValue, value, onChange,
    autoRows = false,
    ...rest
  } = props

  const { ref, v, setV } = useInputState(rest, defaultValue, value, onChange)

  const rows = useMemo(() => {
    let rows = rest.rows
    if (autoRows) {
      rows = v?.split('\n').length ?? 1
    }
    return rows
  }, [v])

  return (
    <label
      className={cls('ui-input ui-input-box ui-textarea', className)}
      style={style}
      tabIndex={-1}
    >
      <textarea
        {...rest}
        style={{ resize: autoRows ? 'none' : 'vertical' }}
        ref={ref}
        value={v ?? ''}
        onChange={(e) => setV(e.target.value)}
        rows={rows}
      />
    </label>
  )
}

export default Textarea
