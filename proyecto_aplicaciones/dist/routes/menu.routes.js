"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    const menu = [
        {
            path: '/dashboard',
            label: 'Dashboard',
            icon: 'home', // puedes usar el nombre del ícono aquí si quieres mapearlo
        },
        {
            path: '/users',
            label: 'Usuarios',
            icon: 'user',
        },
        {
            path: '/products',
            label: 'Productos',
            icon: 'box',
        },
        {
            path: '/orders',
            label: 'Órdenes',
            icon: 'shopping-cart',
        },
    ];
    res.json(menu);
});
exports.default = router;
