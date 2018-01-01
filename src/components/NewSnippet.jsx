import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';

import 'codemirror/lib/codemirror.css';

import Title from './common/Title';
import Input from './common/Input';
import Syntaxes from './Syntaxes';

import '../styles/NewSnippet.styl';

class NewSnippet extends React.Component {
  constructor() {
    super();
    this.state = { code: '' };
  }
  render() {
    return (
      [
        <Title title="New snippet" key="New Snippet Title" />,
        <div className="new-snippet" key="New Snippet">
          <div className="new-snippet-code-wrapper">
            <div className="new-snippet-code-header">
              <Input placeholder="Title" />
              <Input placeholder="Tags (separate tags by comma)" />
            </div>
            <div className="new-snippet-code">
              <CodeMirror
                value={this.state.code}
                options={{ lineNumbers: false }}
                onBeforeChange={(editor, data, code) => {
                  this.setState({ code });
                }}
              />
              <div className="new-snippet-code-bottom-bar">
                <button>POST</button>
              </div>
            </div>
          </div>
          <div className="new-snippet-lang-wrapper">
            <Syntaxes />
          </div>
        </div>,
      ]
    );
  }
}

export default NewSnippet;
