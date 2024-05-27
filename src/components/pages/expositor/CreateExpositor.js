import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { Offcanvas } from 'react-bootstrap';
import axios from 'axios';

const URI = 'http://localhost:3006/api/expositores';
const EVENTS_URI = 'http://localhost:3006/api/eventos'; // URI para obtener eventos

const CreateExpositor = forwardRef((props, ref) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [id_evento, setIdEvento] = useState('');
  const [eventos, setEventos] = useState([]);
  const [addExpositor, setAddExpositor] = useState(false);

  useImperativeHandle(ref, () => ({
    showExpositorModal() {
      setAddExpositor(true);
    },
  }));

  useEffect(() => {
    getEventos();
  }, []);

  const getEventos = async () => {
    try {
      const res = await axios.get(EVENTS_URI);
      setEventos(res.data);
    } catch (error) {
      console.error('Error al obtener la lista de eventos:', error);
    }
  };

  const guardar = async (e) => {
    e.preventDefault();
    try {
      await axios.post(URI, {
        nombre,
        apellido,
        especialidad,
        id_evento
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
            <label className="form-label">ID Evento</label>
            <select className="form-control" value={id_evento} onChange={(e) => setIdEvento(e.target.value)} required>
              <option value="">Seleccione un evento</option>
              {eventos.map((evento) => (
                <option key={evento.id_evento} value={evento.id_evento}>
                  {evento.nombre}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Guardar</button>
        </form>
      </div>
    </Offcanvas>
  );
});

export default CreateExpositor;
