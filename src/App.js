import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Landing from './container/Landing/Landing';
import Homepage from './container/Homepage/Homepage';
import Adoption from './container/Adoption/Adoption';
// import LostAndFound from './container/LostAndFound/LostAndFound';
// import Donation from './container/Donation/Donation';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/adoption">Adoption</Link>
            </li>
            {/* <li>
              <Link to="/lost-and-found">Lost and Found</Link>
            </li>
            <li>
              <Link to="/donation">Donation</Link>
            </li> */}
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/adoption" element={<Adoption />} />
          {/* <Route path="/lost-and-found" element={<LostAndFound />} />
          <Route path="/donation" element={<Donation />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;