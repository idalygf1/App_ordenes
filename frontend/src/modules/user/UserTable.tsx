// ✅ USER TABLE MODIFICADO CON ELIMINACIÓN
import React, { useEffect, useState } from 'react';
import { Table, Input, Button } from 'antd';
import axios from 'axios';
import EditUserModal from './EditUserModal';
import AddUserModal from './AddUserModal';
import DelUserModal from './DelUserModal';
import { useAuth } from '../auth/AuthContext';

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deletingUserId, setDeletingUserId] = useState(null);
  const { token } = useAuth();

  const fetchUsers = async () => {
    try {
      const res = await axios.get('https://appordenes-production.up.railway.app/api/auth/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data.userList);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`https://appordenes-production.up.railway.app/api/auth/users/${deletingUserId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
      setDeleteModalVisible(false);
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      title: <span className="text-gray-800 font-semibold">Nombre</span>,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: <span className="text-gray-800 font-semibold">Email</span>,
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: <span className="text-gray-800 font-semibold">Acciones</span>,
      key: 'acciones',
      render: (_: any, record: any) => (
        <div className="flex gap-3">
          <Button type="link" className="text-blue-500 hover:text-blue-600" onClick={() => {
            setEditingUser(record);
            setIsModalVisible(true);
          }}>Editar</Button>

          <Button type="link" danger onClick={() => {
            setDeletingUserId(record._id);
            setDeleteModalVisible(true);
          }}>Eliminar</Button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-2xl p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <Input
            placeholder="Buscar por nombre"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-1/2 rounded-md"
          />
          <Button
            type="primary"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md px-4 py-1"
            onClick={() => setAddModalVisible(true)}
          >
            Agregar Usuario
          </Button>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <Table
            dataSource={filteredUsers}
            columns={columns}
            rowKey="_id"
            pagination={false}
            className="text-gray-800"
            bordered
          />
        </div>
      </div>

      <EditUserModal visible={isModalVisible} onClose={() => setIsModalVisible(false)} user={editingUser} token={token} onUpdate={fetchUsers} />
      <AddUserModal visible={addModalVisible} onClose={() => setAddModalVisible(false)} onUserAdded={fetchUsers} />
      <DelUserModal visible={deleteModalVisible} onClose={() => setDeleteModalVisible(false)} onConfirm={handleDeleteUser} />
    </div>
  );
}