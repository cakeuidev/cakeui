import { useEffect } from 'react'
import { useRouter, useProxy, Tabs, Icon, Popover, Button } from '../../../lib'
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
      <Tabs className='example-tabs'>
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
            <Popover
              className='example-popover'
              render={state.showCode ? 'Hide Code' : 'Show Code'}
            >
              <Button
                variant='icon'
                className='example-code'
                onClick={() => state.showCode = !state.showCode}
              >
                <Icon>{state.showCode ? 'code_off' : 'code'}</Icon>
              </Button>
            </Popover>
          </Tabs.Content>
        ))}
      </Tabs>
      <h3>Props</h3>
      <Code>{example.props}</Code>
    </>
  )
}

export default Component
