import React from 'react';
import ComicPanel from './ComicPanel';
import { Briefcase } from 'lucide-react';

const Experience = () => {
  return (
    <ComicPanel title="Experience">
      <div className="experience-list">
        <div className="job-entry">
          <h3><Briefcase size={24} className="icon"/> Senior Engineer</h3>
          <h4>Tech Corp - 2021-Present</h4>
          <p>Saving the world one line of code at a time. Led the migration to Microservices.</p>
        </div>
        <div className="job-entry">
          <h3><Briefcase size={24} className="icon"/> Developer</h3>
          <h4>StartUp Inc - 2018-2021</h4>
          <p>Fought bugs and deadlines. Launched 3 successful products.</p>
        </div>
      </div>
    </ComicPanel>
  );
};

export default Experience;
