import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Offcanvas } from 'react-bootstrap';
import axios from 'axios';

const URI = 'http://localhost:3006/api/usuarios';

// Lista estática de roles
const ROLES = [
  { id: 1, descripcion: 'administrador' },
  { id: 2, descripcion: 'catedratico' },
  { id: 3, descripcion: 'estudiante' },
  { id: 4, descripcion: 'invitado' }
];

const CreateUser = forwardRef((props, ref) => {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [estado, setEstado] = useState('Activo');
  const [id_rol, setIdRol] = useState('');
  const [addUser, setAddUser] = useState(false);

  useImperativeHandle(ref, () => ({
    showUserModal() {
      setAddUser(true);
    },
  }));

  const guardar = async (e) => {
    e.preventDefault();
    try {
      await axios.post(URI, {
        usuario,
        contrasena,
        estado,
        id_rol
      });
      props.reloadUsuarios();
      setAddUser(false);
    } catch (error) {
      console.error('Error al guardar el usuario:', error);
    }
  };

  return (
    <Offcanvas show={addUser} onHide={() => setAddUser(false)} placement="end">
      <div className="offcanvas-header">
        <h5>Agregar Usuario</h5>
        <button type="button" className="btn-close" onClick={() => setAddUser(false)} />
      </div>
      <div className="offcanvas-body">
        <form onSubmit={guardar}>
          <div className="mb-3">
            <label className="form-label">Usuario</label>
            <input type="text" className="form-control" value={usuario} onChange={(e) => setUsuario(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input type="password" className="form-control" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required />
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
              {ROLES.map(rol => (
                <option key={rol.id} value={rol.id}>{rol.descripcion}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Guardar</button>
        </form>
      </div>
    </Offcanvas>
  );
});

export default CreateUser;
