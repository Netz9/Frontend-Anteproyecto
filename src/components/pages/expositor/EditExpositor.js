import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const URI = 'http://localhost:3006/api/expositores';
const EVENTS_URI = 'http://localhost:3006/api/eventos'; // URI para obtener eventos

const EditExpositor = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [id_evento, setIdEvento] = useState('');
  const [estado, setEstado] = useState('Activo');
  const [eventos, setEventos] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const getExpositorById = useCallback(async () => {
    const res = await axios.get(`${URI}/${id}`);
    setNombre(res.data.nombre);
    setApellido(res.data.apellido);
    setEspecialidad(res.data.especialidad);
    setIdEvento(res.data.id_evento);
    setEstado(res.data.estado);
  }, [id]);

  useEffect(() => {
    getExpositorById();
    getEventos();
  }, [getExpositorById]);

  const getEventos = async () => {
    try {
      const res = await axios.get(EVENTS_URI);
      setEventos(res.data);
    } catch (error) {
      console.error('Error al obtener la lista de eventos:', error);
    }
  };

  const updateExpositor = async (e) => {
    e.preventDefault();
    await axios.put(`${URI}/${id}`, {
      nombre,
      apellido,
      especialidad,
      id_evento,
      estado
    });
    navigate('/expositores');
  };

  return (
    <div className="edit-expositor">
      <h3>Editar Expositor</h3>
      <form onSubmit={updateExpositor}>
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
        <div className="mb-3">
          <label className="form-label">Estado</label>
          <select className="form-control" value={estado} onChange={(e) => setEstado(e.target.value)} required>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Actualizar</button>
      </form>
    </div>
  );
};

export default EditExpositor;
