import React from 'react'
import Code from '../../common/Code'

const code = {
  usage: `
import * as _ from '@cakeui/react/hooks'
  `,
  methods: [
    {
      name: 'useDocumentTitle',
      code: `
function useDocumentTitle(title: string): void
      `
    },
    {
      name: 'useFirstRender',
      code: `
function useFirstRender(): boolean
      `
    },
    {
      name: 'useFunction',
      code: `
function useFunction<T extends (...args: Parameters<T>) => ReturnType<T>>(
  fn: T
): (...args: Parameters<T>) => ReturnType<T>
      `
    },
    {
      name: 'useEventListener',
      code: `
function useEventListener(
  type: string,
  listener: EventListener,
  ref?: React.RefObject<HTMLElement | null>,
  options?: boolean | AddEventListenerOptions
): void
      `
    },
    {
      name: 'useClickOutside',
      code: `
function useClickOutside(
  ref: React.RefObject<HTMLElement | null>,
  listener: EventListener
): void
      `
    },
    {
      name: 'useWindowSize',
      code: `
function useWindowSize(): {
  width: number
  height: number
}
      `
    },
    {
      name: 'useResizeObserver',
      code: `
function useResizeObserver(
  ref: React.RefObject<HTMLElement | null>,
  callback: ResizeObserverCallback,
  options?: ResizeObserverOptions
): {
  observe: () => void
  disconnect: () => void
}
      `
    },
    {
      name: 'useMutationObserver',
      code: `
function useMutationObserver(
  ref: React.RefObject<HTMLElement | null>,
  callback: MutationCallback,
  options?: MutationObserverInit
): {
  observe: () => void
  disconnect: () => void
}
      `
    },
    {
      name: 'useIntersectionObserver',
      code: `
function useIntersectionObserver(
  ref: React.RefObject<HTMLElement | null>,
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
): {
  observe: () => void
  disconnect: () => void
}
      `
    },
    {
      name: 'useTimeout',
      code: `
function useTimeout(
  callback: () => any,
  delay?: number
): {
  start: () => void
  stop: () => void
}`
    },
    {
      name: 'useInterval',
      code: `
function useInterval(
  callback: () => any,
  delay?: number
): {
  start: () => void
  stop: () => void
}`
    },
    {
      name: 'useThrottle',
      code: `
function useThrottle<T extends (...args: Parameters<T>) => any>(
  callback: T,
  delay?: number
): (...args: Parameters<T>) => void
      `
    },
    {
      name: 'useDebounce',
      code: `
function useDebounce<T extends (...args: Parameters<T>) => any>(
  callback: T,
  delay?: number
): (...args: Parameters<T>) => void
      `
    },
    {
      name: 'useLocalStorage',
      code: `
function useLocalStorage<T>(
  key: string,
  initialState?: T | (() => T)
): [T, React.Dispatch<React.SetStateAction<T>>]
      `
    },
    {
      name: 'useSessionStorage',
      code: `
function useSessionStorage<T>(
  key: string,
  initialState?: T | (() => T)
): [T, React.Dispatch<React.SetStateAction<T>>]
      `
    }
  ]
}

function Hooks() {
  return (
    <>
      <h1>Hooks</h1>
      <p>
        A collection of useful, dependency-free React hooks.
        These hooks cover a wide range of common tasks,
        from DOM interactions and browser APIs to state management and performance optimization.
      </p>
      <h2>Usage</h2>
      <hr />
      <Code>{code.usage}</Code>
      <h2>Methods</h2>
      <hr />
      <ul>
        {code.methods.map((item) => (
          <React.Fragment key={item.name}>
            <li>
              <a href={`#${item.name.toLowerCase()}`}>{item.name}</a>
            </li>
          </React.Fragment>
        ))}
      </ul>
      {code.methods.map((item) => (
        <React.Fragment key={item.name}>
          <h2 id={item.name.toLowerCase()}>
            <code>{item.name}</code>
          </h2>
          <hr />
          <Code>{item.code}</Code>
        </React.Fragment>
      ))}
    </>
  )
}

export default Hooks
