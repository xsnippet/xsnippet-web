export function scrollTop() {
  window.scroll({ top: 0, behavior: 'smooth' })
}

export function recalcLangHeaderHeight() {
  const newSnippetHeaderHeight = document.getElementsByClassName('new-snippet-code-header')[0].offsetHeight

  document.getElementsByClassName('new-snippet-lang-header')[0]
    .setAttribute('style', `height:${newSnippetHeaderHeight}px`)
}
