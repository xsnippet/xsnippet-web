import conf from '../conf'

export const getRawUrl = (id: number): string => conf.RAW_SNIPPET_URI_FORMAT.replace('%s', id)

export const getApiUri = (endpoint: string, version = 'v1'): string => (
  `${conf.API_BASE_URI}/${version}/${endpoint}`
)
