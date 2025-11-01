import React, { use, useEffect, useState } from 'react'
import { cls, useResizeObserver } from '../../../utils'
import { useComponentRef, useStateListner } from '../../tools'
import Button, { ButtonProps } from '../../general/Button'
import Input, { InputProps, InputPasswordProps } from '../Input'
import InputNumber, { InputNumberProps } from '../InputNumber'
import Textarea, { TextareaProps } from '../Textarea'
import Radio, { RadioProps, RadioGroupProps } from '../Radio'
import Checkbox, { CheckboxProps, CheckboxGroupProps } from '../Checkbox'
import Switch, { SwitchProps } from '../Switch'
import Slider, { SliderProps } from '../Slider'
import Select, { SelectProps } from '../Select'
import DatePicker, { DatePickerProps } from '../DatePicker'
import ColorPicker, { ColorPickerProps } from '../ColorPicker'
import Upload, { UploadProps } from '../Upload'

export type FormProps = Omit<
  React.ComponentPropsWithRef<'form'>, 'onSubmit'
> & {
  defaultValues?: FormValues
  values?: FormValues
  onValueChange?: (key: string, value: any) => void
  onValidate?: (key: string, value: any) => (string | void) | Promise<string | void>
  onSubmit?: (event: React.FormEvent<HTMLFormElement>, values: any) => void
  cols?: number        // default: 1
  rowGap?: number      // default: 0
  colGap?: number      // default: 16
  colMinWidth?: number // default: 200
}
export type FormItemProps = Omit<
  React.ComponentPropsWithRef<'div'>, 'title'
> & {
  title?: React.ReactNode
  info?: React.ReactNode
  rowSpan?: number     // default: 1
  colSpan?: number     // default: 1
}
export type FormValues = {
  [k: string]: any
}

export const FormContext = React.createContext<{
  values: FormValues | undefined
  syncValue: (key: string, value: any) => Promise<void>
  cols: number
  error: { [k: string]: string }
} | null>(null)

function Form(props: FormProps) {
  const {
    defaultValues,
    values: propsValues,
    onValueChange,
    onValidate,
    onChange,
    onSubmit,
    cols = 1,
    rowGap = 0,
    colGap = 16,
    colMinWidth = 200,
    ...rest
  } = props

  const [el, ref] = useComponentRef(props.ref)
  const [maxCols, setMaxCols] = useState(cols)
  const [values, setValues] = useStateListner(propsValues, undefined, defaultValues)
  const [error, setError] = useState<{ [k: string]: string }>({})

  const syncValue = async (key: string, value: any) => {
    onValueChange?.(key, value)
    setValues({ ...values, [key]: value })
    if (Object.hasOwn(error, key)) {
      const message = await Promise.resolve(onValidate?.(key, value))
      setError({ ...error, [key]: message ?? '' })
    }
  }

  useResizeObserver(el, () => {
    if (el.current) {
      const maxCols = el.current.offsetWidth < colMinWidth * cols + colGap * (cols - 1) ?
        1 + Math.floor((el.current.offsetWidth - colMinWidth) / (colMinWidth + colGap)) :
        cols
      setMaxCols(maxCols)
    }
  })

  return (
    <form
      autoComplete='off'
      noValidate
      {...rest}
      ref={ref}
      className={cls('ui-form', props.className)}
      style={{
        gridTemplateColumns: maxCols > 1 ? `repeat(${maxCols}, minmax(0, 1fr))` : '',
        gap: `${rowGap}px ${colGap}px`,
        ...props.style
      }}
      onKeyDown={(e) => {
        props.onKeyDown?.(e)
        const el = e.target as HTMLElement
        if (e.key === 'Enter' && el.tagName === 'INPUT') {
          e.preventDefault()
        }
      }}
      onSubmit={async (e) => {
        e.preventDefault()
        const error: { [k: string]: string } = {}
        const formData = new FormData(e.target as HTMLFormElement)
        await Promise.all(
          [...formData.keys()].map(async (key) => {
            const message = await Promise.resolve(onValidate?.(key, values?.[key]))
            if (message) {
              error[key] = message
            }
          })
        )
        setError(error)
        if (Object.keys(error).length) {
          return
        }
        onSubmit?.(e, values ?? {})
      }}
    >
      <FormContext.Provider value={{ values, syncValue, cols: maxCols, error }}>
        {props.children}
      </FormContext.Provider>
    </form>
  )
}

function FormItem(props: FormItemProps) {
  const {
    title,
    info,
    rowSpan = 1,
    colSpan = 1,
    ...rest
  } = props

  const { cols, error } = use(FormContext)!
  const [el, ref] = useComponentRef(props.ref)
  const [name, setName] = useState('')

  useEffect(() => {
    const inputEl = el.current?.querySelector<HTMLInputElement>(':is(input,textarea)[name]')
    if (inputEl?.name) {
      setName(inputEl.name)
    }
  }, [props.children])

  return (
    <div
      {...rest}
      ref={ref}
      className={cls('ui-form-item', {
        'ui-form-error': error[name]
      }, props.className)}
      style={{
        gridRow: rowSpan > 1 ? `span ${rowSpan}` : '',
        gridColumn: Math.min(colSpan, cols) > 1 ? `span ${Math.min(colSpan, cols)}` : '',
        ...props.style
      }}
    >
      {title && <div className='ui-form-title'>{title}</div>}
      <div className='ui-form-input'>{props.children}</div>
      <div className='ui-form-info'>
        {info ?? error[name]}
      </div>
    </div>
  )
}

function FormButton(props: ButtonProps) {
  return (
    <Button
      variant='filled'
      {...props}
      type='submit'
      className={cls('ui-form-button', props.className)}
    >
      {props.children}
    </Button>
  )
}

Form.Item = FormItem
Form.Button = FormButton
Form.Input = (props: InputProps) => <Input {...props} />
Form.Password = (props: InputPasswordProps) => <Input.Password {...props} />
Form.InputNumber = (props: InputNumberProps) => <InputNumber {...props} />
Form.Textarea = (props: TextareaProps) => <Textarea {...props} />
Form.Radio = (props: RadioProps) => <Radio {...props} />
Form.RadioGroup = (props: RadioGroupProps) => <Radio.Group {...props} />
Form.Checkbox = (props: CheckboxProps) => <Checkbox {...props} />
Form.CheckboxGroup = (props: CheckboxGroupProps) => <Checkbox.Group {...props} />
Form.Switch = (props: SwitchProps) => <Switch {...props} />
Form.Slider = (props: SliderProps) => <Slider {...props} />
Form.Select = (props: SelectProps) => <Select {...props} />
Form.DatePicker = (props: DatePickerProps) => <DatePicker {...props} />
Form.ColorPicker = (props: ColorPickerProps) => <ColorPicker {...props} />
Form.Upload = (props: UploadProps) => <Upload {...props} />

export default Form
