import { Request, Response } from "express";
import Menu from "../models/menu"; // ✅ Importación corregida
import User from "../models/user";
import Role from "../models/role";

export const getMenuByRole = async (
  req: Request<any, any, { userId: string }>, // ✅ Tipo corregido para body.userId
  res: Response
) => {
  try {
    const userId = req.body.userId || (req as any).userId; // Backup si viene desde middleware u otro campo
    const user = await User.findById(userId).populate("role");

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const roleId = (user.role as any)._id; // ✅ Tipado flexible para evitar error de compilación
    const menuOptions = await Menu.find({ roles: roleId });

    res.status(200).json(menuOptions);
  } catch (error) {
    console.error("Error al obtener el menú:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
