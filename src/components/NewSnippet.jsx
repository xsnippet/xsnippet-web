import React from 'react';
import { connect } from 'react-redux';
import { Controlled as CodeMirror } from 'react-codemirror2';

import 'codemirror/lib/codemirror.css';

import Title from './common/Title';
import Input from './common/Input';
import Syntaxes from './Syntaxes';
import * as actions from '../actions';

import '../styles/NewSnippet.styl';

class NewSnippet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      title: '',
      tags: [],
      syntax: '', // eslint-disable-line react/no-unused-state
    };
    this.postSnippet = this.postSnippet.bind(this);
    this.onSyntaxClick = this.onSyntaxClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onSyntaxClick(syntax) {
    this.setState({ syntax }); // eslint-disable-line react/no-unused-state
  }

  onInputChange(e) {
    const { name } = e.target;
    let { value } = e.target;

    if (name === 'tags') {
      value = value.split(',').map(item => item.trim());
    }

    this.setState({ [name]: value });
  }

  postSnippet(e) {
    e.preventDefault();
    const { dispatch, history } = this.props;
    dispatch(actions.postSnippet(this.state, json => history.push(`/${json.id}`)));
  }

  render() {
    return (
      [
        <Title title="New snippet" key="New Snippet Title" />,
        <form className="new-snippet" key="New Snippet" onSubmit={this.postSnippet}>
          <div className="new-snippet-code-wrapper">
            <div className="new-snippet-code-header">
              <Input
                placeholder="Title"
                name="title"
                onChangeHandler={this.onInputChange}
                value={this.state.title}
              />
              <Input
                placeholder="Tags (separate tags by comma)"
                name="tags"
                onChangeHandler={this.onInputChange}
                value={this.state.tags.toString()}
              />
            </div>
            <div className="new-snippet-code">
              <CodeMirror
                value={this.state.content}
                options={{ lineNumbers: true }}
                onBeforeChange={(editor, data, content) => { this.setState({ content }); }}
              />
              <div className="new-snippet-code-bottom-bar">
                <input type="submit" value="POST" />
              </div>
            </div>
          </div>
          <div className="new-snippet-lang-wrapper">
            <Syntaxes onClick={this.onSyntaxClick} />
          </div>
        </form>,
      ]
    );
  }
}

export default connect()(NewSnippet);
