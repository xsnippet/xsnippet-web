import { Snippet } from '../store'
import { getCurrentModeCaption } from './modes'
import { getRawUrl } from './url'

export const getSnippetTitle = (snippet: Snippet): string => snippet.title || `#${snippet.id}, Untitled`

export const formatDate = (date: string): string => {
  const ISOdate = date.split('T')[0]

  return ISOdate.split('-').reverse().join('.')
}

export const scrollTop = (): void => {
  window.scroll({ top: 0, behavior: 'smooth' })
}

export const getSnippetMetadata = (snippet: Snippet) => ({
  syntax: getCurrentModeCaption(snippet.syntax),
  title: getSnippetTitle(snippet),
  rawUrl: getRawUrl(snippet.id),
  createdAt: formatDate(snippet.created_at),
})
