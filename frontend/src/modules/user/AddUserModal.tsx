import React, { useState } from 'react';
import { Modal, Button, Input, message } from 'antd';
import axios from 'axios';

const AddUserModal = ({ visible, onClose, onUserAdded }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const newErrors: any = {};

    if (!name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }

    if (!username.trim()) {
      newErrors.username = 'El usuario es obligatorio';
    } else if (!/^[a-zA-Z0-9]+$/.test(username)) {
      newErrors.username = 'Solo letras y números permitidos';
    } else if (username.length < 4) {
      newErrors.username = 'Debe tener al menos 4 caracteres';
    }

    if (!email.trim()) {
      newErrors.email = 'El correo es obligatorio';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = 'Correo electrónico no válido';
    }

    if (!password.trim()) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (password.length < 6) {
      newErrors.password = 'Debe tener al menos 6 caracteres';
    } else if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
      newErrors.password = 'Debe contener letras y números';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGuardar = async () => {
    if (!validateFields()) {
      message.warning('Por favor corrige los errores antes de guardar');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3000/api/auth/users', {
        name,
        username,
        email,
        password,
        role: 'Empleado'
      });

      message.success('Usuario creado exitosamente');
      onUserAdded();
      onClose();

      setName('');
      setUsername('');
      setEmail('');
      setPassword('');
      setErrors({});
    } catch (error) {
      console.error(error);
      message.error('Error al crear usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Agregar Usuario"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancelar" onClick={onClose}>
          Cancelar
        </Button>,
        <Button key="guardar" type="primary" loading={loading} onClick={handleGuardar} style={{ marginBottom: 10 }}>
          Guardar
        </Button>,
      ]}
    >
      <Input
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginBottom: 4 }}
      />
      {errors.name && <p style={{ color: 'red', marginBottom: 10 }}>{errors.name}</p>}

      <Input
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ marginBottom: 4 }}
      />
      {errors.username && <p style={{ color: 'red', marginBottom: 10 }}>{errors.username}</p>}

      <Input
        placeholder="Correo"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginBottom: 4 }}
      />
      {errors.email && <p style={{ color: 'red', marginBottom: 10 }}>{errors.email}</p>}

      <Input.Password
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginBottom: 4 }}
      />
      {errors.password && <p style={{ color: 'red', marginBottom: 10 }}>{errors.password}</p>}
    </Modal>
  );
};

export default AddUserModal;
