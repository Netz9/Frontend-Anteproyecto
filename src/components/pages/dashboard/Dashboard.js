import React from 'react';
import { Link } from 'react-router-dom';
import '../../Sidebar.css'; // Importa el archivo CSS para estilos específicos del sidebar

function Sidebar() {
  return (
    <div className="sidebar">
      <h3>Menú</h3>
      <ul>
        <li>
          <Link to="/actividad">Crear Actividad</Link>
        </li>
        <li>
        <Link to="/expositores">Expositores</Link>
        </li>
        <li>
          <Link to="/usuarios">Usuarios</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
