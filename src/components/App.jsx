import React from 'react'

import Header from './Header'
import Main from './Main'
import Sidebar from './Sidebar'

import '../styles/App.styl'

const App = () => (
  [
    <Header key="header" />,
    <div className="content" key="content">
      <Sidebar />
      <Main />
    </div>,
  ]
)

export default App
