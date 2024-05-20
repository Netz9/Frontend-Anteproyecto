import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importa useHistory para redireccionar
import axios from 'axios';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Obtiene la función de navegación
  // Obtiene el objeto de historial

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3006/api/login', {
        username,
        password
      });
      console.log('Respuesta del servidor:', response.data);
      // Si el inicio de sesión es exitoso, redirige al usuario a la página de dashboard
      navigate('/');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <h2>Iniciar Sesión</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Usuario:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Iniciar Sesión</button>
        </form>
        <p>¿No tienes una cuenta? <Link to="/registro">Registrarse</Link></p>
      </div>
    </div>
  );
}

export default Login;
