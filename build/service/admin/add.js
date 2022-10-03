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
exports.addCarServcie = exports.addCategoryServcie = exports.addTagServcie = void 0;
const lodash_1 = require("lodash");
const uuid_1 = require("uuid");
const car_model_1 = require("../../model/car.model");
const mongoose_1 = __importDefault(require("mongoose"));
const Tag = mongoose_1.default.model("tags", car_model_1.tagSchema);
const Category = mongoose_1.default.model("categories", car_model_1.categorySchema);
const Car = mongoose_1.default.model("cars", car_model_1.carSchema);
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
    const tagToSaveToMongo = new Tag(data);
    const tag = yield Tag.findOne({
        name,
    });
    if (tag) {
        throw { message: "tag already exists", success: false };
    }
    else {
        yield tagToSaveToMongo.save();
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
    const categoryToSaveToMongo = new Category(data);
    const category = yield Category.findOne({
        name,
    });
    if (category) {
        throw { message: "Category already exists", success: false };
    }
    else {
        yield categoryToSaveToMongo.save();
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
    const tag = yield Tag.find({});
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
    const category = yield Category.findOne({
        id: data.category,
    });
    if (!category) {
        const error = {
            message: "Please entre a valid category",
            status: 400,
        };
        throw error;
    }
    data.id = (0, uuid_1.v4)();
    const car = yield Car.findOne({
        id: data.id,
    });
    const carToSaveToMongo = new Car(data);
    if (car) {
        throw { message: "car already exists", success: false };
    }
    else {
        data.id = (0, uuid_1.v4)();
        data.createdDate = new Date();
        yield carToSaveToMongo.save();
        return data;
    }
});
exports.addCarServcie = addCarServcie;
