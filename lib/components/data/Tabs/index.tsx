import React, { use, useEffect, useMemo } from 'react'
import { cls } from '../../../utils'
import { useStateListner } from '../../tools'

export type TabsProps = React.ComponentPropsWithRef<'div'> & {
  activeKey?: string
  onActiveKeyChange?: (key: string) => void
  destroyInactive?: boolean // default: false
}
export type TabsListProps = React.ComponentPropsWithRef<'div'>
export type TabsTriggerProps<T extends React.ElementType = any> = React.ComponentPropsWithRef<T> & {
  as?: React.ElementType    // defaut: 'button'
  itemKey?: string
}
export type TabsContentProps = React.ComponentPropsWithRef<'div'> & {
  itemKey?: string
}

const TabsContext = React.createContext<{
  activeKey: any
  setActiveKey: (key: any) => void
  destroyInactive?: boolean
} | null>(null)

function Tabs(props: TabsProps) {
  const {
    activeKey: propsActiveKey,
    onActiveKeyChange,
    destroyInactive = false,
    ...rest
  } = props

  const [keys, Children] = useMemo(() => {
    const keys: any[] = []
    React.Children.forEach(props.children, (x: any) => {
      if (x?.type === TabsContent) {
        keys.push(x.key ?? String(keys.length + 1))
      }
    })
    const k = [...keys]
    const Children = React.Children.map(props.children, (x: any) => {
      if (x?.type === TabsContent) {
        return React.cloneElement(x, { ...x.props, itemKey: k.shift() })
      }
      return x
    })
    return [keys, Children]
  }, [props.children])

  const [activeKey, setActiveKey] = useStateListner(propsActiveKey, onActiveKeyChange, keys[0])

  useEffect(() => {
    if (keys.length && keys.indexOf(activeKey) === -1) {
      setActiveKey(keys[0])
    }
  }, [keys, activeKey])

  return (
    <div
      {...rest}
      className={cls('ui-tabs', props.className)}
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
    as: Component = 'button',
    ...rest
  } = props

  const { activeKey, setActiveKey } = use(TabsContext)!

  return (
    <Component
      {...rest}
      className={cls('ui-tabs-trigger', {
        'ui-tabs-active': itemKey === activeKey
      }, props.className)}
      onClick={(e: any) => {
        props.onClick?.(e)
        setActiveKey(itemKey)
      }}
    >
      {props.children}
    </Component>
  )
}

function TabsContent(props: TabsContentProps) {
  const {
    itemKey,
    ...rest
  } = props

  const { activeKey, destroyInactive } = use(TabsContext)!

  return (
    <>
      {(!destroyInactive || itemKey === activeKey) && (
        <div
          {...rest}
          className={cls('ui-tabs-content', {
            'ui-tabs-active': itemKey === activeKey
          }, props.className)}
        >
          {props.children}
        </div>
      )}
    </>
  )
}

Tabs.List = TabsList
Tabs.Trigger = TabsTrigger
Tabs.Content = TabsContent

export default Tabs
