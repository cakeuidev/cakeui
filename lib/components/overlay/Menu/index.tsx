import React, { use } from 'react'
import { cls } from '../../../utils/index.js'
import { useStateListner } from '../../tools'
import Icon from '../../general/Icon'
import Dropdown from '../Dropdown'
import Popover from '../Popover'

export type MenuProps = React.JSX.IntrinsicElements['div'] & {
  menus?: MenuItem[]
  openKeys?: string[]
  onChangeOpenKeys?: (keys: string[]) => any
  activeKey?: string
  onChangeActiveKey?: (key: string) => any
  type?: 'horizontal' | 'vertical'      // default: 'horizontal'
  inline?: boolean                      // default: false
  indent?: number                       // default: 16
}
export type MenuItem = {
  key: string
  name: React.ReactNode
  children?: MenuItem[]
  disabled?: boolean
}
type MenuHorizontalProps = {
  menus?: MenuItem[]
}
type MenuVerticalProps = {
  menus?: MenuItem[]
  parentKeys: string[]
  indent: number
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
    <div
      {...rest}
      className={cls('ui-menu', {
        [`ui-menu-${type}`]: type
      }, rest.className)}
    >
      <MenuContext.Provider value={{ openKeys, changeOpenKeys, closeKeys, activeKey, setActiveKey, inline, indent }}>
        {type === 'horizontal' ? (
          <MenuHorizontal menus={menus} />
        ) : (
          <MenuVertical menus={menus} parentKeys={[]} indent={indent} />
        )}
      </MenuContext.Provider>
    </div>
  )
}

function MenuHorizontal(props: MenuHorizontalProps) {
  const {
    menus
  } = props

  const { openKeys, changeOpenKeys, closeKeys, activeKey, setActiveKey, indent } = use(MenuContext)!

  return (
    <>
      {menus?.map((item) => item.children?.length ? (
        <Dropdown
          key={item.key}
          className={cls('ui-menu-group', {
            'ui-menu-open': openKeys?.includes(item.key),
            'ui-disabled': item.disabled
          })}
          open={openKeys?.includes(item.key)}
          onChangeOpen={() => changeOpenKeys(item.key)}
        >
          <Dropdown.Trigger className='ui-menu-group-title'>
            {item.name}
          </Dropdown.Trigger>
          <Dropdown.Content
            className='ui-menu-vertical'
            onClick={(e) => {
              e.stopPropagation()
              if ((e.target as HTMLElement).classList.contains('ui-menu-item')) {
                closeKeys([item.key])
              }
            }}
          >
            <MenuVertical
              menus={item.children}
              parentKeys={[item.key]}
              indent={indent}
            />
          </Dropdown.Content>
        </Dropdown>
      ) : (
        <div
          key={item.key}
          className={cls('ui-menu-item', {
            'ui-menu-active': item.key === activeKey,
            'ui-disabled': item.disabled
          })}
          onClick={() => setActiveKey(item.key)}
        >
          {item.name}
        </div>
      ))}
    </>
  )
}

function MenuVertical(props: MenuVerticalProps) {
  const {
    menus,
    parentKeys,
    indent: propsIndent
  } = props

  const { openKeys, closeKeys, changeOpenKeys, activeKey, setActiveKey, inline, indent } = use(MenuContext)!

  return (
    <>
      {menus?.map((item) => item.children?.length ? (
        <div
          key={item.key}
          className={cls('ui-menu-group', {
            'ui-menu-open': openKeys?.includes(item.key),
            'ui-disabled': item.disabled
          })}
        >
          <div
            className='ui-menu-group-title'
            style={{ paddingLeft: propsIndent }}
            onClick={() => inline && changeOpenKeys(item.key)}
          >
            <span>{item.name}</span>
            <Icon className={cls({ 'ui-menu-inline-icon': inline })}>
              {inline ? 'keyboard_arrow_down' : 'keyboard_arrow_right'}
            </Icon>
          </div>
          {inline ? (
            <div className='ui-menu-group-children'>
              <div>
                <MenuVertical
                  menus={item.children}
                  parentKeys={[...parentKeys, item.key]}
                  indent={propsIndent + indent}
                />
              </div>
            </div>
          ) : (
            <Popover
              className='ui-menu-vertical'
              position='right-top'
              open={openKeys?.includes(item.key)}
              onChangeOpen={() => changeOpenKeys(item.key)}
              onClick={(e) => {
                e.stopPropagation()
                if ((e.target as HTMLElement).classList.contains('ui-menu-item')) {
                  closeKeys([...parentKeys, item.key])
                }
              }}
            >
              <MenuVertical
                menus={item.children}
                parentKeys={[...parentKeys, item.key]}
                indent={indent}
              />
            </Popover>
          )}
        </div>
      ) : (
        <div
          key={item.key}
          className={cls('ui-menu-item', {
            'ui-menu-active': item.key === activeKey,
            'ui-disabled': item.disabled
          })}
          style={{ paddingLeft: propsIndent }}
          onClick={() => setActiveKey(item.key)}
        >
          {item.name}
        </div>
      ))}
    </>
  )
}

export default Menu
