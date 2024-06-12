// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
// import HomePage from './components/HomePage';
// import AboutPage from './components/AboutPage';
// import ContactPage from './components/ContactPage';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        {/* <Switch> */}
          {/* <Route path="/" exact component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/contact" component={ContactPage} /> */}
        {/* </Switch> */}
      </div>
    </Router>
  );
}

export default App;
