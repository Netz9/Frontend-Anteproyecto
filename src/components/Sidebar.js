import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
      </button>
      <h3>Menú</h3>
      <ul>
        <li>
          <Link to="/dashboard/crear-actividad">Crear Actividad</Link>
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
