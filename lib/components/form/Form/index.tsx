import React, { use, useEffect, useRef, useState } from 'react'
import { cls } from '../../../utils/index.js'
import { useEventListener, useFunction, useResizeObserver } from '../../../hooks/index.js'
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
  React.JSX.IntrinsicElements['form'], 'onChange' | 'onSubmit'
> & {
  defaultValues?: FormValues
  values?: FormValues
  onChange?: (key: string, value: any) => any
  onSubmit?: (e: React.FormEvent<HTMLFormElement>, values: FormValues) => any
  cols?: number        // default: 1
  rowGap?: number      // default: 0
  colGap?: number      // default: 16
  colMinWidth?: number // default: 160
}
export type FormItemProps = Omit<
  React.JSX.IntrinsicElements['div'], 'title'
> & {
  title?: React.ReactNode
  info?: React.ReactNode
  rowSpan?: number     // default: 1
  colSpan?: number     // default: 1
  validate?: (value: any) => string | undefined
}
export type FormValues<T = { [k: string]: any }> = T

export const FormContext = React.createContext<{
  values: FormValues | undefined
  cols: number
  error: { [k: string]: string }
  validateRef: React.RefObject<{ [k: string]: (v: any) => string | undefined }>
} | null>(null)

function Form(props: FormProps) {
  const {
    defaultValues,
    values: propsValues,
    onChange,
    onSubmit,
    cols = 1,
    rowGap = 0,
    colGap = 16,
    colMinWidth = 160,
    ...rest
  } = props

  const [el, ref] = useComponentRef(rest.ref)
  const [maxCols, setMaxCols] = useState(cols)
  const [values, setValues] = useStateListner(propsValues, void 0, defaultValues)
  const [error, setError] = useState<{ [k: string]: string }>({})
  const validateRef = useRef<{ [k: string]: (v: any) => string | undefined }>({})

  useEventListener('ui-input-change', (e) => {
    const event = e as CustomEvent
    const key = (event.target as HTMLInputElement).name
    const value = event.detail.value
    if (key) {
      setValues((prev: any) => ({ ...prev, [key]: value }))
      onChange?.(key, value)
      if (Object.hasOwn(error, key) && validateRef.current[key]) {
        const message = validateRef.current[key](value)
        setError((prev) => ({ ...prev, [key]: message ?? '' }))
      }
    }
  }, void 0, true)

  useResizeObserver(el, () => {
    if (el.current) {
      setMaxCols(el.current.offsetWidth < colMinWidth * cols + colGap * (cols - 1) ?
        1 + Math.floor((el.current.offsetWidth - colMinWidth) / (colMinWidth + colGap)) : cols)
    }
  })

  return (
    <form
      autoComplete='off'
      noValidate
      {...rest}
      className={cls('ui-form', rest.className)}
      style={{
        gridTemplateColumns: maxCols > 1 ? `repeat(${maxCols}, minmax(0, 1fr))` : '',
        gap: `${rowGap}px ${colGap}px`,
        ...rest.style
      }}
      ref={ref}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && (e.target as HTMLElement).tagName !== 'TEXTAREA') {
          e.preventDefault()
        }
        rest.onKeyDown?.(e)
      }}
      onSubmit={(e) => {
        e.preventDefault()
        const error: { [k: string]: string } = {}
        for (let [name, validate] of Object.entries(validateRef.current)) {
          const message = validate(values?.[name])
          if (message) {
            error[name] = message
          }
        }
        setError(error)
        if (Object.keys(error).length) {
          return
        }
        onSubmit?.(e, values ?? {})
      }}
    >
      <FormContext.Provider value={{ values, cols: maxCols, error, validateRef }}>
        {rest.children}
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
    validate,
    ...rest
  } = props

  const { cols, error, validateRef } = use(FormContext)!
  const [el, ref] = useComponentRef(rest.ref)
  const [name, setName] = useState('')

  const validateFn = useFunction((v: any) => validate?.(v))

  useEffect(() => {
    const inputEl = el.current?.querySelector<HTMLInputElement>(':is(input,textarea)[name]')
    if (inputEl?.name) {
      setName(inputEl.name)
      if (validate) {
        validateRef.current[inputEl.name] = validateFn
      }
    }
  }, [])

  return (
    <div
      {...rest}
      className={cls('ui-form-item', {
        'ui-form-item-error': error[name]
      }, rest.className)}
      style={{
        gridRow: rowSpan > 1 ? `span ${rowSpan}` : '',
        gridColumn: Math.min(colSpan, cols) > 1 ? `span ${Math.min(colSpan, cols)}` : '',
        ...rest.style
      }}
      ref={ref}
    >
      {title && <div className='ui-form-item-title'>{title}</div>}
      <div className='ui-form-input'>{rest.children}</div>
      <div className='ui-form-item-info'>
        {info ?? error[name]}
      </div>
    </div>
  )
}

function FormButton(props: ButtonProps) {
  return (
    <Button
      {...props}
      className={cls('ui-form-button', props.className)}
      type='submit'
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
