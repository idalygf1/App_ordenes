"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = require("../controllers/order.controller");
const router = (0, express_1.Router)();
router.post('/', order_controller_1.createOrder);
router.get('/', order_controller_1.getAllOrders);
router.patch('/:id', order_controller_1.updateOrder); // editar completa
router.patch('/:id/pay', order_controller_1.updateOrderStatusToPaid); // marcar como pagado
router.patch('/:id/cancel', order_controller_1.cancelOrder); // cancelar orden
router.delete('/:id', order_controller_1.deleteOrder); // eliminar
exports.default = router;
