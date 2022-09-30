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
exports.addCarServcie = exports.addCategoryServcie = exports.addTagServcie = void 0;
const lodash_1 = require("lodash");
const uuid_1 = require("uuid");
const db_utils_1 = require("../../utils/db.utils");
const addTagServcie = (name, db) => __awaiter(void 0, void 0, void 0, function* () {
    if ((0, lodash_1.isEmpty)(db)) {
        const error = {
            message: "No db connection",
            status: 500,
        };
        throw error;
    }
    const data = {
        id: (0, uuid_1.v4)(),
        name,
    };
    const collection = db.collection("tag");
    const tag = yield (0, db_utils_1.findOne)(collection, {
        name,
    });
    if (tag) {
        throw { message: "tag already exists", success: false };
    }
    else {
        yield (0, db_utils_1.insert)(collection, data);
        return data;
    }
});
exports.addTagServcie = addTagServcie;
const addCategoryServcie = (name, db) => __awaiter(void 0, void 0, void 0, function* () {
    if ((0, lodash_1.isEmpty)(db)) {
        const error = {
            message: "No db connection",
            status: 500,
        };
        throw error;
    }
    const data = {
        id: (0, uuid_1.v4)(),
        name,
    };
    const collection = db.collection("category");
    const category = yield (0, db_utils_1.findOne)(collection, {
        name,
    });
    if (category) {
        throw { message: "Category already exists", success: false };
    }
    else {
        yield (0, db_utils_1.insert)(collection, data);
        return data;
    }
});
exports.addCategoryServcie = addCategoryServcie;
const addCarServcie = (data, db) => __awaiter(void 0, void 0, void 0, function* () {
    if ((0, lodash_1.isEmpty)(db)) {
        const error = {
            message: "No db connection",
            status: 500,
        };
        throw error;
    }
    if (!data.image) {
        const error = {
            message: "Car should have at least one image",
            status: 400,
        };
        throw error;
    }
    let tagsArray = [];
    const collectionTag = db.collection("tag");
    const tag = yield (0, db_utils_1.find)(collectionTag, {});
    tag.forEach((element) => {
        tagsArray.push(element.id);
    });
    const allFounded = (data.tag).every(value => tagsArray.includes(value));
    if (!allFounded) {
        const error = {
            message: "Please entre a valid tag",
            status: 400,
        };
        throw error;
    }
    const collectionCategory = db.collection("category");
    const category = yield (0, db_utils_1.findOne)(collectionCategory, {
        id: data.category,
    });
    if (!category) {
        const error = {
            message: "Please entre a valid category",
            status: 400,
        };
        throw error;
    }
    const collection = db.collection("cars");
    const car = yield (0, db_utils_1.findOne)(collection, {
        id: data.id,
    });
    if (car) {
        throw { message: "car already exists", success: false };
    }
    else {
        data.id = (0, uuid_1.v4)();
        data.createdDate = new Date();
        console.log(data.createdDate);
        yield (0, db_utils_1.insert)(collection, data);
        return data;
    }
});
exports.addCarServcie = addCarServcie;
