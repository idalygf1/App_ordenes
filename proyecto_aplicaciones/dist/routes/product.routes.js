"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../controllers/product.controller");
const router = (0, express_1.Router)();
router.post("/", product_controller_1.createProduct);
router.get("/", product_controller_1.getAllProducts);
router.get("/:id", product_controller_1.getProductById); // ✅ Esta línea es la que faltaba
router.patch("/:id", product_controller_1.updateProduct);
router.delete("/:id", product_controller_1.deleteProduct);
exports.default = router;
