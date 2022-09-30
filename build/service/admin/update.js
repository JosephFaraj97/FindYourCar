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
exports.updateUserStatus = void 0;
const lodash_1 = require("lodash");
const db_utils_1 = require("../../utils/db.utils");
const updateUserStatus = (status, id, db) => __awaiter(void 0, void 0, void 0, function* () {
    if ((0, lodash_1.isEmpty)(db)) {
        const error = {
            message: 'No db connection',
            status: 500
        };
        throw error;
    }
    const collection = db.collection('users');
    const userFromMongo = yield (0, db_utils_1.findOne)(collection, {
        id
    });
    const mongoId = userFromMongo._id;
    delete userFromMongo._id;
    const user = userFromMongo;
    if ((0, lodash_1.isEmpty)(user)) {
        const error = {
            message: `User was not found in MongoDB`,
            status: 404
        };
        throw error;
    }
    user.status = status;
    const result = yield (0, db_utils_1.updateById)(collection, ((mongoId.toString()).split(" "))[0], Object.assign({}, user));
    return result;
});
exports.updateUserStatus = updateUserStatus;
