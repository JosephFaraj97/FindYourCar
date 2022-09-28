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
exports.login = exports.signUp = void 0;
const uuid_1 = require("uuid");
const crypto_js_1 = __importDefault(require("crypto-js"));
const logger_utils_1 = require("../utils/logger.utils");
const db_utils_1 = require("../utils/db.utils");
const lodash_1 = require("lodash");
const validationJWT_1 = require("../middleware/validationJWT");
const signUp = (db, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if ((0, lodash_1.isEmpty)(db)) {
        const error = {
            message: "No db connection",
            status: 500,
        };
        throw error;
    }
    const { email, password, name, role } = req.body;
    logger_utils_1.logger.info("Trying to signup user.");
    const collection = yield db.collection("users");
    const userByEmail = yield (0, db_utils_1.findOne)(collection, {
        email
    });
    if (userByEmail) {
        res.status(400).json({ message: "User already exists" });
    }
    const user = {
        id: (0, uuid_1.v4)(),
        email,
        name,
        role,
        password: crypto_js_1.default.MD5(password).toString(),
        status: "ENABLED",
    };
    const userMongoInsertionResult = yield (0, db_utils_1.insert)(collection, Object.assign({}, user));
    delete userMongoInsertionResult.password;
    (0, validationJWT_1.signJWT)(user, (error, token) => {
        if (error)
            throw { message: error.message, status: 401 };
        else if (token) {
            logger_utils_1.logger.info("Successfully signup.");
            res
                .status(201)
                .json({ message: "Authentication successful", user, token });
        }
    });
});
exports.signUp = signUp;
const login = (db, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if ((0, lodash_1.isEmpty)(db)) {
        const error = {
            message: "No db connection",
            status: 500,
        };
        throw error;
    }
    const { email, password } = req.body;
    logger_utils_1.logger.info("Trying to login user.");
    const collection = yield db.collection("users");
    const userByEmail = yield (0, db_utils_1.findOne)(collection, {
        email
    });
    delete userByEmail._id;
    const user = userByEmail;
    if (user.password.includes(crypto_js_1.default.MD5(password).toString())) {
        (0, validationJWT_1.signJWT)(user, (error, token) => {
            if (error)
                throw { message: error.message, status: 401 };
            else if (token) {
                logger_utils_1.logger.info("Successfully signed in.");
                res
                    .status(201)
                    .json({ message: "Authentication successful", user, token });
            }
        });
    }
    else {
        res.status(401).json({
            message: "Email or password wrong",
        });
    }
});
exports.login = login;
