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
exports.getAvailableCar = exports.createTrip = void 0;
const lodash_1 = require("lodash");
const createTrip = (userCoordinates, db) => __awaiter(void 0, void 0, void 0, function* () {
    if ((0, lodash_1.isEmpty)(db)) {
        const error = {
            message: "No db connection",
            status: 500,
        };
        throw error;
    }
    const collectionCar = db.collection("cars");
    return new Promise((resolve, reject) => {
        collectionCar
            .aggregate([
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
        ])
            .toArray(function (err, res) {
            if (err)
                reject(err);
            const lowest = res.reduce((previous, current) => {
                return current.age < previous.age ? current : previous;
            });
            resolve(lowest);
        });
    });
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
    const tags = (data.tags).split(",") || [];
    const collectionCar = db.collection("cars");
    return new Promise((resolve, reject) => {
        collectionCar
            .aggregate([
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
                    from: "category",
                    localField: "category",
                    foreignField: "id",
                    as: "category",
                },
            },
            {
                $lookup: {
                    from: "tag",
                    localField: "tag",
                    foreignField: "id",
                    as: "tag",
                },
            },
            { '$facet': {
                    metadata: [{ $count: "total" }, { $addFields: { page: data.page } }],
                    data: [{ $skip: data.rows }, { $limit: data.rows }] // add projection here wish you re-shape the docs
                } }
        ]).sort({ createdDate: 1 })
            .skip(data.page)
            .limit(data.rows + data.page)
            .toArray(function (err, res) {
            if (err)
                reject(err);
            resolve(res);
        });
    });
});
exports.getAvailableCar = getAvailableCar;
