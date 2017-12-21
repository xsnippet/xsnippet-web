import React from 'react';
import { Switch, Route } from 'react-router-dom';

import NewSnippet from './NewSnippet';
import RecentSnippets from './RecentSnippets';
import UploadSnippet from './UploadSnippet';
import About from './About';
import SignIn from './SignIn';


const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={NewSnippet} />
      <Route path="/recent" component={RecentSnippets} />
      <Route path="/upload" component={UploadSnippet} />
      <Route path="/about" component={About} />
      <Route path="/sign-in" component={SignIn} />
    </Switch>
  </main>
);

export default Main;
