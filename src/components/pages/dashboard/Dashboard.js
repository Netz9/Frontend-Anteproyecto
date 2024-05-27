import React from 'react';
import Sidebar from '../../Sidebar'; // Importa el Sidebar
import './Dashboard.css'; // Importa el archivo CSS para estilos específicos del Dashboard

function Dashboard() {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content">
        {/* Contenido del Dashboard */}
      </div>
    </div>
  );
}

export default Dashboard;
