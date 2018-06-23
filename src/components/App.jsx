import React from 'react'

import Header from './Header'
import Main from './Main'
import Sidebar from './Sidebar'
import Spinner from './common/Spinner'
import conf from '../conf'

import '../styles/App.styl'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
    }

    fetch(process.env.RUNTIME_CONF_URI)
      .then((response) => {
        if (response.status === 404) {
          return {}
        }
        return response.json()
      })
      .then(json => Object.assign(conf, json))
      .then(() => this.setState({ isLoading: false }))

    // AceEditor's modes (aka syntaxes) are pretty heavy, and since they are
    // not essential, we better download them asynchronously when the app is
    // loaded and ready to be used.
    for (const syntax of process.env.SYNTAXES) {
      import(`brace/mode/${syntax}.js`)
    }
  }

  render() {
    if (this.state.isLoading) {
      return <Spinner />
    }

    return [
      <Header key="header" />,
      <div className="content" key="content">
        <Sidebar />
        <Main />
      </div>,
    ]
  }
}

export default App
