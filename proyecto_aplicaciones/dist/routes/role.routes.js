"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const role_controller_1 = require("../controllers/role.controller");
const router = (0, express_1.Router)();
router.post("/", role_controller_1.createRole); // ✅ Ya es función válida
router.get("/", role_controller_1.getAllRoles);
router.get("/menu/:roleName", role_controller_1.getMenuByRole); // ✅ Menú por rol
exports.default = router;
