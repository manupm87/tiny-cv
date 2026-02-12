import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Smartphone, Cloud, Server, Network } from 'lucide-react';
import './../styles/IntroSlide.css';
import './../styles/GlassCard.css';

const IntroSlide = ({ data }) => {
  const { content } = data;

  return (
    <section className="timeline-section" id={data.id}>
      <motion.div
        className="glass-card intro-card"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >

        <div className="intro-icons">
          <Cloud size={48} />
          <Network size={48} />
          <Server size={48} />
        </div>

        <div className="intro-header">
          <h1 className="intro-title">
            {data.title}
          </h1>
          <h2 className="intro-role">
            {content.role}
          </h2>
          <p className="intro-summary">
            {content.summary}
          </p>
        </div>

        <div className="intro-contact">
          <a href={`mailto:${content.email}`} className="contact-link">
            <Mail size={20} /> {content.email}
          </a>
          <span className="contact-link">
            <Smartphone size={20} /> {content.mobile}
          </span>
        </div>

        <div className="intro-socials">
          {content.socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-button"
            >
              {social.name === 'GitHub' && <Github size={20} />}
              {social.name === 'LinkedIn' && <Linkedin size={20} />}
              {social.name}
            </a>
          ))}
        </div>

      </motion.div>
    </section>
  );
};

export default IntroSlide;
