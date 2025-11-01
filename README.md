# Cake UI

A React UI library designed for intuitive use while providing deep customization capabilities.

[**Documentation**](https://cakeui.com)

## Installation

```bash
npm i @cakeui/react
```

## Usage

Import the necessary CSS styles in the main entry point of your application.

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '@cakeui/react/styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)
```

Use components in your React files.

```jsx
import { Button } from '@cakeui/react'

function App() {
  return (
    <>
      <Button>Button</Button>
    </>
  )
}

export default App
```
