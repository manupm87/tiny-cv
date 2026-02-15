/**
 * Timeline Navigation Helpers
 * Unified navigation logic for timeline hierarchy: Section -> Location -> Card
 */

/**
 * Check if a card index is valid within a location
 */
const isValidCard = (sectionIndex, locationIndex, cardIndex, timelineData) => {
    const section = timelineData[sectionIndex];
    if (!section || section.type === 'intro') return false;

    const location = section.locations?.[locationIndex];
    if (!location?.cards) return false;

    return cardIndex >= 0 && cardIndex < location.cards.length;
};

/**
 * Check if a location index is valid within a section
 */
const isValidLocation = (sectionIndex, locationIndex, timelineData) => {
    const section = timelineData[sectionIndex];
    if (!section || section.type === 'intro') return false;

    const locations = section.locations || [];
    return locationIndex >= 0 && locationIndex < locations.length;
};

/**
 * Check if a section index is valid
 */
const isValidSection = (sectionIndex, timelineData) => {
    return sectionIndex >= 0 && sectionIndex < timelineData.length;
};

/**
 * Get the last card index for a location
 */
const getLastCardIndex = (sectionIndex, locationIndex, timelineData) => {
    const section = timelineData[sectionIndex];
    if (!section || section.type === 'intro') return 0;

    const location = section.locations?.[locationIndex];
    if (!location?.cards) return 0;

    return Math.max(0, location.cards.length - 1);
};

/**
 * Get indices for entering a section based on direction
 */
const getIndicesForSection = (sectionIndex, direction, timelineData) => {
    const section = timelineData[sectionIndex];

    // Intro sections have no locations/cards
    if (section.type === 'intro') {
        return { sectionIndex, locationIndex: 0, cardIndex: 0 };
    }

    const locations = section.locations || [];

    if (direction > 0) {
        // Moving forward: start at first location, first card
        return { sectionIndex, locationIndex: 0, cardIndex: 0 };
    } else {
        // Moving backward: start at last location, last card
        const lastLocIndex = Math.max(0, locations.length - 1);
        const lastCardIdx = getLastCardIndex(sectionIndex, lastLocIndex, timelineData);
        return { sectionIndex, locationIndex: lastLocIndex, cardIndex: lastCardIdx };
    }
};

/**
 * Unified navigation function for timeline hierarchy
 * @param {Object} indices - Current { sectionIndex, locationIndex, cardIndex }
 * @param {number} direction - 1 for next, -1 for previous
 * @param {Array} timelineData - Timeline data array
 * @returns {Object|null} New indices or null if boundary reached
 */
export const navigateTimeline = (indices, direction, timelineData) => {
    const { sectionIndex, locationIndex, cardIndex } = indices;
    const currentSection = timelineData[sectionIndex];

    // Safety check
    if (!currentSection) return null;

    // Handle intro sections specially
    if (currentSection.type === 'intro') {
        const newSectionIndex = sectionIndex + direction;
        if (isValidSection(newSectionIndex, timelineData)) {
            return getIndicesForSection(newSectionIndex, direction, timelineData);
        }
        return null;
    }

    // Try navigating at CARD level
    const newCardIndex = cardIndex + direction;
    if (isValidCard(sectionIndex, locationIndex, newCardIndex, timelineData)) {
        return { sectionIndex, locationIndex, cardIndex: newCardIndex };
    }

    // Try navigating at LOCATION level
    const newLocationIndex = locationIndex + direction;
    if (isValidLocation(sectionIndex, newLocationIndex, timelineData)) {
        const cardIdx = direction > 0 ? 0 : getLastCardIndex(sectionIndex, newLocationIndex, timelineData);
        return { sectionIndex, locationIndex: newLocationIndex, cardIndex: cardIdx };
    }

    // Try navigating at SECTION level
    const newSectionIndex = sectionIndex + direction;
    if (isValidSection(newSectionIndex, timelineData)) {
        return getIndicesForSection(newSectionIndex, direction, timelineData);
    }

    return null; // Boundary reached
};

/**
 * Helper to get the next valid indices in the hierarchy
 * Maintained for backward compatibility
 * 
 * @param {Object} indices { sectionIndex, locationIndex, cardIndex }
 * @param {Array} timelineData 
 * @returns {Object|null} New indices or null if at end
 */
export const getNextIndices = (indices, timelineData) => {
    return navigateTimeline(indices, 1, timelineData);
};

/**
 * Helper to get previous indices
 * Maintained for backward compatibility
 * 
 * @param {Object} indices { sectionIndex, locationIndex, cardIndex }
 * @param {Array} timelineData 
 * @returns {Object|null} New indices or null if at beginning
 */
export const getPrevIndices = (indices, timelineData) => {
    return navigateTimeline(indices, -1, timelineData);
};
