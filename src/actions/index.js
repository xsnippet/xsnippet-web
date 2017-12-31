export const setRecentSnippets = snippets => ({
  type: 'SET_RECENT_SNIPPETS',
  snippets,
});

export const fetchRecentSnippets = dispatch => (
  fetch('http://api.xsnippet.org/snippets')
    .then(response => response.json())
    .then(json => dispatch(setRecentSnippets(json)))
);
