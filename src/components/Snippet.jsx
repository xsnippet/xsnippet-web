import React, { useState, useRef } from 'react'
import { useRecoilValueLoadable } from 'recoil'
import AceEditor from 'react-ace'

import 'brace/theme/textmate'

import SnippetTags from './common/SnippetTags'
import Spinner from './common/Spinner'

import { downloadSnippet } from '../misc/download'
import { onEditorLoad } from '../misc/editor'
import { getSnippetMetadata } from '../misc/snippet'
import { snippetById } from '../store'

import { existingSnippetOptions } from '../entries/aceEditorOptions'

import '../styles/Snippet.styl'

const Snippet = ({ match }) => {
  const [isShowEmbed, setIsShowEmbed] = useState(false)
  const fetchedSnippet = useRecoilValueLoadable(snippetById(match.params.id))
  const embeddedRef = useRef()

  if (fetchedSnippet.state !== 'hasValue') return <Spinner />

  const snippet = fetchedSnippet.contents

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

  const { syntax, title, rawUrl, createdAt } = getSnippetMetadata(snippet)

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
          defaultValue={`<script src='http://xsnippet.org/${snippet.id}/embed/'></script>`}
        />
        <button className="snippet-button embed" onClick={copyToClipboard}>Copy</button>
      </div>
    </div>
  )

  return (
    <div className="snippet">
      <div className="snippet-header">
        <div className="snippet-data">
          <span className="snippet-data-title">{title}</span>
          <SnippetTags className="snippet" tags={snippet.tags} id={snippet.id} />
          <span className="snippet-data-meta">{createdAt}, by Guest</span>
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
          mode={snippet.syntax}
          width="100%"
          height="100%"
          theme="textmate"
          onLoad={onEditorLoad}
          setOptions={existingSnippetOptions}
          editorProps={{ $blockScrolling: Infinity }}
          value={`${snippet.content}`}
        />
      </div>
    </div>
  )
}

export default Snippet
