const { syntaxes, snippet, recentSnippets } = require('./responses.js')

function apiCalls(page) {
  page.on('request', async request => {
    if (request.url().includes('http://api.xsnippet.org/v1')) {
      if (request.url().includes('http://api.xsnippet.org/v1/syntaxes')) {
        request.respond({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(syntaxes),
        })
      }
      if (request.url().includes('http://api.xsnippet.org/v1/snippets/1997')) {
        request.respond({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(snippet),
        })
      }
      if (
        request.url().includes('http://api.xsnippet.org/v1/snippets?limit=20')
      ) {
        request.respond({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(recentSnippets),
        })
      }
      if (
        request.url().includes('http://api.xsnippet.org/v1/snippets') &&
        request.method() === 'POST'
      ) {
        request.respond({
          status: 201,
          contentType: 'application/json',
          body: JSON.stringify(snippet),
        })
      }
    } else {
      request.continue()
    }
  })
}

module.exports.apiCalls = apiCalls
