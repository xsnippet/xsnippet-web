import { List, Map } from 'immutable';
import { combineReducers } from 'redux';

const snippets = (state = Map(), action) => {
  switch (action.type) {
    case 'SET_RECENT_SNIPPETS':
      return state.merge(action.snippets.map(snippet => [snippet.id, snippet]));

    default:
      return state;
  }
};

const recent = (state = List(), action) => {
  switch (action.type) {
    case 'SET_RECENT_SNIPPETS':
      return List(action.snippets.map(snippet => snippet.id));

    default:
      return state;
  }
};

export default combineReducers({
  snippets,
  recent,
});
