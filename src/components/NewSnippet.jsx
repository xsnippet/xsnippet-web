import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import AceEditor from 'react-ace'
import { WithContext as Tags } from 'react-tag-input'

import 'brace/theme/textmate'

import Notification from './common/Notification'
import ListBoxWithSearch from './ListBoxWithSearch'

import { fetchSyntaxes, postSnippet } from '../actions'

import { onEditorLoad } from '../misc/editor'
import { getCurrentModeName, getModesByName } from '../misc/modes'

import { validateSnippet } from '../entries/snippetValidation'
import { delimeterKeys } from '../entries/keyboardKeys'
import { defaultOptions } from '../entries/aceEditorOptions'

import '../styles/NewSnippet.styl'

const recalcLangHeaderHeight = () => {
  const mainHeader = 'new-snippet-code-header'
  const langHeader = 'new-snippet-lang-header'

  const height = document.getElementsByClassName(mainHeader)[0].offsetHeight

  document.getElementsByClassName(langHeader)[0].setAttribute('style', `height:${height}px`)
}

const NewSnippet = props => {
  const { dispatch, history } = props

  const [ syntax, setSyntax ] = useState('')
  const [ content, setContent ] = useState('')
  const [ title, setTitle ] = useState('')
  const [ tags, setTags ] = useState([])
  const [ validationError, setValidationError ] = useState(null)

  useEffect(() => {
    dispatch(fetchSyntaxes)
  }, [])

  useEffect(() => {
    recalcLangHeaderHeight()
  }, [tags])

  const onTagAdded = tag => {
    if (tag && tag.text) {
      setTags([...tags, tag])
    }
  }

  const onTagRemoved = i => {
    setTags(tags.filter((tag, index) => index !== i))
  }

  const onTagBlur = tag => {
    onTagAdded({ id: tag, text: tag })
  }

  const onSyntaxClick = syntax => {
    setSyntax(syntax)
  }

  const onTitleChange = e => {
    const { value } = e.target

    setTitle(value)
  }

  const validate = () => validateSnippet({ content: content.trim() })

  const post = e => {
    e.preventDefault()
    const { error } = validate()

    setValidationError(error)

    if (!error) {
      dispatch(postSnippet({
        content, title, tags: tags.map(tag => tag.text), syntax,
      }, json => history.push(`/${json.id}`)))
    }
  }

  const getSyntaxes = () => {
    const { modesByName } = getModesByName()

    return props.syntaxes.map(item => ({
      name: modesByName[item].caption,
      value: item,
    }))
  }

  const renderValidationError = () => (validationError && <Notification
    message="Content is required :("
    show={!!validationError}
  />)

  return (
    <form
      className="new-snippet"
      key="New Snippet"
      onSubmit={post}
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
            onChange={onTitleChange}
          />
          <Tags
            placeholder="Tags"
            tags={tags}
            handleDelete={onTagRemoved}
            handleAddition={onTagAdded}
            handleInputBlur={onTagBlur}
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
            onChange={(value) => setContent(value)}
          />
          <div className="new-snippet-code-bottom-bar">
            {renderValidationError()}
            <input type="submit" value="POST SNIPPET" />
          </div>
        </div>
      </div>
      <div className="new-snippet-lang-wrapper">
        <ListBoxWithSearch
          items={getSyntaxes()}
          onClick={onSyntaxClick}
        />
      </div>
    </form>
  )
}

export default connect(state => ({
  syntaxes: state.get('syntaxes'),
}))(NewSnippet)
