import React from 'react';
import ComicPanel from './ComicPanel';

const Cover = () => {
  return (
    <ComicPanel className="cover-panel">
      <div className="cover-content">
        <h1>THE AMAZING DEVELOPER</h1>
        <p className="subtitle">Featuring: Jules</p>
        <div className="comic-starburst">
          <span>Full Stack<br/>Action!</span>
        </div>
      </div>
    </ComicPanel>
  );
};

export default Cover;
