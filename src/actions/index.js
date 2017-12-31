export const setRecentSnippets = snippets => ({
  type: 'SET_RECENT_SNIPPETS',
  snippets,
});

export const fetchRecentSnippets = dispatch => (
  fetch('http://api.xsnippet.org/snippets')
    .then(response => response.json())
    .then(json => dispatch(setRecentSnippets(json)))
);

export const setSnippet = snippet => ({
  type: 'SET_SNIPPET',
  snippet,
});

export const fetchSnippet = id => dispatch => (
  fetch(`http://api.xsnippet.org/snippets/${id}`)
    .then(response => response.json())
    .then(json => dispatch(setSnippet(json)))
);
