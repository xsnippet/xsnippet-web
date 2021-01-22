import React from 'react'

const SnippetTags = ({ className, tags, id }) => {
  if (!tags.length) {
    return false
  }

  return (
    <div className={`${className}-meta-tags`}>
      {tags.map(item => <span className={`${className}-meta-tag`} key={`${item}-${id}`}>{item}</span>)}
    </div>
  )
}

export default SnippetTags
