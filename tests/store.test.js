import fetchMock from 'fetch-mock'
import createStore from '../src/store'

import * as actions from '../src/actions'

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
    ]
    const store = createStore()
    store.dispatch(actions.setRecentSnippets(snippets))

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
      pagination: {},
    })
  })

  it('should create an action to set pagination links', () => {
    const links = {
      first: {
        limit: '20',
        rel: 'first',
        url: '//api.xsnippet.org/v1/snippets?limit=20',
      },
      next: {
        limit: '20',
        marker: 28,
        rel: 'next',
        url: '//api.xsnippet.org/v1/snippets?limit=20&marker=28',
      },
      prev: {
        limit: '20',
        rel: 'prev',
        url: '//api.xsnippet.org/v1/snippets?limit=20',
      },
    }
    const store = createStore()
    store.dispatch(actions.setPaginationLinks(links))

    expect(store.getState().toJS()).toEqual({
      recent: [],
      snippets: {},
      syntaxes: [],
      pagination: links,
    })
  })

  it('should create an action to fetch recent snippets with marker', async () => {
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
    ]
    const links = '<//api.xsnippet.org/v1/snippets?limit=20>; rel="first", <//api.xsnippet.org/v1/snippets?limit=20&marker=19>; rel="next", <//api.xsnippet.org/v1/snippets?limit=20&marker=59>; rel="prev"'

    fetchMock.getOnce(
      '//api.xsnippet.org/v1/snippets?limit=20&marker=39',
      {
        headers: { Link: links },
        body: snippets,
      },
    )

    const store = createStore()
    await store.dispatch(actions.fetchRecentSnippets(39))

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
      pagination: {
        first: {
          limit: '20',
          rel: 'first',
          url: '//api.xsnippet.org/v1/snippets?limit=20',
        },
        next: {
          limit: '20',
          marker: '19',
          rel: 'next',
          url: '//api.xsnippet.org/v1/snippets?limit=20&marker=19',
        },
        prev: {
          limit: '20',
          marker: '59',
          rel: 'prev',
          url: '//api.xsnippet.org/v1/snippets?limit=20&marker=59',
        },
      },
    })
  })

  it('should create an action to fetch recent snippets without marker', async () => {
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
    ]
    const links = '<//api.xsnippet.org/v1/snippets?limit=20>; rel="first", <//api.xsnippet.org/v1/snippets?limit=20&marker=39>; rel="next"'

    fetchMock.getOnce(
      '//api.xsnippet.org/v1/snippets?limit=20',
      {
        headers: { Link: links },
        body: snippets,
      },
    )

    const store = createStore()
    await store.dispatch(actions.fetchRecentSnippets())

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
      pagination: {
        first: {
          limit: '20',
          rel: 'first',
          url: '//api.xsnippet.org/v1/snippets?limit=20',
        },
        next: {
          limit: '20',
          marker: '39',
          rel: 'next',
          url: '//api.xsnippet.org/v1/snippets?limit=20&marker=39',
        },
      },
    })
  })

  it('should create an action to set snippet', () => {
    const snippet = {
      id: 3,
      content: 'not batman',
      syntax: 'Go',
    }
    const store = createStore()
    store.dispatch(actions.setSnippet(snippet))

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
      pagination: {},
    })
  })

  it('should create an action to fetch snippet', async () => {
    const snippet = {
      id: 3,
      content: 'not batman',
      syntax: 'Go',
    }

    fetchMock.getOnce(`//api.xsnippet.org/v1/snippets/${snippet.id}`, JSON.stringify(snippet))

    const store = createStore()
    await store.dispatch(actions.fetchSnippet(snippet.id))

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
      pagination: {},
    })
  })

  it('should create an action to set syntaxes', () => {
    const syntaxes = ['JavaScript', 'Python', 'Java', 'Go', 'Plain Text']
    const store = createStore()
    store.dispatch(actions.setSyntaxes(syntaxes))

    expect(store.getState().toJS()).toEqual({
      recent: [],
      snippets: {},
      pagination: {},
      syntaxes,
    })
  })

  it('should create an action to fetch syntaxes', async () => {
    const syntaxes = ['JavaScript', 'Python', 'Java', 'Go', 'Plain Text']

    fetchMock.getOnce('//api.xsnippet.org/v1/syntaxes', JSON.stringify(syntaxes))

    const store = createStore()
    await store.dispatch(actions.fetchSyntaxes)

    expect(store.getState().toJS()).toEqual({
      recent: [],
      snippets: {},
      pagination: {},
      syntaxes,
    })
  })

  it('should create an action to post snippet', async () => {
    const snippet = {
      id: 4,
      content: 'Batman',
      syntax: 'JavaScript',
    }

    fetchMock.postOnce('//api.xsnippet.org/v1/snippets', JSON.stringify(snippet))

    const store = createStore()
    await store.dispatch(actions.postSnippet(snippet, () => {}))

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
      pagination: {},
    })
  })
})
