import React from 'react';
import ComicPanel from './ComicPanel';
import { GraduationCap, School, BookOpen } from 'lucide-react';

const Education = () => {
  return (
    <ComicPanel title="Knowledge Base">
      <div className="education-list">

        <div className="education-entry">
          <GraduationCap size={48} className="icon"/>
          <h3>Master in AI, Cloud Computing & DevOps</h3>
          <p>pontia.tech</p>
          <span className="year">02/2026 – Present</span>
        </div>

        <div className="education-entry">
          <GraduationCap size={48} className="icon"/>
          <h3>MSc Telecommunication Engineering</h3>
          <p>University of Oviedo, Gijón (Spain)</p>
          <span className="year">10/2005 – 07/2012</span>
        </div>

        <div className="education-entry">
          <BookOpen size={48} className="icon"/>
          <h3>ERASMUS Telecommunication Engineering</h3>
          <p>Universitá di Bolonia, Bolonia (Italy)</p>
          <span className="year">10/2010 – 07/2011</span>
        </div>

        <div className="education-entry">
          <School size={48} className="icon"/>
          <h3>International Baccalaureate</h3>
          <p>R.I.E.S. Jovellanos, Gijón (Spain)</p>
          <span className="year">09/2003 – 06/2005</span>
        </div>

      </div>
    </ComicPanel>
  );
};

export default Education;
