import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';
import userIcon from '../icons/user_icon.png';  // Asegúrate de que esta ruta es correcta
import expositorIcon from '../icons/expositor_icon.png';  // Asegúrate de que esta ruta es correcta

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
      <h3 className="menu-title">Menú</h3>
      <ul>
        <li>
          <Link to="/expositores">
            <img src={expositorIcon} alt="Expositor" className="sidebar-icon" />
            <span className="link-text">Expositores</span>
          </Link>
        </li>
        <li>
          <Link to="/usuarios">
            <img src={userIcon} alt="Usuario" className="sidebar-icon" />
            <span className="link-text">Usuarios</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
