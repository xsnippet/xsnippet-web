import { getApiUri } from '../../src/misc/url'
import { formatDate } from '../../src/misc/snippet'

describe('misc', () => {
  it('should return properly formated date', () => {
    const incomeDate = '2018-03-11T15:28:19'

    expect(formatDate(incomeDate)).toEqual('11.03.2018')
  })

  it('should return properly formatted date for Jan', () => {
    const incomeDate = '2018-01-01T23:28:19'

    expect(formatDate(incomeDate)).toEqual('01.01.2018')
  })

  it('should construct correct url with default api version', () => {
    process.env.API_BASE_URI = '//api.xsnippet.org'
    const f = getApiUri('snippets')

    expect(f).toBe(`${process.env.API_BASE_URI}/v1/snippets`)
  })

  it('should construct correct url with passed api version', () => {
    process.env.API_BASE_URI = '//api.xsnippet.org'
    const f = getApiUri('snippets', 'v404')

    expect(f).toBe(`${process.env.API_BASE_URI}/v404/snippets`)
  })
})
