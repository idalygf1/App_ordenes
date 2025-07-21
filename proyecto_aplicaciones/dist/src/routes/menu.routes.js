"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const menu_controller_1 = require("../controllers/menu.controller");
const authJwt_1 = require("../middleware/authJwt");
const router = (0, express_1.Router)();
router.get("/options", authJwt_1.verifyToken, menu_controller_1.getMenuByRole);
exports.default = router;
