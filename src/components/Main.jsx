import React from 'react';
import { Switch, Route } from 'react-router-dom';

import NewSnippet from './NewSnippet';
import RecentSnippets from './RecentSnippets';
import Snippet from './Snippet';
import About from './About';
import SignIn from './SignIn';

import '../styles/Main.styl';

const Main = () => (
  <main className="main">
    <Switch>
      <Route exact path="/" component={NewSnippet} />
      <Route path="/recent" component={RecentSnippets} />
      <Route path="/about" component={About} />
      <Route path="/sign-in" component={SignIn} />
      <Route path="/:id" component={Snippet} />
    </Switch>
  </main>
);

export default Main;
