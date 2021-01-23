import parseLinkHeader from 'parse-link-header'

import { getApiUri } from '../misc/url'
import { Snippet } from '../store'

export const fetchSnippet = (id: string): Promise<Snippet> => {
  return fetch(getApiUri(`snippets/${id}`))
    .then(response => response.json())
}

export const fetchSyntaxes = (): Promise<string[]> => {
  return fetch(getApiUri('syntaxes'))
    .then(response => response.json())
}

export const fetchRecentSnippets = (marker: string): Promise<{ snippets: Snippet[], pagination: parseLinkHeader.Links | null}> => {
  let qs = ''
  if (marker) { qs = `&marker=${marker}` }
  let pagination: parseLinkHeader.Links

  return fetch(getApiUri(`snippets?limit=20${qs}`))
    .then(response => {
      pagination = parseLinkHeader(response.headers.get('Link'))
      return response.json()
    })
    .then(snippets => ({ snippets, pagination }))
}

export const postSnippet = (snippet: Partial<Snippet>, onSuccess: (snippet: Snippet) => void, onError = () => {}): Promise<void> => {
  return fetch(getApiUri('snippets'), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(snippet),
  })
    .then(response => response.json())
    .then(onSuccess)
    .catch(onError)
}
