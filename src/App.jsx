import React, { useState, useEffect, useRef } from 'react';
import { timelineData } from './data/timeline';
import IntroSlide from './components/IntroSlide';
import TimelineSlide from './components/TimelineSlide';
import StoryNavigator from './components/StoryNavigator';

function App() {
  const [activeId, setActiveId] = useState(timelineData[0].id);
  const observerRefs = useRef({});

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // Trigger when 50% of the section is visible
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    timelineData.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="timeline-container">
      <StoryNavigator sections={timelineData} activeId={activeId} />

      {timelineData.map((item) => {
        if (item.type === 'intro') {
          return <IntroSlide key={item.id} data={item} isActive={activeId === item.id} />;
        }
        return <TimelineSlide key={item.id} data={item} isActive={activeId === item.id} />;
      })}
    </div>
  );
}

export default App;
