"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMenuByRole = void 0;
// Simulación de menú por rol
const menuByRole = {
    admin: ["dashboard", "usuarios", "configuracion"],
    user: ["perfil", "pedidos"],
    guest: ["inicio", "productos"],
};
const getMenuByRole = (req, res) => {
    const { roleName } = req.params;
    const menu = menuByRole[roleName.toLowerCase()];
    if (!menu) {
        return res.status(404).json({ message: "Rol no encontrado" });
    }
    res.json({
        message: `Menú para rol: ${roleName}`,
        menu,
    });
};
exports.getMenuByRole = getMenuByRole;
