import React from 'react'
import { Link } from 'react-router-dom'
import bemi from 'bemi'

import { downloadSnippet } from '../misc/download'
import { getCurrentModeCaption } from '../misc/modes'
import { getSnippetTitle, formatDate } from '../misc/snippet'
import { getRawUrl } from '../misc/url'

const rsi = bemi('recent-snippet')

const RecentSnippetItem = ({ snippet }) => {
  const syntax = getCurrentModeCaption(snippet.get('syntax'))
  const title = getSnippetTitle(snippet)
  const rawUrl = getRawUrl(snippet.get('id'))

  const download = () => downloadSnippet(snippet)

  return (
    <li className={rsi.e('item')}>
      <div className={rsi.e('meta')}>
        <div>
          <Link to={`${snippet.get('id')}`} className={rsi.e('meta-title')}>{title}</Link>
          <div className={rsi.e('meta-tags')}>
            {snippet.get('tags').map(item => <span className={rsi.e('meta-tag')} key={item}>{item}</span>)}
          </div>
        </div>
        <span className={rsi.e('meta-info')}>{formatDate(snippet.get('created_at'))}, by Guest</span>
      </div>
      <div className={rsi.e('actions')}>
        <span className={rsi.e('lang')}>{syntax}</span>
        <div>
          <a href={rawUrl} className={rsi.e('button', 'light')}>Raw</a>
          <button className={rsi.e('button', 'light')} onClick={download}>Download</button>
          <Link to={`${snippet.get('id')}`} className={rsi.e('button')}>Show</Link>
        </div>
      </div>
    </li>
  )
}

export default RecentSnippetItem
