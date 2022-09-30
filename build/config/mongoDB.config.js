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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMongoUrl = exports.getClient = exports.collection = exports.connect = void 0;
const mongodb_1 = require("mongodb");
const lodash_1 = require("lodash");
const logger_utils_1 = require("../utils/logger.utils");
const { MONGODB_HOST, MONGODB_PORT, MONGODB_DATABASE, MONGODB_USER, MONGODB_PWD } = process.env;
let client;
const getClient = () => client;
exports.getClient = getClient;
const getMongoUrl = () => `mongodb://${MONGODB_USER}:${MONGODB_PWD}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DATABASE}`;
exports.getMongoUrl = getMongoUrl;
const collection = (name) => {
    return client.collection(name);
};
exports.collection = collection;
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    if ((0, lodash_1.isEmpty)(client)) {
        try {
            const db = mongodb_1.MongoClient.connect(getMongoUrl());
            client = (yield db).db(MONGODB_DATABASE);
        }
        catch (err) {
            logger_utils_1.logger.error(err.message);
        }
    }
});
exports.connect = connect;
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield connect();
}))();
