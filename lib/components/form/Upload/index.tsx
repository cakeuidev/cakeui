import React, { useEffect, useMemo, useRef } from 'react'
import { cls } from '../../../utils'
import { useComponentRef, useInputState } from '../../tools'
import Button from '../../general/Button'
import Icon from '../../general/Icon'

export type UploadProps = Omit<
  React.ComponentPropsWithRef<'input'>, 'defaultValue' | 'value'
> & {
  defaultValue?: File[]
  value?: File[]
  onValueChange?: (value: File[]) => void
  trigger?: React.ReactNode
  fileRender?: (file: File) => React.ReactNode
}

function Upload(props: UploadProps) {
  const {
    style,
    className,
    defaultValue,
    value: propsValue,
    onValueChange,
    trigger,
    fileRender,
    ...rest
  } = props

  const [el, ref] = useComponentRef(props.ref)
  const [value, setValue] = useInputState(props)
  const id = useRef<WeakMap<File, string>>(new WeakMap())

  const files = useMemo(() => {
    if (!value) {
      return []
    }
    for (const file of value) {
      if (!id.current.has(file)) {
        id.current.set(file, crypto.randomUUID())
      }
    }
    return value.map((file) => ({ id: id.current.get(file), file }))
  }, [value])

  useEffect(() => {
    if (!el.current) {
      return
    }
    const files = value ?? []
    const dataTransfer = new DataTransfer()
    for (const file of files) {
      dataTransfer.items.add(file)
    }
    el.current.files = dataTransfer.files
  }, [value])

  const changeValue = (files: File[]) => {
    if (props.multiple) {
      const prev = value ?? []
      setValue([...prev, ...files])
    } else {
      setValue(files)
    }
  }

  return (
    <div
      className={cls('ui-input ui-upload', className)}
      style={style}
    >
      <input
        {...rest}
        type='file'
        ref={ref}
        onChange={(e) => {
          props.onChange?.(e)
          if (e.target.files) {
            changeValue([...e.target.files])
          }
        }}
      />
      {trigger ?? (
        <Button
          color='info'
          className='ui-upload-trigger'
          onClick={() => el.current?.click()}
          disabled={props.disabled}
        >
          <Icon>upload</Icon>
          <span>Upload</span>
        </Button>
      )}
      {!!value?.length && (
        <div className='ui-upload-files'>
          {files.map(({ id, file }) => (
            <React.Fragment key={id}>
              {fileRender ? (
                fileRender(file)
              ) : (
                <div className='ui-upload-file'>
                  <span>{file.name}</span>
                  <Button
                    variant='icon'
                    onClick={() => setValue(value.filter((x) => x !== file))}
                  >
                    <Icon size={16}>close</Icon>
                  </Button>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  )
}

export default Upload
