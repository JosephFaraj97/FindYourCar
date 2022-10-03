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
exports.getCarsByCategory = void 0;
const lodash_1 = require("lodash");
const mongoose_1 = __importDefault(require("mongoose"));
const car_model_1 = require("../../model/car.model");
const Category = mongoose_1.default.model("Category", car_model_1.categorySchema);
const getCarsByCategory = (db) => __awaiter(void 0, void 0, void 0, function* () {
    if ((0, lodash_1.isEmpty)(db)) {
        const error = {
            message: "No db connection",
            status: 500,
        };
        throw error;
    }
    return Category.aggregate([
        { $lookup: {
                from: 'cars',
                localField: 'id',
                foreignField: 'category',
                as: 'cars',
            }
        }
    ]);
});
exports.getCarsByCategory = getCarsByCategory;
