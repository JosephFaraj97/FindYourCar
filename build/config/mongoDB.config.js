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
exports.getMongoUrl = exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const logger_utils_1 = require("../utils/logger.utils");
const { MONGODB_HOST, MONGODB_PORT, MONGODB_DATABASE, MONGODB_USER, MONGODB_PWD } = process.env;
const getMongoUrl = () => `mongodb://${MONGODB_USER}:${MONGODB_PWD}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DATABASE}`;
exports.getMongoUrl = getMongoUrl;
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        mongoose_1.default.connect(getMongoUrl());
    }
    catch (err) {
        logger_utils_1.logger.error(err.message);
    }
});
exports.connect = connect;
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield connect();
}))();
