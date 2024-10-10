import React from 'react';
import { FaCar } from 'react-icons/fa';
import { Calendar } from 'lucide-react';

const PackageCard = ({
  pkg,
  carType,
  travelDate,
  calculatePrice,
  handleBookNow,
}) => {
  const truncateText = (text, limit) => {
    return text.length > limit ? `${text.substring(0, limit)}...` : text;
  };

  const formatDate = (date) => {
    return date ? date.toLocaleDateString('en-GB') : 'Not selected';
  };

  return (
    <div className="rounded-xl border border-orange-200 bg-white shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
      <div
        className="cursor-pointer"
        onClick={() => handleBookNow(pkg)}
        aria-label={`View details for ${pkg.name}`}
      >
        <img
          src={pkg.image[0]}
          alt={`${pkg.name} Image`}
          className="w-full h-48 sm:h-52 md:h-60 object-cover"
          loading="lazy"
        />
        <div className="p-4 sm:p-6 bg-gradient-to-r from-orange-500 to-orange-400 text-white">
          <h3 className="text-xl sm:text-2xl font-semibold">
            {pkg.name}
          </h3>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <div className="flex justify-between items-center mb-4">
          <p className="text-xl sm:text-2xl font-bold text-orange-600">
            ₹{calculatePrice(pkg.basePrice)}
          </p>
          <p className="text-sm text-gray-600 bg-orange-100 px-2 py-1 rounded-full">
            {pkg.duration}
          </p>
        </div>

        <div className="mb-4">
          <h4 className="font-semibold text-gray-800 mb-2">Description:</h4>
          <p className="text-sm text-gray-700">
            {truncateText(pkg.description, 100)}
          </p>
        </div>

        <div className="mb-4">
          <h4 className="font-semibold text-gray-800 mb-2">Selected Options:</h4>
          <div className="flex items-center mb-2">
            <FaCar className="text-orange-500 mr-2" />
            <span className="text-sm text-gray-700">{carType ? carType.charAt(0).toUpperCase() + carType.slice(1) : 'Not selected'}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="text-orange-500 mr-2" size={16} />
            <span className="text-sm text-gray-700">{formatDate(travelDate)}</span>
          </div>
        </div>

        <button
          className={`w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-all duration-200 text-sm sm:text-base ${
            !carType || !travelDate ? 'opacity-50 cursor-not-allowed' : ''
          } focus:outline-none focus:ring-2 focus:ring-orange-500`}
          onClick={(e) => {
            e.stopPropagation();
            handleBookNow(pkg);
          }}
          disabled={!carType || !travelDate}
          aria-label="Book Now"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default PackageCard;