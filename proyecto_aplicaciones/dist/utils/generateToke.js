"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ACCESS_SECRET = "secret123utd";
const generateAccessToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, ACCESS_SECRET, { expiresIn: '15m' });
};
exports.generateAccessToken = generateAccessToken;
