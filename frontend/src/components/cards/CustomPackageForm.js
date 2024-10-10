// src/components/CustomPackageForm.jsx
import React, { useState } from 'react';
import { FaCar, FaCarSide, FaTruck } from 'react-icons/fa';
import { Calendar } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';


const CustomPackageForm = ({
  selectedPlaces,
  setSelectedPlaces,
  carType,
  setCarType,
  travelDate,
  setTravelDate,
  handleGetQuote,
}) => {
  const [duration, setDuration] = useState('');
  const [errors, setErrors] = useState({});

  const handlePlaceSelection = (place) => {
    setSelectedPlaces((prev) => {
      if (prev.includes(place)) {
        return prev.filter((p) => p !== place);
      } else {
        return [...prev, place];
      }
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (selectedPlaces.length === 0) newErrors.places = 'Please select at least one place.';
    if (!carType) newErrors.carType = 'Please select a car type.';
    if (!travelDate) newErrors.travelDate = 'Please select a travel date.';
    if (!duration || duration <= 0) newErrors.duration = 'Please enter a valid duration.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleGetQuote({ selectedPlaces, carType, travelDate, duration });
    }
  };

  const carOptions = [
    {
      value: 'hatchback',
      label: (
        <div className="flex items-center">
          {/* <FaHatchback className="mr-2 text-orange-500" /> */}
          Hatchback
        </div>
      ),
      cost: 0,
    },
    {
      value: 'sedan',
      label: (
        <div className="flex items-center">
          {/* <FaCarSide className="mr-2 text-orange-500" /> */}
          Sedan (+₹500)
        </div>
      ),
      cost: 500,
    },
    {
      value: 'suv',
      label: (
        <div className="flex items-center">
          {/* <FaTruck className="mr-2 text-orange-500" /> */}
          SUV (+₹1000)
        </div>
      ),
      cost: 1000,
    },
  ];

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      height: '48px',
      borderColor: errors.carType ? '#f87171' : '#d1d5db',
      boxShadow: state.isFocused ? '0 0 0 2px rgba(251,113,133,0.5)' : provided.boxShadow,
      '&:hover': {
        borderColor: errors.carType ? '#f87171' : '#f97316',
      },
      paddingLeft: '40px', // To accommodate the icon
    }),
    singleValue: (provided) => ({
      ...provided,
      display: 'flex',
      alignItems: 'center',
    }),
    option: (provided, state) => ({
      ...provided,
      display: 'flex',
      alignItems: 'center',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: '#f97316',
      '&:hover': {
        color: '#f97316',
      },
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
  };

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      {/* Select Places */}
      <div>
        <label className="text-sm sm:text-lg font-semibold text-gray-800 mb-2 block">
          Select Places:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {['Mathura', 'Vrindavan', 'Gokul', 'Barsana'].map((place) => (
            <div key={place} className="flex items-center">
              <input
                type="checkbox"
                id={place}
                className="h-4 w-4 sm:h-5 sm:w-5 rounded border-gray-300 focus:ring-2 focus:ring-orange-500"
                onChange={() => handlePlaceSelection(place)}
                checked={selectedPlaces.includes(place)}
              />
              <label htmlFor={place} className="ml-2 text-xs sm:text-sm text-gray-700 font-medium">
                {place}
              </label>
            </div>
          ))}
        </div>
        {errors.places && <p className="text-red-500 text-sm mt-1">{errors.places}</p>}
      </div>

      {/* Travel Date */}
      <div>
        <label className="text-sm sm:text-lg font-semibold text-gray-800 mb-2 block">
          Travel Date:
        </label>
        <div className="relative">
          <DatePicker
            selected={travelDate}
            onChange={(date) => setTravelDate(date)}
            className={`block w-full h-10 sm:h-12 pl-10 pr-4 rounded-lg border ${
              errors.travelDate ? 'border-red-500' : 'border-gray-300'
            } focus:ring-2 focus:ring-orange-500 text-xs sm:text-sm`}
            placeholderText="dd/mm/yyyy"
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            aria-label="Travel Date"
          />
          <span className="absolute inset-y-0 left-3 sm:left-4 flex items-center pointer-events-none text-orange-500">
            <Calendar size={16} />
          </span>
        </div>
        {errors.travelDate && <p className="text-red-500 text-sm mt-1">{errors.travelDate}</p>}
      </div>

      {/* Select Car */}
      <div>
        <label className="text-sm sm:text-lg font-semibold text-gray-800 mb-2 block">
          Select Car:
        </label>
        <div className="relative">
          <Select
            options={carOptions}
            value={carOptions.find((option) => option.value === carType)}
            onChange={(selectedOption) => setCarType(selectedOption ? selectedOption.value : '')}
            styles={customStyles}
            placeholder="Select car type"
            isClearable
            aria-label="Select Car Type"
          />
          <span className="absolute inset-y-0 left-3 sm:left-4 flex items-center pointer-events-none text-orange-500">
            <FaCar size={20} />
          </span>
        </div>
        {errors.carType && <p className="text-red-500 text-sm mt-1">{errors.carType}</p>}
      </div>

      {/* Duration */}
      <div>
        <label className="text-sm sm:text-lg font-semibold text-gray-800 mb-2 block">
          Duration (Days):
        </label>
        <input
          type="number"
          className={`block w-full h-10 sm:h-12 pl-4 pr-4 rounded-lg border ${
            errors.duration ? 'border-red-500' : 'border-gray-300'
          } focus:ring-2 focus:ring-orange-500 text-xs sm:text-sm`}
          placeholder="Duration (Days)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          min="1"
          aria-label="Duration in Days"
        />
        {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <button
          type="submit"
          className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg text-sm sm:text-base transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
          aria-label="Get Quote"
        >
          Get Quote
        </button>
      </div>
    </form>
  );
};

export default CustomPackageForm;
