import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Smartphone, Cloud, Server, Network } from 'lucide-react';

const IntroSlide = ({ data }) => {
  const { content } = data;

  return (
    <section className="timeline-section" id={data.id}>
      <motion.div
        className="glass-card"
        style={{
          maxWidth: '800px',
          width: '100%',
          textAlign: 'center',
          padding: '4rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem'
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >

        <div style={{ display: 'flex', gap: '1rem', color: 'var(--primary-blue)', marginBottom: '1rem' }}>
          <Cloud size={48} />
          <Network size={48} />
          <Server size={48} />
        </div>

        <div>
          <h1 style={{
            fontSize: '4rem',
            fontWeight: 800,
            margin: 0,
            background: 'linear-gradient(to right, #fff, #94a3b8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            {data.title}
          </h1>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--primary-blue)', margin: '0.5rem 0' }}>
            {content.role}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '1rem auto' }}>
            {content.summary}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href={`mailto:${content.email}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)', textDecoration: 'none' }}>
            <Mail size={20} /> {content.email}
          </a>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
            <Smartphone size={20} /> {content.mobile}
          </span>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          {content.socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '0.75rem 1.5rem',
                background: 'var(--primary-blue)',
                color: 'white',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'transform 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
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
