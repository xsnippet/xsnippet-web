import React from 'react';
import { connect } from 'react-redux';
import AceEditor from 'react-ace';
import Tags from 'react-tagging-input';

import brace from 'brace';
import 'brace/ext/modelist';
import 'brace/theme/textmate';

import Title from './common/Title';
import ListBoxWithSearch from './ListBoxWithSearch';
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
    this.onKeyPress = (e) => {
      // e.target.nodeName !=== 'TEXTAREA' is an ugly hack to allow enter
      // to insert "newline" into code editor. We need to figure out
      // a better way to handle this.
      if (e.which === 13 && e.target.nodeName !== 'TEXTAREA') { // keyCode for Enter button
        e.preventDefault();
      }
    };
    this.postSnippet = this.postSnippet.bind(this);
    this.onSyntaxClick = this.onSyntaxClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onTagAdded = this.onTagAdded.bind(this);
    this.onTagRemoved = this.onTagRemoved.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actions.fetchSyntaxes);
  }

  onTagAdded(tag) {
    this.setState({ tags: [...this.state.tags, tag] });
  }

  onTagRemoved(tag) {
    this.setState({ tags: this.state.tags.filter(item => item !== tag) });
  }

  onSyntaxClick(syntax) {
    this.setState({ syntax }); // eslint-disable-line react/no-unused-state
  }

  onInputChange(e) {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  }

  postSnippet(e) {
    e.preventDefault();
    const { dispatch, history } = this.props;
    dispatch(actions.postSnippet(this.state, json => history.push(`/${json.id}`)));
  }

  render() {
    const { modesByName } = brace.acequire('ace/ext/modelist');
    const mode = modesByName[this.state.syntax] || modesByName.text;
    const syntaxes = this.props.syntaxes.map(item => ({
      name: modesByName[item].caption,
      value: item,
    }));

    return (
      [
        <Title title="New snippet" key="New Snippet Title" />,
        <form
          className="new-snippet"
          key="New Snippet"
          onKeyPress={this.onKeyPress}
          onSubmit={this.postSnippet}
          role="presentation"
        >
          <div className="new-snippet-code-wrapper">
            <div className="new-snippet-code-header">
              <input
                className="input"
                placeholder="Title"
                name="title"
                type="text"
                value={this.state.title}
                onChange={this.onInputChange}
              />
              <Tags
                tags={this.state.tags}
                placeholder="Tags"
                onAdded={this.onTagAdded}
                onRemoved={this.onTagRemoved}
                uniqueTags
              />
            </div>
            <div className="new-snippet-code">
              <AceEditor
                mode={mode.name}
                width="100%"
                height="100%"
                focus
                theme="textmate"
                setOptions={{
                  showFoldWidgets: false,
                  useWorker: false,
                  maxLines: Infinity,
                  showPrintMargin: false,
                }}
                value={this.state.content}
                onChange={(content) => { this.setState({ content }); }}
              />

              <div className="new-snippet-code-bottom-bar">
                <input type="submit" value="POST" />
              </div>
            </div>
          </div>
          <div className="new-snippet-lang-wrapper">
            <ListBoxWithSearch
              items={syntaxes}
              onClick={this.onSyntaxClick}
            />
          </div>
        </form>,
      ]
    );
  }
}

export default connect(state => ({
  syntaxes: state.get('syntaxes'),
}))(NewSnippet);
