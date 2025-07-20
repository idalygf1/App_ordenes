import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './modules/auth/Login';
import PrivateLayout from './layouts/PrivateLayout';
import routes from './routes';
import AuthRoutes from './modules/auth/AuthRoutes';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<AuthRoutes><PrivateLayout /></AuthRoutes>}>
        {routes.filter((route) => !route.hidden).map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<AuthRoutes>{route.element}</AuthRoutes>}
          />
        ))}
      </Route>
    </Routes>
  );
};

export default App;
