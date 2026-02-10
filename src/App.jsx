import React, { useState, useEffect } from 'react';
import { timelineData } from './data/timeline';
import IntroSlide from './components/IntroSlide';
import TimelineSlide from './components/TimelineSlide';
import StoryNavigator from './components/StoryNavigator';
import BackgroundOrbs from './components/BackgroundOrbs';

function App() {
  const [activeId, setActiveId] = useState(timelineData[0].id);
  const [containerEl, setContainerEl] = useState(null);

  const containerRef = React.useCallback(node => {
    if (node !== null) {
      setContainerEl(node);
    }
  }, []);

  const scrollContainerRef = React.useMemo(() => ({ current: containerEl }), [containerEl]);

  useEffect(() => {
    const observerOptions = {
      root: containerEl, // Use the specific container as root if needed, or null for viewport. keeping null for now as per original logic implies viewport or sticking to defaults. Actually originally 'root: null'.
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    // Only set up observer if we have elements to observe
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    timelineData.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [containerEl]); // Re-run if containerEl changes, though strictly observer relies on document.getElementById.

  return (
    <div className="timeline-container" ref={containerRef}>
      {/* Global Background Elements */}
      {containerEl && <BackgroundOrbs scrollContainer={scrollContainerRef} />}

      <StoryNavigator sections={timelineData} activeId={activeId} />

      {timelineData.map((item, index) => {
        if (item.type === 'intro') {
          return <IntroSlide key={item.id} data={item} isActive={activeId === item.id} />;
        }
        return <TimelineSlide key={item.id} data={item} index={index} isActive={activeId === item.id} />;
      })}
    </div>
  );
}

export default App;
