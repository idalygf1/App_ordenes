"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMenuByRole = void 0;
const menu_1 = require("../models/menu");
const user_1 = require("../models/user");
const getMenuByRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.userId || req.userId;
        const user = yield user_1.User.findById(userId).populate("role");
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        const roleId = user.role._id;
        const menuOptions = yield menu_1.Menu.find({ roles: roleId });
        res.status(200).json(menuOptions);
    }
    catch (error) {
        console.error("Error al obtener el menú:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});
exports.getMenuByRole = getMenuByRole;
