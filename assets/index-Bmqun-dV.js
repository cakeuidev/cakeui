import{j as e,R as s}from"./index-BhGwPoyH.js";import{C as o}from"./Code-DlubJz15.js";const t={usage:`
import * as _ from '@cakeui/react/hooks'
  `,methods:[{name:"useDocumentTitle",code:`
function useDocumentTitle(title: string): void
      `},{name:"useFirstRender",code:`
function useFirstRender(): boolean
      `},{name:"useFunction",code:`
function useFunction<T extends (...args: Parameters<T>) => ReturnType<T>>(
  fn: T
): (...args: Parameters<T>) => ReturnType<T>
      `},{name:"useEventListener",code:`
function useEventListener(
  type: string,
  listener: EventListener,
  ref?: React.RefObject<HTMLElement | null>,
  options?: boolean | AddEventListenerOptions
): void
      `},{name:"useClickOutside",code:`
function useClickOutside(
  ref: React.RefObject<HTMLElement | null>,
  listener: EventListener
): void
      `},{name:"useWindowSize",code:`
function useWindowSize(): {
  width: number
  height: number
}
      `},{name:"useResizeObserver",code:`
function useResizeObserver(
  ref: React.RefObject<HTMLElement | null>,
  callback: ResizeObserverCallback,
  options?: ResizeObserverOptions
): {
  observe: () => void
  disconnect: () => void
}
      `},{name:"useMutationObserver",code:`
function useMutationObserver(
  ref: React.RefObject<HTMLElement | null>,
  callback: MutationCallback,
  options?: MutationObserverInit
): {
  observe: () => void
  disconnect: () => void
}
      `},{name:"useIntersectionObserver",code:`
function useIntersectionObserver(
  ref: React.RefObject<HTMLElement | null>,
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
): {
  observe: () => void
  disconnect: () => void
}
      `},{name:"useTimeout",code:`
function useTimeout(
  callback: () => any,
  delay?: number
): {
  start: () => void
  stop: () => void
}`},{name:"useInterval",code:`
function useInterval(
  callback: () => any,
  delay?: number
): {
  start: () => void
  stop: () => void
}`},{name:"useThrottle",code:`
function useThrottle<T extends (...args: Parameters<T>) => any>(
  callback: T,
  delay?: number
): (...args: Parameters<T>) => void
      `},{name:"useDebounce",code:`
function useDebounce<T extends (...args: Parameters<T>) => any>(
  callback: T,
  delay?: number
): (...args: Parameters<T>) => void
      `},{name:"useLocalStorage",code:`
function useLocalStorage<T>(
  key: string,
  initialState?: T | (() => T)
): [T, React.Dispatch<React.SetStateAction<T>>]
      `},{name:"useSessionStorage",code:`
function useSessionStorage<T>(
  key: string,
  initialState?: T | (() => T)
): [T, React.Dispatch<React.SetStateAction<T>>]
      `}]};function i(){return e.jsxs(e.Fragment,{children:[e.jsx("h1",{children:"Hooks"}),e.jsx("p",{children:"A collection of useful, dependency-free React hooks. These hooks cover a wide range of common tasks, from DOM interactions and browser APIs to state management and performance optimization."}),e.jsx("h2",{children:"Usage"}),e.jsx("hr",{}),e.jsx(o,{children:t.usage}),e.jsx("h2",{children:"Methods"}),e.jsx("hr",{}),e.jsx("ul",{children:t.methods.map(n=>e.jsx(s.Fragment,{children:e.jsx("li",{children:e.jsx("a",{href:`#${n.name.toLowerCase()}`,children:n.name})})},n.name))}),t.methods.map(n=>e.jsxs(s.Fragment,{children:[e.jsx("h2",{id:n.name.toLowerCase(),children:e.jsx("code",{children:n.name})}),e.jsx("hr",{}),e.jsx(o,{children:n.code})]},n.name))]})}export{i as default};
