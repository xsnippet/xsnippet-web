import React from 'react';
import { Link } from 'react-router-dom';
import brace from 'brace';

import { downloadSnippet, formatDate } from '../helpers';

const RecentSnippetItem = ({ snippet }) => {
  const { modesByName } = brace.acequire('ace/ext/modelist');
  const mode = modesByName[snippet.get('syntax')] || modesByName.text;
  const syntax = mode.caption;
  const snippetTitle = snippet.get('title') || `#${snippet.get('id')}, Untitled`;
  const download = () => downloadSnippet(snippet);
  const rawUrl = process.env.RAW_SNIPPETS_URL_FORMAT.replace('%s', snippet.get('id'));

  return (
    <li className="recent-snippet-item">
      <div className="recent-snippet-meta">
        <div>
          <Link to={`${snippet.get('id')}`} className="recent-snippet-meta-title">{snippetTitle}</Link>
          <div className="recent-snippet-meta-tags">
            {snippet.get('tags').map(item => <span className="recent-snippet-meta-tag" key={item}>{item}</span>)}
          </div>
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
  );
};

export default RecentSnippetItem;
