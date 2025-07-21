"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    status: {
        type: Boolean,
        default: true,
    },
    description: {
        type: String,
        required: false,
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
    },
});
exports.Product = (0, mongoose_1.model)('Product', productSchema);
