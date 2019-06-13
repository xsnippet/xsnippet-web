export const getSnippetTitle = snippet => snippet.get('title') || `#${snippet.get('id')}, Untitled`

// This function is here just because I don't want to pull the whole moment.js
// only for one tiny date
export function formatDate(d) {
  const ISOdate = d.split('T')[0]

  return ISOdate.split('-').reverse().join('.')
}
