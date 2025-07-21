"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
// Rutas de autenticación y usuarios
router.post("/login", auth_controller_1.login); // login debe ser una función
router.get("/getTime/:userId", auth_controller_1.getTimeToken);
router.patch("/update/:userId", auth_controller_1.updateToken);
router.get("/users", auth_controller_1.getAllUsers);
router.get("/users/:id", auth_controller_1.getUserById);
router.post("/users", auth_controller_1.createUser);
router.patch("/users/:id", auth_controller_1.updateUser);
router.delete("/users/:id", auth_controller_1.deleteUser);
exports.default = router;
