import React, { useState, useEffect } from 'react';
import { Modal, Input, InputNumber, Form, message } from 'antd';
import axios from 'axios';

interface EditProductModalProps {
  visible: boolean;
  onClose: () => void;
  product: any;
  onProductEdited: () => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  visible,
  onClose,
  product,
  onProductEdited,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setDescription(product.description || '');
      setPrice(product.price ?? null);
      setQuantity(product.quantity ?? null);
      setErrors({});
    }
  }, [product]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) newErrors.name = 'El nombre es obligatorio';
    if (!description.trim()) newErrors.description = 'La descripción es obligatoria';

    if (price === null || isNaN(price)) {
      newErrors.price = 'El precio es obligatorio y debe ser válido';
    } else if (price <= 0) {
      newErrors.price = 'El precio debe ser mayor a 0';
    }

    if (quantity === null || isNaN(quantity)) {
      newErrors.quantity = 'La cantidad es obligatoria y debe ser válida';
    } else if (quantity < 0) {
      newErrors.quantity = 'La cantidad no puede ser negativa';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGuardar = async () => {
    if (!validate()) {
      message.warning('Corrige los errores antes de guardar');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.patch(`http://localhost:3000/api/products/${product._id}`, {
        name,
        description,
        price,
        quantity,
        status: true,
      });

      if (res.status === 200 || res.status === 201) {
        message.success('✅ Producto actualizado correctamente');
        onProductEdited?.();
        onClose?.();
      }
    } catch (error: any) {
      console.error('❌ Error:', error.response?.data || error.message);
      message.error(error.response?.data?.message || 'Ocurrió un error inesperado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Editar Producto"
      open={visible}
      onCancel={onClose}
      onOk={handleGuardar}
      confirmLoading={loading}
      okText="Guardar"
      cancelText="Cancelar"
    >
      <Form layout="vertical">
        <Form.Item label="Nombre" validateStatus={errors.name ? 'error' : ''} help={errors.name}>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Descripción"
          validateStatus={errors.description ? 'error' : ''}
          help={errors.description}
        >
          <Input value={description} onChange={(e) => setDescription(e.target.value)} />
        </Form.Item>

        <Form.Item label="Precio" validateStatus={errors.price ? 'error' : ''} help={errors.price}>
          <InputNumber
            min={0}
            style={{ width: '100%' }}
            value={price ?? 0}
            onChange={(value) => setPrice(value)}
          />
        </Form.Item>

        <Form.Item
          label="Cantidad"
          validateStatus={errors.quantity ? 'error' : ''}
          help={errors.quantity}
        >
          <InputNumber
            min={0}
            style={{ width: '100%' }}
            value={quantity ?? 0}
            onChange={(value) => setQuantity(value)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditProductModal;
