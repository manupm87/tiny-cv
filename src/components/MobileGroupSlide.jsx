import React from 'react';
import InfoCard from './InfoCard';
import './../styles/MobileGroup.css';

const MobileGroupSlide = ({ data }) => {
    // data is now a 'mobile-section-group' containing 'locations'
    const [expandedCardId, setExpandedCardId] = React.useState(null);

    const handleToggle = (cardId) => {
        setExpandedCardId(prevId => prevId === cardId ? null : cardId);
    };

    if (!data || !data.locations) return null;

    return (
        <section
            id={data.id}
            className="mobile-section-group"
        >
            {/* 
         SUPER STICKY TITLE 
         Sticks to top for the entire section duration.
         High Z-Index to stay above everything.
      */}
            <div className="super-sticky-title">
                <h2 className="section-title mobile-title">{data.header.title}</h2>
                <h3 className="section-subtitle mobile-subtitle">{data.header.subtitle}</h3>
            </div>

            {/* 
         LOCATION BLOCKS
         Rendered sequentially. Each block contains an Image and Cards.
      */}
            {data.locations.map((loc) => (
                <div key={loc.id} className="mobile-location-block">

                    {/* 
             IMAGE STICKY
             Sticks below the title within this location block.
             Z-Index lower than Title, Higher than Cards?
             Actually, we want Image to visually be "behind" the cards if cards slide up?
             Or "above" if it's a header.
             Let's try: Title (30) > Image (20) > Cards (10)
             BUT cards need to slide *under* the header area.
          */}
                    {loc.image && (
                        <div className="sticky-location-image">
                            <img
                                src={loc.image}
                                alt="Location"
                                className="mobile-loc-img"
                            />
                        </div>
                    )}

                    {/* 
             CARDS LIST
             Scrolls normally.
          */}
                    <div className="cards-list-container">
                        {loc.items.map((item) => (
                            <div
                                key={item.id}
                                className="mobile-card-wrapper"
                            >
                                <div className="mobile-card-inner">
                                    <InfoCard
                                        {...item.cardData}
                                        isMobile={true}
                                        isExpanded={expandedCardId === item.id}
                                        onToggle={() => handleToggle(item.id)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            ))}

        </section>
    );
};

export default MobileGroupSlide;
