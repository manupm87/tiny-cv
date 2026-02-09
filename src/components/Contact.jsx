import React from 'react';
import ComicPanel from './ComicPanel';
import { Mail, Phone } from 'lucide-react';

const Contact = () => {
  return (
    <ComicPanel title="Contact Me">
      <div className="contact-links">
        <a href="mailto:manugijon@gmail.com" className="contact-link">
          <Mail size={32} /> manugijon@gmail.com
        </a>
        <a href="tel:+34660163565" className="contact-link">
          <Phone size={32} /> (+34) 660 163 565
        </a>
      </div>
      <div className="end-text">THE END?</div>
    </ComicPanel>
  );
};

export default Contact;
