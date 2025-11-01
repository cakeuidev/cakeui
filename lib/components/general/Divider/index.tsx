import { cls } from '../../../utils'

export type DividerProps = React.ComponentPropsWithRef<'div'> & {
  type?: 'horizontal' | 'vertical' // default: 'horizontal'
}

function Divider(props: DividerProps) {
  const {
    type = 'horizontal',
    ...rest
  } = props

  return (
    <div
      {...rest}
      className={cls('ui-divider', {
        [`ui-divider-${type}`]: type
      }, props.className)}
    ></div>
  )
}

export default Divider
