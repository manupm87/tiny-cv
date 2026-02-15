import React, { useState, useEffect, useMemo } from 'react';
import { timelineData } from './data/timeline';
import IntroSlide from './components/IntroSlide';
import TimelineSlideDesktop from './components/TimelineSlideDesktop';
import StoryNavigator from './components/StoryNavigator';
import BackgroundOrbs from './components/BackgroundOrbs';
import useIsMobile from './hooks/useIsMobile';
import { adaptTimelineData } from './utils/timelineUtils';

import TimelineSlideMobile from './components/TimelineSlideMobile';
import './styles/Timeline.css';

function App() {
  const isMobile = useIsMobile();

  // Adapt data for mobile if needed
  const slidesData = useMemo(() => adaptTimelineData(timelineData, isMobile), [isMobile]);

  // We default to the first slide's ID
  const [activeId, setActiveId] = useState(slidesData[0].id);

  const [containerEl, setContainerEl] = useState(null);

  const containerRef = React.useCallback(node => {
    if (node !== null) {
      setContainerEl(node);
    }
  }, []);

  const scrollContainerRef = React.useMemo(() => ({ current: containerEl }), [containerEl]);

  // Use ref to track slidesData without causing effect recreation
  const slidesDataRef = React.useRef(slidesData);
  React.useEffect(() => {
    slidesDataRef.current = slidesData;
  }, [slidesData]);

  useEffect(() => {
    if (!containerEl) return;

    const observerOptions = {
      root: containerEl,
      rootMargin: '0px',
      threshold: 0.3, // Lower threshold for better mobile detection
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Use ref to access current slidesData
    slidesDataRef.current.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [containerEl]); // Only recreate when container changes, not on slidesData changes

  if (!slidesData || slidesData.length === 0) {
    return <div style={{ color: 'white', textAlign: 'center', padding: '2rem' }}>Loading timeline...</div>;
  }

  return (
    <div className="timeline-container" ref={containerRef}>
      {/* Global Background Elements */}
      {containerEl && <BackgroundOrbs scrollContainer={scrollContainerRef} />}

      {!isMobile && <StoryNavigator sections={slidesData} activeId={activeId} />}

      {slidesData.map((item, index) => {
        if (item.type === 'intro') {
          return <IntroSlide key={item.id} data={item} isActive={activeId === item.id} isMobile={isMobile} />;
        }
        if (item.type === 'mobile-slide') {
          return (
            <TimelineSlideMobile
              key={item.id}
              data={item}
            />
          );
        }
        return <TimelineSlideDesktop key={item.id} data={item} index={index} />;
      })}
    </div>
  );
}

export default App;
