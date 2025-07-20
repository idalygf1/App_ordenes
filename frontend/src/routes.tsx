import React from 'react';
import UserTable from './modules/user/UserTable';
import ProductTable from './modules/product/ProductTable';
import OrderTable from './modules/order/OrderTable';
import Dashboard from './modules/dashboard/Dashboard';
import { HomeOutlined, UserOutlined, ShoppingCartOutlined, AppstoreOutlined } from '@ant-design/icons';

export interface AppRoute {
  path: string;
  element: JSX.Element;
  label?: string;
  icon?: JSX.Element;
  roleIds?: string[];
  hidden?: boolean;
}

const routes: AppRoute[] = [
  {
    path: '/',
    element: <Dashboard />,
    label: 'Inicio',
    icon: <HomeOutlined />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    label: 'Dashboard',
    icon: <HomeOutlined />,
  },
  {
    path: '/users',
    element: <UserTable />,
    label: 'Usuarios',
    icon: <UserOutlined />,
  },
  {
    path: '/products',
    element: <ProductTable />,
    label: 'Productos',
    icon: <AppstoreOutlined />,
  },
  {
    path: '/orders',
    element: <OrderTable />,
    label: 'Órdenes',
    icon: <ShoppingCartOutlined />,
  }
];

export default routes;
