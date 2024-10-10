import React, { useState, useRef, useEffect } from 'react';

const DestinationPopup = ({ destination, onClose }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    // Disable scrolling on the body when the popup is open
    document.body.style.overflow = 'hidden';
    return () => {
      // Re-enable scrolling when the popup is closed
      document.body.style.overflow = 'unset';
    };
  }, []);

  const scrollPhotos = (direction) => {
    if (scrollContainerRef.current) {
      const { scrollLeft } = scrollContainerRef.current;
      const scrollAmount = 350;
      scrollContainerRef.current.scrollTo({
        left: scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount),
        behavior: 'smooth',
      });
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!destination) {
    return null; // or a loading spinner
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="float-right text-2xl">
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4">{destination.name}</h2>

        <div className="relative">
          <div ref={scrollContainerRef} className="flex overflow-x-auto no-scrollbar mb-4">
            {destination.image?.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`${destination.name} - Photo ${index + 1}`}
                className="w-full h-64 object-cover flex-shrink-0 mr-4"
              />
            ))}
          </div>
          <button
            onClick={() => scrollPhotos('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
          >
            &lt;
          </button>
          <button
            onClick={() => scrollPhotos('right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
          >
            &gt;
          </button>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">About {destination.name}</h3>
          <p>{destination.description}</p>
        </div>

        <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default DestinationPopup;
