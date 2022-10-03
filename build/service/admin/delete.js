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
exports.deleteCarServcie = exports.deleteCategoryServcie = exports.deleteTagServcie = void 0;
const lodash_1 = require("lodash");
const mongoose_1 = __importDefault(require("mongoose"));
const car_model_1 = require("../../model/car.model");
const Tag = mongoose_1.default.model("Tag", car_model_1.tagSchema);
const Category = mongoose_1.default.model("Category", car_model_1.categorySchema);
const Car = mongoose_1.default.model("Car", car_model_1.carSchema);
const deleteTagServcie = (id, db) => __awaiter(void 0, void 0, void 0, function* () {
    if ((0, lodash_1.isEmpty)(db)) {
        const error = {
            message: "No db connection",
            status: 500,
        };
        throw error;
    }
    const tag = yield Tag.findOne({
        id,
    });
    if (!tag) {
        throw { message: "No tag found", success: false };
    }
    else {
        const result = yield Tag.deleteOne(tag.id);
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
    const category = yield Category.findOne({
        id,
    });
    if (!category) {
        throw { message: "No category found.", success: false };
    }
    else {
        const result = yield Category.deleteOne(category.id);
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
    const car = yield Car.findOne({
        id,
    });
    if (!car) {
        throw { message: "No car found.", success: false };
    }
    else {
        const result = yield Car.deleteOne(car.id);
        return result;
    }
});
exports.deleteCarServcie = deleteCarServcie;
