export const regExpEscape = (string: string): string => string.replace(/[-[\]{}()*+?.,\\^$|]/g, '\\$&')
