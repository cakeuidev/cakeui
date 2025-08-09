import React, { use } from 'react'
import { cls } from '../../../utils'
import { useStateListner } from '../../tools'
import Icon from '../../general/Icon'
import Dropdown from '../Dropdown'
import Popover from '../Popover'

export type MenuProps = React.JSX.IntrinsicElements['div'] & {
  menus?: MenuItem[]
  openKeys?: string[]
  onChangeOpenKeys?: (keys: string[]) => void
  activeKey?: string
  onChangeActiveKey?: (key: string) => void
  type?: 'horizontal' | 'vertical'  // default: 'horizontal'
  inline?: boolean                  // default: false
  indent?: number                   // default: 16
}
export type MenuItem = {
  key: string
  name: React.ReactNode
  children?: MenuItem[]
  disabled?: boolean
}
type MenuHorizontalProps = React.JSX.IntrinsicElements['div'] & {
  menus?: MenuItem[]
}
type MenuVerticalProps = React.JSX.IntrinsicElements['div'] & {
  menus?: MenuItem[]
  parentKeys?: string[]
  indent?: number
}

const MenuContext = React.createContext<{
  openKeys: string[] | undefined
  changeOpenKeys: (key: any) => void
  closeKeys: (keys: any[]) => void
  activeKey: any
  setActiveKey: (key: any) => void
  inline: boolean
  indent: number
} | null>(null)

function Menu(props: MenuProps) {
  const {
    menus,
    openKeys: propsOpenKeys,
    onChangeOpenKeys,
    activeKey: propsActiveKey,
    onChangeActiveKey,
    type = 'horizontal',
    inline = false,
    indent = 16,
    ...rest
  } = props

  const [openKeys, setOpenKeys] = useStateListner(propsOpenKeys, onChangeOpenKeys)
  const [activeKey, setActiveKey] = useStateListner(propsActiveKey, onChangeActiveKey)

  const changeOpenKeys = (key: any) => {
    const prev = openKeys ?? []
    setOpenKeys(prev.includes(key) ? prev.filter((x) => x !== key) : [...prev, key])
  }
  const closeKeys = (keys: any[]) => {
    setOpenKeys(openKeys?.filter((x) => !keys.includes(x)) ?? [])
  }

  return (
    <MenuContext.Provider value={{
      openKeys, changeOpenKeys, closeKeys,
      activeKey, setActiveKey,
      inline,
      indent
    }}>
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

  const {
    openKeys, changeOpenKeys, closeKeys,
    activeKey, setActiveKey
  } = use(MenuContext)!

  return (
    <div
      {...rest}
      className={cls('ui-menu ui-menu-horizontal', rest.className)}
    >
      {menus?.map((item) => item.children?.length ? (
        <Dropdown
          key={item.key}
          className={cls('ui-menu-group', {
            'ui-menu-open': openKeys?.includes(item.key),
            'ui-menu-disabled': item.disabled
          })}
          open={openKeys?.includes(item.key)}
          onChangeOpen={() => changeOpenKeys(item.key)}
        >
          <Dropdown.Trigger className='ui-menu-group-title'>
            {item.name}
          </Dropdown.Trigger>
          <Dropdown.Content
            onClick={(e) => {
              e.stopPropagation()
              const el = e.target as HTMLElement
              if (!el.classList.contains('ui-dropdown-content')) {
                closeKeys([item.key])
              }
            }}
          >
            <MenuVertical menus={item.children} parentKeys={[item.key]} />
          </Dropdown.Content>
        </Dropdown>
      ) : (
        <div
          key={item.key}
          className={cls('ui-menu-item', {
            'ui-menu-active': item.key === activeKey,
            'ui-menu-disabled': item.disabled
          })}
          onClick={() => setActiveKey(item.key)}
        >
          {item.name}
        </div>
      ))}
    </div>
  )
}

function MenuVertical(props: MenuVerticalProps) {
  const {
    menus,
    parentKeys = [],
    indent: propsIndent,
    ...rest
  } = props

  const {
    openKeys, closeKeys, changeOpenKeys,
    activeKey, setActiveKey,
    inline,
    indent
  } = use(MenuContext)!

  return (
    <div
      {...rest}
      className={cls('ui-menu ui-menu-vertical', {
        'ui-menu-inline': inline
      }, rest.className)}
    >
      {menus?.map((item) => item.children?.length ? (
        <div
          key={item.key}
          className={cls('ui-menu-group', {
            'ui-menu-open': openKeys?.includes(item.key)
          })}
        >
          <div
            className={cls('ui-menu-group-title', {
              'ui-menu-disabled': item.disabled
            })}
            style={{ paddingLeft: propsIndent }}
            onClick={() => inline && changeOpenKeys(item.key)}
          >
            <span>{item.name}</span>
            <Icon
              className={cls('ui-menu-icon', {
                'ui-menu-inline-icon': inline
              })}
            >
              {inline ? 'keyboard_arrow_down' : 'keyboard_arrow_right'}
            </Icon>
          </div>
          {inline ? (
            <div className='ui-menu-group-children'>
              <div>
                <MenuVertical
                  menus={item.children}
                  parentKeys={[...parentKeys, item.key]}
                  indent={(propsIndent ?? 0) + indent}
                />
              </div>
            </div>
          ) : (
            <Popover
              position='right-top'
              open={openKeys?.includes(item.key)}
              onChangeOpen={() => changeOpenKeys(item.key)}
              onClick={(e) => {
                e.stopPropagation()
                const el = e.target as HTMLElement
                if (!el.classList.contains('ui-popover')) {
                  closeKeys([...parentKeys, item.key])
                }
              }}
            >
              <MenuVertical
                menus={item.children}
                parentKeys={[...parentKeys, item.key]}
              />
            </Popover>
          )}
        </div>
      ) : (
        <div
          key={item.key}
          className={cls('ui-menu-item', {
            'ui-menu-active': item.key === activeKey,
            'ui-menu-disabled': item.disabled
          })}
          style={{ paddingLeft: propsIndent }}
          onClick={() => setActiveKey(item.key)}
        >
          {item.name}
        </div>
      ))}
    </div>
  )
}

export default Menu
