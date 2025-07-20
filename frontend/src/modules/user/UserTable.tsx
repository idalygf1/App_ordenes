// src/modules/user/UserTable.tsx

import React, { useEffect, useState } from 'react';
import { Table, Input, Button } from 'antd';
import axios from 'axios';
import EditUserModal from './EditUserModal';
import AddUserModal from './AddUserModal';
import { useAuth } from '../auth/AuthContext';

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const { token } = useAuth();

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/auth/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data.userList);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
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
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (text, record) => (
        <button
          onClick={() => {
            setEditingUser(record);
            setIsModalVisible(true);
          }}
        >
          Editar
        </button>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Input.Search
        placeholder="Buscar por nombre"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: 300, marginBottom: 16 }}
      />
      <Button
        type="primary"
        onClick={() => setAddModalVisible(true)}
        style={{ float: 'right', marginBottom: 16 }}
      >
        Agregar Usuario
      </Button>
      <Table
        dataSource={filteredUsers}
        columns={columns}
        rowKey="_id"
        pagination={false}
      />

      <EditUserModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        user={editingUser}
        token={token}
        onUpdate={fetchUsers}
      />

      <AddUserModal
        visible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
        onUserAdded={fetchUsers}
      />
    </div>
  );
}
