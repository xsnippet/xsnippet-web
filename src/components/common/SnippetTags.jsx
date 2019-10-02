import React from 'react'

const SnippetTags = ({ className, snippet }) => {
  return (
    <div className={className.e('meta-tags')}>
      {snippet.get('tags').map(item => <span className={className.e('meta-tag')} key={item}>{item}</span>)}
    </div>
  )
}

export default SnippetTags
