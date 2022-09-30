"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signJWT = exports.extractJWT = void 0;
const logger_utils_1 = require("../utils/logger.utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const TOKEN_EXPIRETIME = process.env.TOKEN_EXPIRETIME || 3600;
const TOKEN_SECRET = process.env.TOKEN_SECRET || "password";
const extractJWT = (req, res, next) => {
    var _a;
    let token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    logger_utils_1.logger.info("Trying to validate token.");
    if (token) {
        jsonwebtoken_1.default.verify(token, TOKEN_SECRET, (error, decoded) => {
            if (error) {
                return res.status(404).json({
                    message: error.message,
                    error,
                });
            }
            else {
                res.locals.jwt = decoded;
                logger_utils_1.logger.info("Token validated.");
                next();
            }
        });
    }
    else {
        return res.status(404).json({
            message: "Unauthorized",
        });
    }
};
exports.extractJWT = extractJWT;
const signJWT = (user, callback) => {
    const time = new Date().getTime();
    const expiryTime = time + Number(TOKEN_EXPIRETIME) * 100000;
    const expiryTimeInSecond = Math.floor(expiryTime / 1000);
    try {
        jsonwebtoken_1.default.sign({
            id: user.id,
            role: user.role
        }, TOKEN_SECRET, { algorithm: 'HS256',
            expiresIn: expiryTimeInSecond }, (error, token) => {
            if (error) {
                callback(error, null);
            }
            else if (token) {
                callback(null, token);
            }
        });
    }
    catch (error) {
        logger_utils_1.logger.error(error.message);
        callback(error, null);
    }
};
exports.signJWT = signJWT;
