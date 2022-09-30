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
const logger_utils_1 = require("../../utils/logger.utils");
const add_1 = require("../../service/user/add");
const createTrip = (db, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { longitude, latitude } = req.body;
    const coordinate = {
        latitude,
        longitude
    };
    try {
        logger_utils_1.logger.info(`Trying to get the closest car.`);
        const result = yield (0, add_1.createTrip)(coordinate, db);
        logger_utils_1.logger.info(`Successfully got the closest car.`);
        res.status(201)
            .json({ result });
    }
    catch (error) {
        logger_utils_1.logger.error(error);
        const errorStatus = error.status || 500;
        res.status(errorStatus).json({ message: error.message, errorStatus });
    }
});
exports.createTrip = createTrip;
const getAvailableCar = (db, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, rows, criteria, value, category, tags } = req.body;
    const data = {
        page,
        rows,
        criteria,
        value,
        category,
        tags
    };
    try {
        logger_utils_1.logger.info(`Trying to get available cars.`);
        const result = yield (0, add_1.getAvailableCar)(data, db);
        logger_utils_1.logger.info(`Successfully got available cars.`);
        res.status(201)
            .json({ result });
    }
    catch (error) {
        logger_utils_1.logger.error(error);
        const errorStatus = error.status || 500;
        res.status(errorStatus).json({ message: error.message, errorStatus });
    }
});
exports.getAvailableCar = getAvailableCar;
