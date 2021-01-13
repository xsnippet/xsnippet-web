import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import AceEditor from 'react-ace'

import 'brace/theme/textmate'

import SnippetTags from './common/SnippetTags'
import Spinner from './common/Spinner'

import { fetchSnippet } from '../actions'

import { downloadSnippet } from '../misc/download'
import { onEditorLoad } from '../misc/editor'
import { getCurrentModeCaption } from '../misc/modes'
import { getSnippetTitle, formatDate } from '../misc/snippet'
import { getRawUrl } from '../misc/url'

import { existingSnippetOptions } from '../entries/aceEditorOptions'

import '../styles/Snippet.styl'

const Snippet = ({ snippet, fetchSnippet, match }) => {
  const [isShowEmbed, setIsShowEmbed] = useState(false)
  const embeddedRef = useRef()

  useEffect(() => {
    const { id } = match.params

    fetchSnippet(Number(id))
  }, [])

  if (!snippet) return <Spinner />

  const copyToClipboard = () => {
    embeddedRef.current.select()
    document.execCommand('copy')
  }

  const download = () => {
    downloadSnippet(snippet)
  }

  const toggleEmbed = () => {
    setIsShowEmbed(!isShowEmbed)
  }

  const title = getSnippetTitle(snippet)
  const syntax = getCurrentModeCaption(snippet.get('syntax'))
  const rawUrl = getRawUrl(snippet.get('id'))

  const renderEmbed = () => (
    <div className={`snippet-embed ${isShowEmbed}`}>
      <div className="snippet-embed-content">
        <span className="snippet-embed-close" onClick={toggleEmbed} role="presentation" />
        <p className="snippet-embed-text">
          In order to embed this content into your website or blog,
          simply copy and paste code provided below:
        </p>
        <input
          ref={embeddedRef}
          className="input"
          type="text"
          defaultValue={`<script src='http://xsnippet.org/${snippet.get('id')}/embed/'></script>`}
        />
        <button className="snippet-button embed" onClick={copyToClipboard}>Copy</button>
      </div>
    </div>
  )

  const renderMetadata = () => (<span className="snippet-data-meta">{formatDate(snippet.get('created_at'))}, by Guest</span>)

  return (
    <div className="snippet">
      <div className="snippet-header">
        <div className="snippet-data">
          <span className="snippet-data-title">{title}</span>
          <SnippetTags className="snippet" snippet={snippet} />
          {renderMetadata()}
        </div>
        <div className="snippet-data-actions">
          <span className="snippet-data-lang">{syntax}</span>
          <div>
            <a href={rawUrl} className="snippet-button">Raw</a>
            <button className="snippet-button snippet-button-download" onClick={download}>
              Download
            </button>
            <button
              className={`toggle-embed snippet-button ${isShowEmbed}`}
              key="snippet-details"
              onClick={toggleEmbed}
              onKeyPress={toggleEmbed}
            >
              Embed
            </button>
          </div>
        </div>
      </div>
      {renderEmbed()}
      <div className="snippet-code">
        <AceEditor
          mode={snippet.get('syntax')}
          width="100%"
          height="100%"
          theme="textmate"
          onLoad={onEditorLoad}
          setOptions={existingSnippetOptions}
          editorProps={{ $blockScrolling: Infinity }}
          value={`${snippet.get('content')}`}
        />
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  snippet: state.getIn(['snippets', Number(ownProps.match.params.id)]),
})

const mapDispatchToProps = dispatch => ({
  fetchSnippet: id => dispatch(fetchSnippet(Number(id))),
})

export default connect(mapStateToProps, mapDispatchToProps)(Snippet)
