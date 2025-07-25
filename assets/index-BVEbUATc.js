import{j as e,R as s}from"./index-BhGwPoyH.js";import{C as a}from"./Code-DlubJz15.js";const r={usage:`
import * as _ from '@cakeui/react/utils'
  `,methods:[{name:"cls",code:`
function cls(
  ...args: (undefined | string | string[] | { [k: string]: any })[]
): string | undefined
      `},{name:"uid",code:`
function uid(): string
      `},{name:"delay",code:`
function delay(delay: number): Promise<void>
      `},{name:"throttle",code:`
function throttle<T extends (...args: Parameters<T>) => any>(
  fn: T,
  delay?: number
): (...args: Parameters<T>) => void
      `},{name:"debounce",code:`
function debounce<T extends (...args: Parameters<T>) => any>(
  fn: T,
  delay?: number
): (...args: Parameters<T>) => void
      `}]};function i(){return e.jsxs(e.Fragment,{children:[e.jsx("h1",{children:"Utility Functions"}),e.jsx("p",{children:"A collection of lightweight, dependency-free utility functions."}),e.jsx("h2",{children:"Usage"}),e.jsx("hr",{}),e.jsx(a,{children:r.usage}),e.jsx("h2",{children:"Methods"}),e.jsx("hr",{}),e.jsx("ul",{children:r.methods.map(n=>e.jsx(s.Fragment,{children:e.jsx("li",{children:e.jsx("a",{href:`#${n.name.toLowerCase()}`,children:n.name})})},n.name))}),r.methods.map(n=>e.jsxs(s.Fragment,{children:[e.jsx("h2",{id:n.name.toLowerCase(),children:e.jsx("code",{children:n.name})}),e.jsx("hr",{}),e.jsx(a,{children:n.code})]},n.name))]})}export{i as default};
