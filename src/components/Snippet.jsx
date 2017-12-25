import React, { Component } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';

import 'codemirror/lib/codemirror.css';

import Title from './common/Title';
import Input from './common/Input';

import '../styles/Snippet.styl';

class Snippet extends Component {
  constructor() {
    super();
    this.state = { isShowEmbed: false };
    this.toggleEmbed = this.toggleEmbed.bind(this);
  }

  toggleEmbed() {
    this.setState({ isShowEmbed: !this.state.isShowEmbed });
  }

  render() {
    return (
      [
        <Title title="Snippet" key="snippet" />,
        <div className="snippet">
          <div className="snippet-header">
            <div className="snippet-data">
              <div>
                <span className="snippet-data-title">#235435, Untitled</span>
                <span className="snippet-data-lang">[ Java ]</span>
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
            <Input value="<script src='http://xsnippet.org/363686/embed/'></script>" />
          </div>
          <div className="snippet-code">
            <CodeMirror
              value="console.log('All hail XSnippet')"
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

export default Snippet;
