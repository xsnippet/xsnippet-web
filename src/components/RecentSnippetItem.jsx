import React from 'react'
import { Link } from 'react-router-dom'

import SnippetTags from './common/SnippetTags'

import { downloadSnippet } from '../misc/download'
import { getSnippetMetadata } from '../misc/snippet'

const RecentSnippetItem = ({ snippet }) => {
  const { syntax, title, rawUrl, createdAt } = getSnippetMetadata(snippet)

  const download = () => downloadSnippet(snippet)

  return (
    <li className="recent-snippet-item">
      <div className="recent-snippet-meta">
        <div>
          <Link to={`${snippet.id}`} className="recent-snippet-meta-title">{title}</Link>
          <SnippetTags className="recent-snippet" tags={snippet.tags} id={snippet.id} />
        </div>
        <span className="recent-snippet-meta-info">{createdAt}, by Guest</span>
      </div>
      <div className="recent-snippet-actions">
        <span className="recent-snippet-lang">{syntax}</span>
        <div>
          <a href={rawUrl} className="recent-snippet-button light">Raw</a>
          <button className="recent-snippet-button light" onClick={download}>Download</button>
          <Link to={`${snippet.id}`} className="recent-snippet-button">Show</Link>
        </div>
      </div>
    </li>
  )
}

export default RecentSnippetItem
