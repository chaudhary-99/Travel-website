// App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import HomePage from './components/HomePage.js';
// import AboutPage from './components/AboutPage';
// import ContactPage from './components/ContactPage';

const App = () => {
  useEffect(() => {
    const googleMapsScript = document.createElement('script');
    console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
    googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
    googleMapsScript.async = true;
    googleMapsScript.defer = true;
    document.head.appendChild(googleMapsScript);
  }, []);

  return (
    <Router>
      <div>
        <Navbar />
        {/* <SearchBar /> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
