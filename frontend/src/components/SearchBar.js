import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

const useGoogleMapsScript = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.google) {
        setLoaded(true);
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return loaded;
};

const carOptions = ['Sedan', 'SUV', 'Truck', 'Convertible', 'Coupe', 'Minivan'];

const SearchBar = () => {
  const isLoaded = useGoogleMapsScript();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState(null);
  const [selectedCar, setSelectedCar] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [estimatedDistance, setEstimatedDistance] = useState('');
  const [estimatedPrice, setEstimatedPrice] = useState('');

  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelectFrom = async (address) => {
    setFrom(address);
    const results = await geocodeByAddress(address);
    const latLng = await getLatLng(results[0]);
    console.log('Selected From:', address, latLng);
  };

  const handleSelectTo = async (address) => {
    setTo(address);
    const results = await geocodeByAddress(address);
    const latLng = await getLatLng(results[0]);
    console.log('Selected To:', address, latLng);
  };

  const estimate = () => {
    // Placeholder logic for estimation, replace with actual logic
    const distance = '100 miles';
    const price = '$150';
    setEstimatedDistance(distance);
    setEstimatedPrice(price);
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col shadow-lg w-full rounded-lg bg-white">
      <div className="flex justify-evenly bg-white py-5 rounded-lg w-[60vw]">
        <div className="mb-2 w-1/5">
          <label className="block mb-2 font-bold text-gray-600">From:</label>
          <PlacesAutocomplete
            value={from}
            onChange={setFrom}
            onSelect={handleSelectFrom}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <input {...getInputProps({ placeholder: 'Enter departure location' })} className="w-full p-2 border border-gray-300 rounded-md bg-white transition duration-300 ease-in-out" />
                <div className="relative w-full">
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion) => {
                    const className = suggestion.active ? 'bg-gray-200 p-2' : 'bg-white p-2';
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, { className })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        </div>

        <div className="mb-2 w-1/5">
          <label className="block mb-2 font-bold text-gray-600">To:</label>
          <PlacesAutocomplete
            value={to}
            onChange={setTo}
            onSelect={handleSelectTo}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <input {...getInputProps({ placeholder: 'Enter destination location' })} className="w-full p-2 border border-gray-300 rounded-md bg-white transition duration-300 ease-in-out" />
                <div className="relative w-full">
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion) => {
                    const className = suggestion.active ? 'bg-gray-200 p-2' : 'bg-white p-2';
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, { className })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        </div>

        <div className="mb-2 w-1/5">
          <label className="block mb-2 font-bold text-gray-600">Date:</label>
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            placeholderText="dd/mm/yyyy"
            className="w-full p-2 border border-gray-300 rounded-md bg-white"
          />
        </div>

        <div className="mb-2 w-1/5 relative" ref={dropdownRef}>
          <label className="block mb-2 font-bold text-gray-600">Car Type:</label>
          <div className="relative w-full">
            <button
              className="w-full p-2 border border-gray-300 rounded-md bg-white transition duration-300 ease-in-out"
              onClick={toggleDropdown}
              aria-expanded={showDropdown}
              aria-haspopup="true"
            >
              {selectedCar ? selectedCar : 'Select a car'}
            </button>
            {showDropdown && (
              <div className="absolute w-full bg-white border border-gray-300 shadow-md z-10 mt-2">
                {carOptions.map((car) => (
                  <div
                    key={car}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => {
                      setSelectedCar(car);
                      setShowDropdown(false);
                    }}
                  >
                    {car}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-evenly bg-white py-5 rounded-lg w-full">
        <div>
          <button
            className="bg-orange-500 text-white px-8 py-3 rounded-full hover:bg-orange-600 transition duration-300"
            onClick={estimate}
          >
            Estimate
          </button>
        </div>
        <div className="w-1/5">
          <input value={estimatedDistance} placeholder="Estimated Distance" readOnly className="w-full p-2 border border-gray-300 rounded-md bg-gray-100" />
        </div>
        <div className="w-1/5">
          <input value={estimatedPrice} placeholder="Estimated Price" readOnly className="w-full p-2 border border-gray-300 rounded-md bg-gray-100" />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
