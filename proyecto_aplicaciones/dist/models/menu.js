"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const menuSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
    },
    role: {
        type: String,
    },
});
exports.default = (0, mongoose_1.model)("Menu", menuSchema);
