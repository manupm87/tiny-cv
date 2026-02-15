/**
 * Animation configurations for framer-motion
 * Centralized to ensure consistency across components
 */

// Standard easing curves
export const EASING = {
    smooth: [0.16, 1, 0.3, 1], // Custom cubic-bezier for smooth transitions
    spring: { type: "spring" },
    inOut: "easeInOut",
};

// Slide in from left (for desktop timeline sections)
export const SLIDE_IN_LEFT = {
    initial: { opacity: 0, x: -50 },
    whileInView: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ...EASING.spring },
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
    transition: { duration: 0.3, ease: EASING.inOut }
};

/**
 * Factory function for horizontal slide animations
 * @param {number} direction - 1 for right, -1 for left
 * @returns {object} Framer Motion variants
 */
export const createHorizontalSlide = (duration = 0.4) => ({
    enter: (direction) => ({
        x: direction > 0 ? '100%' : '-100%',
        opacity: 0
    }),
    center: {
        x: 0,
        opacity: 1,
        transition: { duration, ease: EASING.smooth }
    },
    exit: (direction) => ({
        x: direction < 0 ? '100%' : '-100%',
        opacity: 0,
        transition: { duration, ease: EASING.smooth }
    })
});

/**
 * Factory function for vertical slide animations
 * @param {number} duration - Animation duration in seconds
 * @returns {object} Framer Motion variants
 */
export const createVerticalSlide = (duration = 0.6) => ({
    enter: (direction) => ({
        y: direction > 0 ? '100%' : '-100%',
        opacity: 0,
        zIndex: 1
    }),
    center: {
        y: 0,
        opacity: 1,
        zIndex: 1,
        transition: { duration, ease: EASING.smooth }
    },
    exit: (direction) => ({
        y: direction < 0 ? '100%' : '-100%',
        opacity: 0,
        zIndex: 0,
        transition: { duration, ease: EASING.smooth }
    })
});

// Pre-created instances for common use cases
export const HORIZONTAL_SLIDE = createHorizontalSlide(0.4);
export const HORIZONTAL_SLIDE_FAST = createHorizontalSlide(0.5);
export const VERTICAL_SLIDE = createVerticalSlide(0.6);

