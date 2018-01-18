import React from 'react';
import { connect } from 'react-redux';
import AceEditor from 'react-ace';
import brace from 'brace';

import 'brace/theme/textmate';

import Title from './common/Title';
import Spinner from './common/Spinner';
import * as actions from '../actions';
import { downloadSnippet } from '../helpers';

import '../styles/Snippet.styl';

class Snippet extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isShowEmbed: false };
    this.toggleEmbed = this.toggleEmbed.bind(this);
    this.download = this.download.bind(this);
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

    return (
      [
        <Title title="Snippet" key="Snippet title" />,
        <div className="snippet" key="Snippet">
          <div className="snippet-header">
            <div className="snippet-data">
              <div>
                <span className="snippet-data-title">{snippetTitle}</span>
                <span className="snippet-data-lang">[ {syntax} ]</span>
              </div>
              <span className="snippet-data-author">By Guest</span>
            </div>
            <button
              className="snippet-button"
              key="snippet-details"
              onClick={this.toggleEmbed}
              onKeyPress={this.toggleEmbed}
            >
              Embed
            </button>
          </div>
          <div className={`snippet-embed ${this.state.isShowEmbed}`}>
            <p className="snippet-embed-text">
              In order to embed this content into your website or blog,
              simply copy and paste code provided below:
            </p>
            <input
              className="input"
              type="text"
              defaultValue={`<script src='http://xsnippet.org/${snippet.get('id')}/embed/'></script>`}
            />
          </div>
          <div className="snippet-code">
            <AceEditor
              mode={snippet.get('syntax')}
              width="100%"
              height="100%"
              theme="textmate"
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
            <div className="snippet-code-bottom-bar">
              <button className="snippet-button light">Raw</button>
              <button className="snippet-button light" onClick={this.download}>Download</button>
            </div>
          </div>
        </div>,
      ]
    );
  }
}

export default connect((state, ownProps) => ({
  snippet: state.getIn(['snippets', Number(ownProps.match.params.id)]),
}))(Snippet);
