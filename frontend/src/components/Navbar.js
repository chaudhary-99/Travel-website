// Navbar.js

import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="navbar">
      <div className="logo">Travel.</div>
      <nav className={isOpen ? 'open' : ''}>
        <ul>
          <li>Home</li>
          <li>Packages</li>
          <li>About</li>
          <li>Pages</li>
          <li>News</li>
          <li>Contact</li>
        </ul>
      </nav>
      <button className="book-now">BOOK NOW</button>
      <div className="hamburger" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </header>
  );
};

export default Navbar;
