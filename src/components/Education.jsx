import React from 'react';
import ComicPanel from './ComicPanel';
import { GraduationCap } from 'lucide-react';

const Education = () => {
  return (
    <ComicPanel title="Origins">
      <div className="education-entry">
        <GraduationCap size={48} className="icon"/>
        <h3>University of Tech</h3>
        <p>B.S. Computer Science</p>
        <span className="year">2014-2018</span>
      </div>
    </ComicPanel>
  );
};

export default Education;
