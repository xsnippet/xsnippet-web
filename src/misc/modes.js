import brace from 'brace'
import 'brace/ext/modelist'

export const getModesByName = () => brace.acequire('ace/ext/modelist')

export const getCurrentMode = syntax => {
  const { modesByName } = getModesByName()
  return modesByName[syntax] || modesByName.text
}

export const getCurrentModeName = syntax => {
  const mode = getCurrentMode(syntax)
  return mode.name
}

export const getCurrentModeCaption = syntax => {
  const mode = getCurrentMode(syntax)
  return mode.caption
}
