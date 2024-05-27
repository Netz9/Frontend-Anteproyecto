import React, { useState, useEffect, useRef } from 'react';
import { CSVLink } from 'react-csv';
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

  const filteredUsuarios = usuarios.filter((usuario) => {
    return (
      (usuario.usuario && usuario.usuario.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (usuario.estado && usuario.estado.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const headers = [
    { label: "ID Usuario", key: "id_usuario" },
    { label: "Usuario", key: "usuario" },
    { label: "Estado", key: "estado" },
    { label: "Rol", key: "rol_descripcion" },
  ];

  const csvlink = {
    headers: headers,
    data: usuarios.map(usuario => ({
      ...usuario,
      rol_descripcion: ROLES[usuario.id_rol] || 'Desconocido'
    })),
    filename: "usuarios.csv"
  };

  const handleEdit = (id) => {
    navigate(`/usuarios/edit/${id}`);
  };

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
        <CSVLink {...csvlink} className="btn btn-primary light btn-sm">
          Exportar reporte
        </CSVLink>
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
                  <button className="btn btn-danger" style={{ marginLeft: '10px' }}>
                    <FontAwesomeIcon icon={faBan} />
                  </button>
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
