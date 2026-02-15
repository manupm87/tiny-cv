import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Smartphone, Cloud, Server, Network } from 'lucide-react';
import PropTypes from 'prop-types';
import './../styles/GlassCard.css';
import './../styles/IntroSlide.css';
import { SCALE_IN } from '../utils/animations';

/**
 * Intro slide displaying personal information and contact details
 * @param {Object} props
 * @param {Object} props.data - Slide data including title, content, and social links
 */
const IntroSlide = ({ data }) => {
  const { content } = data;

  return (
    <section className="timeline-section" id={data.id}>
      <motion.div
        className="glass-card intro-card"
        {...SCALE_IN}
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

IntroSlide.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.shape({
      role: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      mobile: PropTypes.string.isRequired,
      summary: PropTypes.string.isRequired,
      socials: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired,
        })
      ).isRequired,
    }).isRequired,
  }).isRequired,
};

export default IntroSlide;
