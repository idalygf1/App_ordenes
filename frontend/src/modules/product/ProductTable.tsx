import React, { useEffect, useState } from 'react';
import { Table, Input, Button, message } from 'antd';
import axios from 'axios';
import AddProductModal from './AddProductModal';
import EditProductModal from './EditProductModal';
import DelProductModal from './DelProductModal';
import { useAuth } from '../auth/AuthContext';

export default function ProductTable() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const { token } = useAuth();

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/products', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data.products);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/products/${productIdToDelete}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      message.success('Producto eliminado exitosamente');
      setDeleteModalVisible(false);
      setProductIdToDelete(null);
      fetchProducts();
    } catch (error) {
      message.error('Error al eliminar producto');
      console.error('Error al eliminar producto:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (product: any) => {
    setSelectedProduct(product);
    setEditModalVisible(true);
  };

  const columns = [
    {
      title: <span className="text-gray-800 font-semibold">Nombre</span>,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: <span className="text-gray-800 font-semibold">Descripción</span>,
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: <span className="text-gray-800 font-semibold">Precio</span>,
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: <span className="text-gray-800 font-semibold">Cantidad</span>,
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: <span className="text-gray-800 font-semibold">Acciones</span>,
      key: 'actions',
      render: (_: any, record: any) => (
        <div className="flex gap-3">
          <Button type="link" onClick={() => handleEdit(record)} className="text-blue-500 hover:text-blue-600">Editar</Button>
          <Button type="link" danger onClick={() => {
            setProductIdToDelete(record._id);
            setDeleteModalVisible(true);
          }}>
            Eliminar
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <Input
            placeholder="Buscar producto"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-1/2 rounded-md"
          />
          <Button
            type="primary"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md px-4 py-1"
            onClick={() => setAddModalVisible(true)}
          >
            Agregar producto
          </Button>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
          <Table
            dataSource={filteredProducts}
            columns={columns}
            rowKey="_id"
            pagination={false}
            className="text-gray-800"
            bordered
          />
        </div>
      </div>

      <AddProductModal visible={addModalVisible} onClose={() => setAddModalVisible(false)} onProductAdded={fetchProducts} />
      <EditProductModal visible={editModalVisible} onClose={() => setEditModalVisible(false)} product={selectedProduct} onProductEdited={fetchProducts} />
      <DelProductModal visible={deleteModalVisible} onClose={() => setDeleteModalVisible(false)} onConfirm={handleDelete} />
    </div>
  );
}
