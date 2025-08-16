import React, { use, useMemo } from 'react'
import { cls } from '../../../utils'
import { useStateListner } from '../../tools'
import Icon from '../../general/Icon'

export type CollapseProps = React.ComponentPropsWithRef<'div'> & {
  openKeys?: string[]
  onOpenKeysChange?: (keys: string[]) => void
}
export type CollapseItemProps = React.ComponentPropsWithRef<'div'> & {
  itemKey?: string
}
export type CollapseTriggerProps = React.ComponentPropsWithRef<'button'>
export type CollapseContentProps = React.ComponentPropsWithRef<'div'>

const CollapseContext = React.createContext<{
  openKeys: string[] | undefined
  changeOpenKeys: (key: string) => void
} | null>(null)
const ItemContext = React.createContext<{
  itemKey: string
} | null>(null)

function Collapse(props: CollapseProps) {
  const {
    openKeys: propsOpenKeys,
    onOpenKeysChange,
    ...rest
  } = props

  const Children = useMemo(() => {
    const keys: string[] = []
    React.Children.forEach(props.children, (x: any) => {
      if (x?.type === CollapseItem) {
        keys.push(x.key ?? String(keys.length + 1))
      }
    })
    const k = [...keys]
    const Children = React.Children.map(props.children, (x: any) => {
      if (x?.type === CollapseItem) {
        return React.cloneElement(x, { itemKey: k.shift() })
      }
      return x
    })
    return Children
  }, [props.children])

  const [openKeys, setOpenKeys] = useStateListner(propsOpenKeys, onOpenKeysChange)

  const changeOpenKeys = (key: any) => {
    const prev = openKeys ?? []
    setOpenKeys(prev.includes(key) ? prev.filter((x) => x !== key) : [...prev, key])
  }

  return (
    <div
      {...rest}
      className={cls('ui-collapse', props.className)}
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
      }, props.className)}
    >
      <ItemContext.Provider value={{ itemKey: itemKey as string }}>
        {props.children}
      </ItemContext.Provider>
    </div>
  )
}

function CollapseTrigger(props: CollapseTriggerProps) {
  const { changeOpenKeys } = use(CollapseContext)!
  const { itemKey } = use(ItemContext)!

  return (
    <button
      {...props}
      className={cls('ui-collapse-trigger', props.className)}
      onClick={(e) => {
        props.onClick?.(e)
        changeOpenKeys(itemKey)
      }}
    >
      <span>{props.children}</span>
      <Icon className='ui-collapse-icon'>keyboard_arrow_down</Icon>
    </button>
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
