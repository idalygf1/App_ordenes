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
exports.deleteProduct = exports.updateProduct = exports.getAllProducts = exports.createProduct = void 0;
const products_1 = require("../models/products");
const mongoose_1 = require("mongoose");
// CREATE
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield products_1.Product.create(req.body);
        res.status(201).json({ message: "Producto creado", product });
    }
    catch (error) {
        res.status(500).json({ message: "Error al crear producto", error });
    }
});
exports.createProduct = createProduct;
// GET ALL
const getAllProducts = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield products_1.Product.find();
    res.json({ products });
});
exports.getAllProducts = getAllProducts;
// UPDATE
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "ID no válido" });
    }
    try {
        const product = yield products_1.Product.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!product)
            return res.status(404).json({ message: "Producto no encontrado" });
        res.json({ message: "Producto actualizado", product });
    }
    catch (error) {
        res.status(500).json({ message: "Error al actualizar producto", error });
    }
});
exports.updateProduct = updateProduct;
// DELETE (STATUS => false)
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "ID no válido" });
    }
    try {
        const product = yield products_1.Product.findByIdAndUpdate(id, { status: false }, { new: true });
        if (!product)
            return res.status(404).json({ message: "Producto no encontrado" });
        res.json({ message: "Producto desactivado (status=false)", product });
    }
    catch (error) {
        res.status(500).json({ message: "Error al desactivar producto", error });
    }
});
exports.deleteProduct = deleteProduct;
