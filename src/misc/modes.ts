import brace from 'brace'
import 'brace/ext/modelist'

type Mode = {
  caption: string;
  extRe: RegExp;
  extensions: string;
  mode: string;
  name: string;
}

type NormalizedSyntax = {
  name: string;
  value: string;
}

export const getModesByName = (): any => brace.acequire('ace/ext/modelist')

export const getCurrentMode = (syntax: string): Mode => {
  const { modesByName } = getModesByName()
  return modesByName[syntax] || modesByName.text
}

export const getCurrentModeName = (syntax: string): string => {
  const mode = getCurrentMode(syntax)
  return mode.name
}

export const getCurrentModeCaption = (syntax: string): string => {
  const mode = getCurrentMode(syntax)
  return mode.caption
}

export const normalizedSyntaxes = (syntaxes: string[]): NormalizedSyntax[] => {
  const { modesByName } = getModesByName()

  return syntaxes.map(item => ({
    name: modesByName[item].caption,
    value: item,
  }))
}
