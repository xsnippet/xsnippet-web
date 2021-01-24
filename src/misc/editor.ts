export const onEditorLoad = (editor: any): void => {
  // we want to disable built-in find in favor of browser's one
  editor.commands.removeCommand('find')
}
