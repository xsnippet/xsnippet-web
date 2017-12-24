import React from 'react';

import Title from './common/Title';

import '../styles/RecentSnippets.styl';

const RecentSnippets = () => (
  [
    <Title title="Recent snippets" additionalClass="recent-title" key="title-recent" />,
    <ul className="recent-snippet" key="recent-snippet">
      <li className="recent-snippet-item">
        <div className="recent-snippet-data">
          <div>
            <span className="recent-snippet-data-title">#235435, Untitles</span>
            <span className="recent-snippet-data-lang">[ Java ]</span>
          </div>
          <span className="recent-snippet-data-author">By Guest</span>
        </div>
        <div>
          <button className="recent-snippet-button light">Raw</button>
          <button className="recent-snippet-button light">Download</button>
          <button className="recent-snippet-button">Show</button>
        </div>
      </li>
      <li className="recent-snippet-item">
        <div className="recent-snippet-data">
          <div>
            <span className="recent-snippet-data-title">#235435, Untitles</span>
            <span className="recent-snippet-data-lang">[ Java ]</span>
          </div>
          <span className="recent-snippet-data-author">By Guest</span>
        </div>
        <div>
          <button className="recent-snippet-button light">Raw</button>
          <button className="recent-snippet-button light">Download</button>
          <button className="recent-snippet-button">Show</button>
        </div>
      </li>
    </ul>,
  ]
);

export default RecentSnippets;
