import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Offcanvas } from 'react-bootstrap';
import axios from 'axios';

const URI = 'http://localhost:3006/api/expositores';

const CreateExpositor = forwardRef((props, ref) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [estado, setEstado] = useState('');
  const [addExpositor, setAddExpositor] = useState(false);

  useImperativeHandle(ref, () => ({
    showExpositorModal() {
      setAddExpositor(true);
    },
  }));

  const guardar = async (e) => {
    e.preventDefault();
    try {
      await axios.post(URI, {
        nombre,
        apellido,
        especialidad,
        estado,
      });
      props.reloadExpositores();
      setAddExpositor(false);
    } catch (error) {
      console.error('Error al guardar el expositor:', error);
    }
  };

  return (
    <Offcanvas show={addExpositor} onHide={() => setAddExpositor(false)} placement="end">
      <div className="offcanvas-header">
        <h5>Agregar Expositor</h5>
        <button type="button" className="btn-close" onClick={() => setAddExpositor(false)} />
      </div>
      <div className="offcanvas-body">
        <form onSubmit={guardar}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Apellido</label>
            <input type="text" className="form-control" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Especialidad</label>
            <input type="text" className="form-control" value={especialidad} onChange={(e) => setEspecialidad(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Estado</label>
            <input type="text" className="form-control" value={estado} onChange={(e) => setEstado(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary">Guardar</button>
        </form>
      </div>
    </Offcanvas>
  );
});

export default CreateExpositor;
