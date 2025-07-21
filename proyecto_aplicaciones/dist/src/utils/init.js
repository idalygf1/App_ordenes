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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDefaultUser = void 0;
const user_1 = require("../models/user");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createDefaultUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const exists = yield user_1.User.findOne({ username: 'admin' });
    if (!exists) {
        const hashedPassword = yield bcryptjs_1.default.hash('1234', 10);
        yield user_1.User.create({
            name: 'Administrador',
            username: 'admin',
            email: 'admin@nexstock.com',
            password: hashedPassword,
            role: 'admin',
            phone: '0000000000',
            status: true,
            roles: ['admin']
        });
        console.log('✅ Usuario admin creado correctamente');
    }
    else {
        console.log('');
    }
});
exports.createDefaultUser = createDefaultUser;
