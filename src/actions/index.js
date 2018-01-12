import parseLinkHeader from 'parse-link-header';

export const setRecentSnippets = snippets => ({
  type: 'SET_RECENT_SNIPPETS',
  snippets,
});

export const setPaginationLinks = links => ({
  type: 'SET_PAGINATION_LINKS',
  links,
});

export const fetchRecentSnippets = marker => (dispatch) => {
  let qs = '';
  if (marker) { qs = `&marker=${marker}`; }

  return fetch(`http://api.xsnippet.org/snippets?limit=20${qs}`)
    .then((response) => {
      const links = parseLinkHeader(response.headers.get('Link'));

      dispatch(setPaginationLinks(links));
      return response.json();
    })
    .then(json => dispatch(setRecentSnippets(json)));
};

export const setSnippet = snippet => ({
  type: 'SET_SNIPPET',
  snippet,
});

export const fetchSnippet = id => dispatch => (
  fetch(`http://api.xsnippet.org/snippets/${id}`)
    .then(response => response.json())
    .then(json => dispatch(setSnippet(json)))
);

export const setSyntaxes = syntaxes => ({
  type: 'SET_SYNTAXES',
  syntaxes,
});

export const fetchSyntaxes = dispatch => (
  fetch('http://api.xsnippet.org/syntaxes')
    .then(response => response.json())
    .then(json => dispatch(setSyntaxes(json)))
);

export const postSnippet = (snippet, onSuccess) => dispatch => (
  fetch('http://api.xsnippet.org/snippets', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(snippet),
  })
    .then(response => response.json())
    .then((json) => {
      dispatch(setSnippet(json));
      onSuccess(json);
    })
);
