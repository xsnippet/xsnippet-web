import fetchMock from 'fetch-mock';
import createStore from '../src/store';

import * as actions from '../src/actions';

describe('actions', () => {
  it('should create an action to set recent snippets', () => {
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
    const store = createStore();
    store.dispatch(actions.setRecentSnippets(snippets));

    expect(store.getState().toJS()).toEqual({
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

  it('should create an action to fetch recent snippets', async () => {
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

    fetchMock.getOnce('http://api.xsnippet.org/snippets', JSON.stringify(snippets));

    const store = createStore();
    await store.dispatch(actions.fetchRecentSnippets);

    expect(store.getState().toJS()).toEqual({
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

  it('should create an action to set snippet', () => {
    const snippet = {
      id: 3,
      content: 'not batman',
      syntax: 'Go',
    };
    const store = createStore();
    store.dispatch(actions.setSnippet(snippet));

    expect(store.getState().toJS()).toEqual({
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

  it('should create an action to fetch snippet', async () => {
    const snippet = {
      id: 3,
      content: 'not batman',
      syntax: 'Go',
    };

    fetchMock.getOnce(`http://api.xsnippet.org/snippets/${snippet.id}`, JSON.stringify(snippet));

    const store = createStore();
    await store.dispatch(actions.fetchSnippet(snippet.id));

    expect(store.getState().toJS()).toEqual({
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

  it('should create an action to set syntaxes', () => {
    const syntaxes = ['JavaScript', 'Python', 'Java', 'Go', 'Plain Text'];
    const store = createStore();
    store.dispatch(actions.setSyntaxes(syntaxes));

    expect(store.getState().toJS()).toEqual({
      recent: [],
      snippets: {},
      syntaxes,
    });
  });

  it('should create an action to fetch syntaxes', async () => {
    const syntaxes = ['JavaScript', 'Python', 'Java', 'Go', 'Plain Text'];

    fetchMock.getOnce('http://api.xsnippet.org/syntaxes', JSON.stringify(syntaxes));

    const store = createStore();
    await store.dispatch(actions.fetchSyntaxes);

    expect(store.getState().toJS()).toEqual({
      recent: [],
      snippets: {},
      syntaxes,
    });
  });

  it('should create an action to post snippet', async () => {
    const snippet = {
      id: 4,
      content: 'Batman',
      syntax: 'JavaScript',
    };

    fetchMock.postOnce('http://api.xsnippet.org/snippets', JSON.stringify(snippet));

    const store = createStore();
    await store.dispatch(actions.postSnippet(snippet, () => {}));

    expect(store.getState().toJS()).toEqual({
      recent: [],
      snippets: {
        4: {
          id: 4,
          content: 'Batman',
          syntax: 'JavaScript',
        },
      },
      syntaxes: [],
    });
  });
});
