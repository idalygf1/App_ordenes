import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useAuth } from '../auth/AuthContext';
import axios from 'axios';

function MenuDynamic() {
  const [menuItems, setMenuItems] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { setToken } = useAuth();

  useEffect(() => {
    axios.get('https://appordenes-production.up.railway.app/api/menu')
      .then(res => setMenuItems(res.data))
      .catch(err => console.error('Error al cargar menú:', err));
  }, []);

  const handleLogout = () => {
    setToken(null);
    navigate('/login');
  };

  const renderMenu = () => {
    return [
      ...menuItems.map((item) => ({
        key: item.path,
        icon: item.icon ? <span className={`anticon anticon-${item.icon}`} /> : null,
        label: item.label,
      })),
      {
        key: 'logout',
        icon: <LogoutOutlined />,
        label: 'Cerrar sesión',
        onClick: handleLogout,
      },
    ];
  };

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[location.pathname]}
      onClick={({ key }) => {
        if (key !== 'logout') navigate(key);
      }}
      items={renderMenu()}
    />
  );
}

export default MenuDynamic;
