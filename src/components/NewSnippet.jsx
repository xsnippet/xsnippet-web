import React, { useRef } from 'react'
import AceEditor from 'react-ace'
import { WithContext as Tags } from 'react-tag-input'
import { useRecoilValueLoadable } from 'recoil'

import 'brace/theme/textmate'

import Notification from './common/Notification'
import ListBox from './ListBox'

import { onEditorLoad } from '../misc/editor'
import { getCurrentModeName } from '../misc/modes'

import { validateSnippet } from '../entries/snippetValidation'
import { delimeterKeys } from '../entries/keyboardKeys'
import { defaultOptions } from '../entries/aceEditorOptions'

import withSearch from '../hoc/withSearch'
import useForm from '../hooks/useForm'
import { syntaxesQuery } from '../store'
import { postSnippet } from '../api'

import '../styles/NewSnippet.styl'

const ListBoxWithSearch = withSearch(ListBox)

const NewSnippet = ({ history }) => {
  const snippetHeader = useRef()
  const {
    values: { title = '', syntax = '', content = '', tags = [] },
    error,
    handleChange,
    handleSubmit,
  } = useForm(post, validate)
  const syntaxes = useRecoilValueLoadable(syntaxesQuery)

  function validate() {
    return validateSnippet({ content: content.trim() })
  }

  function post() {
    postSnippet({ content, title, tags: tags.map(tag => tag.text), syntax }, json => {
      history.push(`/${json.id}`)
    })
  }

  const onTagBlur = tag => onTagAdded({ id: tag, text: tag })

  const onTagAdded = tag => {
    if (tag && tag.text) {
      return { tags: [...tags, tag] }
    }
  }

  const onTagRemoved = i => {
    return { tags: tags.filter((tag, index) => index !== i) }
  }

  const handleSyntax = syntax => ({ syntax })
  const handleContent = content => ({ content })

  const renderValidationError = () => (error && <Notification message={error} />)

  return (
    <form
      className="new-snippet"
      key="New Snippet"
      onSubmit={handleSubmit}
      role="presentation"
    >
      <div className="new-snippet-code-wrapper">
        <div className="new-snippet-code-header" ref={snippetHeader}>
          <input
            className="input"
            placeholder="Title"
            name="title"
            type="text"
            value={title}
            onChange={handleChange}
          />
          <Tags
            placeholder="Tags"
            tags={tags}
            handleDelete={(value) => handleChange(value, onTagRemoved)}
            handleAddition={(value) => handleChange(value, onTagAdded)}
            handleInputBlur={(value) => handleChange(value, onTagBlur)}
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
            onChange={(value) => handleChange(value, handleContent)}
          />
          <div className="new-snippet-code-bottom-bar">
            {renderValidationError()}
            <input type="submit" value="POST SNIPPET" />
          </div>
        </div>
      </div>
      <div className="new-snippet-lang-wrapper">
        <ListBoxWithSearch
          className="new-snippet-lang"
          items={syntaxes.state === 'hasValue' ? syntaxes.contents : []}
          onClick={(syntax) => handleChange(syntax, handleSyntax)}
        />
      </div>
    </form>
  )
}

export default NewSnippet
