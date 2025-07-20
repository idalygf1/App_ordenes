import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState({ username: '', password: '' });

  const validateForm = () => {
    const errors: { username?: string; password?: string } = {};

    if (!username.trim()) {
      errors.username = 'El usuario es obligatorio';
    }

    if (!password.trim()) {
      errors.password = 'La contraseña es obligatoria';
    }

    setFormErrors(errors as { username: string; password: string });
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await axios.post(
        'http://localhost:3000/api/auth/login',
        { username, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      setToken(response.data.accessToken);
      setError('');
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Error al iniciar sesión:', err);

      // Mostrar mensaje específico si viene del backend
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Error de conexión al servidor');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <input
            className={`mb-1 w-full p-2 border rounded ${
              formErrors.username ? 'border-red-500' : ''
            }`}
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {formErrors.username && (
            <p className="text-red-500 text-sm mb-2">{formErrors.username}</p>
          )}

          <input
            className={`mb-1 w-full p-2 border rounded ${
              formErrors.password ? 'border-red-500' : ''
            }`}
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {formErrors.password && (
            <p className="text-red-500 text-sm mb-2">{formErrors.password}</p>
          )}

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition"
            type="submit"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
