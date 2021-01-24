interface AceDefaultOptions {
  showFoldWidgets: boolean;
  useWorker: boolean;
  fontSize: string;
  maxLines: typeof Infinity,
  showPrintMargin: boolean;
}

interface AceOptionsForSnippet extends AceDefaultOptions {
  readOnly: boolean;
  highlightActiveLine: boolean;
  highlightGutterLine: boolean;
}

export const defaultOptions: AceDefaultOptions = {
  showFoldWidgets: false,
  useWorker: false,
  fontSize: '13px',
  maxLines: Infinity,
  showPrintMargin: false,
}

export const existingSnippetOptions: AceOptionsForSnippet = {
  ...defaultOptions,
  readOnly: true,
  highlightActiveLine: false,
  highlightGutterLine: false,
}
