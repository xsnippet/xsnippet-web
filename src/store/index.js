import * as redux from 'redux';
import thunk from 'redux-thunk';

import reducer from '../reducers';

function createStore() {
  // Redux Thunk middleware allows you to write action creators that return a
  // function instead of an action. The thunk can be used to delay the dispatch
  // of an action, or to dispatch only if a certain condition is met. The
  // former is the case for XSnippet Web since we need to fetch data via HTTP
  // API first and then dispatch it to store.
  return redux.createStore(reducer, redux.applyMiddleware(thunk));
}

export default createStore;
