/**
 * Helper to get the next valid indices in the hierarchy
 * Hierarchy: Section -> Location -> Card
 * 
 * @param {Object} indices { sectionIndex, locationIndex, cardIndex }
 * @param {Array} timelineData 
 * @returns {Object|null} New indices or null if at end
 */
export const getNextIndices = (indices, timelineData) => {
    const { sectionIndex, locationIndex, cardIndex } = indices;
    const currentSection = timelineData[sectionIndex];

    // Safety check
    if (!currentSection) return null;

    // A section might be an 'intro' type (no locations/cards usually, or just treated as one step)
    // If it's an intro section and we are at it, we move to next section
    if (currentSection.type === 'intro') {
        const nextSecIndex = sectionIndex + 1;
        if (nextSecIndex < timelineData.length) {
            return { sectionIndex: nextSecIndex, locationIndex: 0, cardIndex: 0 };
        }
        return null; // End of timeline
    }

    // Normal Section with Locations
    const locations = currentSection.locations || [];
    const currentLocation = locations[locationIndex];

    // Check if we can move to next CARD in same location
    if (currentLocation && currentLocation.cards && cardIndex < currentLocation.cards.length - 1) {
        return { ...indices, cardIndex: cardIndex + 1 };
    }

    // Check if we can move to next LOCATION in same section
    if (locationIndex < locations.length - 1) {
        return { sectionIndex, locationIndex: locationIndex + 1, cardIndex: 0 };
    }

    // Check if we can move to next SECTION
    if (sectionIndex < timelineData.length - 1) {
        return { sectionIndex: sectionIndex + 1, locationIndex: 0, cardIndex: 0 };
    }

    return null; // Reached the very end
};

/**
 * Helper to get previous indices
 */
export const getPrevIndices = (indices, timelineData) => {
    const { sectionIndex, locationIndex, cardIndex } = indices;

    // Check if we can move to prev CARD in same location
    if (cardIndex > 0) {
        return { ...indices, cardIndex: cardIndex - 1 };
    }

    // Check if we can move to prev LOCATION in same section
    if (locationIndex > 0) {
        const prevLocationIndex = locationIndex - 1;
        const prevLocation = timelineData[sectionIndex].locations[prevLocationIndex];
        // Move to the LAST card of the previous location
        const lastCardIndex = prevLocation.cards ? prevLocation.cards.length - 1 : 0;
        return { sectionIndex, locationIndex: prevLocationIndex, cardIndex: lastCardIndex };
    }

    // Check if we can move to prev SECTION
    if (sectionIndex > 0) {
        const prevSectionIndex = sectionIndex - 1;
        const prevSection = timelineData[prevSectionIndex];

        if (prevSection.type === 'intro') {
            return { sectionIndex: prevSectionIndex, locationIndex: 0, cardIndex: 0 };
        }

        // Move to LAST location of prev section
        const locations = prevSection.locations || [];
        const lastLocIndex = locations.length > 0 ? locations.length - 1 : 0;
        const lastLoc = locations[lastLocIndex];
        // Move to LAST card of that location
        const lastCardIdx = lastLoc && lastLoc.cards ? lastLoc.cards.length - 1 : 0;

        return { sectionIndex: prevSectionIndex, locationIndex: lastLocIndex, cardIndex: lastCardIdx };
    }

    return null; // At the very beginning
};
