import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faBan } from '@fortawesome/free-solid-svg-icons';
import './ExpositorList.css';
import CreateExpositor from './CreateExpositor'; // Importa el nuevo componente
import Sidebar from '../../Sidebar'; // Importa el Sidebar

const URI = 'http://localhost:3006/api/expositores';
const URI_EVENTS = 'http://localhost:3006/api/eventos';

const ExpositorList = () => {
  const [expositores, setExpositores] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const modalRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    getExpositores();
    getEventos();
  }, []);

  const getExpositores = async () => {
    try {
      const res = await axios.get(URI);
      setExpositores(res.data);
    } catch (error) {
      console.error('Error al obtener la lista de expositores:', error);
    }
  };

  const getEventos = async () => {
    try {
      const res = await axios.get(URI_EVENTS);
      setEventos(res.data);
    } catch (error) {
      console.error('Error al obtener la lista de eventos:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleEdit = (id) => {
    navigate(`/expositores/edit/${id}`);
  };

  const handleDisable = async (id) => {
    if (window.confirm('¿Estás seguro que deseas deshabilitar este expositor?')) {
      try {
        await axios.patch(`${URI}/${id}`, { estado: 'Inactivo' });
        getExpositores();
      } catch (error) {
        console.error('Error al deshabilitar el expositor:', error);
      }
    }
  };  

  const findEventoNombre = (id_evento) => {
    const evento = eventos.find(evento => evento.id_evento === id_evento);
    return evento ? `${evento.nombre}` : id_evento;
  };

  const filteredExpositores = expositores.filter((expositor) => {
    return (
      expositor.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expositor.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expositor.especialidad.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expositor.estado.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="expositor-list">
      <Sidebar className="sidebar" />
      <div className="content">
        <h2>Lista de Expositores</h2>
        <div className="search-area">
          <input
            type="text"
            placeholder="Buscar Expositor (Nombre/Apellido/Especialidad)"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <button className="btn btn-primary" onClick={() => modalRef.current.showExpositorModal()}>
          + Agregar Expositor
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>ID Expositor</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Especialidad</th>
              <th>Estado</th>
              <th>Evento</th>
              <th>Acciones</th> {/* Nueva columna de acciones */}
            </tr>
          </thead>
          <tbody>
            {filteredExpositores.map((expositor) => (
              <tr key={expositor.id_expositor}>
                <td>{expositor.id_expositor}</td>
                <td>{expositor.nombre}</td>
                <td>{expositor.apellido}</td>
                <td>{expositor.especialidad}</td>
                <td>{expositor.estado}</td>
                <td>{findEventoNombre(expositor.id_evento)}</td>
                <td className="actions">
                  <button className="btn btn-success" onClick={() => handleEdit(expositor.id_expositor)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  {expositor.estado === 'Activo' && (
                    <button
                      className="btn btn-danger"
                      style={{ marginLeft: '10px' }}
                      onClick={() => handleDisable(expositor.id_expositor)}
                    >
                      <FontAwesomeIcon icon={faBan} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <CreateExpositor ref={modalRef} reloadExpositores={getExpositores} />
      </div>
    </div>
  );
};

export default ExpositorList;
