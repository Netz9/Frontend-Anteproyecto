import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserList.css';

function UserList() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:3006/api/usuarios');
        setUsuarios(response.data);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <div className="user-list">
      <h2>Lista de Usuarios</h2>
      <ul>
        {usuarios.map(usuario => (
          <li key={usuario.id_usuario}>
            {usuario.usuario} - {usuario.estado}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
