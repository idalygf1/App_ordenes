import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, InputNumber, Select, message } from 'antd';
import axios from 'axios';

const { Option } = Select;

interface EditOrderModalProps {
  visible: boolean;
  onClose: () => void;
  order: any;
  onUpdated: () => void;
}

const EditOrderModal: React.FC<EditOrderModalProps> = ({
  visible,
  onClose,
  order,
  onUpdated
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const stockDisponible = order?.products[0]?.productId?.quantity ?? 0;
  const productoId = order?.products[0]?.productId?._id;

  useEffect(() => {
    if (order) {
      form.setFieldsValue({
        quantity: order.products[0]?.quantity || 1,
        status: order.status || 'Pendiente',
      });
    }
  }, [order, form]);

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();

      if (values.quantity > stockDisponible) {
        message.error('No hay suficiente stock disponible');
        return;
      }

      setLoading(true);

      await axios.patch(`https://appordenes-production.up.railway.app/api/orders/${order._id}`, {
        products: [
          {
            productId: productoId,
            quantity: values.quantity,
          },
        ],
        status: values.status,
      });

      message.success('Orden actualizada correctamente');
      onUpdated();
      onClose();
    } catch (error) {
      console.error('Error al actualizar orden:', error);
      message.error('No se pudo actualizar la orden');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Editar orden"
      open={visible}
      onCancel={onClose}
      onOk={handleUpdate}
      confirmLoading={loading}
      okText="Guardar"
      cancelText="Cancelar"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Cantidad"
          name="quantity"
          rules={[{ required: true, message: 'Ingrese la cantidad' }]}
        >
          <InputNumber min={1} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Estado"
          name="status"
          rules={[{ required: true, message: 'Seleccione un estado' }]}
        >
          <Select placeholder="Selecciona estado">
            <Option value="Pendiente">Pendiente</Option>
            <Option value="Pagado">Pagado</Option>
            <Option value="Cancelado">Cancelado</Option>
          </Select>
        </Form.Item>

        <div style={{ marginTop: 10, color: 'gray' }}>
          Stock disponible: <strong>{stockDisponible}</strong>
        </div>
      </Form>
    </Modal>
  );
};

export default EditOrderModal;
