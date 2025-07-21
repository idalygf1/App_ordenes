import React, { useState } from 'react';
import { Modal, Button, Input, message } from 'antd';
import axios from 'axios';

const AddProductModal = ({ visible, onClose, onProductAdded }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const newErrors: any = {};

    if (!name.trim()) newErrors.name = 'El nombre es obligatorio';
    if (!description.trim()) newErrors.description = 'La descripción es obligatoria';

    if (!price.trim()) {
      newErrors.price = 'El precio es obligatorio';
    } else if (isNaN(Number(price)) || parseFloat(price) <= 0) {
      newErrors.price = 'Debe ser un número mayor a 0';
    }

    if (!quantity.trim()) {
      newErrors.quantity = 'La cantidad es obligatoria';
    } else if (!/^\d+$/.test(quantity) || parseInt(quantity) < 0) {
      newErrors.quantity = 'Debe ser un número entero mayor o igual a 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateFields()) {
      message.warning('Corrige los errores antes de guardar');
      return;
    }

    setLoading(true);
    try {
      await axios.post('https://appordenes-production.up.railway.app/api/products', {
        name,
        description,
        price: parseFloat(price),
        quantity: parseInt(quantity),
      });
      message.success('Producto agregado');
      onProductAdded();
      onClose();

      setName('');
      setDescription('');
      setPrice('');
      setQuantity('');
      setErrors({});
    } catch (error) {
      console.error(error);
      message.error('Error al agregar producto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Agregar Producto"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>Cancelar</Button>,
        <Button key="save" type="primary" loading={loading} onClick={handleSave}>
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
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ marginBottom: 4 }}
      />
      {errors.description && <p style={{ color: 'red', marginBottom: 10 }}>{errors.description}</p>}

      <Input
        placeholder="Precio"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        style={{ marginBottom: 4 }}
      />
      {errors.price && <p style={{ color: 'red', marginBottom: 10 }}>{errors.price}</p>}

      <Input
        placeholder="Cantidad"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        style={{ marginBottom: 4 }}
      />
      {errors.quantity && <p style={{ color: 'red', marginBottom: 10 }}>{errors.quantity}</p>}
    </Modal>
  );
};

export default AddProductModal;
