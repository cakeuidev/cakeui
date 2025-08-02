import React from 'react'
import { cls } from '../../../utils'
import { useInputState } from '../../tools'
import Button from '../../general/Button'
import Icon from '../../general/Icon'

export type UploadProps = Omit<
  React.JSX.IntrinsicElements['input'], 'defaultValue' | 'value' | 'onChange'
> & {
  defaultValue?: File[]
  value?: File[]
  onChange?: (event: CustomEvent<{ value: File[] }>) => void
  max?: number
  trigger?: React.ReactNode
  fileRender?: (file: File) => React.ReactNode
}

function Upload(props: UploadProps) {
  const {
    style, className,
    defaultValue, value, onChange,
    max,
    trigger,
    fileRender,
    ...rest
  } = props

  const { el, ref, v, setV } = useInputState(rest, defaultValue, value, onChange)

  const changeValue = (files: FileList | null) => {
    if (!files?.length) {
      return
    }
    if (rest.multiple) {
      const prev = v ?? []
      setV([...prev, ...files].slice(0, max))
    } else {
      setV([files[0]])
    }
  }

  return (
    <span
      className={cls('ui-input ui-upload', className)}
      style={style}
    >
      <input
        {...rest}
        type='file'
        ref={ref}
        multiple={rest.multiple}
        onChange={(e) => changeValue(e.target.files)}
      />
      <div className='ui-upload-trigger' onClick={() => el.current?.click()}>
        {trigger ?? (
          <Button className='ui-upload-button' disabled={props.disabled}>
            <Icon>upload</Icon>
            <span>Upload</span>
          </Button>
        )}
      </div>
      {!!v?.length && (
        <div className='ui-upload-list'>
          {v.map((file, i) => (
            <React.Fragment key={i}>
              {fileRender ? (
                fileRender(file)
              ) : (
                <div className='ui-upload-item'>
                  <span>{file.name}</span>
                  <Icon
                    className='ui-input-button'
                    size={16}
                    onClick={() => setV(v.filter((x) => x !== file))}
                  >
                    close
                  </Icon>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </span>
  )
}

export default Upload
