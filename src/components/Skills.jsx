import React from 'react';
import ComicPanel from './ComicPanel';
import { Code, Terminal, Database, Server, Cloud, Cpu } from 'lucide-react';

const Skills = () => {
  return (
    <ComicPanel title="Superpowers">
      <div className="skills-grid">
        <div className="skill-item">
          <Code className="icon" size={32}/>
          <span>JavaScript</span>
        </div>
        <div className="skill-item">
          <Terminal className="icon" size={32}/>
          <span>React & Node</span>
        </div>
        <div className="skill-item">
          <Database className="icon" size={32}/>
          <span>SQL & NoSQL</span>
        </div>
        <div className="skill-item">
          <Server className="icon" size={32}/>
          <span>DevOps</span>
        </div>
        <div className="skill-item">
          <Cloud className="icon" size={32}/>
          <span>AWS</span>
        </div>
        <div className="skill-item">
          <Cpu className="icon" size={32}/>
          <span>System Design</span>
        </div>
      </div>
    </ComicPanel>
  );
};

export default Skills;
