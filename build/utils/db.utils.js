"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateById = exports.findOne = exports.findById = exports.insert = void 0;
const lodash_1 = require("lodash");
const mongodb_1 = require("mongodb");
const mongoose_1 = __importDefault(require("mongoose"));
const insert = (collection, body) => {
    if ((0, lodash_1.isEmpty)(collection))
        throw { message: "Missing Collection", status: 500 };
    if ((0, lodash_1.isEmpty)(body))
        throw { message: "Missing Body", status: 500 };
    return new Promise((resolve, reject) => {
        collection.insertOne(body, {}, (error, result) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(result);
            }
        });
    });
};
exports.insert = insert;
const findById = (collection, id) => {
    if ((0, lodash_1.isEmpty)(collection))
        throw { message: "Missing Collection", status: 500 };
    if ((0, lodash_1.isEmpty)(id))
        throw { message: "Missing id", status: 500 };
    if (!mongoose_1.default.isValidObjectId(id)) {
        return null;
    }
    return new Promise((resolve, reject) => {
        collection.findOne({ _id: new mongodb_1.ObjectId(id) }, (error, result) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(result);
            }
        });
    });
};
exports.findById = findById;
const findOne = (collection, query) => {
    if ((0, lodash_1.isEmpty)(collection))
        throw { message: "Missing Collection", status: 500 };
    if ((0, lodash_1.isEmpty)(query))
        throw { message: "Missing query", status: 500 };
    return new Promise((resolve, reject) => {
        collection.findOne(query, (error, result) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(result);
            }
        });
    });
};
exports.findOne = findOne;
const updateById = (collection, id, body) => {
    if ((0, lodash_1.isEmpty)(collection))
        throw { message: "Missing Collection", status: 500 };
    if ((0, lodash_1.isEmpty)(id))
        throw { message: "Missing id", status: 500 };
    if ((0, lodash_1.isEmpty)(body))
        throw { message: "Missing Body", status: 500 };
    return new Promise((resolve, reject) => {
        collection.updateOne({ _id: new mongodb_1.ObjectId(id) }, {
            $set: body || {},
        }, (error, result) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(result);
            }
        });
    });
};
exports.updateById = updateById;
