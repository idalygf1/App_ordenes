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
exports.updateOrderStatusToPaid = exports.deleteOrder = exports.updateOrderStatus = exports.getAllOrders = exports.createOrder = void 0;
const order_1 = require("../models/order");
// Crear orden
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield order_1.Order.create(req.body);
        res.status(201).json({ message: "Orden creada", order });
    }
    catch (error) {
        res.status(500).json({ message: "Error al crear orden", error });
    }
});
exports.createOrder = createOrder;
// Obtener todas las órdenes
const getAllOrders = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_1.Order.find().populate("userId").populate("products.productId");
    res.json({ orders });
});
exports.getAllOrders = getAllOrders;
// Actualizar status a "Pagado"
const updateOrderStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const order = yield order_1.Order.findByIdAndUpdate(id, { status: "Pagado", updateDate: new Date() }, { new: true });
        if (!order)
            return res.status(404).json({ message: "Orden no encontrada" });
        res.json({ message: "Orden actualizada", order });
    }
    catch (error) {
        res.status(500).json({ message: "Error al actualizar", error });
    }
});
exports.updateOrderStatus = updateOrderStatus;
// Eliminar orden (status: Cancelado)
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const order = yield order_1.Order.findByIdAndUpdate(id, { status: "Cancelado", updateDate: new Date() }, { new: true });
        if (!order)
            return res.status(404).json({ message: "Orden no encontrada" });
        res.json({ message: "Orden cancelada", order });
    }
    catch (error) {
        res.status(500).json({ message: "Error al cancelar orden", error });
    }
});
exports.deleteOrder = deleteOrder;
const updateOrderStatusToPaid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const updated = yield order_1.Order.findByIdAndUpdate(id, { status: "Pagado" }, { new: true });
        res.json({ message: "Orden actualizada", order: updated });
    }
    catch (error) {
        res.status(500).json({ message: "Error al actualizar", error });
    }
});
exports.updateOrderStatusToPaid = updateOrderStatusToPaid;
