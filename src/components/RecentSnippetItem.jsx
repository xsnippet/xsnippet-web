import React from 'react';
import { Link } from 'react-router-dom';

const RecentSnippetItem = ({ snippet }) => (
  <li className="recent-snippet-item">
    <div className="recent-snippet-data">
      <div>
        <span className="recent-snippet-data-title">{snippet.get('title')}</span>
        <span className="recent-snippet-data-lang">[ {snippet.get('syntax', 'Text')} ]</span>
      </div>
      <span className="recent-snippet-data-author">By Guest</span>
    </div>
    <div>
      <button className="recent-snippet-button light">Raw</button>
      <button className="recent-snippet-button light">Download</button>
      <Link to={`${snippet.get('id')}`} className="recent-snippet-button">Show</Link>
    </div>
  </li>
);

export default RecentSnippetItem;
