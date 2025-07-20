export interface MenuRoute {
    path: string;
    element: JSX.element;
    label: string;
}

const routes: MenuRoute[] = [
  {
    path: '/dashboard',
    element: <p> Dashboard </p>,
    label: 'Dashboard',
  },
  {
    path: '/users',
    element: <p> Usuarios </p>,
    label: 'Usuarios',
  },
  {
    path: '/products',
    element: <p> Productos </p>,
    label: 'Productos',
  },
  {
    path: '/orders',
    element: <p> Ordenes </p>,
    label: 'Órdenes',
  },
];

export default routes;