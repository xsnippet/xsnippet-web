import React from 'react';
import { Link } from 'react-router-dom';
import brace from 'brace';

import { downloadSnippet } from '../helpers';

const RecentSnippetItem = ({ snippet }) => {
  const { modesByName } = brace.acequire('ace/ext/modelist');
  const mode = modesByName[snippet.get('syntax')] || modesByName.text;
  const syntax = mode.caption;
  const snippetTitle = snippet.get('title') || `#${snippet.get('id')}, Untitled`;
  const download = () => downloadSnippet(snippet);

  return (
    <li className="recent-snippet-item">
      <div className="recent-snippet-data">
        <div>
          <Link to={`${snippet.get('id')}`} className="recent-snippet-data-title">{snippetTitle}</Link>
          <span className="recent-snippet-data-lang">[ {syntax} ]</span>
        </div>
        <span className="recent-snippet-data-author">By Guest</span>
      </div>
      <div>
        <button className="recent-snippet-button light">Raw</button>
        <button className="recent-snippet-button light" onClick={download}>Download</button>
        <Link to={`${snippet.get('id')}`} className="recent-snippet-button">Show</Link>
      </div>
    </li>
  );
};

export default RecentSnippetItem;
