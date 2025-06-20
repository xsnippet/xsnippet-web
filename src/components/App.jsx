import React, { Fragment, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './Header'
import Sidebar from './Sidebar'
import NewSnippet from './NewSnippet'
import RecentSnippets from './RecentSnippets'
import Snippet from './Snippet'
import About from './About'
import SignIn from './SignIn'

import Spinner from './common/Spinner'
import conf from '../conf'

import '../styles/App.styl'

const App = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch(process.env.RUNTIME_CONF_URI)
      .then((response) => {
        if (response.status === 404) {
          return {}
        }
        return response.json()
      })
      .then(json => Object.assign(conf, json))
      .then(() => setIsLoading(false))

    // AceEditor's modes (aka syntaxes) are pretty heavy, and since they are
    // not essential, we better download them asynchronously when the app is
    // loaded and ready to be used.
    for (const syntax of process.env.SYNTAXES) {
      import(`brace/mode/${syntax}.js`)
    }
  }, [])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Fragment>
        <Header />
        <div className="content">
          <Sidebar />
          <main className="main">
            <Routes>
              <Route path="/" element={<NewSnippet />} />
              <Route path="/about" element={<About />} />
              <Route path="/recent" element={<RecentSnippets />} />
              <Route path="/sign-in" element={<SignIn />} />
              {/* Routes renders the first matched route, so we need to keep this
                  one last as the regexp below matches the paths of other pages */}
              <Route path="/:id" element={<Snippet />} />
            </Routes>
          </main>
        </div>
      </Fragment>
    </Router>
  )
}

export default App
