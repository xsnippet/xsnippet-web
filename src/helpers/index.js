import codemirror from 'codemirror';

const regExpEscape = string => string.replace(/[-[\]{}()*+?.,\\^$|]/g, '\\$&');

function download(text, name, mime) {
  // It seems it's the only way to initiate file downloading from JavaScript
  // as of Jan 7, 2018. If you read this and know a better way, please submit
  // a pull request! ;)

  const element = document.createElement('a');
  element.setAttribute('href', `data:${mime};charset=utf-8,${encodeURIComponent(text)}`);
  element.setAttribute('download', name);
  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function downloadSnippet(snippet) {
  // Despite using CodeMirror's modes as syntaxes on XSnippet API, we might
  // imagine other setup when more syntaxes can be used on server. Hence, we
  // must be prepared and fallback on "Plain Text" mode if we can't figure out
  // what's extension and/or MIME type.
  const modeInfo = codemirror.findModeByName(snippet.get('syntax'))
              || codemirror.findModeByName('Plain Text');

  const content = snippet.get('content');
  const name = `${snippet.get('id')}.${modeInfo.ext[0]}`;

  download(content, name, modeInfo.mime);
}

export { regExpEscape, downloadSnippet };
