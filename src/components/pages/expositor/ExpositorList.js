import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ExpositorList.css';

function ExpositorList() {
  const [expositores, setExpositores] = useState([]);

  useEffect(() => {
    const fetchExpositores = async () => {
      try {
        const response = await axios.get('http://localhost:3006/api/expositores');
        setExpositores(response.data);
      } catch (error) {
        console.error('Error al obtener expositores:', error);
      }
    };

    fetchExpositores();
  }, []);

  return (
    <div className="expositor-list">
      <h2>Lista de Expositores</h2>
      <ul>
        {expositores.map(expositor => (
          <li key={expositor.id_expositor}>
            {expositor.nombre} {expositor.apellido} - {expositor.especialidad}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpositorList;
