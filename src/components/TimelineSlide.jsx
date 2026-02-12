import React from 'react';
import TimelineSlideMobile from './TimelineSlideMobile';
import TimelineSlideDesktop from './TimelineSlideDesktop';

const TimelineSlide = ({ data, index, isMobile }) => {
  // If we are on mobile and have the special mobileCard prop
  if (isMobile && data.mobileCard) {
    return <TimelineSlideMobile data={data} />;
  }

  // Desktop / Original Logic
  return <TimelineSlideDesktop data={data} index={index} />;
};

export default TimelineSlide;
