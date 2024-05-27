import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faBan } from '@fortawesome/free-solid-svg-icons';
import './UserList.css';
import CreateUser from './CreateUser'; // Importa el nuevo componente
import Sidebar from '../../Sidebar'; // Importa el Sidebar

const URI = 'http://localhost:3006/api/usuarios';

const ROLES = {
  1: 'Administrador',
  2: 'Catedratico',
  3: 'Estudiante',
  4: 'Invitado',
};

const UserList = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const modalRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    getUsuarios();
  }, []);

  const getUsuarios = async () => {
    try {
      const res = await axios.get(URI);
      setUsuarios(res.data);
    } catch (error) {
      console.error('Error al obtener la lista de usuarios:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleEdit = (id) => {
    navigate(`/usuarios/edit/${id}`);
  };

  const handleDisable = async (id) => {
    if (window.confirm('¿Estás seguro que deseas deshabilitar este usuario?')) {
      try {
        await axios.patch(`${URI}/${id}`, { estado: 'Inactivo' });
        getUsuarios();
      } catch (error) {
        console.error('Error al deshabilitar el usuario:', error);
      }
    }
  };

  const filteredUsuarios = usuarios.filter((usuario) => {
    return (
      (usuario.usuario && usuario.usuario.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (usuario.estado && usuario.estado.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div className="user-list">
      <Sidebar className="sidebar" />
      <div className="content">
        <h2>Lista de Usuarios</h2>
        <div className="search-area">
          <input
            type="text"
            placeholder="Buscar Usuario (Usuario/Estado)"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <button className="btn btn-primary" onClick={() => modalRef.current.showUserModal()}>
          + Agregar Usuario
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>ID Usuario</th>
              <th>Usuario</th>
              <th>Estado</th>
              <th>Rol</th>
              <th>Acciones</th> {/* Nueva columna de acciones */}
            </tr>
          </thead>
          <tbody>
            {filteredUsuarios.map((usuario) => (
              <tr key={usuario.id_usuario}>
                <td>{usuario.id_usuario}</td>
                <td>{usuario.usuario}</td>
                <td>{usuario.estado}</td>
                <td>{ROLES[usuario.id_rol] || 'Desconocido'}</td>
                <td className="actions">
                  <button className="btn btn-success" onClick={() => handleEdit(usuario.id_usuario)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  {usuario.estado === 'Activo' && (
                    <button
                      className="btn btn-danger"
                      style={{ marginLeft: '10px' }}
                      onClick={() => handleDisable(usuario.id_usuario)}
                    >
                      <FontAwesomeIcon icon={faBan} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <CreateUser ref={modalRef} reloadUsuarios={getUsuarios} />
      </div>
    </div>
  );
};

export default UserList;
