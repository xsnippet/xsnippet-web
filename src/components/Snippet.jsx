import React from 'react';
import { connect } from 'react-redux';
import { Controlled as CodeMirror } from 'react-codemirror2';

import 'codemirror/lib/codemirror.css';

import Title from './common/Title';
import Input from './common/Input';
import Spinner from './common/Spinner';
import * as actions from '../actions';

import '../styles/Snippet.styl';

class Snippet extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isShowEmbed: false };
    this.toggleEmbed = this.toggleEmbed.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { id } = this.props.match.params;

    dispatch(actions.fetchSnippet(Number(id)));
  }

  toggleEmbed() {
    this.setState(prevState => ({ isShowEmbed: !prevState.isShowEmbed }));
  }

  render() {
    const { snippet } = this.props;

    if (!snippet) return <Spinner />;

    const snippetTitle = snippet.get('title') || `#${snippet.get('id')}, Untitled`;

    return (
      [
        <Title title="Snippet" key="Snippet title" />,
        <div className="snippet" key="Snippet">
          <div className="snippet-header">
            <div className="snippet-data">
              <div>
                <span className="snippet-data-title">{snippetTitle}</span>
                <span className="snippet-data-lang">[ {snippet.get('syntax', 'Text')} ]</span>
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
            <Input value={`<script src='http://xsnippet.org/${snippet.get('id')}/embed/'></script>`} />
          </div>
          <div className="snippet-code">
            <CodeMirror
              value={`${snippet.get('content')}`}
              options={{ lineNumbers: true, readOnly: 'nocursor' }}
            />
            <div className="snippet-code-bottom-bar">
              <button className="snippet-button light">Raw</button>
              <button className="snippet-button light">Download</button>
            </div>
          </div>
        </div>,
      ]
    );
  }
}

export default connect((state, ownProps) => ({
  snippet: state.snippets.get(Number(ownProps.match.params.id)),
}))(Snippet);
