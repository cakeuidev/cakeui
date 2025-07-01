import React from 'react'
import Code from '../../common/Code'

const code = {
  usage: `
import * as _ from '@cakeui/react/utils'
  `,
  methods: [
    {
      name: 'cls',
      code: `
function cls(
  ...args: (undefined | string | string[] | { [k: string]: any })[]
): string | undefined
      `
    },
    {
      name: 'uid',
      code: `
function uid(): string
      `
    },
    {
      name: 'delay',
      code: `
function delay(delay: number): Promise<void>
      `
    },
    {
      name: 'throttle',
      code: `
function throttle<T extends (...args: Parameters<T>) => any>(
  fn: T,
  delay?: number
): (...args: Parameters<T>) => void
      `
    },
    {
      name: 'debounce',
      code: `
function debounce<T extends (...args: Parameters<T>) => any>(
  fn: T,
  delay?: number
): (...args: Parameters<T>) => void
      `
    }
  ]
}

function Utils() {
  return (
    <>
      <h1>Utility Functions</h1>
      <p>A collection of lightweight, dependency-free utility functions.</p>
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

export default Utils
