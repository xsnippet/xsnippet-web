import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import AceEditor from 'react-ace'
import bemi from 'bemi'

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

const block = bemi('snippet')

const Snippet = ({ snippet, fetchSnippet, match }) => {
  const [ isShowEmbed, setIsShowEmbed ] = useState(false)
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
    <div className={block.e('embed', { show: isShowEmbed, hide: !isShowEmbed })}>
      <div className={block.e('embed-content')}>
        <span className={block.e('embed-close')} onClick={toggleEmbed} role="presentation" />
        <p className={block.e('embed-text')}>
          In order to embed this content into your website or blog,
          simply copy and paste code provided below:
        </p>
        <input
          ref={embeddedRef}
          className="input"
          type="text"
          defaultValue={`<script src='http://xsnippet.org/${snippet.get('id')}/embed/'></script>`}
        />
        <button className={block.e('button', 'embed')} onClick={copyToClipboard}>Copy</button>
      </div>
    </div>
  )

  const renderMetadata = () => (<span className={block.e('data-meta')}>{formatDate(snippet.get('created_at'))}, by Guest</span>)

  return (
    <div className={block.b()}>
      <div className={block.e('header')}>
        <div className={block.e('data')}>
          <span className={block.e('data-title')}>{title}</span>
          <SnippetTags className={block} snippet={snippet} />
          {renderMetadata()}
        </div>
        <div className={block.e('data-actions')}>
          <span className={block.e('data-lang')}>{syntax}</span>
          <div>
            <a href={rawUrl} className={block.e('button')}>Raw</a>
            <button className={block.e('button', 'download')} onClick={download}>
              Download
            </button>
            <button
              className={`${block.e('button', { show: isShowEmbed, hide: !isShowEmbed })} toggle-embed`}
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
      <div className={block.e('code')}>
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
