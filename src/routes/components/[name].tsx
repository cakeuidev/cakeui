import { useEffect } from 'react'
import { useRouter, useProxy, cls, Tabs, Icon, Popover } from '../../../lib'
import Code from '../../common/Code'
import Example from './_example'

function Component() {
  const { params, navigate } = useRouter()!
  const state = useProxy({
    name: '',
    showCode: false
  })
  const example = Example[state.name]

  useEffect(() => {
    const name = params.name.replace(/(?:^|-)([a-z])/g, (_, c) => c.toUpperCase())
    if (!name || !Example[name]) {
      navigate('/')
      return
    }
    state.name = ''
    state.showCode = false
    setTimeout(() => state.name = name)
  }, [params.name])

  return state.name && (
    <>
      <h1>{state.name}</h1>
      <Tabs
        className={cls('example-tabs', {
          'example-show-code': state.showCode
        })}
      >
        <Tabs.List>
          {example.examples.map((item) => (
            <Tabs.Trigger key={item.name}>{item.name}</Tabs.Trigger>
          ))}
        </Tabs.List>
        {example.examples.map(({ Component, ...item }) => (
          <Tabs.Content key={item.name}>
            <div className='example' hidden={state.showCode}>
              <Component />
            </div>
            <div hidden={!state.showCode}>
              <Code>{item.code}</Code>
            </div>
            <span className='example-icon'>
              <Icon button onClick={() => state.showCode = !state.showCode}>
                {state.showCode ? 'code_off' : 'code'}
              </Icon>
              <Popover className='example-icon-popover'>
                {state.showCode ? 'Hide Code' : 'Show Code'}
              </Popover>
            </span>
          </Tabs.Content>
        ))}
      </Tabs>
      <h3>Props</h3>
      <Code>{example.props}</Code>
    </>
  )
}

export default Component
