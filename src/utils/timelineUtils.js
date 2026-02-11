/**
 * Transforms the nested timeline data into a flat list of slides for mobile.
 * On desktop, it returns the original data.
 * 
 * @param {Array} data - The original timeline data.
 * @param {boolean} isMobile - Whether the current viewport is mobile.
 * @returns {Array} - The adapted data for rendering.
 */
export const adaptTimelineData = (data, isMobile) => {
    if (!isMobile) {
        return data;
    }

    const flattenedData = [];

    data.forEach(section => {
        if (section.type === 'intro') {
            flattenedData.push(section);
            return; // Continue to next iteration
        }

        // specific logic for 'slide' types which have 'locations' and 'cards'
        if (section.locations && section.locations.length > 0) {
            section.locations.forEach((location, locIndex) => {
                location.cards.forEach((card, cardIndex) => {
                    // Create a new slide for each card
                    flattenedData.push({
                        ...section, // Keep parent properties like period, but override id
                        id: `${section.id}-${locIndex}-${cardIndex}`,
                        title: section.title, // Use PARENT section title
                        description: section.description, // Use PARENT section description
                        // We strip out 'locations' array and provide a single 'card' property
                        // We strip out 'locations' array and provide a single 'card' property
                        // This simplifies the mobile slide component to just render one thing
                        mobileCard: {
                            ...card,
                            image: location.image // Pass image down if needed
                        },
                        isMobileSlide: true,
                        originalSectionId: section.id // To link back to story navigator logic if needed
                    });
                });
            });
        } else {
            // Fallback for sections without locations (if any)
            flattenedData.push(section);
        }
    });

    return flattenedData;
};
