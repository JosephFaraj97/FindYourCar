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
exports.getAvailableCar = exports.createTrip = void 0;
const lodash_1 = require("lodash");
const mongoose_1 = __importDefault(require("mongoose"));
const car_model_1 = require("../../model/car.model");
const Car = mongoose_1.default.model("Car", car_model_1.carSchema);
const createTrip = (userCoordinates, db) => __awaiter(void 0, void 0, void 0, function* () {
    if ((0, lodash_1.isEmpty)(db)) {
        const error = {
            message: "No db connection",
            status: 500,
        };
        throw error;
    }
    let nearest = yield Car.aggregate([
        {
            $addFields: {
                isNear: {
                    $function: {
                        body: `
                    function(longitudeCar, latitudeCar, longitudeUser,latitudeUser){
                            var a = longitudeCar - longitudeUser;
                            var b = latitudeCar - latitudeUser;
                            
                            var c = Math.sqrt( a*a + b*b );
                            var data = {
                                distance: c *1000,
                                isNear: c * 1000 < 10000
                            }
                            return data;
                        }`,
                        args: [
                            "$latitude",
                            "$longitude",
                            userCoordinates.longitude,
                            userCoordinates.latitude,
                        ],
                        lang: "js",
                    },
                },
            },
        },
    ]);
    nearest = nearest.reduce((previous, current) => {
        return current.isNear.distance < previous.isNear.distance ? current : previous;
    });
    return nearest;
});
exports.createTrip = createTrip;
const getAvailableCar = (data, db) => __awaiter(void 0, void 0, void 0, function* () {
    if ((0, lodash_1.isEmpty)(db)) {
        const error = {
            message: "No db connection",
            status: 500,
        };
        throw error;
    }
    let tags;
    tags = data.tags ? data.tags.split(",") : '';
    return Car.aggregate([
        {
            $match: {
                $expr: {
                    $and: [
                        {
                            $eq: [`$${data.criteria}`, data.value],
                        },
                        data.category ? { $eq: ["$category", data === null || data === void 0 ? void 0 : data.category] } : {},
                        data.tags ? { tag: tags } : {}
                    ],
                },
            },
        },
        {
            $lookup: {
                from: "categories",
                localField: "category",
                foreignField: "id",
                as: "categories",
            },
        },
        {
            $lookup: {
                from: "tags",
                localField: "tag",
                foreignField: "id",
                as: "tags",
            },
        },
        { '$facet': {
                metadata: [{ $count: "total" }, { $addFields: { page: data.page } }],
                data: [{ $skip: data.rows }, { $limit: data.rows + data.page }]
            } }
    ]).sort({ createdDate: 1 });
});
exports.getAvailableCar = getAvailableCar;
