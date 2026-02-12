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
            return;
        }

        // Logic for 'slide' types which have 'locations' and 'cards'
        if (section.locations && section.locations.length > 0) {
            section.locations.forEach((location, locIndex) => {
                // For each card in the location, create a full slide
                location.cards.forEach((card, cardIndex) => {
                    flattenedData.push({
                        id: `${section.id}-${locIndex}-${cardIndex}`,
                        type: 'mobile-slide',
                        header: {
                            title: section.title,
                            subtitle: section.description,
                        },
                        image: location.image,
                        card: card
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
