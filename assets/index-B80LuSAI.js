import{j as e,R as t}from"./index-3zfdHyOq.js";import{C as i}from"./Code-Dsh90xe4.js";import"./proxy-BdWNTKhR.js";const s=[{name:"cls",code:`
function cls(
  ...args: (undefined | string | string[] | { [k: string]: any })[]
): string | undefined
    `},{name:"useDocumentTitle",code:`
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
  options?: boolean | AddEventListenerOptions
): void
    `},{name:"useOutsideEvent",code:`
function useOutsideEvent(
  type: string,
  listener: EventListener,
  ref: React.RefObject<HTMLElement | null>
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
}
    `},{name:"useInterval",code:`
function useInterval(
  callback: () => any,
  delay?: number
): {
  start: () => void
  stop: () => void
}
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
    `},{name:"useProxy",code:`
function useProxy<T extends object>(initialState: T | (() => T)): T
    `}];function c(){return e.jsxs(e.Fragment,{children:[e.jsx("h1",{children:"Utilities / Hooks"}),e.jsx("p",{children:"A collection of useful, dependency-free utility functions and React hooks. It offers a rich set of custom hooks for state management and browser Api interaction, complemented by practical helpers for tasks like conditional CSS class generation."}),e.jsx("h2",{children:"Methods"}),e.jsx("hr",{}),e.jsx("ul",{children:s.map(n=>e.jsx(t.Fragment,{children:e.jsx("li",{children:e.jsx("a",{href:`#${n.name.toLowerCase()}`,children:n.name})})},n.name))}),s.map(n=>e.jsxs(t.Fragment,{children:[e.jsx("h2",{id:n.name.toLowerCase(),children:e.jsx("code",{children:n.name})}),e.jsx("hr",{}),e.jsx(i,{children:n.code})]},n.name))]})}export{c as default};
