import { useState, useEffect, useRef } from 'react';
import { timelineData } from './data/timeline';
import IntroSlide from './components/IntroSlide';
import TimelineSlideDesktop from './components/TimelineSlideDesktop';
import StoryNavigator from './components/StoryNavigator';
import BackgroundOrbs from './components/BackgroundOrbs';
import ErrorBoundary from './components/ErrorBoundary';
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
    return (
      <ErrorBoundary fallbackMessage="Something went wrong with the mobile view.">
        <MobileTimelineContainer timelineData={timelineData} />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary fallbackMessage="Something went wrong loading the timeline.">
      <div className="timeline-container" ref={containerRef}>
        {/* Global Background Elements */}
        <ErrorBoundary fallbackMessage="Background animation failed to load." showReset>
          <BackgroundOrbs scrollContainer={containerRef} />
        </ErrorBoundary>

        <StoryNavigator sections={slidesData} activeId={activeId} />

        {slidesData.map((item, index) => (
          <ErrorBoundary key={item.id} fallbackMessage={`Failed to load ${item.title}`} showReset>
            {item.type === 'intro' ? (
              <IntroSlide data={item} />
            ) : (
              <TimelineSlideDesktop data={item} index={index} />
            )}
          </ErrorBoundary>
        ))}
      </div>
    </ErrorBoundary>
  );
}

export default App;
