import React, { useEffect, useState } from 'react';
import { Table, Input, Button } from 'antd';
import axios from 'axios';
import AddOrderModal from './AddOrderModal';
import EditOrderModal from './EditOrderModal';
import DelOrderModal from './DelOrderModal';

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [editingOrder, setEditingOrder] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

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
      title: <span className="text-gray-800 font-semibold">Productos</span>,
      key: 'productos',
      render: (_: any, record: any) =>
        record.products?.map((item: any) => item.productId?.name || 'Producto').join(', ') || '',
    },
    {
      title: <span className="text-gray-800 font-semibold">Cantidad</span>,
      key: 'cantidad',
      render: (_: any, record: any) =>
        record.products?.reduce((acc: number, item: any) => acc + item.quantity, 0) || 0,
    },
    {
      title: <span className="text-gray-800 font-semibold">Estado</span>,
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: <span className="text-gray-800 font-semibold">Fecha</span>,
      dataIndex: 'createDate',
      key: 'createDate',
      render: (text: string) => (text ? new Date(text).toLocaleString() : 'Sin fecha'),
    },
    {
      title: <span className="text-gray-800 font-semibold">Acciones</span>,
      key: 'acciones',
      render: (_: any, record: any) => (
        <div className="flex gap-2">
          <Button
            type="link"
            className="text-blue-500 hover:text-blue-600"
            onClick={() => {
              setEditingOrder(record);
              setEditModalVisible(true);
            }}
          >
            Editar
          </Button>
          <Button
            type="link"
            danger
            onClick={() => {
              setOrderToDelete(record);
              setDeleteModalVisible(true);
            }}
          >
            Eliminar
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-2xl p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <Input
            placeholder="Buscar por producto"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-1/2 rounded-md"
          />
          <Button
            type="primary"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md px-4 py-1"
            onClick={() => setAddModalVisible(true)}
          >
            Agregar orden
          </Button>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <Table
            dataSource={filteredOrders}
            columns={columns}
            rowKey="_id"
            pagination={false}
            className="text-gray-800"
            bordered
          />
        </div>
      </div>

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

      <DelOrderModal
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onConfirm={async () => {
          try {
            await axios.delete(`http://localhost:3000/api/orders/${orderToDelete._id}`);
            setDeleteModalVisible(false);
            fetchOrders();
          } catch (error) {
            console.error('Error al eliminar la orden:', error);
          }
        }}
      />
    </div>
  );
};

export default OrderTable;
