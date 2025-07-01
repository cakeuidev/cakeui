import { useEffect, useState } from 'react'
import { useRouter } from '../../../lib/router'
import { cls } from '../../../lib/utils'
import { Tabs, Icon, Popover } from '../../../lib/components'
import Code from '../../common/Code'
import Example from './_example'

function Component() {
  const { params, navigate } = useRouter()!
  const [name, setName] = useState('')
  const [showCode, setShowCode] = useState(false)
  const example = Example[name]

  useEffect(() => {
    const name = params.name.replace(/(?:^|-)([a-z])/g, (_, c) => c.toUpperCase())
    if (!name || !Example[name]) {
      navigate('/')
      return
    }
    setName('')
    setShowCode(false)
    setTimeout(() => setName(name))
  }, [params.name])

  return name && (
    <>
      <h1>{name}</h1>
      <Tabs
        className={cls('example-tabs', {
          'example-show-code': showCode
        })}
      >
        <Tabs.List>
          {example.examples.map((item) => (
            <Tabs.Trigger key={item.name}>{item.name}</Tabs.Trigger>
          ))}
        </Tabs.List>
        {example.examples.map(({ Component, ...item }) => (
          <Tabs.Content key={item.name}>
            <div className='example' hidden={showCode}>
              <Component />
            </div>
            <div hidden={!showCode}>
              <Code>{item.code}</Code>
            </div>
            <span className='example-icon'>
              <Icon className='app-icon' onClick={() => setShowCode(!showCode)}>
                {showCode ? 'code_off' : 'code'}
              </Icon>
              <Popover className='example-icon-popover'>
                {showCode ? 'Hide Code' : 'Show Code'}
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
