import conf from '../conf'

export const getRawUrl = id => conf.RAW_SNIPPET_URI_FORMAT.replace('%s', id)

export const getApiUri = (endpoint, version = 'v1') => `${conf.API_BASE_URI}/${version}/${endpoint}`
