import Code from '../../common/Code'

const code = {
  installation: `
npm i @cakeui/react
  `,
  usage1: `
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '@cakeui/react/styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)
  `,
  usage2: `
import { Button } from '@cakeui/react'

function App() {
  return (
    <>
      <Button>Button</Button>
    </>
  )
}

export default App
  `
}

function Installation() {
  return (
    <>
      <h1>Get started with Cake UI</h1>
      <p>This guide will walk you through installing Cake UI and using your first component.</p>
      <h2>Installation</h2>
      <hr />
      <Code lang='bash'>{code.installation}</Code>
      <h2>Usage</h2>
      <hr />
      <p>Import the necessary CSS styles in the main entry point of your application.</p>
      <Code>{code.usage1}</Code>
      <p>Use components in your React files.</p>
      <Code>{code.usage2}</Code>
    </>
  )
}

export default Installation
