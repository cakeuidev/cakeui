import React, { use } from 'react'
import { cls } from '../../../utils'
import { useStateListner } from '../../tools'
import Dropdown from '../Dropdown'
import Popover from '../Popover'

export type MenuProps = React.ComponentPropsWithRef<'div'> & {
  menus?: MenuItem[]
  openKeys?: string[]
  onOpenKeysChange?: (keys: string[]) => void
  type?: 'horizontal' | 'vertical' // default: 'horizontal'
  inline?: boolean                 // default: false
}
export type MenuItem<T extends React.ElementType = any> = React.ComponentPropsWithRef<T> & {
  key: string
  name?: React.ReactNode
  subMenus?: MenuItem[]
  as?: React.ElementType           // default: 'button'
}
type MenuHorizontalProps = React.ComponentPropsWithRef<'div'> & {
  menus?: MenuItem[]
}
type MenuVerticalProps = React.ComponentPropsWithRef<'div'> & {
  menus?: MenuItem[]
  parentKeys?: string[]
}
type MenuItemProps<T extends React.ElementType = any> = MenuItem<T> & {
  itemKey: string
}

const MenuContext = React.createContext<{
  openKeys: string[] | undefined
  changeOpenKeys: (key: any) => void
  closeKeys: (keys: any[]) => void
  inline: boolean
} | null>(null)

function Menu(props: MenuProps) {
  const {
    menus,
    openKeys: propsOpenKeys,
    onOpenKeysChange,
    type = 'horizontal',
    inline = false,
    ...rest
  } = props

  const [openKeys, setOpenKeys] = useStateListner(propsOpenKeys, onOpenKeysChange)

  const changeOpenKeys = (key: any) => {
    const prev = openKeys ?? []
    setOpenKeys(prev.includes(key) ? prev.filter((x) => x !== key) : [...prev, key])
  }
  const closeKeys = (keys: any[]) => {
    setOpenKeys(openKeys?.filter((x) => !keys.includes(x)) ?? [])
  }

  return (
    <MenuContext.Provider value={{ openKeys, changeOpenKeys, closeKeys, inline }}>
      {type === 'horizontal' ? (
        <MenuHorizontal {...rest} menus={menus} />
      ) : (
        <MenuVertical {...rest} menus={menus} />
      )}
    </MenuContext.Provider>
  )
}

function MenuHorizontal(props: MenuHorizontalProps) {
  const {
    menus,
    ...rest
  } = props

  const { openKeys, changeOpenKeys, closeKeys } = use(MenuContext)!

  return (
    <div
      {...rest}
      className={cls('ui-menu ui-menu-horizontal', props.className)}
    >
      {menus?.map(({ key, ...item }) => item.subMenus?.length ? (
        <Dropdown
          key={key}
          open={openKeys?.includes(key)}
          onOpenChange={() => changeOpenKeys(key)}
          onClick={(e) => {
            e.stopPropagation()
            const el = e.target as HTMLElement
            if (!el.classList.contains('ui-dropdown')) {
              closeKeys([key])
            }
          }}
          render={<MenuVertical menus={item.subMenus} parentKeys={[key]} />}
        >
          <MenuItem key={key} {...item} itemKey={key} />
        </Dropdown>
      ) : (
        <MenuItem key={key} {...item} itemKey={key} />
      ))}
    </div>
  )
}

function MenuVertical(props: MenuVerticalProps) {
  const {
    menus,
    parentKeys = [],
    ...rest
  } = props

  const { openKeys, changeOpenKeys, closeKeys, inline } = use(MenuContext)!

  return (
    <div
      {...rest}
      className={cls('ui-menu ui-menu-vertical', props.className)}
    >
      {menus?.map(({ key, ...item }) => item.subMenus?.length ? (
        inline ? (
          <React.Fragment key={key}>
            <MenuItem
              key={key}
              {...item}
              itemKey={key}
              onClick={(e: any) => {
                item.onClick?.(e)
                changeOpenKeys(key)
              }}
            />
            <div className='ui-menu-sub-menus'>
              <MenuVertical menus={item.subMenus} parentKeys={[...parentKeys, key]} />
            </div>
          </React.Fragment>
        ) : (
          <Popover
            key={key}
            position='right-top'
            open={openKeys?.includes(key)}
            onOpenChange={() => changeOpenKeys(key)}
            onClick={(e) => {
              e.stopPropagation()
              const el = e.target as HTMLElement
              if (!el.classList.contains('ui-popover')) {
                closeKeys([...parentKeys, key])
              }
            }}
            render={<MenuVertical menus={item.subMenus} parentKeys={[...parentKeys, key]} />}
          >
            <MenuItem key={key} {...item} itemKey={key} />
          </Popover>
        )
      ) : (
        <MenuItem key={key} {...item} itemKey={key} />
      ))}
    </div>
  )
}

function MenuItem(props: MenuItemProps) {
  const {
    itemKey,
    name,
    subMenus,
    as: Component = 'button',
    ...rest
  } = props

  const { openKeys } = use(MenuContext)!

  return (
    <Component
      {...rest}
      className={cls('ui-menu-item', {
        'ui-menu-open': openKeys?.includes(itemKey)
      }, props.className)}
    >
      {props.children ?? name}
    </Component>
  )
}

export default Menu
