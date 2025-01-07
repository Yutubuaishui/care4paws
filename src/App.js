import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Landing from './container/Landing/Landing';
import Homepage from './container/Homepage/Homepage';
import Adoption from './container/Adoption/Adoption';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/adopt-pet" element={<Adoption />} />
      </Routes>
    </Router>
  );
}

export default App;