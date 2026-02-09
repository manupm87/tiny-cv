import React from 'react';
import ComicPanel from './ComicPanel';

const Cover = () => {
  return (
    <ComicPanel className="cover-panel">
      <div className="cover-content">
        <h1>THE CLOUD ARCHITECT</h1>
        <p className="subtitle">Featuring: Manuel Pérez Martínez</p>

        <div className="contact-info-box">
          <p><strong>Address:</strong> Dindurra 1, Entlo A, 33201 - Gijón (Spain)</p>
          <p><strong>Mobile:</strong> (+34) 660 163 565</p>
          <p><strong>Email:</strong> manugijon@gmail.com</p>
          <p><strong>Date of birth:</strong> 14/01/1987</p>
          <p><strong>Nationality:</strong> Spanish</p>
        </div>

        <div className="comic-starburst">
          <span>Cloud<br/>Power!</span>
        </div>
      </div>
    </ComicPanel>
  );
};

export default Cover;
