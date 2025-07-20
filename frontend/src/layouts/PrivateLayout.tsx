import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import MenuDynamic from '../modules/dashboard/MenuDynamic';

const { Header, Content, Sider } = Layout;

const PrivateLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible>
        <div className="text-white text-center py-4 font-bold text-lg">DASHBOARD</div>
        <MenuDynamic />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Content style={{ margin: '16px' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default PrivateLayout;
