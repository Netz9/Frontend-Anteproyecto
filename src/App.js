import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap si lo usas
import './App.css'; // Importa tus estilos globales
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/pages/dashboard/Dashboard';
import UserList from './components/pages/usuarios/UserList';
import ExpositorList from './components/pages/expositor/ExpositorList';
import CreateActivity from './components/pages/activity/CreateActivity';
import EditUser from './components/pages/usuarios/EditUser'; // Importa el nuevo componente
import EditExpositor from './components/pages/expositor/EditExpositor'; // Importa el nuevo componente
import Login from './components/pages/login/Login'; // Importa el componente de Login

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} /> {/* Ruta raíz que redirige a Login */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/usuarios" element={<UserList />} />
          <Route path="/usuarios/edit/:id" element={<EditUser />} /> {/* Nueva ruta */}
          <Route path="/expositores" element={<ExpositorList />} />
          <Route path="/expositores/edit/:id" element={<EditExpositor />} /> {/* Nueva ruta */}
          <Route path="/dashboard/crear-actividad" element={<CreateActivity />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
