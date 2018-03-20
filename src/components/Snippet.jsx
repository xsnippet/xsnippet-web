import React from 'react';
import { connect } from 'react-redux';
import AceEditor from 'react-ace';
import brace from 'brace';

import 'brace/theme/textmate';

import Title from './common/Title';
import Spinner from './common/Spinner';
import * as actions from '../actions';
import { downloadSnippet, copyToClipboard, formatDate } from '../helpers';

import '../styles/Snippet.styl';

class Snippet extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isShowEmbed: false };
    this.toggleEmbed = this.toggleEmbed.bind(this);
    this.download = this.download.bind(this);
    this.copyClipboard = (e) => {
      copyToClipboard(e, 'embedded');
    };
    this.onEditorLoad = (editor) => {
      // we want to disable built-in find in favor of browser's one
      editor.commands.removeCommand('find');
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { id } = this.props.match.params;

    dispatch(actions.fetchSnippet(Number(id)));
  }

  download() {
    downloadSnippet(this.props.snippet);
  }

  toggleEmbed() {
    this.setState(prevState => ({ isShowEmbed: !prevState.isShowEmbed }));
  }

  render() {
    const { snippet } = this.props;
    const { modesByName } = brace.acequire('ace/ext/modelist');

    if (!snippet) return <Spinner />;

    const snippetTitle = snippet.get('title') || `#${snippet.get('id')}, Untitled`;
    const mode = modesByName[snippet.get('syntax')] || modesByName.text;
    const syntax = mode.caption;
    const rawUrl = process.env.RAW_SNIPPETS_URL_FORMAT.replace('%s', snippet.get('id'));

    return (
      [
        <Title title="Snippet" key="Snippet title" />,
        <div className="snippet" key="Snippet">
          <div className="snippet-header">
            <div className="snippet-data">
              <span className="snippet-data-title">{snippetTitle}</span>
              <div className="snippet-data-tags">
                {snippet.get('tags').map(item => <span className="snippet-data-tag" key={item}>{item}</span>)}
              </div>
              <span className="snippet-data-meta">{formatDate(snippet.get('created_at'))}, by Guest</span>
            </div>
            <div className="snippet-data-actions">
              <span className="snippet-data-lang">{syntax}</span>
              <div>
                <a href={rawUrl} className="snippet-button">Raw</a>
                <button className="snippet-button" onClick={this.download}>Download</button>
                <button
                  className={`snippet-button ${this.state.isShowEmbed}`}
                  key="snippet-details"
                  onClick={this.toggleEmbed}
                  onKeyPress={this.toggleEmbed}
                >
                  Embed
                </button>
              </div>
            </div>
          </div>
          <div className={`snippet-embed ${this.state.isShowEmbed}`}>
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
          <div className="snippet-code">
            <AceEditor
              mode={snippet.get('syntax')}
              width="100%"
              height="100%"
              theme="textmate"
              onLoad={this.onEditorLoad}
              setOptions={{
                readOnly: true,
                highlightActiveLine: false,
                highlightGutterLine: false,
                showFoldWidgets: false,
                useWorker: false,
                maxLines: Infinity,
                showPrintMargin: false,
              }}
              value={`${snippet.get('content')}`}
            />
          </div>
        </div>,
      ]
    );
  }
}

export default connect((state, ownProps) => ({
  snippet: state.getIn(['snippets', Number(ownProps.match.params.id)]),
}))(Snippet);
