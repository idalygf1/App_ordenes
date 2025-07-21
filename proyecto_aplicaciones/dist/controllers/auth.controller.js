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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = exports.updateToken = exports.getTimeToken = exports.login = void 0;
const generateToke_1 = require("../utils/generateToke");
const dayjs_1 = __importDefault(require("dayjs"));
const cache_1 = __importDefault(require("../utils/cache"));
const user_1 = require("../models/user");
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// LOGIN (dinámico)
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield user_1.User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Usuario no encontrado" });
        }
        const isPasswordValid = bcryptjs_1.default.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }
        const userId = user._id.toString();
        const accessToken = (0, generateToke_1.generateAccessToken)(userId);
        cache_1.default.set(userId, accessToken, 60 * 15); // 15 minutos
        return res.json({
            message: "Login exitoso",
            accessToken,
        });
    }
    catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ message: "Error al iniciar sesión", error });
    }
});
exports.login = login;
// GET TTL TOKEN
const getTimeToken = (req, res) => {
    const { userId } = req.params;
    const ttl = cache_1.default.getTtl(userId);
    if (!ttl)
        return res.status(404).json({ message: "Token no encontrado" });
    const now = Date.now();
    const timeToLiveSeconds = Math.floor((ttl - now) / 1000);
    const expTime = (0, dayjs_1.default)(ttl).format("HH:mm:ss");
    return res.json({
        message: "Token activo",
        expiraEn: `${timeToLiveSeconds} segundos`,
        horaExpiracion: expTime,
    });
};
exports.getTimeToken = getTimeToken;
// UPDATE TTL TOKEN
const updateToken = (req, res) => {
    const { userId } = req.params;
    const ttl = cache_1.default.getTtl(userId);
    if (!ttl)
        return res.status(404).json({ message: "Token no encontrado" });
    const token = cache_1.default.get(userId);
    if (!token)
        return res.status(404).json({ message: "No se encontró el token" });
    const newTTL = 60 * 15;
    cache_1.default.set(userId, token, newTTL);
    return res.json({ message: "Token actualizado", nuevoTTL: `${newTTL} segundos` });
};
exports.updateToken = updateToken;
// GET ALL USERS
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userList = yield user_1.User.find();
    return res.json({ userList });
});
exports.getAllUsers = getAllUsers;
// GET USER BY ID
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield user_1.User.findById(id);
        if (!user)
            return res.status(404).json({ message: "Usuario no encontrado" });
        res.json({ user });
    }
    catch (error) {
        console.error("Error al buscar usuario:", error);
        res.status(500).json({ message: "Error al buscar usuario", error });
    }
});
exports.getUserById = getUserById;
// CREATE USER
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { password } = _a, rest = __rest(_a, ["password"]);
        const salt = bcryptjs_1.default.genSaltSync(10);
        const hashedPassword = bcryptjs_1.default.hashSync(password, salt);
        const newUser = yield user_1.User.create(Object.assign(Object.assign({}, rest), { password: hashedPassword }));
        const _b = newUser.toObject(), { password: _ } = _b, userWithoutPassword = __rest(_b, ["password"]);
        res.status(201).json({
            message: "Usuario creado",
            user: userWithoutPassword,
        });
    }
    catch (error) {
        console.error("Error al crear usuario:", error);
        res.status(500).json({
            message: "Error al crear usuario",
            error,
        });
    }
});
exports.createUser = createUser;
// UPDATE USER
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "ID no válido" });
    }
    try {
        const updatedUser = yield user_1.User.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.json({
            message: "Usuario actualizado correctamente",
            user: updatedUser,
        });
    }
    catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: "El correo o nombre de usuario ya existe",
                error: error.keyValue,
            });
        }
        console.error("Error al actualizar usuario:", error);
        res.status(500).json({
            message: "Error al actualizar usuario",
            error: error.message || error,
        });
    }
});
exports.updateUser = updateUser;
// DELETE USER
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "ID no válido" });
    }
    try {
        const deletedUser = yield user_1.User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.json({
            message: "Usuario eliminado correctamente",
            user: deletedUser,
        });
    }
    catch (error) {
        console.error("Error al eliminar usuario:", error);
        res.status(500).json({
            message: "Error al eliminar usuario",
            error: error instanceof Error ? error.message : String(error),
        });
    }
});
exports.deleteUser = deleteUser;
