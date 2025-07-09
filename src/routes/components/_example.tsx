import { useCallback, useState } from 'react'
import * as UI from '../../../lib/components'

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
        name: 'Example',
        Component: () => {
          return (
            <UI.Button>Button</UI.Button>
          )
        },
        code: `
import { Button } from '@cakeui/react'

export default () => {
  return (
    <Button>Button</Button>
  )
}
        `
      }
    ],
    props: `
type ButtonProps = React.JSX.IntrinsicElements['button']
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
type DividerProps = React.JSX.IntrinsicElements['div'] & {
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
type IconProps = React.JSX.IntrinsicElements['span'] & {
  family?: string // default: 'Material Symbols Rounded'
  size?: number   // default: 20
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
type LayoutProps = React.JSX.IntrinsicElements['div']
type LayoutHeaderProps = React.JSX.IntrinsicElements['header']
type LayoutMainProps = React.JSX.IntrinsicElements['main']
type LayoutFooterProps = React.JSX.IntrinsicElements['header']
type LayoutSiderProps = React.JSX.IntrinsicElements['div']
    `
  },
  ThemeToggle: {
    examples: [
      {
        name: 'Example',
        Component: () => {
          const [theme, toggle] = UI.useThemeToggle()

          return (
            <UI.Icon style={{ cursor: 'pointer' }} onClick={toggle}>
              {theme === 'light' ? 'light_mode' : 'dark_mode'}
            </UI.Icon>
          )
        },
        code: `
import { Icon, useThemeToggle } from '@cakeui/react'

export default () => {
  const [theme, toggle] = useThemeToggle()

  return (
    <Icon style={{ cursor: 'pointer' }} onClick={toggle}>
      {theme === 'light' ? 'light_mode' : 'dark_mode'}
    </Icon>
  )
}
        `
      }
    ],
    props: `
function useThemeToggle(
  localStorageKey?: string // default: 'theme'
): [ThemeToggleValue, ThemeToggleFunction]

type ThemeToggleValue = 'light' | 'dark'
type ThemeToggleFunction = () => void
    `
  },
  ContextMenu: {
    examples: [
      {
        name: 'Example',
        Component: () => {
          const style: React.CSSProperties = {
            height: 200,
            width: 300,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid lightgray'
          }

          return (
            <div style={style}>
              Right click me
              <UI.ContextMenu>Content</UI.ContextMenu>
            </div>
          )
        },
        code: `
import { ContextMenu } from '@cakeui/react'

export default () => {
  const style: React.CSSProperties = {
    height: 200,
    width: 300,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
    border: '1px solid lightgray'
  }

  return (
    <div style={style}>
      Right click me
      <ContextMenu>Content</ContextMenu>
    </div>
  )
}
        `
      }
    ],
    props: `
type ContextMenuProps = React.JSX.IntrinsicElements['div'] & {
  onChangeOpen?: (open: boolean) => any
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
type DialogProps = React.JSX.IntrinsicElements['div'] & {
  open?: boolean
  onClose?: () => any
  overlay?: boolean         // default: true
  outsideClosable?: boolean // default: true
}
type DialogTitleProps = React.JSX.IntrinsicElements['div']
type DialogContentProps = React.JSX.IntrinsicElements['div']
type DialogFooterProps = React.JSX.IntrinsicElements['div']
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
type DrawerProps = React.JSX.IntrinsicElements['div'] & {
  open?: boolean
  onClose?: () => any
  position?: 'left' | 'right' | 'top' | 'bottom' // default: 'right'
  overlay?: boolean                              // default: true
  outsideClosable?: boolean                      // default: true
}
type DrawerTitleProps = React.JSX.IntrinsicElements['div']
type DrawerContentProps = React.JSX.IntrinsicElements['div']
type DrawerFooterProps = React.JSX.IntrinsicElements['div']
    `
  },
  Dropdown: {
    examples: [
      {
        name: 'Example',
        Component: () => {
          return (
            <UI.Dropdown>
              <UI.Dropdown.Trigger>Hover me</UI.Dropdown.Trigger>
              <UI.Dropdown.Content>Content</UI.Dropdown.Content>
            </UI.Dropdown>
          )
        },
        code: `
import { Dropdown } from '@cakeui/react'

export default () => {
  return (
    <Dropdown>
      <Dropdown.Trigger>Hover me</Dropdown.Trigger>
      <Dropdown.Content>Content</Dropdown.Content>
    </Dropdown>
  )
}
        `
      }
    ],
    props: `
type DropdownProps = React.JSX.IntrinsicElements['div'] & {
  open?: boolean
  onChangeOpen?: (open: boolean) => any
  trigger?: 'hover' | 'click'            // default: 'hover'
  position?: 'left' | 'right' | 'center' // default: 'left'
  offset?: number                        // default: 4
}
type DropdownTriggerProps = React.JSX.IntrinsicElements['div']
type DropdownContentProps = React.JSX.IntrinsicElements['div']
    `
  },
  Menu: {
    examples: [
      {
        name: 'Horizontal',
        Component: () => {
          const style: React.CSSProperties = {
            border: '1px solid lightgray'
          }
          const menus: UI.MenuItem[] = [
            { key: '1', name: 'Item 1' },
            { key: '2', name: 'Item 2' },
            {
              key: '3',
              name: 'Group 3',
              children: [
                { key: '3-1', name: 'Item 3-1' },
                { key: '3-2', name: 'Item 3-2' },
                { key: '3-3', name: 'Item 3-3' }
              ]
            }
          ]

          return (
            <UI.Menu style={style} menus={menus} />
          )
        },
        code: `
import { Menu, MenuItem } from '@cakeui/react'

export default () => {
  const style: React.CSSProperties = {
    border: '1px solid lightgray'
  }
  const menus: MenuItem[] = [
    { key: '1', name: 'Item 1' },
    { key: '2', name: 'Item 2' },
    {
      key: '3',
      name: 'Group 3',
      children: [
        { key: '3-1', name: 'Item 3-1' },
        { key: '3-2', name: 'Item 3-2' },
        { key: '3-3', name: 'Item 3-3' }
      ]
    }
  ]

  return (
    <Menu style={style} menus={menus} />
  )
}
        `
      },
      {
        name: 'Vertical',
        Component: () => {
          const style: React.CSSProperties = {
            border: '1px solid lightgray'
          }
          const menus: UI.MenuItem[] = [
            { key: '1', name: 'Item 1' },
            { key: '2', name: 'Item 2' },
            {
              key: '3',
              name: 'Group 3',
              children: [
                { key: '3-1', name: 'Item 3-1' },
                { key: '3-2', name: 'Item 3-2' },
                { key: '3-3', name: 'Item 3-3' }
              ]
            }
          ]

          return (
            <UI.Menu style={style} menus={menus} type='vertical' />
          )
        },
        code: `
import { Menu, MenuItem } from '@cakeui/react'

export default () => {
  const style: React.CSSProperties = {
    border: '1px solid lightgray'
  }
  const menus: MenuItem[] = [
    { key: '1', name: 'Item 1' },
    { key: '2', name: 'Item 2' },
    {
      key: '3',
      name: 'Group 3',
      children: [
        { key: '3-1', name: 'Item 3-1' },
        { key: '3-2', name: 'Item 3-2' },
        { key: '3-3', name: 'Item 3-3' }
      ]
    }
  ]

  return (
    <Menu style={style} menus={menus} type='vertical' />
  )
}
        `
      },
      {
        name: 'Inline',
        Component: () => {
          const style: React.CSSProperties = {
            border: '1px solid lightgray'
          }
          const menus: UI.MenuItem[] = [
            { key: '1', name: 'Item 1' },
            { key: '2', name: 'Item 2' },
            {
              key: '3',
              name: 'Group 3',
              children: [
                { key: '3-1', name: 'Item 3-1' },
                { key: '3-2', name: 'Item 3-2' },
                { key: '3-3', name: 'Item 3-3' }
              ]
            }
          ]

          return (
            <UI.Menu style={style} menus={menus} type='vertical' inline />
          )
        },
        code: `
import { Menu, MenuItem } from '@cakeui/react'

export default () => {
  const style: React.CSSProperties = {
    border: '1px solid lightgray'
  }
  const menus: MenuItem[] = [
    { key: '1', name: 'Item 1' },
    { key: '2', name: 'Item 2' },
    {
      key: '3',
      name: 'Group 3',
      children: [
        { key: '3-1', name: 'Item 3-1' },
        { key: '3-2', name: 'Item 3-2' },
        { key: '3-3', name: 'Item 3-3' }
      ]
    }
  ]

  return (
    <Menu style={style} menus={menus} type='vertical' inline />
  )
}
        `
      }
    ],
    props: `
type MenuProps = React.JSX.IntrinsicElements['div'] & {
  menus?: MenuItem[]
  openKeys?: string[]
  onChangeOpenKeys?: (keys: string[]) => any
  activeKey?: string
  onChangeActiveKey?: (key: string) => any
  type?: 'horizontal' | 'vertical' // default: 'horizontal'
  inline?: boolean                 // default: false
  indent?: number                  // default: 16
}
type MenuItem = {
  key: string
  name: React.ReactNode
  children?: MenuItem[]
  disabled?: boolean
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
function useMessage(options?: MessageOptions): [MessageAPI, React.ReactNode]

type MessageOptions = {
  position?: MessagePosition  // default: 'top
}
type MessageAPI = {
  open: (
    type: MessageType,        // default: ''
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
type OverlayProps = React.JSX.IntrinsicElements['div'] & {
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
            <UI.Button>
              Hover me
              <UI.Popover>Content</UI.Popover>
            </UI.Button>
          )
        },
        code: `
import { Button, Popover } from '@cakeui/react'

export default () => {
  return (
    <Button>
      Hover me
      <Popover>Content</Popover>
    </Button>
  )
}
        `
      }
    ],
    props: `
type PopoverProps = React.JSX.IntrinsicElements['div'] & {
  open?: boolean
  onChangeOpen?: (open: boolean) => any
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
  Toast: {
    examples: [
      {
        name: 'Example',
        Component: () => {
          const [toast, element] = UI.useToast()

          return (
            <>
              {element}
              <UI.Button onClick={() => toast.open('info', {
                title: 'Toast',
                description: 'Description'
              })}>
                Show Toast
              </UI.Button>
            </>
          )
        },
        code: `
import { Button, useToast } from '@cakeui/react'

export default () => {
  const [toast, element] = useToast()

  return (
    <>
      {element}
      <Button onClick={() => toast.open('info', {
        title: 'Toast',
        description: 'Description'
      })}>
        Show Toast
      </Button>
    </>
  )
}
        `
      }
    ],
    props: `
function useToast(options?: ToastOptions): [ToastAPI, React.ReactNode]

type ToastOptions = {
  position?: ToastPosition // default: 'top-right'
}
type ToastAPI = {
  open: (
    type: ToastType,       // default: ''
    body: ToastBody,
    duration?: number      // default: 5000
  ) => number
  close: (id: number) => void,
  clear: () => void
}
type ToastPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
type ToastType = '' | 'info' | 'success' | 'error' | 'warning' | 'loading'
type ToastBody = {
  title?: React.ReactNode
  description?: React.ReactNode
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
type CalendarProps = React.JSX.IntrinsicElements['div'] & {
  date?: dayjs.ConfigType
  onChangeDate?: (date: dayjs.Dayjs) => any
  arrows?: boolean // default: true
  minDate?: dayjs.ConfigType
  maxDate?: dayjs.ConfigType
  disabledDate?: (date: dayjs.Dayjs) => boolean
  monthRender?: (year: number, month: number) => React.ReactNode
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
type CardProps = React.JSX.IntrinsicElements['div']
type CardTitleProps = React.JSX.IntrinsicElements['div']
type CardContentProps = React.JSX.IntrinsicElements['div']
type CardFooterProps = React.JSX.IntrinsicElements['div']
    `
  },
  Carousel: {
    examples: [
      {
        name: 'Example',
        Component: () => {
          const [items] = useState(() => (
            Array.from(({ length: 5 })).map((_, i) => ({
              key: `${i + 1}`,
              content: `item ${i + 1}`
            }))
          ))

          return (
            <UI.Carousel style={{ height: 200 }} infinite arrows draggable>
              {items.map((item) => (
                <UI.Carousel.Item key={item.key} style={{ width: '50%' }}>
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
        <Carousel.Item key={item.key} style={{ width: '50%' }}>
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
type CarouselProps = React.JSX.IntrinsicElements['div'] & {
  activeKey?: string
  onChangeActiveKey?: (key: string) => any
  infinite?: boolean     // default: false
  arrows?: boolean       // default: false
  dots?: boolean         // default: true
  draggable?: boolean    // default: false
  autoplay?: boolean     // default: false
  autoplayDelay?: number // default: 3000
}
type CarouselItemProps = React.JSX.IntrinsicElements['div']
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
type CollapseProps = React.JSX.IntrinsicElements['div'] & {
  openKeys?: string[]
  onChangeOpenKeys?: (keys: string[]) => any
}
type CollapseItemProps = React.JSX.IntrinsicElements['div']
type CollapseTriggerProps = React.JSX.IntrinsicElements['div']
type CollapseContentProps = React.JSX.IntrinsicElements['div']
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
type PaginationProps = React.JSX.IntrinsicElements['div'] & {
  total?: number // default: 10
  page?: number
  onChangePage?: (page: number) => any
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
type TableProps = React.JSX.IntrinsicElements['table']
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
type TabsProps = React.JSX.IntrinsicElements['div'] & {
  activeKey?: string
  onChangeActiveKey?: (key: string) => any
  destroyInactive?: boolean // default: false
}
type TabsListProps = React.JSX.IntrinsicElements['div']
type TabsTriggerProps = React.JSX.IntrinsicElements['div']
type TabsContentProps = React.JSX.IntrinsicElements['div']
    `
  },
  VirtualScroll: {
    examples: [
      {
        name: 'Example',
        Component: () => {
          const style: React.CSSProperties = {
            height: 300,
            width: 300,
            border: '1px solid lightgray'
          }
          const rowHeight = useCallback(() => 60, [])
          const colWidth = useCallback(() => 60, [])

          return (
            <UI.VirtualScroll
              style={style}
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
  const style: React.CSSProperties = {
    height: 300,
    width: 300,
    border: '1px solid lightgray'
  }
  const rowHeight = useCallback(() => 60, [])
  const colWidth = useCallback(() => 60, [])

  return (
    <VirtualScroll
      style={style}
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
  React.JSX.IntrinsicElements['div'], 'children'
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
  const [fields] = useState<DataTable.Field[]>(() => [
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
  const [data] = useState<DataTable.DataItem[]>(() => (
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
  const [fields] = useState<DataTable.Field[]>(() => [
    {
      key: 'id',
      name: 'id',
      fixed: 'left'
    },
    ...Array.from({ length: 100 }).map((_, i) => ({
      key: \`key\${i + 1}\`,
      name: \`col \${i + 1}\`,
      resizable: true
    }))
  ])
  const [data] = useState<DataTable.DataItem[]>(() => (
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
  const [fields] = useState<DataTable.Field[]>(() => [
    {
      key: 'id',
      name: 'id',
      fixed: 'left'
    },
    ...Array.from({ length: 1000 }).map((_, i) => ({
      key: \`key\${i + 1}\`,
      name: \`col \${i + 1}\`,
      resizable: true
    }))
  ])
  const [data] = useState<DataTable.DataItem[]>(() => (
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
                [field.key]: `data ${i}-${j}`
              }), {}),
              id: i
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
  const [fields, setFields] = useState<DataTable.Field[]>(() => [
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
  const [data] = useState<DataTable.DataItem[]>(() => (
    Array.from({ length: 10 }).map((_, i) => ({
      ...fields.reduce((prev, field, j) => ({
        ...prev,
        [field.key]: \`data \${i}-\${j}\`
      }), {}),
      id: i
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
type DataTableProps = React.JSX.IntrinsicElements['div'] & {
  fields?: DataTableField[]
  data?: DataTableItem[]
  idKey?: string                      // default: 'id'
  gridlines?: boolean                 // default: true
  pageSize?: number
  page?: number
  onChangePage?: (page: number) => any
  virtualScroll?: boolean             // default: false
  overscan?: number
  fieldHeight?: number                // default: 32
  fieldWidth?: (field: DataTableField) => number
  itemHeight?: (item: DataTableItem) => number
  selection?: DataTableTarget
  onSelect?: (selection: DataTableTarget) => any
  onHover?: (hover: DataTableTarget) => any
  defaultSort?: DataTableSort
  sort?: DataTableSort
  onSort?: (sort: DataTableSort) => any
  defaultFilter?: DataTableFilter
  filter?: DataTableFilter
  onFilter?: (filter: DataTableFilter) => any
  filterMode?: 'and' | 'or'           // default: 'and'
  onResize?: (field: DataTableField, width: number) => any
  onDragField?: (result: DataTableDragResult) => any
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
              <UI.Form.Item colSpan={2} style={{ textAlign: 'center' }}>
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
      <Form.Item colSpan={2} style={{ textAlign: 'center' }}>
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
              <UI.Form onSubmit={() => message.open('success', 'Form submitted!')}>
                <UI.Form.Item
                  title='Username'
                  validate={(v: string) => {
                    if (!v) {
                      return 'Username is required.'
                    } else if (v.length < 8) {
                      return 'Username must be at least 8 characters.'
                    }
                  }}
                >
                  <UI.Form.Input name='username' />
                </UI.Form.Item>
                <UI.Form.Item
                  title='Password'
                  validate={(v: string) => {
                    if (!v) {
                      return 'Password is required.'
                    } else if (v.length < 8) {
                      return 'Password must be at least 8 characters.'
                    }
                  }}
                >
                  <UI.Form.Password name='password' />
                </UI.Form.Item>
                <UI.Form.Item colSpan={2} style={{ textAlign: 'center' }}>
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
      <Form onSubmit={() => message.open('success', 'Form submitted!')}>
        <Form.Item
          title='Username'
          validate={(v: string) => {
            if (!v) {
              return 'Username is required.'
            } else if (v.length < 8) {
              return 'Username must be at least 8 characters.'
            }
          }}
        >
          <Form.Input name='username' />
        </Form.Item>
        <Form.Item
          title='Password'
          validate={(v: string) => {
            if (!v) {
              return 'Password is required.'
            } else if (v.length < 8) {
              return 'Password must be at least 8 characters.'
            }
          }}
        >
          <Form.Password name='password' />
        </Form.Item>
        <Form.Item colSpan={2} style={{ textAlign: 'center' }}>
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
  React.JSX.IntrinsicElements['form'], 'onChange' | 'onSubmit'
> & {
  defaultValues?: FormValues
  values?: FormValues
  onChange?: (key: string, value: any) => any
  onSubmit?: (e: React.FormEvent<HTMLFormElement>, values: FormValues) => any
  cols?: number        // default: 1
  rowGap?: number      // default: 0
  colGap?: number      // default: 16
  colMinWidth?: number // default: 160
}
type FormItemProps = Omit<
  React.JSX.IntrinsicElements['div'], 'title'
> & {
  title?: React.ReactNode
  info?: React.ReactNode
  rowSpan?: number     // default: 1
  colSpan?: number     // default: 1
  validate?: (value: any) => string | undefined
}
type FormValues<T = { [k: string]: any }> = T
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
  React.JSX.IntrinsicElements['input'], 'defaultValue' | 'value' | 'onChange'
> & {
  defaultValue?: string
  value?: string
  onChange?: (event: CustomEvent<{ value: string }>) => any
  before?: React.ReactNode
  after?: React.ReactNode
}
type InputPasswordProps = Props & {
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
  React.JSX.IntrinsicElements['input'], 'defaultValue' | 'value' | 'onChange'
> & {
  defaultValue?: number
  value?: number
  onChange?: (event: CustomEvent<{ value: number }>) => any
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
  React.JSX.IntrinsicElements['textarea'], 'defaultValue' | 'value' | 'onChange'
> & {
  defaultValue?: string
  value?: string
  onChange?: (event: CustomEvent<{ value: string }>) => any
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
  React.JSX.IntrinsicElements['input'], 'defaultValue' | 'value' | 'onChange'
> & {
  defaultValue?: string
  value?: string
  onChange?: (event: CustomEvent<{ value: string }>) => any
}
type RadioGroupProps = Omit<
  React.JSX.IntrinsicElements['input'], 'defaultValue' | 'value' | 'onChange'
> & {
  defaultValue?: string
  value?: string
  onChange?: (event: CustomEvent<{ value: string }>) => any
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
  React.JSX.IntrinsicElements['input'], 'defaultValue' | 'value' | 'onChange'
> & {
  defaultValue?: string
  value?: string
  onChange?: (event: CustomEvent<{ value: string }>) => any
  indeterminate?: boolean // default: false
}
type CheckboxGroupProps = Omit<
  React.JSX.IntrinsicElements['input'], 'defaultValue' | 'value' | 'onChange'
> & {
  defaultValue?: string[]
  value?: string[]
  onChange?: (event: CustomEvent<{ value: string[] }>) => any
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
  React.JSX.IntrinsicElements['input'], 'defaultValue' | 'value' | 'onChange'
> & {
  defaultValue?: boolean
  value?: boolean
  onChange?: (event: CustomEvent<{ value: boolean }>) => any
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
  React.JSX.IntrinsicElements['input'], 'defaultValue' | 'value' | 'onChange'
> & {
  defaultValue?: number
  value?: number
  onChange?: (event: CustomEvent<{ value: number }>) => any
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
  React.JSX.IntrinsicElements['input'], 'defaultValue' | 'value' | 'onChange'
> & {
  open?: boolean
  onChangeOpen?: (open: boolean) => any
  options?: SelectOption[]
  optionsMaxHeight?: number
  clearable?: boolean
  before?: React.ReactNode
  after?: React.ReactNode
  optionRender?: (option: SelectOption) => React.ReactNode
  tagRender?: (option: SelectOption) => React.ReactNode
}
type SelectSingleProps = {
  multiple?: false
  defaultValue?: string
  value?: string
  onChange?: (event: CustomEvent<{ value: string }>) => any
}
type SelectMultipleProps = {
  multiple: true
  defaultValue?: string[]
  value?: string[]
  onChange?: (event: CustomEvent<{ value: string[] }>) => any
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
  React.JSX.IntrinsicElements['input'], 'defaultValue' | 'value' | 'onChange'
> & {
  defaultValue?: dayjs.ConfigType
  value?: dayjs.ConfigType
  onChange?: (event: CustomEvent<{ value: dayjs.Dayjs | null }>) => any
  open?: boolean
  onChangeOpen?: (open: boolean) => any
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
  footer?: React.ReactNode
  monthRender?: (year: number, month: number) => React.ReactNode
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
  React.JSX.IntrinsicElements['input'], 'defaultValue' | 'value' | 'onChange'
> & {
  defaultValue?: string
  value?: string
  onChange?: (event: CustomEvent<{ value: string }>) => any
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
  React.JSX.IntrinsicElements['input'], 'defaultValue' | 'value' | 'onChange'
> & {
  defaultValue?: File[]
  value?: File[]
  onChange?: (event: CustomEvent<{ value: File[] }>) => any
  max?: number
  trigger?: React.ReactNode
  fileRender?: (file: File) => React.ReactNode
}
    `
  }
}

export default Example
