import React from 'react'
import { connect } from 'react-redux'
import AceEditor from 'react-ace'

import 'brace/theme/textmate'

import Spinner from './common/Spinner'
import { fetchSnippet } from '../actions'
import { getCurrentModeCaption } from '../misc/modes'
import { downloadSnippet } from '../misc/download'
import { onEditorLoad } from '../misc/editor'
import { getSnippetTitle, formatDate } from '../misc/snippet'
import { copyToClipboard } from '../misc/clipboard'
import { getRawUrl } from '../misc/url'

import { existingSnippetOptions } from '../entries/aceEditorOptions'

import '../styles/Snippet.styl'

export class Snippet extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isShowEmbed: false }
    this.copyClipboard = (e) => {
      copyToClipboard(e, 'embedded')
    }
  }

  componentDidMount() {
    const { dispatch } = this.props
    const { id } = this.props.match.params

    dispatch(fetchSnippet(Number(id)))
  }

  download = () => {
    downloadSnippet(this.props.snippet)
  }

  toggleEmbed = () => {
    this.setState(prevState => ({ isShowEmbed: !prevState.isShowEmbed }))
  }

  renderEmbed() {
    const { snippet } = this.props
    const { isShowEmbed } = this.state

    return (
      <div className={`snippet-embed ${isShowEmbed}`}>
        <div className="snippet-embed-content">
          <span className="snippet-embed-close" onClick={this.toggleEmbed} role="presentation" />
          <p className="snippet-embed-text">
            In order to embed this content into your website or blog,
            simply copy and paste code provided below:
          </p>
          <input
            id="embedded"
            className="input"
            type="text"
            defaultValue={`<script src='http://xsnippet.org/${snippet.get('id')}/embed/'></script>`}
          />
          <button className="snippet-button embed" onClick={this.copyClipboard}>Copy</button>
        </div>
      </div>
    )
  }

  renderTags() {
    const { snippet } = this.props

    return (
      <div className="snippet-data-tags">
        {snippet.get('tags').map(item => <span className="snippet-data-tag" key={item}>{item}</span>)}
      </div>
    )
  }

  renderMetadata() {
    const { snippet } = this.props
    return <span className="snippet-data-meta">{formatDate(snippet.get('created_at'))}, by Guest</span>
  }

  render() {
    const { snippet } = this.props
    const { isShowEmbed } = this.state

    if (!snippet) return <Spinner />

    const title = getSnippetTitle(snippet)
    const syntax = getCurrentModeCaption(snippet.get('syntax'))
    const rawUrl = getRawUrl(snippet.get('id'))

    return (
      <div className="snippet" key="Snippet">
        <div className="snippet-header">
          <div className="snippet-data">
            <span className="snippet-data-title">{title}</span>
            {this.renderTags()}
            {this.renderMetadata()}
          </div>
          <div className="snippet-data-actions">
            <span className="snippet-data-lang">{syntax}</span>
            <div>
              <a href={rawUrl} className="snippet-button">Raw</a>
              <button className="snippet-button snippet-button-download" onClick={this.download}>
                Download
              </button>
              <button
                className={`toggle-embed snippet-button ${isShowEmbed}`}
                key="snippet-details"
                onClick={this.toggleEmbed}
                onKeyPress={this.toggleEmbed}
              >
                Embed
              </button>
            </div>
          </div>
        </div>
        {this.renderEmbed()}
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
}

export default connect((state, ownProps) => ({
  snippet: state.getIn(['snippets', Number(ownProps.match.params.id)]),
}))(Snippet)
