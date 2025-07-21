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
exports.updateOrder = exports.deleteOrder = exports.cancelOrder = exports.updateOrderStatusToPaid = exports.getAllOrders = exports.createOrder = void 0;
const order_1 = require("../models/order");
// Crear orden
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, products, status } = req.body;
        if (!userId || !products || !Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ message: 'Datos de orden incompletos' });
        }
        const order = yield order_1.Order.create({ userId, products, status });
        res.status(201).json({ message: 'Orden creada', order });
    }
    catch (error) {
        console.error('❌ Error en createOrder:', error);
        res.status(500).json({ message: 'Error al crear orden', error });
    }
});
exports.createOrder = createOrder;
// Obtener todas las órdenes
const getAllOrders = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_1.Order.find()
            .populate('userId')
            .populate('products.productId')
            .sort({ createDate: -1 });
        res.json({ orders });
    }
    catch (error) {
        console.error('Error al obtener órdenes:', error);
        res.status(500).json({ message: 'Error al obtener órdenes', error });
    }
});
exports.getAllOrders = getAllOrders;
// Actualizar estado a "Pagado"
const updateOrderStatusToPaid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updated = yield order_1.Order.findByIdAndUpdate(id, { status: 'Pagado', updateDate: new Date() }, { new: true });
        if (!updated) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }
        res.json({ message: 'Orden marcada como pagada', order: updated });
    }
    catch (error) {
        console.error('Error al actualizar estado:', error);
        res.status(500).json({ message: 'Error al actualizar estado', error });
    }
});
exports.updateOrderStatusToPaid = updateOrderStatusToPaid;
// Cancelar orden
const cancelOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updated = yield order_1.Order.findByIdAndUpdate(id, { status: 'Cancelado', updateDate: new Date() }, { new: true });
        if (!updated) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }
        res.json({ message: 'Orden cancelada', order: updated });
    }
    catch (error) {
        console.error('Error al cancelar orden:', error);
        res.status(500).json({ message: 'Error al cancelar orden', error });
    }
});
exports.cancelOrder = cancelOrder;
// Eliminar orden
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleted = yield order_1.Order.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }
        res.json({ message: 'Orden eliminada' });
    }
    catch (error) {
        console.error('Error al eliminar orden:', error);
        res.status(500).json({ message: 'Error al eliminar orden', error });
    }
});
exports.deleteOrder = deleteOrder;
// Editar orden (productos o estado)
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updated = yield order_1.Order.findByIdAndUpdate(id, req.body, { new: true });
        if (!updated) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }
        res.json({ message: 'Orden actualizada', order: updated });
    }
    catch (error) {
        console.error('Error al actualizar orden:', error);
        res.status(500).json({ message: 'Error al actualizar orden', error });
    }
});
exports.updateOrder = updateOrder;
