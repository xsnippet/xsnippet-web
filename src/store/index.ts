import { atom } from 'jotai'
import { atomFamily } from 'jotai/utils'

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

export const recentSnippetsState = atom<Record<string, Snippet> | null>(null)

export const syntaxesQuery = atom(async () => {
  const syntaxes = await fetchSyntaxes()
  return normalizedSyntaxes(syntaxes)
})

export const recentSnippetsQuery = atomFamily((marker: string | null) => atom(async () => {
  const { snippets, pagination } = await fetchRecentSnippets(marker)

  return {
    pagination,
    recentIds: snippets.map((snippet: Snippet) => snippet.id),
    snippets: Object.assign({}, ...snippets.map((snippet: Snippet) => ({ [snippet.id]: snippet }))),
  }
}))

export const snippetById = atomFamily((id: string) => atom(async (get) => {
  const snippets = get(recentSnippetsState)

  if (snippets && snippets[id]) {
    return snippets[id]
  }

  return await fetchSnippet(id)
}))
