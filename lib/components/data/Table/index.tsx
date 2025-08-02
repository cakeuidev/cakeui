import { cls } from '../../../utils'

export type TableProps = React.JSX.IntrinsicElements['table']

function Table(props: TableProps) {
  return (
    <table
      {...props}
      className={cls('ui-table', props.className)}
    >
      {props.children}
    </table>
  )
}

export default Table
