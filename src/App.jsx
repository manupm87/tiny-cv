import React from 'react';
import Cover from './components/Cover';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Education from './components/Education';
import Contact from './components/Contact';

function App() {
  return (
    <div className="comic-container">
      <Cover />
      <Experience />
      <Skills />
      <Education />
      <Contact />
    </div>
  );
}

export default App;
