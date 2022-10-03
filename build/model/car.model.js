"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagSchema = exports.categorySchema = exports.carSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.carSchema = new mongoose_1.default.Schema({
    category: { type: String, index: true },
    tag: { type: Array, index: true },
    image: Array,
    description: String,
    name: String,
    lastUserId: String,
    status: String,
    longitude: String,
    latitude: String,
    id: { type: String, unique: true },
    createdDate: String,
});
exports.categorySchema = new mongoose_1.default.Schema({
    id: String,
    name: { type: String, unique: true }
});
exports.tagSchema = new mongoose_1.default.Schema({
    id: String,
    name: { type: String, unique: true }
});
