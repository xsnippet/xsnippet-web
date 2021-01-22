import { atom, selector, selectorFamily } from 'recoil'

import { fetchSnippet, fetchSyntaxes, fetchRecentSnippets } from '../api'
import { normalizedSyntaxes } from '../misc/modes'

export type Snippet = {
  id: string;
  title: string;
  syntax: string;
  content: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export const recentSnippetsState = atom({
  key: 'recentSnippetsState',
  default: null,
})

export const syntaxesQuery = selector({
  key: 'syntaxesQuery',
  get: async () => {
    const syntaxes = await fetchSyntaxes()
    return normalizedSyntaxes(syntaxes)
  }
})

export const recentSnippetsQuery = selectorFamily({
  key: 'recentSnippetsQuery',
  get: (marker: string) => async () => {
    const { snippets, pagination } = await fetchRecentSnippets(marker)

    return {
      pagination,
      recentIds: snippets.map((snippet: Snippet) => snippet.id),
      snippets: Object.assign({}, ...snippets.map((snippet: Snippet) => ({ [snippet.id]: snippet }))),
    }
  },
})

export const snippetById = selectorFamily({
  key: 'snippetById',
  get: (id: string) => async ({ get }) => {
    const snippets = get(recentSnippetsState)

    if (snippets) {
      return snippets[id]
    }

    return await fetchSnippet(id)
  },
})
