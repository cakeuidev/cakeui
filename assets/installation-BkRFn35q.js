import{j as t}from"./index-3zfdHyOq.js";import{C as e}from"./Code-Dsh90xe4.js";import"./proxy-BdWNTKhR.js";const n={installation:`
npm i @cakeui/react
  `,usage1:`
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '@cakeui/react/styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)
  `,usage2:`
import { Button } from '@cakeui/react'

function App() {
  return (
    <>
      <Button>Button</Button>
    </>
  )
}

export default App
  `};function s(){return t.jsxs(t.Fragment,{children:[t.jsx("h1",{children:"Get started with Cake UI"}),t.jsx("p",{children:"This guide will walk you through installing Cake UI and using your first component."}),t.jsx("h2",{children:"Installation"}),t.jsx("hr",{}),t.jsx(e,{lang:"bash",children:n.installation}),t.jsx("h2",{children:"Usage"}),t.jsx("hr",{}),t.jsx("p",{children:"Import the necessary CSS styles in the main entry point of your application."}),t.jsx(e,{children:n.usage1}),t.jsx("p",{children:"Use components in your React files."}),t.jsx(e,{children:n.usage2})]})}export{s as default};
