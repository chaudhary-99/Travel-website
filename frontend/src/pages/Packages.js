import React, { useState, forwardRef, useEffect } from 'react';
import PackageCard from './cards/PackageCard';
import CustomPackageForm from './cards/CustomPackageForm';
import FixedPkgPopup from './cards/FixedPkgPopup';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { FaCarSide, FaCarAlt, FaTruck } from 'react-icons/fa'; 
import { IoCarSport } from "react-icons/io5";
import { Calendar as CalendarIcon } from 'lucide-react';
import { ClipLoader } from 'react-spinners'; 
import 'react-datepicker/dist/react-datepicker.css';
import '../index.css';

// Custom Input for DatePicker with integrated Calendar Icon
const CustomDateInput = forwardRef(({ value, onClick }, ref) => (
  <div className="relative w-full sm:w-64">
    <input
      type="text"
      onClick={onClick}
      ref={ref}
      value={value}
      readOnly
      aria-label="Select Travel Date"
      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-700"
      placeholder="Select Travel Date"
    />
    <CalendarIcon
      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
      size={20}
    />
  </div>
));

// Custom Option component for react-select to include icons
const CustomOption = ({ innerProps, data, isSelected }) => {
  const Icon = data.icon;
  return (
    <div
      {...innerProps}
      className={`flex items-center px-4 py-2 cursor-pointer ${
        isSelected ? 'bg-orange-100' : 'hover:bg-orange-50'
      }`}
    >
      <Icon className="mr-3 text-orange-500" size={20} />
      <span>{data.label}</span>
    </div>
  );
};

const PackagesPage = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [carType, setCarType] = useState('');
  const [travelDate, setTravelDate] = useState(null);
  const [tab, setTab] = useState('fixed');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allpackages,setAllPackages] = useState([]);

  useEffect(()=>{
    const fetchPackages = async () =>{
      try{
        const response = await fetch('http://localhost:8000/packages');
        const data = await response.json();
        console.log(data);
        setAllPackages(data);
      }catch(error){
        console.log('error in fetching packages',error);
      }
    };

    fetchPackages();
  },[]);


  const carOptions = [
    { value: 'hatchback', label: 'Hatchback', icon: FaCarSide },
    { value: 'sedan', label: 'Sedan (+₹500)', icon: FaCarAlt },
    { value: 'suv', label: 'SUV (+₹1000)', icon: IoCarSport }, 
  ];

  const carPrices = {
    hatchback: 0,
    sedan: 500,
    suv: 1000,
  };

  const calculatePrice = (basePrice) => {
    const carPrice = carPrices[carType] || 0;
    return basePrice + carPrice;
  };

  const handlePackageClick = (pkg) => {
    setSelectedPackage(pkg);
    setShowPopup(true);
  };

  const handleGetQuote = (customPackage) => {
    setLoading(true);
    setTimeout(() => {
      alert('Quote generated for your custom package!');
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-16 md:pt-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 py-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-10 text-orange-700">
          Our Exclusive Packages
        </h1>

        <div className="w-full mb-8">
          {/* Tab Selection */}
          <div className="flex justify-center mb-6">
            <div className="flex rounded-full bg-orange-100 p-1 shadow-md">
              <button
                className={`inline-flex items-center justify-center rounded-full px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg font-semibold transition-all ${
                  tab === 'fixed'
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'text-orange-600 hover:bg-orange-200'
                }`}
                onClick={() => setTab('fixed')}
                aria-pressed={tab === 'fixed'}
              >
                Fixed Packages
              </button>
              <button
                className={`inline-flex items-center justify-center rounded-full px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg font-semibold transition-all ${
                  tab === 'custom'
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'text-orange-600 hover:bg-orange-200'
                }`}
                onClick={() => setTab('custom')}
                aria-pressed={tab === 'custom'}
              >
                Custom Packages
              </button>
            </div>
          </div>

          {tab === 'fixed' && (
            <>
              {/* Enhanced Date and Car Selection */}
              <div className="mb-8 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
                {/* Enhanced DatePicker */}
                <DatePicker
                  selected={travelDate}
                  onChange={(date) => setTravelDate(date)}
                  customInput={<CustomDateInput />}
                  dateFormat="dd MMMM yyyy"
                  minDate={new Date()}
                  aria-label="Travel Date"
                />

                {/* Enhanced Car Selection */}
                <div className="w-full sm:w-64">
                  <Select
                    options={carOptions}
                    value={carOptions.find((option) => option.value === carType)}
                    onChange={(selectedOption) =>
                      setCarType(selectedOption ? selectedOption.value : '')
                    }
                    placeholder="Select Car Type"
                    isClearable
                    classNamePrefix="react-select"
                    components={{ Option: CustomOption}}
                    styles={{
                      control: (provided, state) => ({
                        ...provided,
                        border: '1px solid #D1D5DB',
                        boxShadow: 'none',
                        '&:hover': {
                          border: '1px solid #F97316',
                        },
                        backgroundColor: 'white',
                      }),
                      placeholder: (provided) => ({
                        ...provided,
                        color: '#6B7280',
                      }),
                      dropdownIndicator: (provided) => ({
                        ...provided,
                        color: '#F97316',
                      }),
                      menu: (provided) => ({
                        ...provided,
                        zIndex: 50,
                      }),
                    }}
                    aria-label="Car Type Selection"
                  />
                </div>
              </div>

              {/* Package Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {allpackages.map((pkg) => (
                  <PackageCard
                    key={pkg.id}
                    pkg={pkg}
                    carType={carType}
                    travelDate={travelDate}
                    calculatePrice={calculatePrice}
                    handleBookNow={handlePackageClick}
                  />
                ))}
              </div>
            </>
          )}

          {tab === 'custom' && (
            <div className="w-full mx-auto bg-white shadow-lg rounded-xl border border-orange-200 p-6">
              <div className="p-6 bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-t-xl">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
                  Create Your Custom Package
                </h2>
              </div>
              <div className="p-6">
                <CustomPackageForm
                  selectedPlaces={selectedPlaces}
                  setSelectedPlaces={setSelectedPlaces}
                  carType={carType}
                  setCarType={setCarType}
                  travelDate={travelDate}
                  setTravelDate={setTravelDate}
                  handleGetQuote={handleGetQuote}
                />
                {loading && (
                  <div className="mt-4 flex justify-center">
                    <ClipLoader color="#F97316" loading={loading} size={35} />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fixed Package Popup */}
      {showPopup && selectedPackage && (
        <FixedPkgPopup
          onClose={() => setShowPopup(false)}
          destination={selectedPackage}
          calculatePrice={calculatePrice}
          carType={carType}
          travelDate={travelDate}
        />
      )}
    </div>
  );
};

export default PackagesPage;
