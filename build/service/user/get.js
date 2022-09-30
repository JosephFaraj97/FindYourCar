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
exports.getCarsByCategory = void 0;
const lodash_1 = require("lodash");
const getCarsByCategory = (db) => __awaiter(void 0, void 0, void 0, function* () {
    if ((0, lodash_1.isEmpty)(db)) {
        const error = {
            message: "No db connection",
            status: 500,
        };
        throw error;
    }
    const collection = yield db.collection('category');
    return new Promise((resolve, reject) => {
        collection.aggregate([
            { $lookup: {
                    from: 'cars',
                    localField: 'id',
                    foreignField: 'category',
                    as: 'cars',
                }
            }
        ]).toArray(function (err, res) {
            if (err)
                reject(err);
            resolve(res);
        });
    });
});
exports.getCarsByCategory = getCarsByCategory;
