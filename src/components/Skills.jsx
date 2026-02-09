import React from 'react';
import ComicPanel from './ComicPanel';
import { Cloud, Server, Code, Terminal, Globe, Users, Shield, GitBranch, Box } from 'lucide-react';

const Skills = () => {
  return (
    <ComicPanel title="Superpowers">
      <div className="skills-grid">
        <div className="skill-item">
          <Cloud className="icon" size={32}/>
          <span>GCP</span>
        </div>
        <div className="skill-item">
          <Box className="icon" size={32}/>
          <span>Kubernetes & Docker</span>
        </div>
        <div className="skill-item">
          <Terminal className="icon" size={32}/>
          <span>Terraform & IaC</span>
        </div>
         <div className="skill-item">
          <GitBranch className="icon" size={32}/>
          <span>CI/CD & Jenkins</span>
        </div>
        <div className="skill-item">
          <Shield className="icon" size={32}/>
          <span>Cloud Security</span>
        </div>
        <div className="skill-item">
          <Code className="icon" size={32}/>
          <span>Go / Python / Bash</span>
        </div>
        <div className="skill-item">
          <Globe className="icon" size={32}/>
          <span>English (C1)</span>
        </div>
        <div className="skill-item">
          <Globe className="icon" size={32}/>
          <span>Spanish (Native)</span>
        </div>
         <div className="skill-item">
          <Users className="icon" size={32}/>
          <span>Mentoring & Scrum</span>
        </div>
      </div>
    </ComicPanel>
  );
};

export default Skills;
