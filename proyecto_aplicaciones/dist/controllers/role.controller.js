"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllRoles = exports.createRole = exports.getMenuByRole = void 0;
// ✅ Menú completo con títulos, íconos y rutas por rol
const menuByRole = {
    admin: {
        id: "956489567425473",
        role: "admin",
        menu: [
            { title: "Dashboard", icon: "dashboard", path: "/dashboard" },
            { title: "Users", icon: "users", path: "/users" },
            { title: "Products", icon: "products", path: "/products" },
            { title: "Orders", icon: "orders", path: "/orders" }
        ]
    },
    employe: {
        id: "86950895793905",
        role: "employe",
        menu: [
            { title: "Orders", icon: "orders", path: "/orders" }
        ]
    }
};
// ✅ GET menú por rol
const getMenuByRole = (req, res) => {
    const { roleName } = req.params;
    const config = menuByRole[roleName.toLowerCase()];
    if (!config) {
        return res.status(404).json({ message: "Rol no encontrado" });
    }
    res.json(config);
};
exports.getMenuByRole = getMenuByRole;
// ✅ POST crear rol (simulado)
const createRole = (req, res) => {
    const { name } = req.body;
    res.status(201).json({
        message: `Rol '${name}' creado correctamente (simulado)`
    });
};
exports.createRole = createRole;
// ✅ GET todos los roles (simulado)
const getAllRoles = (_req, res) => {
    res.json([
        { id: 1, name: "admin" },
        { id: 2, name: "employe" }
    ]);
};
exports.getAllRoles = getAllRoles;
