import { Map } from 'immutable';

import reducer from '../../src/reducers';
import * as actions from '../../src/actions';

describe('reducers', () => {
  it('should handle SET_RECENT_SNIPPETS', () => {
    const snippets = [
      {
        id: 1,
        content: 'test',
        syntax: 'JavaScript',
      },
      {
        id: 2,
        content: 'batman',
        syntax: 'Python',
      },
    ];
    const state = reducer(Map(), actions.setRecentSnippets(snippets));

    expect(state.toJS()).toEqual({
      recent: [1, 2],
      snippets: {
        1: {
          id: 1,
          content: 'test',
          syntax: 'JavaScript',
        },
        2: {
          id: 2,
          content: 'batman',
          syntax: 'Python',
        },
      },
      syntaxes: [],
    });
  });

  it('should handle SET_SNIPPET', () => {
    const snippet = {
      id: 3,
      content: 'not batman',
      syntax: 'Go',
    };
    const state = reducer(Map(), actions.setSnippet(snippet));

    expect(state.toJS()).toEqual({
      recent: [],
      snippets: {
        3: {
          id: 3,
          content: 'not batman',
          syntax: 'Go',
        },
      },
      syntaxes: [],
    });
  });

  it('should handle SET_SYNTAXES', () => {
    const syntaxes = ['JavaScript', 'Python', 'Java', 'Go', 'Plain Text'];
    const state = reducer(Map(), actions.setSyntaxes(syntaxes));

    expect(state.toJS()).toEqual({
      recent: [],
      snippets: {},
      syntaxes,
    });
  });
});
