import brace from 'brace';
import 'brace/ext/modelist';

import conf from '../conf';

export const regExpEscape = string => string.replace(/[-[\]{}()*+?.,\\^$|]/g, '\\$&');

export function download(text, name, mime) {
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

export function downloadSnippet(snippet) {
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

export function copyToClipboard(e, id) {
  document.getElementById(id).select();
  document.execCommand('copy');
  e.target.focus();
}

// This function is here just because I don't want to pull the whole moment.js
// only for one tiny date
export function formatDate(d) {
  const ISOdate = d.split('T')[0];

  return ISOdate.split('-').reverse().join('.');
}

export function getApiUri(endpoint) {
  return `${conf.API_BASE_URI}${endpoint}`;
}
