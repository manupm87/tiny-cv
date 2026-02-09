import React from 'react';
import ComicPanel from './ComicPanel';
import { Mail, Github, Linkedin } from 'lucide-react';

const Contact = () => {
  return (
    <ComicPanel title="Contact">
      <div className="contact-links">
        <a href="mailto:jules@example.com" className="contact-link">
          <Mail size={32} /> Email
        </a>
        <a href="https://github.com" className="contact-link">
          <Github size={32} /> GitHub
        </a>
        <a href="https://linkedin.com" className="contact-link">
          <Linkedin size={32} /> LinkedIn
        </a>
      </div>
      <div className="end-text">THE END?</div>
    </ComicPanel>
  );
};

export default Contact;
