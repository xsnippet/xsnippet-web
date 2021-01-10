import React from 'react'
import { Link } from 'react-router-dom'

import SnippetTags from './common/SnippetTags'

import { downloadSnippet } from '../misc/download'
import { getCurrentModeCaption } from '../misc/modes'
import { getSnippetTitle, formatDate } from '../misc/snippet'
import { getRawUrl } from '../misc/url'

const RecentSnippetItem = ({ snippet }) => {
  const syntax = getCurrentModeCaption(snippet.get('syntax'))
  const title = getSnippetTitle(snippet)
  const rawUrl = getRawUrl(snippet.get('id'))

  const download = () => downloadSnippet(snippet)

  return (
    <li className="recent-snippet-item">
      <div className="recent-snippet-meta">
        <div>
          <Link to={`${snippet.get('id')}`} className="recent-snippet-meta-title">{title}</Link>
          <SnippetTags className="recent-snippet" snippet={snippet} />
        </div>
        <span className="recent-snippet-meta-info">{formatDate(snippet.get('created_at'))}, by Guest</span>
      </div>
      <div className="recent-snippet-actions">
        <span className="recent-snippet-lang">{syntax}</span>
        <div>
          <a href={rawUrl} className="recent-snippet-button light">Raw</a>
          <button className="recent-snippet-button light" onClick={download}>Download</button>
          <Link to={`${snippet.get('id')}`} className="recent-snippet-button">Show</Link>
        </div>
      </div>
    </li>
  )
}

export default RecentSnippetItem
