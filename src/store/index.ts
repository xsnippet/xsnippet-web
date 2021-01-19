import { atom, selector, selectorFamily } from 'recoil'

import { fetchSnippet, fetchSyntaxes, fetchRecentSnippets } from '../api'
import { normalizedSyntaxes } from '../misc/modes'

export interface Snippet {
  content: string;
  created_at: string;
  id: number;
  syntax: string;
  tags: string[];
  title: string;
  updated_at: string;
}

export interface RawSnippet {
  content: string;
  syntax: string;
  tags: string[];
  title: string;
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
  get: (marker: number) => async () => {
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
  get: (id: number) => async ({ get }) => {
    const snippets = get(recentSnippetsState)

    if (snippets) {
      return snippets[id]
    }

    return await fetchSnippet(id)
  },
})
