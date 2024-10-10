// src/components/cards/FixedPkgPopup.jsx
import React, { useState, useRef, useEffect } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const FixedPkgPopup = ({ destination, onClose, calculatePrice, carType, travelDate }) => {
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
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.8; // Scroll 80% of the container's width
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
    return null; // Optionally, render a loading spinner here
  }

  const totalPrice = calculatePrice(destination.basePrice);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-gray-800 focus:outline-none"
          aria-label="Close Popup"
        >
          <FaTimes />
        </button>

        {/* Popup Header */}
        <h2 className="text-2xl font-bold mb-4 text-orange-600">{destination.name}</h2>

        {/* Image Carousel */}
        <div className="relative mb-6">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto no-scrollbar space-x-4 snap-x snap-mandatory"
          >
            {destination.image?.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`${destination.name} - Photo ${index + 1}`}
                className="w-full h-64 object-cover flex-shrink-0 rounded-md snap-start"
              />
            ))}
          </div>
          {/* Left Scroll Button */}
          <button
            onClick={() => scrollPhotos('left')}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-orange-500 bg-opacity-75 text-white p-2 rounded-full hover:bg-opacity-100 focus:outline-none"
            aria-label="Scroll Left"
          >
            <FaChevronLeft />
          </button>
          {/* Right Scroll Button */}
          <button
            onClick={() => scrollPhotos('right')}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 bg-opacity-75 text-white p-2 rounded-full hover:bg-opacity-100 focus:outline-none"
            aria-label="Scroll Right"
          >
            <FaChevronRight />
          </button>
        </div>

        {/* Destination Details */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">About {destination.name}</h3>
          <p className="text-gray-700">{destination.longDescription || destination.description}</p>
        </div>

        {/* Additional Information */}
        <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <span className="font-semibold">Duration:</span>
            <span> {destination.duration}</span>
          </div>
          <div>
            <span className="font-semibold">Car Type:</span>
            <span> {carType ? carType.charAt(0).toUpperCase() + carType.slice(1) : 'N/A'}</span>
          </div>
          <div>
            <span className="font-semibold">Travel Date:</span>
            <span> {travelDate ? travelDate.toLocaleDateString() : 'N/A'}</span>
          </div>
          <div>
            <span className="font-semibold">Total Price:</span>
            <span className="text-orange-600 font-bold"> ₹{totalPrice}</span>
          </div>
        </div>

        {/* Book Now Button */}
        <button
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition-colors"
          onClick={() => {
            // Handle booking confirmation logic here
            alert('Booking Confirmed!');
            onClose();
          }}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default FixedPkgPopup;
