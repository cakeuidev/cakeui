import React, { use, useEffect, useState } from 'react'
import { AppContext } from '../App'
import { useRouter } from '../../lib/router'
import { useDocumentTitle } from '../../lib/hooks'
import { Drawer, Icon, Layout, Menu, useThemeToggle } from '../../lib/components'
import GithubSVG from '../assets/github.svg'
import GithubWhiteSVG from '../assets/github-white.svg'

const Title = 'Cake UI'
const Repo = 'https://github.com/cakeuidev/cakeui'
const HeaderMenus = [
  { key: '/docs/installation', name: 'Docs' },
  { key: '/components/button', name: 'Components' },
  { key: '/router', name: 'Router' },
  { key: '/hooks', name: 'Hooks' },
  { key: '/utils', name: 'Utils' }
]
const SiderMenus = [
  {
    name: 'Getting Started',
    children: [
      { key: '/docs/installation', name: 'Installation' }
    ]
  },
  {
    name: 'General',
    children: [
      { key: '/components/button', name: 'Button' },
      { key: '/components/divider', name: 'Divider' },
      { key: '/components/icon', name: 'Icon' },
      { key: '/components/layout', name: 'Layout' },
      { key: '/components/theme-toggle', name: 'ThemeToggle' }
    ]
  },
  {
    name: 'Overlay',
    children: [
      { key: '/components/context-menu', name: 'ContextMenu' },
      { key: '/components/dialog', name: 'Dialog' },
      { key: '/components/drawer', name: 'Drawer' },
      { key: '/components/dropdown', name: 'Dropdown' },
      { key: '/components/menu', name: 'Menu' },
      { key: '/components/message', name: 'Message' },
      { key: '/components/overlay', name: 'Overlay' },
      { key: '/components/popover', name: 'Popover' },
      { key: '/components/toast', name: 'Toast' }
    ]
  },
  {
    name: 'Data Display',
    children: [
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
    children: [
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
    children: [
      { key: '/router', name: 'Router' },
      { key: '/hooks', name: 'Hooks' },
      { key: '/utils', name: 'Utils' }
    ]
  }
]

function Home(props: React.PropsWithChildren) {
  const { rwd, windowSize, firstRender } = use(AppContext)!
  const { pathname, navigate } = useRouter()!
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, toggleTheme] = useThemeToggle()

  useDocumentTitle(Title + ' - ' +
    pathname.split('/').slice(-1)[0].replace(/(?:^|-)([a-z])/g, (_, c) => c.toUpperCase())
  )

  useEffect(() => {
    const el = document.querySelector('.app-sider .ui-menu-active')
    el?.scrollIntoView({ block: 'center' })
  },[])
  useEffect(() => {
    setMenuOpen(false)
    if (pathname === '/') {
      navigate('/docs/installation')
      return
    }
    const el = document.querySelector('.app-sider .ui-menu-active')
    el?.scrollIntoView({ block: 'nearest' })
  }, [pathname])
  useEffect(() => {
    if (windowSize.width >= rwd.md) {
      setMenuOpen(false)
    }
  }, [windowSize.width, rwd.md])

  const SiderMenu = (
    SiderMenus.map((menu) => (
      <React.Fragment key={menu.name}>
        <div className='app-menu-title'>{menu.name}</div>
        <Menu
          className='app-menu'
          menus={menu.children}
          activeKey={pathname}
          onChangeActiveKey={navigate}
          type='vertical'
        />
      </React.Fragment>
    ))
  )
  return (
    <Layout>
      <Layout.Header className='app-header'>
        <div>
          {windowSize.width >= rwd.md ? (
            <>
              <a className='app-home' href='/'>
                <img src={theme === 'light' ? '/favicon.svg' : '/favicon-white.svg'} />
                <span>{Title}</span>
              </a>
              <Menu
                className='app-menu'
                menus={HeaderMenus}
                activeKey={pathname}
                onChangeActiveKey={navigate}
              />
            </>
          ) : (
            <Icon className='cursor-pointer' onClick={() => setMenuOpen(true)}>Menu</Icon>
          )}
          <Drawer
            className='app-drawer'
            style={{ height: '80vh' }}
            open={menuOpen}
            onClose={() => setMenuOpen(false)}
            position='bottom'
          >
            <Drawer.Content>
              <Menu
                className='app-menu'
                menus={[{ key: '/', name: 'Home' }, ...HeaderMenus]}
                activeKey={pathname}
                onChangeActiveKey={navigate}
                type='vertical'
              />
              {SiderMenu}
            </Drawer.Content>
          </Drawer>
        </div>
        <div>
          <a className='app-icon' href={Repo} target='_blank'>
            <img src={theme === 'light' ? GithubSVG : GithubWhiteSVG} />
          </a>
          <Icon className='app-icon' onClick={toggleTheme}>
            {theme === 'light' ? 'light_mode' : 'dark_mode'}
          </Icon>
        </div>
      </Layout.Header>
      <Layout>
        {!firstRender && windowSize.width >= rwd.md && (
          <Layout.Sider className='app-sider'>{SiderMenu}</Layout.Sider>
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
