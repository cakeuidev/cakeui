import React, { use, useMemo } from 'react'
import { cls } from '../../../utils/index.js'
import { useStateListner } from '../../tools'
import Icon from '../../general/Icon'

export type CollapseProps = React.JSX.IntrinsicElements['div'] & {
  openKeys?: string[]
  onChangeOpenKeys?: (keys: string[]) => any
}
export type CollapseItemProps = React.JSX.IntrinsicElements['div'] & {
  itemKey?: string
}
export type CollapseTriggerProps = React.JSX.IntrinsicElements['div']
export type CollapseContentProps = React.JSX.IntrinsicElements['div']

const CollapseContext = React.createContext<{
  openKeys: string[] | undefined
  changeOpenKeys: (key: string) => void
} | null>(null)
const ItemContext = React.createContext<{
  itemKey: string
} | null>(null)

function Collapse(
  {
    openKeys: propsOpenKeys,
    onChangeOpenKeys,
    ...rest
  }: CollapseProps
) {
  const Children = useMemo(() => {
    const keys: any[] = []
    React.Children.forEach(rest.children, (x: any) => {
      if (x?.type === CollapseItem) {
        keys.push(x.key ?? String(keys.length + 1))
      }
    })
    const k = [...keys]
    const Children = React.Children.map(rest.children, (x: any) => {
      if (x?.type === CollapseItem) {
        return React.cloneElement(x, { ...x.props, itemKey: k.shift() })
      }
      return x
    })
    return Children
  }, [rest.children])

  const [openKeys, setOpenKeys] = useStateListner(propsOpenKeys, onChangeOpenKeys)

  const changeOpenKeys = (key: any) => {
    const prev = openKeys ?? []
    setOpenKeys(prev.includes(key) ? prev.filter((x) => x !== key) : [...prev, key])
  }

  return (
    <div
      {...rest}
      className={cls('ui-collapse', rest.className)}
    >
      <CollapseContext.Provider value={{ openKeys, changeOpenKeys }}>
        {Children}
      </CollapseContext.Provider>
    </div>
  )
}

function CollapseItem(props: CollapseItemProps) {
  const {
    itemKey,
    ...rest
  } = props

  const { openKeys } = use(CollapseContext)!

  return (
    <div
      {...rest}
      className={cls('ui-collapse-item', {
        'ui-collapse-open': openKeys?.includes(itemKey as string)
      }, rest.className)}
    >
      <ItemContext.Provider value={{ itemKey: itemKey as string }}>
        {rest.children}
      </ItemContext.Provider>
    </div>
  )
}

function CollapseTrigger(props: CollapseTriggerProps) {
  const { changeOpenKeys } = use(CollapseContext)!
  const { itemKey } = use(ItemContext)!

  return (
    <div
      {...props}
      className={cls('ui-collapse-trigger', props.className)}
      onClick={(e) => {
        changeOpenKeys(itemKey)
        props.onClick?.(e)
      }}
    >
      <span>{props.children}</span>
      <Icon className='ui-collapse-icon'>keyboard_arrow_down</Icon>
    </div>
  )
}

function CollapseContent(props: CollapseContentProps) {
  return (
    <div
      {...props}
      className={cls('ui-collapse-content', props.className)}
    >
      <div>{props.children}</div>
    </div>
  )
}

Collapse.Item = CollapseItem
Collapse.Trigger = CollapseTrigger
Collapse.Content = CollapseContent

export default Collapse
