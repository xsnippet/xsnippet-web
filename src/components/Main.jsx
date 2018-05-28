import React from 'react'
import { Switch, Route } from 'react-router-dom'

import NewSnippet from './NewSnippet'
import RecentSnippets from './RecentSnippets'
import Snippet from './Snippet'
import About from './About'
import SignIn from './SignIn'

import '../styles/Main.styl'

const Main = () => (
  <main className="main">
    <Switch>
      <Route exact path="/" component={NewSnippet} />
      <Route exact path="/recent" component={RecentSnippets} />
      <Route exact path="/about" component={About} />
      <Route exact path="/sign-in" component={SignIn} />
      <Route exact path="/:id(\d+)" component={Snippet} />
    </Switch>
  </main>
)

export default Main
