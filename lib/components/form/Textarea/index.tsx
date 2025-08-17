import { useMemo } from 'react'
import { cls } from '../../../utils'
import { useInputState } from '../../tools'

export type TextareaProps = Omit<
  React.ComponentPropsWithRef<'textarea'>, 'defaultValue' | 'value'
> &  {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  autoRows?: boolean // default: false
}

function Textarea(props: TextareaProps) {
  const {
    className,
    style,
    defaultValue,
    value: propsValue,
    onValueChange,
    autoRows = false,
    ...rest
  } = props

  const [value, setValue] = useInputState(props)

  const rows = useMemo(() => {
    let rows = props.rows
    if (autoRows) {
      rows = value?.split('\n').length ?? 1
    }
    return rows
  }, [value])

  return (
    <span
      className={cls('ui-input ui-input-box ui-textarea', className)}
      style={style}
    >
      <textarea
        {...rest}
        rows={rows}
        style={{ resize: autoRows ? 'none' : 'vertical' }}
        value={value ?? ''}
        onChange={(e) => {
          props.onChange?.(e)
          setValue(e.target.value)
        }}
      />
    </span>
  )
}

export default Textarea
