import React, { useState } from 'react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.logo}>Travel.</div>
      <nav className={isOpen ? styles.open : ''}>
        <ul>
          <li>Home</li>
          <li>Packages</li>
          <li>About</li>
          <li>Pages</li>
          <li>Contact</li>
        </ul>
      </nav>
      <div>
        <button className={styles.signUp}>Sign Up</button>
        <button className={styles.bookNow}>BOOK NOW</button>
      </div>
      
      <div className={styles.hamburger} onClick={toggleMenu}>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>
    </header>
  );
};

export default Navbar;
