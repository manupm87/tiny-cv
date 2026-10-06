import { useState, useEffect, useRef } from 'react';
import IntroSlide from './components/IntroSlide';
import TimelineSlideDesktop from './components/TimelineSlideDesktop';
import StoryNavigator from './components/StoryNavigator';
import BackgroundOrbs from './components/BackgroundOrbs';
import ErrorBoundary from './components/ErrorBoundary';
import useIsMobile from './hooks/useIsMobile';
import MobileTimelineContainer from './components/MobileTimelineContainer';
import './styles/Timeline.css';
import { MotionConfig } from 'framer-motion';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import LanguageSwitcher from './components/LanguageSwitcher';

function AppContent() {
  const { content: timelineData } = useLanguage();
  const isMobile = useIsMobile();
  const containerRef = useRef(null);

  // Desktop uses original data structure
  const slidesData = isMobile ? [] : timelineData;

  // We default to the first slide's ID
  // Ensure timelineData is available before accessing property
  const [activeId, setActiveId] = useState(timelineData && timelineData.length > 0 ? timelineData[0].id : 'intro');

  useEffect(() => {
    if (!containerRef.current || isMobile || !timelineData) return;

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
  }, [isMobile, timelineData]);

  if (isMobile) {
    return (
      <ErrorBoundary fallbackMessage="Something went wrong with the mobile view.">
        <MobileTimelineContainer timelineData={timelineData} />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary fallbackMessage="Something went wrong loading the timeline.">
      <main className="timeline-container" ref={containerRef}>
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
      </main>
    </ErrorBoundary>
  );
}

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <LanguageProvider>
        <AppContent />
        <LanguageSwitcher />
      </LanguageProvider>
    </MotionConfig>
  );
}

export default App;
