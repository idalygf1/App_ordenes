import React, { useState, useEffect } from 'react';
import { Modal, Select, InputNumber, Button, message } from 'antd';
import axios from 'axios';

const { Option } = Select;

const AddOrderModal = ({ visible, onClose, onOrderAdded }: any) => {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      axios
        .get('http://localhost:3000/api/products')
        .then(res => setProducts(res.data.products || []))
        .catch(err => {
          console.error('❌ Error al cargar productos', err);
          message.error('No se pudieron cargar los productos');
        });
    }
  }, [visible]);

  const getSelectedProduct = () => products.find((p: any) => p._id === productId);
  const selectedProduct: any = getSelectedProduct();
  const maxAvailable = selectedProduct?.quantity ?? 1000;

  const validateFields = () => {
    if (!productId.trim()) {
      message.warning('Selecciona un producto');
      return false;
    }

    if (!status.trim()) {
      message.warning('Selecciona un estado para la orden');
      return false;
    }

    if (!quantity || quantity < 1) {
      message.warning('La cantidad debe ser mayor o igual a 1');
      return false;
    }

    if (!selectedProduct) {
      message.error('Producto no válido');
      return false;
    }

    if (selectedProduct.price === undefined || selectedProduct.price === null) {
      message.error('El producto no tiene precio asignado');
      return false;
    }

    if (quantity > selectedProduct.quantity) {
      message.warning(`No hay suficientes unidades disponibles (solo hay ${selectedProduct.quantity})`);
      return false;
    }

    return true;
  };

  const handleGuardar = async () => {
    if (loading) return;
    if (!validateFields()) return;

    const orderData = {
      userId: '68373f5f089a1d42dfe1f5a0',
      products: [
        {
          productId,
          quantity,
          price: selectedProduct.price
        }
      ],
      status
    };

    setLoading(true);
    try {
      await axios.post('http://localhost:3000/api/orders', orderData);

      message.success('Orden creada correctamente');
      onOrderAdded();
      onClose();

      // limpiar campos
      setProductId('');
      setQuantity(1);
      setStatus('');
    } catch (error: any) {
      console.error('❌ Error al crear orden:', error.response?.data || error.message);
      message.error('Error al crear la orden');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Agregar Orden"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancelar
        </Button>,
        <Button key="guardar" type="primary" loading={loading} onClick={handleGuardar}>
          Guardar
        </Button>
      ]}
    >
      <Select
        placeholder="Selecciona producto"
        value={productId}
        onChange={(value) => {
          setProductId(value);
          setQuantity(1);
        }}
        style={{ width: '100%', marginBottom: 10 }}
      >
        {products.map((p: any) => (
          <Option key={p._id} value={p._id}>
            {p.name} - ${p.price} (Stock: {p.quantity})
          </Option>
        ))}
      </Select>

      <InputNumber
        min={1}
        max={maxAvailable}
        value={quantity}
        onChange={(value) => {
          if (!value || value < 1) {
            setQuantity(1);
          } else if (value > maxAvailable) {
            message.warning(`No hay suficientes unidades disponibles (solo hay ${maxAvailable})`);
            setQuantity(maxAvailable);
          } else {
            setQuantity(value);
          }
        }}
        onBlur={() => {
          if (quantity > maxAvailable) {
            message.warning(`No hay suficientes unidades disponibles (solo hay ${maxAvailable})`);
            setQuantity(maxAvailable);
          }
        }}
        style={{ width: '100%', marginBottom: 10 }}
      />

      <Select
        placeholder="Selecciona estado"
        value={status}
        onChange={setStatus}
        style={{ width: '100%' }}
      >
        <Option value="Pendiente">Pendiente</Option>
        <Option value="Pagado">Pagado</Option>
        <Option value="Cancelado">Cancelado</Option>
      </Select>
    </Modal>
  );
};

export default AddOrderModal;
