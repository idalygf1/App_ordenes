"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
// models/role.ts
const mongoose_1 = require("mongoose");
const roleSchema = new mongoose_1.Schema({
    tipo: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    options: {
        type: String,
    },
    status: {
        type: Boolean,
        default: true,
    },
    createDate: {
        type: Date,
        default: Date.now,
    },
    updateDate: {
        type: Date,
        default: Date.now,
    },
});
exports.Role = (0, mongoose_1.model)("Role", roleSchema);
