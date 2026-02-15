import { timelineData } from '../src/data/timeline.js';

// Mock adaptTimelineData from src/utils/timelineUtils.js
// Copy-paste the function to test it in isolation without setting up babel/jest for just this file if possible, 
// OR simpler: just write a test file that imports it if I can run it with node (need esm support).
// Package.json has "type": "module". So I can run node scripts/debug-timeline.js if I use imports.

// I need to copy adaptTimelineData or import it.
// Importing local files might require file extensions.
import { adaptTimelineData } from '../src/utils/timelineUtils.js';

const isMobile = true;
const slides = adaptTimelineData(timelineData, isMobile);

console.log('Total slides:', slides.length);
console.log('Slide 0:', slides[0]);
console.log('Slide 1:', slides[1]);
console.log('Slide 2:', slides[2]);

// Check section IDs
slides.forEach((s, i) => {
    console.log(`[${i}] ID: ${s.id} | Section: ${s.sectionId} | Location: ${s.locationId}`);
});
