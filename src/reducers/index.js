import { List, Map, fromJS } from 'immutable'
import { combineReducers } from 'redux-immutable'
import {
  SET_RECENT_SNIPPETS,
  SET_SNIPPET,
  SET_PAGINATION_LINKS,
  SET_SYNTAXES,
} from '../actions/types'

const snippets = (state = Map(), action) => {
  switch (action.type) {
    case SET_RECENT_SNIPPETS:
      return state.merge(action.snippets.map(snippet => [snippet.id, snippet]))

    case SET_SNIPPET:
      return state.set(action.snippet.id, fromJS(action.snippet))

    default:
      return state
  }
}

const recent = (state = List(), action) => {
  switch (action.type) {
    case SET_RECENT_SNIPPETS:
      return List(action.snippets.map(snippet => snippet.id))

    default:
      return state
  }
}

const pagination = (state = Map(), action) => {
  switch (action.type) {
    case SET_PAGINATION_LINKS:
      return Map(action.links)

    default:
      return state
  }
}

const syntaxes = (state = List(), action) => {
  switch (action.type) {
    case SET_SYNTAXES:
      return List(action.syntaxes)

    default:
      return state
  }
}

export default combineReducers({
  snippets,
  recent,
  syntaxes,
  pagination,
})
