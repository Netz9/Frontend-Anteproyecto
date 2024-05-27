import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const URI = 'http://localhost:3006/api/usuarios';

const EditUser = () => {
  const [usuario, setUsuario] = useState('');
  const [estado, setEstado] = useState('Activo');
  const [id_rol, setIdRol] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const getUserById = useCallback(async () => {
    const res = await axios.get(`${URI}/${id}`);
    setUsuario(res.data.usuario);
    setEstado(res.data.estado);
    setIdRol(res.data.id_rol);
  }, [id]);

  useEffect(() => {
    getUserById();
  }, [getUserById]);

  const updateUser = async (e) => {
    e.preventDefault();
    await axios.put(`${URI}/${id}`, {
      usuario,
      estado,
      id_rol
    });
    navigate('/usuarios');
  };

  return (
    <div className="edit-user">
      <h3>Editar Usuario</h3>
      <form onSubmit={updateUser}>
        <div className="mb-3">
          <label className="form-label">Usuario</label>
          <input type="text" className="form-control" value={usuario} onChange={(e) => setUsuario(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Estado</label>
          <select className="form-control" value={estado} onChange={(e) => setEstado(e.target.value)} required>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Rol</label>
          <select className="form-control" value={id_rol} onChange={(e) => setIdRol(e.target.value)} required>
            <option value="">Seleccione un rol</option>
            <option value="1">Administrador</option>
            <option value="2">Catedratico</option>
            <option value="3">Estudiante</option>
            <option value="4">Invitado</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Actualizar</button>
      </form>
    </div>
  );
};

export default EditUser;
