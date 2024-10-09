import React, { useState } from 'react';
import DestinationPopup from './DestinationPopup';

const PopularDestinationsCard = ({ destination }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleCardClick = () => {
    setShowPopup(true);
  };

  return (
    <>
      <div 
        className="w-[270px] border border-gray-300 rounded-lg overflow-hidden shadow-md hover:shadow-lg hover:translate-y-[-10px] transition-transform duration-300 ease-in-out m-5 cursor-pointer"
        onClick={handleCardClick}
      >
        <img src={destination.image} alt={destination.name} className="w-full h-auto max-h-[180px] transition-transform duration-300 ease-in-out hover:scale-105" />
        <div className="p-3 text-left">
          <div className="flex items-center">
            <h3 className="text-xl m-0">{destination.id < 10 ? `0${destination.id}` : destination.id}</h3>
            <span className="ml-auto w-2 h-2 bg-orange-500 rounded-full"></span>
          </div>
          <p className="mt-1 mb-0 text-lg">{destination.name}</p>
        </div>
      </div>

      {showPopup && (
        <DestinationPopup
          destination={destination}
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  );
}

export default PopularDestinationsCard;