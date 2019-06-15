export const defaultOptions = {
  showFoldWidgets: false,
  useWorker: false,
  fontSize: '13px',
  maxLines: Infinity,
  showPrintMargin: false,
}

export const existingSnippetOptions = {
  ...defaultOptions,
  readOnly: true,
  highlightActiveLine: false,
  highlightGutterLine: false,
}
