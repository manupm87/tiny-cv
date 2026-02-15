import { useState, useEffect, useRef } from 'react';
import { timelineData } from './data/timeline';
import IntroSlide from './components/IntroSlide';
import TimelineSlideDesktop from './components/TimelineSlideDesktop';
import StoryNavigator from './components/StoryNavigator';
import BackgroundOrbs from './components/BackgroundOrbs';
import useIsMobile from './hooks/useIsMobile';
import MobileTimelineContainer from './components/MobileTimelineContainer';
import './styles/Timeline.css';

function App() {
  const isMobile = useIsMobile();
  const containerRef = useRef(null);

  // Desktop uses original data structure
  const slidesData = isMobile ? [] : timelineData;

  // We default to the first slide's ID
  const [activeId, setActiveId] = useState(timelineData[0].id);

  useEffect(() => {
    if (!containerRef.current || isMobile) return;

    const observerOptions = {
      root: containerRef.current,
      rootMargin: '0px',
      threshold: 0.3,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    timelineData.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [containerRef.current, isMobile]);

  if (isMobile) {
    return <MobileTimelineContainer timelineData={timelineData} />;
  }

  return (
    <div className="timeline-container" ref={containerRef}>
      {/* Global Background Elements */}
      <BackgroundOrbs scrollContainer={containerRef} />

      <StoryNavigator sections={slidesData} activeId={activeId} />

      {slidesData.map((item, index) => {
        if (item.type === 'intro') {
          return <IntroSlide key={item.id} data={item} />;
        }
        return <TimelineSlideDesktop key={item.id} data={item} index={index} />;
      })}
    </div>
  );
}

export default App;
