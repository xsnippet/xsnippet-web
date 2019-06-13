import React from 'react'
import { connect } from 'react-redux'
import AceEditor from 'react-ace'
import { WithContext as Tags } from 'react-tag-input'

import 'brace/theme/textmate'

import Notification from './common/Notification'
import ListBoxWithSearch from './ListBoxWithSearch'
import { fetchSyntaxes, postSnippet } from '../actions'

import { validateSnippet } from '../entries/snippetValidation'
import { getCurrentModeName, getModesByName } from '../misc/modes'
import { onEditorLoad } from '../misc/editor'
import { recalcLangHeaderHeight } from '../misc/dom'

import { delimeterKeys } from '../entries/keyboardKeys'
import { defaultOptions } from '../entries/aceEditorOptions'

import '../styles/NewSnippet.styl'

class NewSnippet extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      content: '',
      title: '',
      tags: [],
      syntax: '',
      validationError: null,
    }
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchSyntaxes)
  }

  onTagAdded = tag => {
    if (tag && tag.text) {
      this.setState({ tags: [...this.state.tags, tag] }, () => {
        recalcLangHeaderHeight()
      })
    }
  }

  onTagRemoved = i => {
    const { tags } = this.state

    this.setState({ tags: tags.filter((tag, index) => index !== i) }, () => {
      recalcLangHeaderHeight()
    })
  }

  onTagBlur = tag => {
    this.onTagAdded({ id: tag, text: tag })
  }

  onSyntaxClick = syntax => {
    this.setState({ syntax })
  }

  onInputChange = e => {
    const { name, value } = e.target

    this.setState({ [name]: value })
  }

  validate = () => {
    const { content } = this.state

    return validateSnippet({ content: content.trim() })
  }

  post = e => {
    e.preventDefault()
    const { dispatch, history } = this.props
    const { error } = this.validate()

    this.setState({ validationError: error })

    if (!error) {
      const {
        content, title, tags, syntax,
      } = this.state

      dispatch(postSnippet({
        content, title, tags: tags.map(tag => tag.text), syntax,
      }, json => history.push(`/${json.id}`)))
    }
  }

  getSyntaxes = () => {
    const { modesByName } = getModesByName()

    return this.props.syntaxes.map(item => ({
      name: modesByName[item].caption,
      value: item,
    }))
  }

  renderValidationError = () => {
    const { validationError } = this.state

    return validationError && <Notification
      message="Content is required :("
      show={!!validationError}
    />
  }

  render() {
    const { syntax, content, title, tags } = this.state

    return (
      <form
        className="new-snippet"
        key="New Snippet"
        onSubmit={this.post}
        role="presentation"
      >
        <div className="new-snippet-code-wrapper">
          <div className="new-snippet-code-header">
            <input
              className="input"
              placeholder="Title"
              name="title"
              type="text"
              value={title}
              onChange={this.onInputChange}
            />
            <Tags
              placeholder="Tags"
              tags={tags}
              handleDelete={this.onTagRemoved}
              handleAddition={this.onTagAdded}
              handleInputBlur={this.onTagBlur}
              delimiters={delimeterKeys}
            />
          </div>
          <div className="new-snippet-code">
            <AceEditor
              mode={getCurrentModeName(syntax)}
              width="100%"
              height="100%"
              focus
              theme="textmate"
              onLoad={onEditorLoad}
              setOptions={defaultOptions}
              editorProps={{ $blockScrolling: Infinity }}
              value={content}
              onChange={(content) => { this.setState({ content }) }}
            />

            <div className="new-snippet-code-bottom-bar">
              {this.renderValidationError()}
              <input type="submit" value="POST SNIPPET" />
            </div>
          </div>
        </div>
        <div className="new-snippet-lang-wrapper">
          <ListBoxWithSearch
            items={this.getSyntaxes()}
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
