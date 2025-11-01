import { useCallback, useState } from 'react'
import * as UI from '../../../lib'

type ExampleType = {
  [k: string]: {
    examples: {
      name: string
      Component: React.FC
      code: string
    }[],
    props: string
  }
}

const Example: ExampleType = {
  Button: {
    examples: [
      {
        name: 'Outlined',
        Component: () => {
          return (
            <div style={{ display: 'flex', gap: 8 }}>
              <UI.Button variant='outlined'>Button</UI.Button>
              <UI.Button variant='filled'>Button</UI.Button>
              <UI.Button variant='text'>Button</UI.Button>
              <UI.Button variant='icon'><UI.Icon>home</UI.Icon></UI.Button>
            </div>
          )
        },
        code: `
import { Button, Icon } from '@cakeui/react'

export default () => {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <Button variant='outlined'>Button</Button>
      <Button variant='filled'>Button</Button>
      <Button variant='text'>Button</Button>
      <Button variant='icon'><Icon>home</Icon></Button>
    </div>
  )
}
        `
      }
    ],
    props: `
type ButtonProps = React.ComponentPropsWithRef<'button'> & {
  variant?: 'outlined' | 'filled' | 'text' | 'icon'            // default: outlined
  color?: 'default' | 'info' | 'success' | 'warning' | 'error' // default: 'default'
}
    `
  },
  Divider: {
    examples: [
      {
        name: 'Horizontal',
        Component: () => {
          return (
            <div style={{ width: '100%' }}>
              <div>Item 1</div>
              <UI.Divider />
              <div>Item 2</div>
            </div>
          )
        },
        code: `
import { Divider } from '@cakeui/react'

export default () => {
  return (
    <>
      <div>Item 1</div>
      <Divider />
      <div>Item 2</div>
    </>
  )
}
        `
      },
      {
        name: 'Vertical',
        Component: () => {
          return (
            <>
              <span>Item 1</span>
              <UI.Divider type='vertical' />
              <span>Item 2</span>
            </>
          )
        },
        code: `
import { Divider } from '@cakeui/react'

export default () => {
  return (
    <>
      <div>Item 1</div>
      <Divider type='vertical' />
      <div>Item 2</div>
    </>
  )
}
        `
      }
    ],
    props: `
type DividerProps = React.ComponentPropsWithRef<'div'> & {
  type?: 'horizontal' | 'vertical' // default: 'horizontal'
}
    `
  },
  Icon: {
    examples: [
      {
        name: 'Example',
        Component: () => {
          return (
            <UI.Icon>home</UI.Icon>
          )
        },
        code: `
import { Icon } from '@cakeui/react'

export default () => {
  return (
    <Icon>home</Icon>
  )
}
        `
      }
    ],
    props: `
// https://fonts.google.com/icons
type IconProps = React.ComponentPropsWithRef<'span'> & {
  family?: string  // default: 'Material Symbols Rounded'
  size?: number    // default: 20
}
    `
  },
  Layout: {
    examples: [
      {
        name: 'Example 1',
        Component: () => {
          return (
            <UI.Layout style={{ height: 300, border: '1px solid lightgray' }}>
              <UI.Layout.Header>Header</UI.Layout.Header>
              <UI.Layout>
                <UI.Layout.Sider>Sider</UI.Layout.Sider>
                <UI.Layout.Main>Main</UI.Layout.Main>
                <UI.Layout.Sider>Sider</UI.Layout.Sider>
              </UI.Layout>
              <UI.Layout.Footer>Footer</UI.Layout.Footer>
            </UI.Layout>
          )
        },
        code: `
import { Layout } from '@cakeui/react'

export default () => {
  return (
    <Layout>
      <Layout.Header>Header</Layout.Header>
      <Layout>
        <Layout.Sider>Sider</Layout.Sider>
        <Layout.Main>Main</Layout.Main>
        <Layout.Sider>Sider</Layout.Sider>
      </Layout>
      <Layout.Footer>Footer</Layout.Footer>
    </Layout>
  )
}
        `
      },
      {
        name: 'Example 2',
        Component: () => {
          return (
            <UI.Layout style={{ height: 300, border: '1px solid lightgray' }}>
              <UI.Layout.Sider>Sider</UI.Layout.Sider>
              <UI.Layout>
                <UI.Layout.Header>Header</UI.Layout.Header>
                <UI.Layout.Main>Main</UI.Layout.Main>
                <UI.Layout.Footer>Footer</UI.Layout.Footer>
              </UI.Layout>
              <UI.Layout.Sider>Sider</UI.Layout.Sider>
            </UI.Layout>
          )
        },
        code: `
import { Layout } from '@cakeui/react'

export default () => {
  return (
    <Layout>
      <Layout.Sider>Sider</Layout.Sider>
      <Layout>
        <Layout.Header>Header</Layout.Header>
        <Layout.Main>Main</Layout.Main>
        <Layout.Footer>Footer</Layout.Footer>
      </Layout>
      <Layout.Sider>Sider</Layout.Sider>
    </Layout>
  )
}
        `
      }
    ],
    props: `
type LayoutProps = React.ComponentPropsWithRef<'div'>
type LayoutHeaderProps = React.ComponentPropsWithRef<'header'>
type LayoutMainProps = React.ComponentPropsWithRef<'main'>
type LayoutFooterProps = React.ComponentPropsWithRef<'footer'>
type LayoutSiderProps = React.ComponentPropsWithRef<'aside'>
    `
  },
  ThemeToggle: {
    examples: [
      {
        name: 'Example',
        Component: () => {
          const [theme, toggle] = UI.useThemeToggle()

          return (
            <UI.Button variant='icon' onClick={toggle}>
              <UI.Icon>{theme === 'light' ? 'dark_mode' : 'light_mode'}</UI.Icon>
            </UI.Button>
          )
        },
        code: `
import { Icon, useThemeToggle } from '@cakeui/react'

export default () => {
  const [theme, toggle] = useThemeToggle()

  return (
    <Button variant='icon' onClick={toggle}>
      <Icon>{theme === 'light' ? 'dark_mode' : 'light_mode'}</Icon>
    </Button>
  )
}
        `
      }
    ],
    props: `
function useThemeToggle(
  localStorageKey?: string // default: 'theme'
): [ThemeToggleState, ThemeToggleFunction]

type ThemeToggleState = 'light' | 'dark'
type ThemeToggleFunction = () => void
    `
  },
  Progress: {
    examples: [
      {
        name: 'Example',
        Component: () => {
          return (
            <UI.Progress value={30} />
          )
        },
        code: `
import { Progress } from '@cakeui/react'

export default () => {
  return (
    <Progress value={30} />
  )
}
        `
      }
    ],
    props: `
type ProgressProps = React.ComponentPropsWithRef<'svg'> & {
  size?: number        // default: 100
  strokeWidth?: number // default: 8
  value?: number       // default: 0
  color?: string       // default: '#000000'
  text?: string
}
    `
  },
  ContextMenu: {
    examples: [
      {
        name: 'Example',
        Component: () => {
          return (
            <UI.ContextMenu render='Content'>
              <UI.Button>Right click me</UI.Button>
            </UI.ContextMenu>
          )
        },
        code: `
import { Button, ContextMenu } from '@cakeui/react'

export default () => {
  return (
    <ContextMenu render='Content'>
      <Button>Right click me</Button>
    </ContextMenu>
  )
}
        `
      }
    ],
    props: `
type ContextMenuProps = React.ComponentPropsWithRef<'div'> & {
  open?: boolean,
  onOpenChange?: (open: boolean) => void
  render?: React.ReactNode
}
    `
  },
  Dialog: {
    examples: [
      {
        name: 'Example',
        Component: () => {
          const [open, setOpen] = useState(false)

          return (
            <>
              <UI.Button onClick={() => setOpen(true)}>Open Dialog</UI.Button>
              <UI.Dialog open={open} onClose={() => setOpen(false)}>
                <UI.Dialog.Title>Title</UI.Dialog.Title>
                <UI.Dialog.Content>Content</UI.Dialog.Content>
                <UI.Dialog.Footer>Footer</UI.Dialog.Footer>
              </UI.Dialog>
            </>
          )
        },
        code: `
import { useState } from 'react'
import { Button, Dialog } from '@cakeui/react'

export default () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Dialog.Title>Title</Dialog.Title>
        <Dialog.Content>Content</Dialog.Content>
        <Dialog.Footer>Footer</Dialog.Footer>
      </Dialog>
    </>
  )
}
        `
      }
    ],
    props: `
type DialogProps = React.ComponentPropsWithRef<'div'> & {
  open?: boolean
  onClose?: () => void
  overlay?: boolean         // default: true
  outsideClosable?: boolean // default: true
}
type DialogTitleProps = React.ComponentPropsWithRef<'div'>
type DialogContentProps = React.ComponentPropsWithRef<'div'>
type DialogFooterProps = React.ComponentPropsWithRef<'div'>
    `
  },
  Drawer: {
    examples: [
      {
        name: 'Example',
        Component: () => {
          const [open, setOpen] = useState(false)

          return (
            <>
              <UI.Button onClick={() => setOpen(true)}>Open Drawer</UI.Button>
              <UI.Drawer open={open} onClose={() => setOpen(false)}>
                <UI.Drawer.Title>Title</UI.Drawer.Title>
                <UI.Drawer.Content>Content</UI.Drawer.Content>
                <UI.Drawer.Footer>Footer</UI.Drawer.Footer>
              </UI.Drawer>
            </>
          )
        },
        code: `
import { useState } from 'react'
import { Button, Drawer } from '@cakeui/react'

export default () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Drawer</Button>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Drawer.Title>Title</Drawer.Title>
        <Drawer.Content>Content</Drawer.Content>
        <Drawer.Footer>Footer</Drawer.Footer>
      </Drawer>
    </>
  )
}
        `
      }
    ],
    props: `
type DrawerProps = React.ComponentPropsWithRef<'div'> & {
  open?: boolean
  onClose?: () => void
  position?: 'left' | 'right' | 'top' | 'bottom' // default: 'right'
  overlay?: boolean                              // default: true
  outsideClosable?: boolean                      // default: true
}
type DrawerTitleProps = React.ComponentPropsWithRef<'div'>
type DrawerContentProps = React.ComponentPropsWithRef<'div'>
type DrawerFooterProps = React.ComponentPropsWithRef<'div'>
    `
  },
  Dropdown: {
    examples: [
      {
        name: 'Example',
        Component: () => {
          return (
            <UI.Dropdown render='Content'>
              <UI.Button>Hover me</UI.Button>
            </UI.Dropdown>
          )
        },
        code: `
import { Dropdown } from '@cakeui/react'

export default () => {
  return (
    <Dropdown render='Content'>
      <Button>Hover me</Button>
    </Dropdown>
  )
}
        `
      }
    ],
    props: `
type DropdownProps = React.ComponentPropsWithRef<'div'> & {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  render?: React.ReactNode
  trigger?: 'hover' | 'click'            // default: 'hover'
  position?: 'left' | 'right' | 'center' // default: 'left'
  offset?: number                        // default: 4
}
    `
  },
  Menu: {
    examples: [
      {
        name: 'Horizontal',
        Component: () => {
          const menus: UI.MenuItem[] = [
            { key: '1', name: 'Item 1' },
            { key: '2', name: 'Item 2' },
            {
              key: '3',
              name: 'Group 3',
              subMenus: [
                { key: '3-1', name: 'Item 3-1' },
                { key: '3-2', name: 'Item 3-2' },
                { key: '3-3', name: 'Item 3-3' }
              ]
            }
          ]

          return (
            <UI.Menu
              style={{ border: '1px solid lightgray' }}
              menus={menus}
            />
          )
        },
        code: `
import { Menu, MenuItem } from '@cakeui/react'

export default () => {
  const menus: MenuItem[] = [
    { key: '1', name: 'Item 1' },
    { key: '2', name: 'Item 2' },
    {
      key: '3',
      name: 'Group 3',
      subMenus: [
        { key: '3-1', name: 'Item 3-1' },
        { key: '3-2', name: 'Item 3-2' },
        { key: '3-3', name: 'Item 3-3' }
      ]
    }
  ]

  return (
    <Menu
      style={{ border: '1px solid lightgray' }}
      menus={menus}
    />
  )
}
        `
      },
      {
        name: 'Vertical',
        Component: () => {
          const menus: UI.MenuItem[] = [
            { key: '1', name: 'Item 1' },
            { key: '2', name: 'Item 2' },
            {
              key: '3',
              name: 'Group 3',
              subMenus: [
                { key: '3-1', name: 'Item 3-1' },
                { key: '3-2', name: 'Item 3-2' },
                { key: '3-3', name: 'Item 3-3' }
              ]
            }
          ]

          return (
            <UI.Menu
              style={{ border: '1px solid lightgray' }}
              menus={menus}
              type='vertical'
            />
          )
        },
        code: `
import { Menu, MenuItem } from '@cakeui/react'

export default () => {
  const menus: MenuItem[] = [
    { key: '1', name: 'Item 1' },
    { key: '2', name: 'Item 2' },
    {
      key: '3',
      name: 'Group 3',
      subMenus: [
        { key: '3-1', name: 'Item 3-1' },
        { key: '3-2', name: 'Item 3-2' },
        { key: '3-3', name: 'Item 3-3' }
      ]
    }
  ]

  return (
    <Menu
      style={{ border: '1px solid lightgray' }}
      menus={menus}
      type='vertical'
    />
  )
}
        `
      },
      {
        name: 'Inline',
        Component: () => {
          const menus: UI.MenuItem[] = [
            { key: '1', name: 'Item 1' },
            { key: '2', name: 'Item 2' },
            {
              key: '3',
              name: 'Group 3',
              subMenus: [
                { key: '3-1', name: 'Item 3-1' },
                { key: '3-2', name: 'Item 3-2' },
                { key: '3-3', name: 'Item 3-3' }
              ]
            }
          ]

          return (
            <UI.Menu
              style={{ border: '1px solid lightgray' }}
              menus={menus}
              type='vertical'
              inline
            />
          )
        },
        code: `
import { Menu, MenuItem } from '@cakeui/react'

export default () => {
  const menus: MenuItem[] = [
    { key: '1', name: 'Item 1' },
    { key: '2', name: 'Item 2' },
    {
      key: '3',
      name: 'Group 3',
      subMenus: [
        { key: '3-1', name: 'Item 3-1' },
        { key: '3-2', name: 'Item 3-2' },
        { key: '3-3', name: 'Item 3-3' }
      ]
    }
  ]

  return (
    <Menu
      style={{ border: '1px solid lightgray' }}
      menus={menus}
      type='vertical'
      inline
    />
  )
}
        `
      }
    ],
    props: `
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
    `
  },
  Message: {
    examples: [
      {
        name: 'Example',
        Component: () => {
          const [message, element] = UI.useMessage()

          return (
            <>
              {element}
              <UI.Button onClick={() => message.open('info', 'Message')}>
                Show Message
              </UI.Button>
            </>
          )
        },
        code: `
import { Button, useMessage } from '@cakeui/react'

export default () => {
  const [message, element] = useMessage()

  return (
    <>
      {element}
      <Button onClick={() => message.open('info', 'Message')}>
        Show Message
      </Button>
    </>
  )
}
        `
      }
    ],
    props: `
function useMessage(options?: MessageOptions): [MessageApi, React.ReactNode]

type MessageOptions = {
  position?: MessagePosition  // default: 'top
}
type MessageApi = {
  open: (
    type: MessageType,
    message: React.ReactNode,
    duration?: number         // default: 3000
  ) => void
  close: () => void
}
type MessagePosition = 'top' | 'bottom'
type MessageType = '' | 'info' | 'success' | 'error' | 'warning' | 'loading'
    `
  },
  Overlay: {
    examples: [
      {
        name: 'Example',
        Component: () => {
          const [open, setOpen] = useState(false)

          return (
            <>
              <UI.Button onClick={() => setOpen(true)}>Open Overlay</UI.Button>
              <UI.Overlay open={open} onClick={() => setOpen(false)} />
            </>
          )
        },
        code: `
import { useState } from 'react'
import { Button, Overlay } from '@cakeui/react'

export default () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Overlay</Button>
      <Overlay open={open} onClick={() => setOpen(false)} />
    </>
  )
}
        `
      }
    ],
    props: `
type OverlayProps = React.ComponentPropsWithRef<'div'> & {
  open?: boolean
}
    `
  },
  Popover: {
    examples: [
      {
        name: 'Example',
        Component: () => {
          return (
            <UI.Popover render='Content'>
              <UI.Button>Hover me</UI.Button>
            </UI.Popover>
          )
        },
        code: `
import { Button, Popover } from '@cakeui/react'

export default () => {
  return (
    <Popover render='Content'>
      <Button>Hover me</Button>
    </Popover>
  )
}
        `
      }
    ],
    props: `
type PopoverProps =React.ComponentPropsWithRef<'div'> & {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  render?: React.ReactNode
  trigger?: 'hover' | 'click'                   // default: 'hover'
  position?:                                    // default: 'top'
    'top' | 'top-left' | 'top-right' |
    'bottom' | 'bottom-left' | 'bottom-right' |
    'left' | 'left-top' | 'left-bottom' |
    'right' | 'right-top' | 'right-bottom'
  offset?: number                               // default: 4
}
    `
  },
  Calendar: {
    examples: [
      {
        name: 'Example',
        Component: () => {
          return (
            <UI.Calendar />
          )
        },
        code: `
import { Calendar } from '@cakeui/react'

export default () => {
  return (
    <Calendar />
  )
}
        `
      }
    ],
    props: `
type CalendarProps = React.ComponentPropsWithRef<'div'> & {
  month?: dayjs.ConfigType
  onMonthChange?: (month: dayjs.Dayjs) => void
  min?: dayjs.ConfigType // default: null
  max?: dayjs.ConfigType // default: null
  header?: React.ReactNode
  weekRender?: (week: number) => React.ReactNode
  dateRender?: (date: dayjs.Dayjs) => React.ReactNode
}
    `
  },
  Card: {
    examples: [
      {
        name: 'Example',
        Component: () => {
          return (
            <UI.Card>
              <UI.Card.Title>Title</UI.Card.Title>
              <UI.Card.Content>Content</UI.Card.Content>
              <UI.Card.Footer>Footer</UI.Card.Footer>
            </UI.Card>
          )
        },
        code: `
import { Card } from '@cakeui/react'

export default () => {
  return (
    <Card>
      <Card.Title>Title</Card.Title>
      <Card.Content>Content</Card.Content>
      <Card.Footer>Footer</Card.Footer>
    </Card>
  )
}
        `
      }
    ],
    props: `
type CardProps = React.ComponentPropsWithRef<'div'>
type CardTitleProps = React.ComponentPropsWithRef<'div'>
type CardContentProps = React.ComponentPropsWithRef<'div'>
type CardFooterProps = React.ComponentPropsWithRef<'div'>
    `
  },
  Carousel: {
    examples: [
      {
        name: 'Example',
        Component: () => {
          const [items] = useState(() => (
            Array.from(({ length: 5 })).map((_, i) => ({
              key: i + 1,
              content: `item ${i + 1}`
            }))
          ))

          return (
            <UI.Carousel style={{ height: 200 }} infinite arrows draggable>
              {items.map((item) => (
                <UI.Carousel.Item
                  key={item.key}
                  style={{
                    width: '50%',
                    border: '1px solid lightgray',
                    margin: 6,
                    padding: 8
                  }}
                >
                  {item.content}
                </UI.Carousel.Item>
              ))}
            </UI.Carousel>
          )
        },
        code: `
import { useState } from 'react'
import { Carousel } from '@cakeui/react'

export default () => {
  const [items] = useState(() => (
    Array.from(({ length: 5 })).map((_, i) => ({
      key: \`\${i + 1}\`,
      content: \`item \${i + 1}\`
    }))
  ))

  return (
    <Carousel style={{ height: 200 }} infinite arrows draggable>
      {items.map((item) => (
        <Carousel.Item
          key={item.key}
          style={{
            width: '50%',
            border: '1px solid lightgray',
            margin: 6,
            padding: 8
          }}
        >
          {item.content}
        </Carousel.Item>
      ))}
    </Carousel>
  )
}
        `
      }
    ],
    props: `
type CarouselProps = React.ComponentPropsWithRef<'div'> & {
  activeKey?: string
  onActiveKeyChange?: (key: string) => void
  infinite?: boolean     // default: false
  arrows?: boolean       // default: false
  dots?: boolean         // default: true
  draggable?: boolean    // default: false
  autoplay?: boolean     // default: false
  autoplayDelay?: number // default: 3000
}
type CarouselItemProps = React.ComponentPropsWithRef<'div'>
    `
  },
  Collapse: {
    examples: [
      {
        name: 'Example',
        Component: () => {
          const [items] = useState(() => (
            Array.from({ length: 3 }).map((_, i) => ({
              key: `${i + 1}`,
              trigger: `Trigger ${i + 1}`,
              content: `Content ${i + 1}`
            }))
          ))

          return (
            <UI.Collapse>
              {items.map((item) => (
                <UI.Collapse.Item key={item.key}>
                  <UI.Collapse.Trigger>{item.trigger}</UI.Collapse.Trigger>
                  <UI.Collapse.Content>{item.content}</UI.Collapse.Content>
                </UI.Collapse.Item>
              ))}
            </UI.Collapse>
          )
        },
        code: `
import { useState } from 'react'
import { Collapse } from '@cakeui/react'

export default () => {
  const [items] = useState(() => (
    Array.from({ length: 3 }).map((_, i) => ({
      key: \`\${i + 1}\`,
      trigger: \`Trigger \${i + 1}\`,
      content: \`Content \${i + 1}\`
    }))
  ))

  return (
    <Collapse>
      {items.map((item) => (
        <Collapse.Item key={item.key}>
          <Collapse.Trigger>{item.trigger}</Collapse.Trigger>
          <Collapse.Content>{item.content}</Collapse.Content>
        </Collapse.Item>
      ))}
    </Collapse>
  )
}
        `
      }
    ],
    props: `
type CollapseProps = React.ComponentPropsWithRef<'div'> & {
  openKeys?: string[]
  onOpenKeysChange?: (keys: string[]) => void
}
type CollapseItemProps = React.ComponentPropsWithRef<'div'>
type CollapseTriggerProps = React.ComponentPropsWithRef<'button'>
type CollapseContentProps = React.ComponentPropsWithRef<'div'>
    `
  },
  Pagination: {
    examples: [
      {
        name: 'Example',
        Component: () => {
          return (
            <UI.Pagination />
          )
        },
        code: `
import { Pagination } from '@cakeui/react'

export default () => {
  return (
    <Pagination />
  )
}
        `
      }
    ],
    props: `
type PaginationProps = React.ComponentPropsWithRef<'div'> & {
  total?: number // default: 10
  page?: number
  onPageChange?: (page: number) => void
}
    `
  },
  Table: {
    examples: [
      {
        name: 'Example',
        Component: () => {
          const [cols] = useState(() => (
            Array.from({ length: 3 }).map((_, i) => ({
              key: `key${i + 1}`,
              name: `col ${i + 1}`
            }))
          ))
          const [data] = useState<{ [k: string]: any }[]>(() => (
            Array.from({ length: 3 }).map((_, i) => ({
              id: i,
              ...cols.reduce((prev, curr, j) => ({
                ...prev,
                [curr.key]: `data ${i + 1}-${j + 1}`
              }), {})
            }))
          ))

          return (
            <UI.Table>
              <thead>
                <tr>
                  {cols.map((col) => (
                    <th key={col.key}>{col.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id}>
                    {cols.map((col) => (
                      <td key={col.key}>{item[col.key]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3} align='center'>footer</td>
                </tr>
              </tfoot>
            </UI.Table>
          )
        },
        code: `
import { useState } from 'react'
import { Table } from '@cakeui/react'

export default () => {
  const [cols] = useState(() => (
    Array.from({ length: 3 }).map((_, i) => ({
      key: \`key\${i + 1}\`,
      name: \`col \${i + 1}\`
    }))
  ))
  const [data] = useState<{ [k: string]: any }[]>(() => (
    Array.from({ length: 3 }).map((_, i) => ({
      id: i,
      ...cols.reduce((prev, curr, j) => ({
        ...prev,
        [curr.key]: \`data \${i + 1}-\${j + 1}\`
      }), {})
    }))
  ))

  return (
    <Table>
      <thead>
        <tr>
          {cols.map((col) => (
            <th key={col.key}>{col.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {cols.map((col) => (
              <td key={col.key}>{item[col.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={3} align='center'>footer</td>
        </tr>
      </tfoot>
    </Table>
  )
}
        `
      }
    ],
    props: `
type TableProps = React.ComponentPropsWithRef<'table'>
    `
  },
  Tabs: {
    examples: [
      {
        name: 'Example',
        Component: () => {
          const [items] = useState(() => (
            Array.from({ length: 3 }).map((_, i) => ({
              key: `${i + 1}`,
              trigger: `Tab ${i + 1}`,
              content: `Content ${i + 1}`
            }))
          ))

          return (
            <UI.Tabs>
              <UI.Tabs.List>
                {items.map((item) => (
                  <UI.Tabs.Trigger key={item.key}>{item.trigger}</UI.Tabs.Trigger>
                ))}
              </UI.Tabs.List>
              {items.map((item) => (
                <UI.Tabs.Content key={item.key}>{item.content}</UI.Tabs.Content>
              ))}
            </UI.Tabs>
          )
        },
        code: `
import { useState } from 'react'
import { Tabs } from '@cakeui/react'

export default () => {
  const [items] = useState(() => (
    Array.from({ length: 3 }).map((_, i) => ({
      key: \`\${i + 1}\`,
      trigger: \`Tab \${i + 1}\`,
      content: \`Content \${i + 1}\`
    }))
  ))

  return (
    <Tabs>
      <Tabs.List>
        {items.map((item) => (
          <Tabs.Trigger key={item.key}>{item.trigger}</Tabs.Trigger>
        ))}
      </Tabs.List>
      {items.map((item) => (
        <Tabs.Content key={item.key}>{item.content}</Tabs.Content>
      ))}
    </Tabs>
  )
}
        `
      }
    ],
    props: `
type TabsProps = React.ComponentPropsWithRef<'div'> & {
  activeKey?: string
  onActiveKeyChange?: (key: string) => void
  destroyInactive?: boolean // default: false
}
type TabsListProps = React.ComponentPropsWithRef<'div'>
type TabsTriggerProps<T extends React.ElementType = any> = React.ComponentPropsWithRef<T> & {
  as?: React.ElementType    // defaut: 'button'
}
type TabsContentProps = React.ComponentPropsWithRef<'div'>
    `
  },
  VirtualScroll: {
    examples: [
      {
        name: 'Example',
        Component: () => {
          const rowHeight = useCallback(() => 60, [])
          const colWidth = useCallback(() => 60, [])

          return (
            <UI.VirtualScroll
              style={{
                height: 300,
                width: 300,
                border: '1px solid lightgray'
              }}
              rowLength={100}
              colLength={100}
              rowHeight={rowHeight}
              colWidth={colWidth}
            >
              {(rowIndex, colIndex) => `${rowIndex}-${colIndex}`}
            </UI.VirtualScroll>
          )
        },
        code: `
import { useCallback } from 'react'
import { VirtualScroll } from '@cakeui/react'

export default () => {
  const rowHeight = useCallback(() => 60, [])
  const colWidth = useCallback(() => 60, [])

  return (
    <VirtualScroll
      style={{
        height: 300,
        width: 300,
        border: '1px solid lightgray'
      }}
      rowLength={100}
      colLength={100}
      rowHeight={rowHeight}
      colWidth={colWidth}
    >
      {(rowIndex, colIndex) => \`\${rowIndex}-\${colIndex}\`}
    </VirtualScroll>
  )
}
        `
      }
    ],
    props: `
type VirtualScrollProps = Omit<
  React.ComponentPropsWithRef<'div'>, 'children'
> & {
  rowLength?: number
  colLength?: number
  rowHeight?: (index: number) => number
  colWidth?: (index: number) => number
  children?: (rowIndex: number, colIndex: number) => React.ReactNode
  overscan?: number
}
    `
  },
  DataTable: {
    examples: [
      {
        name: 'Example',
        Component: () => {
          const [fields] = useState<UI.DataTableField[]>(() => [
            {
              key: 'id',
              name: 'id',
              fixed: 'left'
            },
            ...Array.from({ length: 10 }).map((_, i) => ({
              key: `key${i + 1}`,
              name: `col ${i + 1}`,
              resizable: true
            }))
          ])
          const [data] = useState<UI.DataTableItem[]>(() => (
            Array.from({ length: 10 }).map((_, i) => ({
              ...fields.reduce((prev, field, j) => ({
                ...prev,
                [field.key]: `data ${i + 1}-${j}`
              }), {}),
              id: i + 1
            }))
          ))

          return (
            <UI.DataTable
              style={{ height: 364 }}
              fields={fields}
              data={data}
            />
          )
        },
        code: `
import { useState } from 'react'
import { DataTable } from '@cakeui/react'

export default () => {
  const [fields] = useState<DataTableField[]>(() => [
    {
      key: 'id',
      name: 'id',
      fixed: 'left'
    },
    ...Array.from({ length: 10 }).map((_, i) => ({
      key: \`key\${i + 1}\`,
      name: \`col \${i + 1}\`,
      resizable: true
    }))
  ])
  const [data] = useState<DataTableItem[]>(() => (
    Array.from({ length: 10 }).map((_, i) => ({
      ...fields.reduce((prev, field, j) => ({
        ...prev,
        [field.key]: \`data \${i + 1}-\${j}\`
      }), {}),
      id: i + 1
    }))
  ))

  return (
    <DataTable
      style={{ height: 364 }}
      fields={fields}
      data={data}
    />
  )
}
        `
      },
      {
        name: 'Pagination',
        Component: () => {
          const [fields] = useState<UI.DataTableField[]>(() => [
            {
              key: 'id',
              name: 'id',
              fixed: 'left'
            },
            ...Array.from({ length: 10 }).map((_, i) => ({
              key: `key${i + 1}`,
              name: `col ${i + 1}`,
              resizable: true
            }))
          ])
          const [data] = useState<UI.DataTableItem[]>(() => (
            Array.from({ length: 100 }).map((_, i) => ({
              ...fields.reduce((prev, field, j) => ({
                ...prev,
                [field.key]: `data ${i + 1}-${j}`
              }), {}),
              id: i + 1
            }))
          ))

          return (
            <UI.DataTable
              style={{ height: 404 }}
              fields={fields}
              data={data}
              pageSize={10}
            />
          )
        },
        code: `
import { useState } from 'react'
import { DataTable } from '@cakeui/react'

export default () => {
  const [fields] = useState<DataTableField[]>(() => [
    {
      key: 'id',
      name: 'id',
      fixed: 'left'
    },
    ...Array.from({ length: 10 }).map((_, i) => ({
      key: \`key\${i + 1}\`,
      name: \`col \${i + 1}\`,
      resizable: true
    }))
  ])
  const [data] = useState<DataTableItem[]>(() => (
    Array.from({ length: 100 }).map((_, i) => ({
      ...fields.reduce((prev, field, j) => ({
        ...prev,
        [field.key]: \`data \${i + 1}-\${j}\`
      }), {}),
      id: i + 1
    }))
  ))

  return (
    <DataTable
      style={{ height: 404 }}
      fields={fields}
      data={data}
      pageSize={10}
    />
  )
}
        `
      },
      {
        name: 'VirtualScroll',
        Component: () => {
          const [fields] = useState<UI.DataTableField[]>(() => [
            {
              key: 'id',
              name: 'id',
              fixed: 'left'
            },
            ...Array.from({ length: 10 }).map((_, i) => ({
              key: `key${i + 1}`,
              name: `col ${i + 1}`,
              resizable: true
            }))
          ])
          const [data] = useState<UI.DataTableItem[]>(() => (
            Array.from({ length: 1000 }).map((_, i) => ({
              ...fields.reduce((prev, field, j) => ({
                ...prev,
                [field.key]: `data ${i + 1}-${j}`
              }), {}),
              id: i + 1
            }))
          ))

          return (
            <UI.DataTable
              style={{ height: 364 }}
              fields={fields}
              data={data}
              virtualScroll
            />
          )
        },
        code: `
import { useState } from 'react'
import { DataTable } from '@cakeui/react'

export default () => {
  const [fields] = useState<DataTableField[]>(() => [
    {
      key: 'id',
      name: 'id',
      fixed: 'left'
    },
    ...Array.from({ length: 10 }).map((_, i) => ({
      key: \`key\${i + 1}\`,
      name: \`col \${i + 1}\`,
      resizable: true
    }))
  ])
  const [data] = useState<DataTableItem[]>(() => (
    Array.from({ length: 1000 }).map((_, i) => ({
      ...fields.reduce((prev, field, j) => ({
        ...prev,
        [field.key]: \`data \${i + 1}-\${j}\`
      }), {}),
      id: i + 1
    }))
  ))

  return (
    <DataTable
      style={{ height: 364 }}
      fields={fields}
      data={data}
      virtualScroll
    />
  )
}
        `
      },
      {
        name: 'Draggable',
        Component: () => {
          const [fields, setFields] = useState<UI.DataTableField[]>(() => [
            {
              key: 'id',
              name: 'id',
              fixed: 'left'
            },
            ...Array.from({ length: 10 }).map((_, i) => ({
              key: `key${i + 1}`,
              name: `col ${i + 1}`,
              draggable: true
            }))
          ])
          const [data] = useState<UI.DataTableItem[]>(() => (
            Array.from({ length: 10 }).map((_, i) => ({
              ...fields.reduce((prev, field, j) => ({
                ...prev,
                [field.key]: `data ${i + 1}-${j}`
              }), {}),
              id: i + 1
            }))
          ))

          return (
            <UI.DataTable
              style={{ height: 364 }}
              fields={fields}
              data={data}
              onDragField={(result) => setFields(result.newFields)}
            />
          )
        },
        code: `
import { useState } from 'react'
import { DataTable } from '@cakeui/react'

export default () => {
  const [fields, setFields] = useState<DataTableField[]>(() => [
    {
      key: 'id',
      name: 'id',
      fixed: 'left'
    },
    ...Array.from({ length: 10 }).map((_, i) => ({
      key: \`key\${i + 1}\`,
      name: \`col \${i + 1}\`,
      draggable: true
    }))
  ])
  const [data] = useState<DataTableItem[]>(() => (
    Array.from({ length: 10 }).map((_, i) => ({
      ...fields.reduce((prev, field, j) => ({
        ...prev,
        [field.key]: \`data \${i + 1}-\${j}\`
      }), {}),
      id: i + 1
    }))
  ))

  return (
    <DataTable
      style={{ height: 364 }}
      fields={fields}
      data={data}
      onDragField={(result) => setFields(result.newFields)}
    />
  )
}
        `
      }
    ],
    props: `
type DataTableProps = React.ComponentPropsWithRef<'div'> & {
  fields?: DataTableField[]
  data?: DataTableItem[]
  idKey?: string                      // default: 'id'
  gridlines?: boolean                 // default: true
  pageSize?: number
  page?: number
  onPageChange?: (page: number) => void
  virtualScroll?: boolean             // default: false
  overscan?: number                   // default: 0
  fieldHeight?: number                // default: 32
  fieldWidth?: (field: DataTableField) => number
  itemHeight?: (item: DataTableItem) => number
  selection?: DataTableTarget
  onSelection?: (selection: DataTableTarget) => void
  onHover?: (hover: DataTableTarget) => void
  defaultSort?: DataTableSort
  sort?: DataTableSort
  onSort?: (sort: DataTableSort) => void
  defaultFilter?: DataTableFilter
  filter?: DataTableFilter
  onFilter?: (filter: DataTableFilter) => void
  filterMode?: 'and' | 'or'           // default: 'and'
  onResize?: (field: DataTableField, width: number) => void
  onDragField?: (result: DataTableDragResult) => void
  fieldRender?: (field: DataTableField) => React.ReactNode
  cellRender?: (field: DataTableField, item: DataTableItem) => React.ReactNode
  footer?: (field: DataTableField) => React.ReactNode
}
type DataTableField = {
  key: string
  name: string
  fixed?: 'left' | 'right'
  align?: 'left' | 'right' | 'center' // default: 'left'
  sortable?: boolean                  // default: true
  filterable?: boolean                // default: true
  filterOptions?: DataTableFilterOption[]
  resizable?: boolean                 // default: false
  draggable?: boolean                 // default: false
}
type DataTableItem = {
  [k: string]: any
}
type DataTableTarget = {
  key?: string
  id?: any
}
type DataTableSort = {
  key?: string
  order?: 'asc' | 'desc'
}
type DataTableFilter = {
  [k: string]: any[]
}
type DataTableFilterOption = {
  value: any,
  label: React.ReactNode
  rule?: (item: DataTableItem) => boolean
}
type DataTableDragResult = {
  newFields: DataTableField[]
  sourceField: DataTableField
  sourceIndex: number
  targetIndex: number
}
    `
  },
  Form: {
    examples: [
      {
        name: 'All Fields',
        Component: () => {
          return (
            <UI.Form cols={2}>
              <UI.Form.Item title='Text'>
                <UI.Form.Input name='text' />
              </UI.Form.Item>
              <UI.Form.Item title='Password'>
                <UI.Form.Password name='password' />
              </UI.Form.Item>
              <UI.Form.Item title='Number'>
                <UI.Form.InputNumber name='number' />
              </UI.Form.Item>
              <UI.Form.Item title='Textarea'>
                <UI.Form.Textarea name='textarea' autoRows />
              </UI.Form.Item>
              <UI.Form.Item title='Radio'>
                <UI.Form.Radio name='radio'>Radio</UI.Form.Radio>
              </UI.Form.Item>
              <UI.Form.Item title='Radio Group'>
                <UI.Form.RadioGroup
                  name='radioGroup'
                  options={[
                    { value: '1', label: 'radio 1' },
                    { value: '2', label: 'radio 2' },
                    { value: '3', label: 'radio 3' }
                  ]}
                />
              </UI.Form.Item>
              <UI.Form.Item title='Checkbox'>
                <UI.Form.Checkbox name='checkbox'>checkbox</UI.Form.Checkbox>
              </UI.Form.Item>
              <UI.Form.Item title='Checkbox Group'>
                <UI.Form.CheckboxGroup
                  name='checkboxGroup'
                  options={[
                    { value: '1', label: 'checkbox 1' },
                    { value: '2', label: 'checkbox 2' },
                    { value: '3', label: 'checkbox 3' }
                  ]}
                />
              </UI.Form.Item>
              <UI.Form.Item title='Switch'>
                <UI.Form.Switch name='switch' />
              </UI.Form.Item>
              <UI.Form.Item title='Slider'>
                <UI.Form.Slider name='slider' />
              </UI.Form.Item>
              <UI.Form.Item title='Select'>
                <UI.Form.Select
                  name='select'
                  options={[
                    { value: '1', label: 'option 1' },
                    { value: '2', label: 'option 2' },
                    { value: '3', label: 'option 3' }
                  ]}
                />
              </UI.Form.Item>
              <UI.Form.Item title='Select Multiple'>
                <UI.Form.Select
                  name='selectMultiple'
                  options={[
                    { value: '1', label: 'option 1' },
                    { value: '2', label: 'option 2' },
                    { value: '3', label: 'option 3' }
                  ]}
                  multiple
                />
              </UI.Form.Item>
              <UI.Form.Item title='Date'>
                <UI.Form.DatePicker name='date' />
              </UI.Form.Item>
              <UI.Form.Item title='Datetime'>
                <UI.Form.DatePicker name='datetime' type='datetime' />
              </UI.Form.Item>
              <UI.Form.Item title='Time'>
                <UI.Form.DatePicker name='time' type='time' />
              </UI.Form.Item>
              <UI.Form.Item title='Color'>
                <UI.Form.ColorPicker name='color' />
              </UI.Form.Item>
              <UI.Form.Item title='Upload'>
                <UI.Form.Upload name='upload' />
              </UI.Form.Item>
              <UI.Form.Item colSpan={2}>
                <UI.Form.Button>Submit</UI.Form.Button>
              </UI.Form.Item>
            </UI.Form>
          )
        },
        code: `
import { Form } from '@cakeui/react'

export default () => {
  return (
    <Form cols={2}>
      <Form.Item title='Text'>
        <Form.Input name='text' />
      </Form.Item>
      <Form.Item title='Password'>
        <Form.Password name='password' />
      </Form.Item>
      <Form.Item title='Number'>
        <Form.InputNumber name='number' />
      </Form.Item>
      <Form.Item title='Textarea'>
        <Form.Textarea name='textarea' autoRows />
      </Form.Item>
      <Form.Item title='Radio'>
        <Form.Radio name='radio' />
      </Form.Item>
      <Form.Item title='Radio Group'>
        <Form.RadioGroup
          name='radioGroup'
          options={[
            { value: '1', label: 'radio 1' },
            { value: '2', label: 'radio 2' },
            { value: '3', label: 'radio 3' }
          ]}
        />
      </Form.Item>
      <Form.Item title='Checkbox'>
        <Form.Checkbox name='checkbox'>checkbox</Form.Checkbox>
      </Form.Item>
      <Form.Item title='Checkbox Group'>
        <Form.CheckboxGroup
          name='checkboxGroup'
          options={[
            { value: '1', label: 'checkbox 1' },
            { value: '2', label: 'checkbox 2' },
            { value: '3', label: 'checkbox 3' }
          ]}
        />
      </Form.Item>
      <Form.Item title='Switch'>
        <Form.Switch name='switch' />
      </Form.Item>
      <Form.Item title='Slider'>
        <Form.Slider name='slider' />
      </Form.Item>
      <Form.Item title='Select'>
        <Form.Select
          name='select'
          options={[
            { value: '1', label: 'option 1' },
            { value: '2', label: 'option 2' },
            { value: '3', label: 'option 3' }
          ]}
        />
      </Form.Item>
      <Form.Item title='Select Multiple'>
        <Form.Select
          name='selectMultiple'
          options={[
            { value: '1', label: 'option 1' },
            { value: '2', label: 'option 2' },
            { value: '3', label: 'option 3' }
          ]}
          multiple
        />
      </Form.Item>
      <Form.Item title='Date'>
        <Form.DatePicker name='date' />
      </Form.Item>
      <Form.Item title='Datetime'>
        <Form.DatePicker name='datetime' type='datetime' />
      </Form.Item>
      <Form.Item title='Time'>
        <Form.DatePicker name='time' type='time' />
      </Form.Item>
      <Form.Item title='Color'>
        <Form.ColorPicker name='color' />
      </Form.Item>
      <Form.Item title='Upload'>
        <Form.Upload name='upload' />
      </Form.Item>
      <Form.Item colSpan={2}>
        <Form.Button>Submit</Form.Button>
      </Form.Item>
    </Form>
  )
}
        `
      },
      {
        name: 'Validation',
        Component: () => {
          const [message, element] = UI.useMessage()

          return (
            <>
              {element}
              <UI.Form
                onSubmit={() => message.open('success', 'Form submitted!')}
                onValidate={(key, value) => {
                  if (key === 'username') {
                    if (!value) {
                      return 'Username is required.'
                    }
                  }
                  if (key === 'password') {
                    if (!value) {
                      return 'Password is required.'
                    } else if (value.length < 8) {
                      return 'Password must be at least 8 characters.'
                    }
                  }
                }}
              >
                <UI.Form.Item title='Username'>
                  <UI.Form.Input name='username' />
                </UI.Form.Item>
                <UI.Form.Item title='Password'>
                  <UI.Form.Password name='password' />
                </UI.Form.Item>
                <UI.Form.Item colSpan={2}>
                  <UI.Form.Button>Submit</UI.Form.Button>
                </UI.Form.Item>
              </UI.Form>
            </>
          )
        },
        code: `
import { Form, useMessage } from '@cakeui/react'

export default () => {
  const [message, element] = useMessage()

  return (
    <>
      {element}
      <Form
        onSubmit={() => message.open('success', 'Form submitted!')}
        onValidate={(key, value) => {
          if (key === 'username') {
            if (!value) {
              return 'Username is required.'
            }
          }
          if (key === 'password') {
            if (!value) {
              return 'Password is required.'
            } else if (value.length < 8) {
              return 'Password must be at least 8 characters.'
            }
          }
        }}
      >
        <Form.Item title='Username'>
          <Form.Input name='username' />
        </Form.Item>
        <Form.Item title='Password'>
          <Form.Password name='password' />
        </Form.Item>
        <Form.Item colSpan={2}>
          <Form.Button>Submit</Form.Button>
        </Form.Item>
      </Form>
    </>
  )
}
        `
      }
    ],
    props: `
type FormProps = Omit<
  React.ComponentPropsWithRef<'form'>, 'onSubmit'
> & {
  defaultValues?: FormValues
  values?: FormValues
  onValuesChange?: (values: FormValues) => void
  onValidate?: (key: string, value: any) => (string | void) | Promise<string | void>
  onSubmit?: (event: React.FormEvent<HTMLFormElement>, values: any) => void
  cols?: number        // default: 1
  rowGap?: number      // default: 0
  colGap?: number      // default: 16
  colMinWidth?: number // default: 200
}
type FormItemProps = Omit<
  React.ComponentPropsWithRef<'div'>, 'title'
> & {
  title?: React.ReactNode
  info?: React.ReactNode
  rowSpan?: number     // default: 1
  colSpan?: number     // default: 1
}
type FormValues = {
  [k: string]: any
}
    `
  },
  Input: {
    examples: [
      {
        name: 'Text',
        Component: () => {
          return (
            <UI.Input />
          )
        },
        code: `
import { Input } from '@cakeui/react'

export default () => {
  return (
    <Input />
  )
}
        `
      },
      {
        name: 'Password',
        Component: () => {
          return (
            <UI.Input.Password />
          )
        },
        code: `
import { Input } from '@cakeui/react'

export default () => {
  return (
    <Input.Password />
  )
}
        `
      }
    ],
    props: `
type InputProps = Omit<
  React.ComponentPropsWithRef<'input'>, 'defaultValue' | 'value'
> & {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  before?: React.ReactNode
  after?: React.ReactNode
}
type InputPasswordProps = InputProps & {
  visibilityToggle?: boolean // default: true
}
    `
  },
  InputNumber: {
    examples: [
      {
        name: 'Example',
        Component: () => {
          return (
            <UI.InputNumber />
          )
        },
        code: `
import { InputNumber } from '@cakeui/react'

export default () => {
  return (
    <InputNumber />
  )
}
        `
      }
    ],
    props: `
type InputNumberProps = Omit<
  React.ComponentPropsWithRef<'input'>, 'defaultValue' | 'value'
> & {
  defaultValue?: number
  value?: number
  onValueChange?: (value: number | null) => void
  controls?: boolean // default: true
  before?: React.ReactNode
  after?: React.ReactNode
}
    `
  },
  Textarea: {
    examples: [
      {
        name: 'Example',
        Component: () => {
          return (
            <UI.Textarea />
          )
        },
        code: `
import { Textarea } from '@cakeui/react'

export default () => {
  return (
    <Textarea autoRows />
  )
}
        `
      },
      {
        name: 'Auto Rows',
        Component: () => {
          return (
            <UI.Textarea autoRows />
          )
        },
        code: `
import { Textarea } from '@cakeui/react'

export default () => {
  return (
    <Textarea />
  )
}
        `
      }
    ],
    props: `
type TextareaProps = Omit<
  React.ComponentPropsWithRef<'textarea'>, 'defaultValue' | 'value'
> &  {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  autoRows?: boolean // default: false
}
    `
  },
  Radio: {
    examples: [
      {
        name: 'Example',
        Component: () => {
          return (
            <UI.Radio>radio</UI.Radio>
          )
        },
        code: `
import { Radio } from '@cakeui/react'

export default () => {
  return (
    <Radio>radio</Radio>
  )
}
        `
      },
      {
        name: 'Group',
        Component: () => {
          const [options] = useState(() => (
            Array.from({ length: 3 }).map((_, i) => ({
              value: `${i + 1}`,
              label: `radio ${i + 1}`
            }))
          ))

          return (
            <UI.Radio.Group options={options} />
          )
        },
        code: `
import { useState } from 'react'
import { Radio } from '@cakeui/react'

export default () => {
  const [options] = useState(() => (
    Array.from({ length: 3 }).map((_, i) => ({
      value: \`\${i + 1}\`,
      label: \`radio \${i + 1}\`
    }))
  ))

  return (
    <Radio.Group options={options} />
  )
}
        `
      }
    ],
    props: `
type RadioProps = Omit<
  React.ComponentPropsWithRef<'input'>, 'defaultValue' | 'value'
> & {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
}
type RadioGroupProps = Omit<
  React.ComponentPropsWithRef<'input'>, 'defaultValue' | 'value'
> & {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  options?: RadioOption[]
}
type RadioOption = {
  value: string
  label: React.ReactNode
  disabled?: boolean
}

    `
  },
  Checkbox: {
    examples: [
      {
        name: 'Example',
        Component: () => {
          return (
            <UI.Checkbox>checkbox</UI.Checkbox>
          )
        },
        code: `
import { Checkbox } from '@cakeui/react'

export default () => {
  return (
    <Checkbox>checkbox</Checkbox>
  )
}
        `
      },
      {
        name: 'Group',
        Component: () => {
          const [options] = useState(() => (
            Array.from({ length: 3 }).map((_, i) => ({
              value: `${i + 1}`,
              label: `checkbox ${i + 1}`
            }))
          ))

          return (
            <UI.Checkbox.Group options={options} />
          )
        },
        code: `
import { useState } from 'react'
import { Checkbox } from '@cakeui/react'

export default () => {
  const [options] = useState(() => (
    Array.from({ length: 3 }).map((_, i) => ({
      value: \`\${i + 1}\`,
      label: \`checkbox \${i + 1}\`
    }))
  ))

  return (
    <Checkbox.Group options={options} />
  )
}
        `
      }
    ],
    props: `
type CheckboxProps = Omit<
  React.ComponentPropsWithRef<'input'>, 'defaultValue' | 'value'
> & {
  defaultValue?: boolean
  value?: boolean
  onValueChange?: (value: boolean) => void
  indeterminate?: boolean // default: false
}
type CheckboxGroupProps = Omit<
  React.ComponentPropsWithRef<'input'>, 'defaultValue' | 'value'
> & {
  defaultValue?: string[]
  value?: string[]
  onValueChange?: (value: string[]) => void
  options?: CheckboxOption[]
}
type CheckboxOption = {
  value: string
  label: React.ReactNode
  disabled?: boolean
}
    `
  },
  Switch: {
    examples: [
      {
        name: 'Example',
        Component: () => {
          return (
            <UI.Switch />
          )
        },
        code: `
import { Switch } from '@cakeui/react'

export default () => {
  return (
    <Switch />
  )
}
        `
      }
    ],
    props: `
type SwitchProps = Omit<
  React.ComponentPropsWithRef<'input'>, 'defaultValue' | 'value'
> & {
  defaultValue?: boolean
  value?: boolean
  onValueChange?: (value: boolean) => void
}
    `
  },
  Slider: {
    examples: [
      {
        name: 'Example',
        Component: () => {
          return (
            <UI.Slider />
          )
        },
        code: `
import { Slider } from '@cakeui/react'

export default () => {
  return (
    <Slider />
  )
}
        `
      }
    ],
    props: `
type SliderProps = Omit<
  React.ComponentPropsWithRef<'input'>, 'defaultValue' | 'value'
> & {
  defaultValue?: number
  value?: number
  onValueChange?: (value: number | null) => void
}
    `
  },
  Select: {
    examples: [
      {
        name: 'Single',
        Component: () => {
          const [options] = useState(() => (
            Array.from({ length: 5 }).map((_, i) => ({
              value: `${i + 1}`,
              label: `Option ${i + 1}`
            }))
          ))

          return (
            <UI.Select options={options} />
          )
        },
        code: `
import { useState } from 'react'
import { Select } from '@cakeui/react'

export default () => {
  const [options] = useState(() => (
    Array.from({ length: 5 }).map((_, i) => ({
      value: \`\${i + 1}\`,
      label: \`Option \${i + 1}\`
    }))
  ))

  return (
    <Select options={options} />
  )
}
        `
      },
      {
        name: 'Multiple',
        Component: () => {
          const [options] = useState(() => (
            Array.from({ length: 5 }).map((_, i) => ({
              value: `${i + 1}`,
              label: `Option ${i + 1}`
            }))
          ))

          return (
            <UI.Select options={options} multiple />
          )
        },
        code: `
import { useState } from 'react'
import { Select } from '@cakeui/react'

export default () => {
  const [options] = useState(() => (
    Array.from({ length: 5 }).map((_, i) => ({
      value: \`\${i + 1}\`,
      label: \`Option \${i + 1}\`
    }))
  ))

  return (
    <Select options={options} multiple />
  )
}
        `
      }
    ],
    props: `
type SelectProps = SelectCommonProps & (SelectSingleProps | SelectMultipleProps)
type SelectCommonProps = Omit<
  React.ComponentPropsWithRef<'input'>, 'defaultValue' | 'value'
> & {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  options?: SelectOption[]
  clearable?: boolean  // default: true
  before?: React.ReactNode
  after?: React.ReactNode
  optionRender?: (option: SelectOption) => React.ReactNode
  tagRender?: (option: SelectOption) => React.ReactNode
}
type SelectSingleProps = {
  multiple?: false
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
}
type SelectMultipleProps = {
  multiple: true
  defaultValue?: string[]
  value?: string[]
  onValueChange?: (value: string[]) => void
}
type SelectOption = {
  value: string
  label: string
  disabled?: boolean
}
    `
  },
  DatePicker: {
    examples: [
      {
        name: 'Date',
        Component: () => {
          return (
            <UI.DatePicker />
          )
        },
        code: `
import { DatePicker } from '@cakeui/react'

export default () => {
  return (
    <DatePicker />
  )
}
        `
      },
      {
        name: 'Datetime',
        Component: () => {
          return (
            <UI.DatePicker type='datetime' />
          )
        },
        code: `
import { DatePicker } from '@cakeui/react'

export default () => {
  return (
    <DatePicker type='datetime' />
  )
}
        `
      },
      {
        name: 'Time',
        Component: () => {
          return (
            <UI.DatePicker type='time' />
          )
        },
        code: `
import { DatePicker } from '@cakeui/react'

export default () => {
  return (
    <DatePicker type='time' />
  )
}
        `
      }
    ],
    props: `
type DatePickerProps = Omit<
  React.ComponentPropsWithRef<'input'>, 'defaultValue' | 'value'
> & {
  defaultValue?: dayjs.ConfigType
  value?: dayjs.ConfigType
  onValueChange?: (value: dayjs.Dayjs | null) => void
  open?: boolean
  onOpenChange?: (open: boolean) => void
  type?: 'date' | 'datetime' | 'time' // default: 'date'
  format?: string
  showSeconds?: boolean               // default: false
  use12Hour?: boolean                 // default: true
  minDate?: dayjs.ConfigType
  maxDate?: dayjs.ConfigType
  disabledDate?: (date: dayjs.Dayjs) => boolean
  disabledHours?: () => number[]
  disabledMinutes?: (hour?: number) => number[]
  disabledSeconds?: (hour?: number, minute?: number) => number[]
  hideDisabled?: boolean              // default: false
  clearable?: boolean                 // default: true
  before?: React.ReactNode
  after?: React.ReactNode
  header?: React.ReactNode
  footer?: React.ReactNode
  weekRender?: (week: number) => React.ReactNode
  dateRender?: (date: dayjs.Dayjs) => React.ReactNode
  timeRender?: (type: 'hour' | 'minute' | 'second', n: number) => React.ReactNode
}
    `
  },
  ColorPicker: {
    examples: [
      {
        name: 'Example',
        Component: () => {
          return (
            <UI.ColorPicker />
          )
        },
        code: `
import { ColorPicker } from '@cakeui/react'

export default () => {
  return (
    <ColorPicker />
  )
}
        `
      }
    ],
    props: `
type ColorPickerProps = Omit<
  React.ComponentPropsWithRef<'input'>, 'defaultValue' | 'value'
> & {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
}
    `
  },
  Upload: {
    examples: [
      {
        name: 'Example',
        Component: () => {
          return (
            <UI.Upload />
          )
        },
        code: `
import { Upload } from '@cakeui/react'

export default () => {
  return (
    <Upload />
  )
}
        `
      }
    ],
    props: `
type UploadProps = Omit<
  React.ComponentPropsWithRef<'input'>, 'defaultValue' | 'value'
> & {
  defaultValue?: File[]
  value?: File[]
  onValueChange?: (value: File[]) => void
  trigger?: React.ReactNode
  fileRender?: (file: File) => React.ReactNode
}
    `
  }
}

export default Example
