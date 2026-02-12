/**
 * Animation configurations for framer-motion
 * Centralized to ensure consistency across components
 */

// Slide in from left (for desktop timeline sections)
export const SLIDE_IN_LEFT = {
    initial: { opacity: 0, x: -50 },
    whileInView: { opacity: 1, x: 0 },
    transition: { duration: 0.8, type: "spring" },
    viewport: { amount: 0.3 }
};

// Fade in (for mobile slides)
export const FADE_IN = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    transition: { duration: 0.5 },
    viewport: { once: true, amount: 0.1 }
};

// Fade in from below (for cards)
export const FADE_UP = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { opacity: { duration: 0.3 } },
    viewport: { once: true, margin: "-50px" }
};

// Scale animation (for intro card)
export const SCALE_IN = {
    initial: { scale: 0.9 },
    animate: { scale: 1 },
    transition: { duration: 0.8 }
};

// Height expansion animation (for card details)
export const EXPAND_HEIGHT = {
    initial: { height: 0, opacity: 0 },
    animate: { height: "auto", opacity: 1 },
    exit: { height: 0, opacity: 0 },
    transition: { duration: 0.3, ease: "easeInOut" }
};
