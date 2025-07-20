import React, { useEffect, useState } from 'react';
import { Table, Input, Button } from 'antd';
import axios from 'axios';
import AddOrderModal from './AddOrderModal';
import EditOrderModal from './EditOrderModal';

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [editingOrder, setEditingOrder] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/orders');
      setOrders(res.data.orders || []);
    } catch (error) {
      console.error('Error al cargar órdenes:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order: any) =>
    order.products?.some((item: any) =>
      item.productId?.name?.toLowerCase().includes(search.toLowerCase())
    )
  );

  const columns = [
    {
      title: 'Productos',
      key: 'productos',
      render: (_: any, record: any) =>
        record.products?.map((item: any) => item.productId?.name || 'Producto').join(', ') || '',
    },
    {
      title: 'Cantidad',
      key: 'cantidad',
      render: (_: any, record: any) =>
        record.products?.reduce((acc: number, item: any) => acc + item.quantity, 0) || 0,
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Fecha',
      dataIndex: 'createDate',
      key: 'createDate',
      render: (text: string) => (text ? new Date(text).toLocaleString() : 'Sin fecha'),
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_: any, record: any) => (
        <Button onClick={() => {
          setEditingOrder(record);
          setEditModalVisible(true);
        }}>
          Editar
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <Input.Search
        placeholder="Buscar por producto"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: 300, marginBottom: 16 }}
      />
      <Button
        type="primary"
        onClick={() => setAddModalVisible(true)}
        style={{ float: 'right', marginBottom: 16 }}
      >
        Agregar orden
      </Button>

      <Table
        dataSource={filteredOrders}
        columns={columns}
        rowKey="_id"
        pagination={false}
      />

      <EditOrderModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        order={editingOrder}
        onUpdated={fetchOrders}
      />

      <AddOrderModal
        visible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
        onOrderAdded={fetchOrders}
      />
    </div>
  );
};

export default OrderTable;
