import React from 'react'
import { connect } from 'react-redux'
import AceEditor from 'react-ace'
import { WithContext as Tags } from 'react-tag-input'

import brace from 'brace'
import 'brace/ext/modelist'
import 'brace/theme/textmate'

import Joi from 'joi'

import Notification from './common/Notification'
import ListBoxWithSearch from './ListBoxWithSearch'
import * as actions from '../actions'

import '../styles/NewSnippet.styl'

class NewSnippet extends React.Component {
  constructor(props) {
    super(props)
    this.schema = Joi.object().keys({
      content: Joi.string().required(),
    })
    this.keys = {
      TAB: 9,
      SPACE: 32,
      ENTER: 13,
      COMMA: 188,
    }
    this.state = {
      content: '',
      title: '',
      tags: [],
      syntax: '',
      validationError: null,
    }
    this.recalcLangHeaderHeight = () => {
      const newSnippetHeaderHeight = document.getElementsByClassName('new-snippet-code-header')[0].offsetHeight

      document.getElementsByClassName('new-snippet-lang-header')[0]
        .setAttribute('style', `height:${newSnippetHeaderHeight}px`)
    }
    this.onEditorLoad = (editor) => {
      // we want to disable built-in find in favor of browser's one
      editor.commands.removeCommand('find')
    }
    this.postSnippet = this.postSnippet.bind(this)
    this.onSyntaxClick = this.onSyntaxClick.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    this.onTagAdded = this.onTagAdded.bind(this)
    this.onTagRemoved = this.onTagRemoved.bind(this)
    this.onTagBlur = this.onTagBlur.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(actions.fetchSyntaxes)
  }

  onTagAdded(tag) {
    if (tag && tag.text) {
      this.setState({ tags: [...this.state.tags, tag] }, () => {
        this.recalcLangHeaderHeight()
      })
    }
  }

  onTagRemoved(i) {
    const { tags } = this.state

    this.setState({ tags: tags.filter((tag, index) => index !== i) }, () => {
      this.recalcLangHeaderHeight()
    })
  }

  onTagBlur(tag) {
    this.onTagAdded({ id: tag, text: tag })
  }

  onSyntaxClick(syntax) {
    this.setState({ syntax })
  }

  onInputChange(e) {
    const { name, value } = e.target

    this.setState({ [name]: value })
  }

  postSnippet(e) {
    e.preventDefault()
    const { dispatch, history } = this.props
    const { error } = Joi.validate({ content: this.state.content.trim() }, this.schema)

    this.setState({ validationError: error })

    if (error === null) {
      const {
        content, title, tags, syntax,
      } = this.state

      dispatch(actions.postSnippet({
        content, title, tags: tags.map(tag => tag.text), syntax,
      }, json => history.push(`/${json.id}`)))
    }
  }

  render() {
    const { modesByName } = brace.acequire('ace/ext/modelist')
    const mode = modesByName[this.state.syntax] || modesByName.text
    const syntaxes = this.props.syntaxes.map(item => ({
      name: modesByName[item].caption,
      value: item,
    }))

    return (
      <form
        className="new-snippet"
        key="New Snippet"
        onSubmit={this.postSnippet}
        role="presentation"
      >
        <Notification
          message="Content is required :("
          show={!!this.state.validationError}
        />
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
              placeholder="Tags"
              tags={this.state.tags}
              handleDelete={this.onTagRemoved}
              handleAddition={this.onTagAdded}
              handleInputBlur={this.onTagBlur}
              delimiters={
                [this.keys.TAB, this.keys.SPACE, this.keys.ENTER, this.keys.COMMA]
              }
            />
            <input className="new-snippet-code-post-button post" type="submit" value="POST SNIPPET" />
          </div>
          <div className="new-snippet-code">
            <AceEditor
              mode={mode.name}
              width="100%"
              height="100%"
              focus
              theme="textmate"
              onLoad={this.onEditorLoad}
              setOptions={{
                showFoldWidgets: false,
                useWorker: false,
                fontSize: '13px',
                maxLines: Infinity,
                showPrintMargin: false,
              }}
              editorProps={{ $blockScrolling: Infinity }}
              value={this.state.content}
              onChange={(content) => { this.setState({ content }) }}
            />
          </div>
        </div>
        <div className="new-snippet-lang-wrapper">
          <ListBoxWithSearch
            items={syntaxes}
            onClick={this.onSyntaxClick}
          />
        </div>
      </form>
    )
  }
}

export default connect(state => ({
  syntaxes: state.get('syntaxes'),
}))(NewSnippet)
