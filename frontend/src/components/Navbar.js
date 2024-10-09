import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ isAuthenticated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu when a link is clicked
  const closeMenu = () => {
    setIsOpen(false);
  };

  // Determine if the current path is '/packages'
  const isPackagesPage = location.pathname === '/packages' || location.pathname === '/contactus' ||  location.pathname === '/about';

  return (
    <header className={`flex justify-between items-center p-4 ${isPackagesPage? 'fixed':'absolute'} w-full top-0 z-10 transition duration-300 ${isPackagesPage ? 'bg-white' : ''}`}>
      <div className={`text-2xl font-bold transition-transform transform hover:scale-110 text-orange-600`}>
        <Link to="/" onClick={closeMenu}>Travel.</Link>
      </div>
      <nav className={`md:flex ${isOpen ? 'flex' : 'hidden'} flex-col md:flex-row md:items-center absolute md:static top-full md:top-0 left-0 w-full md:w-auto transition-all duration-500 ${isPackagesPage ? 'bg-white' : ' bg-transparent backdrop-blur-md'}`}>
        <ul className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0 font-semibold text-lg md:text-base p-4 md:p-0 justify-center items-center">
          <li className={`cursor-pointer transition-colors hover:text-orange-500 ${isPackagesPage ? 'text-gray-800' : 'text-white'}`}>
            <Link to="/" onClick={closeMenu}>Home</Link>
          </li>
          <li className={`cursor-pointer transition-colors hover:text-orange-500 ${isPackagesPage ? 'text-gray-800' : 'text-white'}`}>
            <Link to="/packages" onClick={closeMenu}>Packages</Link>
          </li>
          <li className={`cursor-pointer transition-colors hover:text-orange-500 ${isPackagesPage ? 'text-gray-800' : 'text-white'}`}>
            <Link to="/about" onClick={closeMenu}>About</Link>
          </li>
          <li className={`cursor-pointer transition-colors hover:text-orange-500 ${isPackagesPage ? 'text-gray-800' : 'text-white'}`}>
            <Link to="/contactus" onClick={closeMenu}>Contact</Link>
          </li>
        </ul>
      </nav>
      <div className="flex items-center">
      {isAuthenticated ? (
          <Link to='/profile' onClick={closeMenu}>
            <FontAwesomeIcon icon={faUserCircle} className="text-white text-3xl cursor-pointer hover:text-orange-500 transition-colors" />
          </Link>
        ) : (
          <Link to='/signup' onClick={closeMenu}>
            <button className={`font-semibold text-base ${isPackagesPage ? 'text-orange-500' : 'text-white'} border-2 border-orange-500 py-2 px-6 rounded-full hover:bg-orange-500 hover:text-white transition-colors duration-300`}>Sign Up</button>
          </Link>
        )}
        <Link to="/book" onClick={closeMenu}>
          <button className={`ml-4 font-semibold text-base bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-6 rounded-full hover:scale-105 transform transition-transform duration-300 hidden md:inline`}>
            BOOK NOW
          </button>
        </Link>
      </div>
      <div className="md:hidden flex flex-col cursor-pointer" onClick={toggleMenu} aria-label="Toggle menu">
        <div className={`w-6 h-[3px] bg-gray-900 mb-1 transition-all ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
        <div className={`w-6 h-[3px] bg-gray-900 mb-1 transition-all ${isOpen ? 'opacity-0' : ''}`}></div>
        <div className={`w-6 h-[3px] bg-gray-900 transition-all ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
      </div>
    </header>
  );
};

export default Navbar;
