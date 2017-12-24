import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Controlled as CodeMirror } from 'react-codemirror2';

import 'codemirror/lib/codemirror.css';

import Title from './common/Title';
import Input from './common/Input';

import '../styles/NewSnippet.styl';

const NewSnippet = () => (
  [
    <Title title="New snippet" key="title" />,
    <div className="new-snippet" key="new-snippet">
      <div className="new-snippet-code-wrapper">
        <div className="new-snippet-code-header">
          <Input placeholder="Title" />
          <Input placeholder="Tags (separate tags by comma)" />
        </div>
        <div className="new-snippet-code">
          <CodeMirror
            value="console.log('All heil XSnippet')"
            options={{ lineNumbers: false }}
          />
          <div className="new-snippet-code-bottom-bar">
            <button>POST</button>
          </div>
        </div>
      </div>
      <div className="new-snippet-lang-wrapper">
        <div className="new-snippet-lang-header">
          <Input placeholder="Type to search..." />
        </div>
        <div className="new-snippet-lang-list-wrapper">
          <Scrollbars>
            <ul className="new-snippet-lang-list">
              <li className="new-snippet-lang-item">Text1</li>
              <li className="new-snippet-lang-item">Text2</li>
              <li className="new-snippet-lang-item">Text3</li>
              <li className="new-snippet-lang-item">Text4</li>
              <li className="new-snippet-lang-item">Text5</li>
              <li className="new-snippet-lang-item">Text6</li>
              <li className="new-snippet-lang-item">Text7</li>
              <li className="new-snippet-lang-item">Text8</li>
              <li className="new-snippet-lang-item">Text9</li>
              <li className="new-snippet-lang-item">Text10</li>
              <li className="new-snippet-lang-item">Text11</li>
              <li className="new-snippet-lang-item">Text12</li>
              <li className="new-snippet-lang-item">Text13</li>
              <li className="new-snippet-lang-item">Text14</li>
            </ul>
          </Scrollbars>
        </div>
      </div>
    </div>,
  ]
);

export default NewSnippet;
