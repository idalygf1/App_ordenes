import React, { useState, useEffect } from 'react';
import { Modal, Input, message } from 'antd';
import axios from 'axios';

const EditUserModal = ({ visible, onClose, user, token, onUpdate }) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({ nombre: '', email: '' });

  useEffect(() => {
    if (user) {
      setNombre(user.name || '');
      setEmail(user.email || '');
      setErrors({ nombre: '', email: '' });
    }
  }, [user]);

  const validate = () => {
    const newErrors: { nombre?: string; email?: string } = {};

    if (!nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    }

    if (!email.trim()) {
      newErrors.email = 'El correo es obligatorio';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = 'Correo electrónico no válido';
    }

    setErrors(newErrors as { nombre: string; email: string });
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async () => {
    if (!validate()) {
      message.warning('Corrige los errores antes de guardar');
      return;
    }

    try {
      await axios.patch(
        `https://appordenes-production.up.railway.app/api/auth/users/${user._id}`,
        { name: nombre, email },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      message.success('Usuario actualizado correctamente');
      onUpdate();
      onClose();
    } catch (err) {
      console.error('Error al actualizar:', err);
      message.error('Error al actualizar el usuario');
    }
  };

  return (
    <Modal
      title="Editar Usuario"
      open={visible}
      onCancel={onClose}
      onOk={handleUpdate}
      okText="Guardar cambios"
    >
      <label>Nombre</label>
      <Input
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        style={{ marginBottom: 4 }}
      />
      {errors.nombre && (
        <p style={{ color: 'red', marginBottom: 10 }}>{errors.nombre}</p>
      )}

      <label>Email</label>
      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginBottom: 4 }}
      />
      {errors.email && (
        <p style={{ color: 'red', marginBottom: 10 }}>{errors.email}</p>
      )}
    </Modal>
  );
};

export default EditUserModal;
