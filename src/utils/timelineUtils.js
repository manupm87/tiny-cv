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
        // specific logic for 'slide' types which have 'locations' and 'cards'
        if (section.locations && section.locations.length > 0) {
            // Newest Logic: "Super-Sticky" Title
            // We group by SECTION, but preserve LOCATION structure inside.
            // This allows the Title to stick for the whole section, 
            // while the Image changes per location.

            const mobileLocations = [];

            section.locations.forEach((location, locIndex) => {
                const locationItems = [];

                location.cards.forEach((card, cardIndex) => {
                    locationItems.push({
                        id: `${section.id}-${locIndex}-${cardIndex}`,
                        cardData: card,
                    });
                });

                if (locationItems.length > 0) {
                    mobileLocations.push({
                        id: `loc-${locIndex}`,
                        image: location.image,
                        items: locationItems
                    });
                }
            });

            if (mobileLocations.length > 0) {
                flattenedData.push({
                    type: 'mobile-section-group',
                    id: section.id,
                    header: {
                        title: section.title,
                        subtitle: section.description,
                    },
                    locations: mobileLocations
                });
            }

        } else {
            // Fallback for sections without locations (if any)
            flattenedData.push(section);
        }
    });

    return flattenedData;
};
