export function copyToClipboard(e, id) {
  document.getElementById(id).select()
  document.execCommand('copy')
  e.target.focus()
}
