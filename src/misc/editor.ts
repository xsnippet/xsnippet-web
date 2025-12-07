import { Ace } from "ace-builds";

export const onEditorLoad = (editor: Ace.Editor): void => {
  // we want to disable built-in find in favor of browser's one
  editor.commands.removeCommand('find')
}
