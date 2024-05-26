import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/pages/login/Login';
import Dashboard from './components/pages/dashboard/Dashboard';
import CreateActivity from './components/pages/activity/CreateActivity'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/actividad" element={<CreateActivity />} /> 
      </Routes>
    </Router>
  );
}

export default App;
