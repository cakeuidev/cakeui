import React from 'react'
import { cls } from '../../../utils/index.js'

export type LayoutProps = React.JSX.IntrinsicElements['div']
export type LayoutHeaderProps = React.JSX.IntrinsicElements['header']
export type LayoutMainProps = React.JSX.IntrinsicElements['main']
export type LayoutFooterProps = React.JSX.IntrinsicElements['header']
export type LayoutSiderProps = React.JSX.IntrinsicElements['div']

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
    <div
      {...props}
      className={cls('ui-layout-sider', props.className)}
    >
      {props.children}
    </div>
  )
}

Layout.Header = LayoutHeader
Layout.Main = LayoutMain
Layout.Footer = LayoutFooter
Layout.Sider = LayoutSider

export default Layout
