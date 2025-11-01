import React from 'react'
import { cls } from '../../../utils'

export type LayoutProps = React.ComponentPropsWithRef<'div'>
export type LayoutHeaderProps = React.ComponentPropsWithRef<'header'>
export type LayoutMainProps = React.ComponentPropsWithRef<'main'>
export type LayoutFooterProps = React.ComponentPropsWithRef<'footer'>
export type LayoutSiderProps = React.ComponentPropsWithRef<'aside'>

function Layout(props: LayoutProps) {
  return (
    <div
      {...props}
      className={cls('ui-layout', props.className)}
    >
      {props.children}
    </div>
  )
}

function LayoutHeader(props: LayoutHeaderProps) {
  return (
    <header
      {...props}
      className={cls('ui-layout-header', props.className)}
    >
      {props.children}
    </header>
  )
}

function LayoutMain(props: LayoutMainProps) {
  return (
    <main
      {...props}
      className={cls('ui-layout-main', props.className)}
    >
      {props.children}
    </main>
  )
}

function LayoutFooter(props: LayoutFooterProps) {
  return (
    <footer
      {...props}
      className={cls('ui-layout-footer', props.className)}
    >
      {props.children}
    </footer>
  )
}

function LayoutSider(props: LayoutSiderProps) {
  return (
    <aside
      {...props}
      className={cls('ui-layout-sider', props.className)}
    >
      {props.children}
    </aside>
  )
}

Layout.Header = LayoutHeader
Layout.Main = LayoutMain
Layout.Footer = LayoutFooter
Layout.Sider = LayoutSider

export default Layout
