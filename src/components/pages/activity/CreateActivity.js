import React from 'react';
import { Link } from 'react-router-dom';
import '../../Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <h3>Menú</h3>
      <ul>
        <li>
          <Link to="/dashboard/crear-actividad">Crear Actividad</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
