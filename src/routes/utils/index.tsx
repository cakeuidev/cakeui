import React from 'react'
import Code from '../../common/Code'

const Methods = [
  {
    name: 'cls',
    code: `
function cls(
  ...args: (undefined | string | string[] | { [k: string]: any })[]
): string | undefined
    `
  },
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
  options?: boolean | AddEventListenerOptions
): void
    `
  },
  {
    name: 'useOutsideEvent',
    code: `
function useOutsideEvent(
  type: string,
  listener: EventListener,
  ref: React.RefObject<HTMLElement | null>
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
}
    `
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
}
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
  },
  {
    name: 'useProxy',
    code: `
function useProxy<T extends object>(initialState: T | (() => T)): T
    `
  }
]

function Utilities() {
  return (
    <>
      <h1>Utilities / Hooks</h1>
      <p>
        A collection of useful, dependency-free utility functions and React hooks.
        It offers a rich set of custom hooks for state management and browser Api interaction,
        complemented by practical helpers for tasks like conditional CSS class generation.
      </p>
      <h2>Methods</h2>
      <hr />
      <ul>
        {Methods.map((item) => (
          <React.Fragment key={item.name}>
            <li>
              <a href={`#${item.name.toLowerCase()}`}>{item.name}</a>
            </li>
          </React.Fragment>
        ))}
      </ul>
      {Methods.map((item) => (
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

export default Utilities
