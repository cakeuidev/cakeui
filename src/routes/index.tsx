import React, { use, useEffect, useMemo } from 'react'
import {
  useRouter, useProxy, useDocumentTitle, useFirstRender,
  cls, Button, Drawer, Icon, Layout, Menu, useThemeToggle,
} from '../../lib'
import { AppContext } from '../App'
import GithubSVG from '../assets/github.svg'
import GithubWhiteSVG from '../assets/github-white.svg'

const Title = 'Cake UI'
const Repo = 'https://github.com/cakeuidev/cakeui'
const HeaderMenus = [
  { key: '/docs/installation', name: 'Docs' },
  { key: '/components/button', name: 'Components' },
  { key: '/router', name: 'Router' },
  { key: '/utils', name: 'Utils' }
]
const SiderMenus = [
  {
    name: 'Getting Started',
    subMenus: [
      { key: '/docs/installation', name: 'Installation' }
    ]
  },
  {
    name: 'General',
    subMenus: [
      { key: '/components/button', name: 'Button' },
      { key: '/components/divider', name: 'Divider' },
      { key: '/components/icon', name: 'Icon' },
      { key: '/components/layout', name: 'Layout' },
      { key: '/components/progress', name: 'Progress' },
      { key: '/components/theme-toggle', name: 'ThemeToggle' }
    ]
  },
  {
    name: 'Overlay',
    subMenus: [
      { key: '/components/context-menu', name: 'ContextMenu' },
      { key: '/components/dialog', name: 'Dialog' },
      { key: '/components/drawer', name: 'Drawer' },
      { key: '/components/dropdown', name: 'Dropdown' },
      { key: '/components/menu', name: 'Menu' },
      { key: '/components/message', name: 'Message' },
      { key: '/components/overlay', name: 'Overlay' },
      { key: '/components/popover', name: 'Popover' }
    ]
  },
  {
    name: 'Data Display',
    subMenus: [
      { key: '/components/calendar', name: 'Calendar' },
      { key: '/components/card', name: 'Card' },
      { key: '/components/carousel', name: 'Carousel' },
      { key: '/components/collapse', name: 'Collapse' },
      { key: '/components/pagination', name: 'Pagination' },
      { key: '/components/table', name: 'Table' },
      { key: '/components/tabs', name: 'Tabs' },
      { key: '/components/virtual-scroll', name: 'VirtualScroll' },
      { key: '/components/data-table', name: 'DataTable' },
    ]
  },
  {
    name: 'Form Input',
    subMenus: [
      { key: '/components/form', name: 'Form' },
      { key: '/components/input', name: 'Input' },
      { key: '/components/input-number', name: 'InputNumber' },
      { key: '/components/textarea', name: 'Textarea' },
      { key: '/components/radio', name: 'Radio' },
      { key: '/components/checkbox', name: 'Checkbox' },
      { key: '/components/switch', name: 'Switch' },
      { key: '/components/slider', name: 'Slider' },
      { key: '/components/select', name: 'Select' },
      { key: '/components/date-picker', name: 'DatePicker' },
      { key: '/components/color-picker', name: 'ColorPicker' },
      { key: '/components/upload', name: 'Upload' }
    ]
  },
  {
    name: 'Others',
    subMenus: [
      { key: '/router', name: 'Router' },
      { key: '/utils', name: 'Utils' }
    ]
  }
]

function Home(props: React.PropsWithChildren) {
  const { pathname, navigate } = useRouter()!
  const { rwd, windowSize } = use(AppContext)!
  const firstRender = useFirstRender()
  const [theme, toggleTheme] = useThemeToggle()
  const state = useProxy({ menuOpen: false })

  useDocumentTitle(Title + ' - ' +
    pathname.split('/').slice(-1)[0].replace(/(?:^|-)([a-z])/g, (_, c) => c.toUpperCase())
  )

  const menus = useMemo(() => (
    HeaderMenus.map((item) => ({
      ...item,
      as: 'a',
      href: item.key,
      onClick: (e: Event) => {
        e.preventDefault()
        navigate(item.key)
      }
    }))
  ), [])
  const siderMenus = useMemo(() => {
    return SiderMenus.map((item) => ({
      key: item.name,
      ...item,
      as: 'div',
      className: 'app-menu-title',
      subMenus: item.subMenus?.map((item) => ({
        ...item,
        as: 'a',
        href: item.key,
        className: cls({ 'active': item.key === pathname }),
        onClick: (e: Event) => {
          e.preventDefault()
          navigate(item.key)
        }
      }))
    }))
  }, [pathname])

  useEffect(() => {
    const el = document.querySelector(`.app-sider a.active`)
    el?.scrollIntoView({ block: 'center' })
  },[])
  useEffect(() => {
    state.menuOpen = false
    if (pathname === '/') {
      navigate('/docs/installation')
      return
    }
    const el = document.querySelector('.app-sider a.active')
    el?.scrollIntoView({ block: 'nearest' })
  }, [pathname])
  useEffect(() => {
    if (windowSize.width >= rwd.md) {
      state.menuOpen = false
    }
  }, [windowSize.width, rwd.md])

  return (
    <Layout>
      <Layout.Header className='app-header'>
        <div>
          {!firstRender && windowSize.width >= rwd.md ? (
            <>
              <a className='app-home' href='/'>
                <img src={theme === 'light' ? '/favicon.svg' : '/favicon-white.svg'} />
                <span>{Title}</span>
              </a>
              <Menu className='app-menu' menus={menus} />
            </>
          ) : (
            <Button variant='icon' onClick={() => state.menuOpen = true}>
              <Icon>menu</Icon>
            </Button>
          )}
          <Drawer
            className='app-drawer'
            position='bottom'
            open={state.menuOpen}
            onClose={() => state.menuOpen = false}
          >
            <Drawer.Content className='app-sider'>
              <Menu
                className='app-menu'
                type='vertical'
                inline
                menus={[
                  { key: '/', name: 'Home', as: 'a', href: '/' },
                  ...menus,
                  ...siderMenus,
                ]}
                openKeys={siderMenus.map((item) => item.key)}
              />
            </Drawer.Content>
          </Drawer>
        </div>
        <div>
          <a className='app-link' href={Repo} target='_blank'>
            <img src={theme === 'light' ? GithubSVG : GithubWhiteSVG} />
          </a>
          <Button variant='icon' onClick={toggleTheme}>
            <Icon>{theme === 'light' ? 'dark_mode' : 'light_mode'}</Icon>
          </Button>
        </div>
      </Layout.Header>
      <Layout className='app-layout'>
        {!firstRender && windowSize.width >= rwd.md && (
          <Layout.Sider className='app-sider'>
            <Menu
              className='app-menu'
              type='vertical'
              inline
              menus={siderMenus}
              openKeys={siderMenus.map((item) => item.key)}
            />
          </Layout.Sider>
        )}
        <Layout.Main className='app-main'>
          <div className='app-container' style={{ maxWidth: rwd.lg }}>
            {props.children}
          </div>
        </Layout.Main>
      </Layout>
    </Layout>
  )
}

export default Home
