import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { FiUser, FiLock } from 'react-icons/fi';

const Login = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState({ username: '', password: '' });

  const validateForm = () => {
    const errors: { username?: string; password?: string } = {};

    if (!username.trim()) errors.username = 'El usuario es obligatorio';
    if (!password.trim()) errors.password = 'La contraseña es obligatoria';

    setFormErrors(errors as { username: string; password: string });
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post(
        'https://appordenes-production.up.railway.app/api/auth/login',
        { username, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      setToken(response.data.accessToken);
      setError('');
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Error al iniciar sesión:', err);
      setError(err.response?.data?.message || 'Error de conexión al servidor');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-blue-900 px-4">
      <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-md border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Iniciar Sesión
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="relative">
            <FiUser className="absolute top-3 left-3 text-gray-500" />
            <input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formErrors.username ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {formErrors.username && (
              <p className="text-red-500 text-sm mt-1">{formErrors.username}</p>
            )}
          </div>

          <div className="relative">
            <FiLock className="absolute top-3 left-3 text-gray-500" />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formErrors.password ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {formErrors.password && (
              <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
            )}
          </div>

          {error && <p className="text-red-600 text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-md transition duration-300 shadow-sm"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
