"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultRouter = void 0;
const express_1 = require("express");
const cors_1 = __importDefault(require("cors"));
const defaultRouter = () => {
    const router = (0, express_1.Router)({ mergeParams: true });
    router.use((0, cors_1.default)());
    router.use((0, express_1.urlencoded)({ extended: true }));
    router.use((0, express_1.json)({ limit: '5mb' }));
    router.use((0, express_1.static)('public'));
    router.all('/*', (_req, res, next) => {
        res.statusCode = 200;
        next();
    });
    return router;
};
exports.defaultRouter = defaultRouter;
