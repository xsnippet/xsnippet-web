import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App'

const rootElement = document.getElementById('root')
if (rootElement == null) {
  throw new Error('Root element was not found')
}

createRoot(rootElement).render(
  <App />,
)
