import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login.js';
import Da from './components/Dashboard.js';
import Activity from './components/CreateActivity.js'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Da />} />
        <Route path="/actividad" element={<Activity />} /> 
      </Routes>
    </Router>
  );
}

export default App;