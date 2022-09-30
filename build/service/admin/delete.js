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
exports.deleteCarServcie = exports.deleteCategoryServcie = exports.deleteTagServcie = void 0;
const lodash_1 = require("lodash");
const db_utils_1 = require("../../utils/db.utils");
const deleteTagServcie = (id, db) => __awaiter(void 0, void 0, void 0, function* () {
    if ((0, lodash_1.isEmpty)(db)) {
        const error = {
            message: "No db connection",
            status: 500,
        };
        throw error;
    }
    const collection = db.collection("tag");
    const tag = yield (0, db_utils_1.findOne)(collection, {
        id,
    });
    if (!tag) {
        throw { message: "No tag found", success: false };
    }
    else {
        const result = yield (0, db_utils_1.removeById)(collection, ((tag._id).toString()).split(" ")[0]);
        return result;
    }
});
exports.deleteTagServcie = deleteTagServcie;
const deleteCategoryServcie = (id, db) => __awaiter(void 0, void 0, void 0, function* () {
    if ((0, lodash_1.isEmpty)(db)) {
        const error = {
            message: "No db connection",
            status: 500,
        };
        throw error;
    }
    const collection = db.collection("category");
    const category = yield (0, db_utils_1.findOne)(collection, {
        id,
    });
    if (!category) {
        throw { message: "No category found.", success: false };
    }
    else {
        const result = yield (0, db_utils_1.removeById)(collection, ((category._id).toString()).split(" ")[0]);
        return result;
    }
});
exports.deleteCategoryServcie = deleteCategoryServcie;
const deleteCarServcie = (id, db) => __awaiter(void 0, void 0, void 0, function* () {
    if ((0, lodash_1.isEmpty)(db)) {
        const error = {
            message: "No db connection",
            status: 500,
        };
        throw error;
    }
    const collection = db.collection("cars");
    const car = yield (0, db_utils_1.findOne)(collection, {
        id,
    });
    if (!car) {
        throw { message: "No car found.", success: false };
    }
    else {
        const result = yield (0, db_utils_1.removeById)(collection, ((car._id).toString()).split(" ")[0]);
        return result;
    }
});
exports.deleteCarServcie = deleteCarServcie;
