import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/pages/login/Login';
import Dashboard from './components/pages/dashboard/Dashboard';
import CreateActivity from './components/pages/activity/CreateActivity';
import UserList from './components/pages/usuarios/UserList';
import ExpositorList from './components/pages/expositor/ExpositorList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/actividad" element={<CreateActivity />} />
        <Route path="/usuarios" element={<UserList />} />
        <Route path="/expositores" element={<ExpositorList />} />
      </Routes>
    </Router>
  );
}

export default App;
