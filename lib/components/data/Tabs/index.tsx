import React, { use, useEffect, useMemo } from 'react'
import { cls } from '../../../utils/index.js'
import { useStateListner } from '../../tools'

export type TabsProps = React.JSX.IntrinsicElements['div'] & {
  activeKey?: string
  onChangeActiveKey?: (key: string) => any
  destroyInactive?: boolean // default: false
}
export type TabsListProps = React.JSX.IntrinsicElements['div']
export type TabsTriggerProps = React.JSX.IntrinsicElements['div'] & {
  itemKey?: string
}
export type TabsContentProps = React.JSX.IntrinsicElements['div'] & {
  itemKey?: string
}

const TabsContext = React.createContext<{
  activeKey: any
  setActiveKey: (v: any) => void
  destroyInactive?: boolean
} | null>(null)

function Tabs(props: TabsProps) {
  const {
    activeKey: propsActiveKey,
    onChangeActiveKey,
    destroyInactive = false,
    ...rest
  } = props

  const [keys, Children] = useMemo(() => {
    const keys: any[] = []
    React.Children.forEach(rest.children, (x: any) => {
      if (x?.type === TabsContent) {
        keys.push(x.key ?? String(keys.length + 1))
      }
    })
    const k = [...keys]
    const Children = React.Children.map(rest.children, (x: any) => {
      if (x?.type === TabsContent) {
        return React.cloneElement(x, { ...x.props, itemKey: k.shift() })
      }
      return x
    })
    return [keys, Children]
  }, [rest.children])

  const [activeKey, setActiveKey] = useStateListner(propsActiveKey, onChangeActiveKey, keys[0])

  useEffect(() => {
    if (keys.length && keys.indexOf(activeKey) === -1) {
      setActiveKey(keys[0])
    }
  }, [keys, activeKey])

  return (
    <div
      {...rest}
      className={cls('ui-tabs', rest.className)}
    >
      <TabsContext.Provider value={{ activeKey, setActiveKey, destroyInactive }}>
        {Children}
      </TabsContext.Provider>
    </div>
  )
}

function TabsList(props: TabsListProps) {
  const Children = useMemo(() => {
    const keys: any[] = []
    React.Children.forEach(props.children, (x: any) => {
      if (x?.type === TabsTrigger) {
        keys.push(x.key ?? keys.length)
      }
    })
    const k = [...keys]
    const Children = React.Children.map(props.children, (x: any) => {
      if (x?.type === TabsTrigger) {
        return React.cloneElement(x, { ...x.props, itemKey: k.shift() })
      }
      return x
    })
    return Children
  }, [props.children])

  return (
    <div
      {...props}
      className={cls('ui-tabs-list', props.className)}
    >
      {Children}
    </div>
  )
}

function TabsTrigger(props: TabsTriggerProps) {
  const {
    itemKey,
    ...rest
  } = props

  const { activeKey, setActiveKey } = use(TabsContext)!

  return (
    <div
      className={cls('ui-tabs-trigger', {
        'ui-tabs-active': itemKey === activeKey
      }, rest.className)}
      onClick={(e) => {
        setActiveKey(itemKey)
        rest.onClick?.(e)
      }}
    >
      {rest.children}
    </div>
  )
}

function TabsContent(props: TabsContentProps) {
  const {
    itemKey,
    ...rest
  } = props

  const { activeKey, destroyInactive } = use(TabsContext)!

  return (!destroyInactive || itemKey === activeKey) && (
    <div
      {...rest}
      className={cls('ui-tabs-content', {
        'ui-tabs-active': itemKey === activeKey
      }, rest.className)}
    >
      {rest.children}
    </div>
  )
}

Tabs.List = TabsList
Tabs.Trigger = TabsTrigger
Tabs.Content = TabsContent

export default Tabs
