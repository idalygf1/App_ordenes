"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const orderProductSchema = new mongoose_1.Schema({
    productId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
});
const orderSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, default: "Pendiente" },
    products: [orderProductSchema],
    createDate: { type: Date, default: Date.now },
    updateDate: { type: Date, default: Date.now },
});
exports.Order = (0, mongoose_1.model)("Order", orderSchema);
