export default {
  // REST APIs have a base URI to which the endpoint paths are appended. This
  // one sets a base URI for the XSnippet API we need to communicate with.
  API_BASE_URI: process.env.API_BASE_URI || '//api.xsnippet.org',

  // When expanded with a snippet ID, it points to a raw snippet page (i.e. a
  // plain/text page with snippet content and without markup).
  RAW_SNIPPET_URI_FORMAT: process.env.RAW_SNIPPET_URI_FORMAT || '//xsnippet.org/%s/raw',
}
