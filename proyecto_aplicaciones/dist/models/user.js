"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    phone: { type: String },
    status: { type: Boolean, default: true },
    createDate: { type: Date, default: Date.now },
    deleteDate: { type: Date },
    roles: {
        type: [String],
        required: true,
        enum: ["admin", "viewer", "editor"],
        default: ["viewer"]
    }
});
exports.User = (0, mongoose_1.model)('User', userSchema);
