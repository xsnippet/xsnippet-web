import { fromJS } from 'immutable'
import { getApiUri } from '../../src/misc/url'
import { formatDate, getSnippetTitle } from '../../src/misc/snippet'

describe('misc', () => {
  describe('snippet related', () => {
    const snippet = {
      content: 'const memoizedSyntaxes = useMemo()',
      created_at: '2019-09-29T19:23:31',
      id: 364066,
      syntax: 'javascript',
      tags: ['trg', 'rtyger'],
      title: 'some misterious title',
      updated_at: '2020-01-01T23:28:19',
    }

    it('should return properly formated date', () => {
      expect(formatDate(snippet.created_at)).toEqual('29.09.2019')
    })

    it('should return properly formatted date for Jan', () => {
      expect(formatDate(snippet.updated_at)).toEqual('01.01.2020')
    })

    it('should return propper title', () => {
      expect(getSnippetTitle(fromJS(snippet))).toEqual(snippet.title)
    })

    it('should return propper title', () => {
      const untitled = { ...snippet, title: undefined }
      const expected = `#${untitled.id}, Untitled`

      expect(getSnippetTitle(fromJS(untitled))).toEqual(expected)
    })
  })

  describe('getApiUri', () => {
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
})
