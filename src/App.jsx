import React, { useState, useEffect, useMemo } from 'react';
import { timelineData } from './data/timeline';
import IntroSlide from './components/IntroSlide';
import TimelineSlide from './components/TimelineSlide';
import StoryNavigator from './components/StoryNavigator';
import BackgroundOrbs from './components/BackgroundOrbs';
import useIsMobile from './hooks/useIsMobile';
import { adaptTimelineData } from './utils/timelineUtils';

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

  useEffect(() => {
    // Update activeId when slidesData changes to avoid stale IDs
    if (slidesData.length > 0) {
      // Optional: Reset to top or find the equivalent slide? 
      // For simplicity, let's just ensure we have a valid ID.
      // But if we switch views, scroll position might be weird.
      // Let's rely on intersecting observer to catch up.
    }
  }, [slidesData]);

  useEffect(() => {
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

    slidesData.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [containerEl, slidesData]);

  return (
    <div className="timeline-container" ref={containerRef}>
      {/* Global Background Elements */}
      {containerEl && <BackgroundOrbs scrollContainer={scrollContainerRef} />}

      {!isMobile && <StoryNavigator sections={timelineData} activeId={activeId} />}

      {slidesData.map((item, index) => {
        if (item.type === 'intro') {
          return <IntroSlide key={item.id} data={item} isActive={activeId === item.id} isMobile={isMobile} />;
        }
        return <TimelineSlide key={item.id} data={item} index={index} isActive={activeId === item.id} isMobile={isMobile} />;
      })}
    </div>
  );
}

export default App;
