import brace from 'brace';
import 'brace/ext/modelist';

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
  const { modesByName } = brace.acequire('ace/ext/modelist');

  // Despite using AceEditor's modes as syntaxes, we can imagine other setup
  // when more or even other syntaxes can be used on API side. Hence, we better
  // be prepared and fallback to "Text" mode if unknown syntaxes it is.
  const mode = modesByName[snippet.get('syntax')] || modesByName.text;
  const ext = mode.extensions.split('|')[0] || 'txt';
  const content = snippet.get('content');
  const name = `${snippet.get('id')}.${ext}`;

  // Unfortunately, AceEditor doesn't maintain MIME type map so we don't know
  // for sure which mode corresponds to which MIME type. Hence, let's use
  // text/plain until we come up with better idea.
  download(content, name, 'text/plain');
}

function copyToClipboard(e, id) {
  document.getElementById(id).select();
  document.execCommand('copy');
  e.target.focus();
}

// This function is here just because I don't want to pull the whole moment.js
// only for one tiny date
function parseDate(d) {
  const date = new Date(d);
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const parsedMonth = date.getMonth() + 1;
  const month = parsedMonth < 10 ? `0${parsedMonth}` : parsedMonth;
  return `${day}.${month}.${date.getFullYear()}`;
}

export { regExpEscape, downloadSnippet, copyToClipboard, parseDate };
