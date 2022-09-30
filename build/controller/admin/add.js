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
exports.addCar = exports.addTag = exports.addCategory = void 0;
const logger_utils_1 = require("../../utils/logger.utils");
const add_1 = require("../../service/admin/add");
const addCategory = (db, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    try {
        logger_utils_1.logger.info(`Trying to add category.`);
        const result = yield (0, add_1.addCategoryServcie)(name, db);
        logger_utils_1.logger.info(`Successfully added category.`);
        res
            .status(201)
            .json({ message: "Category added successful", success: true, result });
    }
    catch (error) {
        logger_utils_1.logger.error(error);
        const errorStatus = error.status || 500;
        res.status(errorStatus).json({ message: error.message, errorStatus });
    }
});
exports.addCategory = addCategory;
const addTag = (db, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    try {
        logger_utils_1.logger.info(`Trying to add tag.`);
        const result = yield (0, add_1.addTagServcie)(name, db);
        logger_utils_1.logger.info(`Successfully added tag.`);
        res
            .status(201)
            .json({ message: "Tag added successful", success: true, result });
    }
    catch (error) {
        logger_utils_1.logger.error(error);
        const errorStatus = error.status || 500;
        res.status(errorStatus).json({ message: error.message, errorStatus });
    }
});
exports.addTag = addTag;
const addCar = (db, { body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_utils_1.logger.info(`Trying to add car.`);
        const result = yield (0, add_1.addCarServcie)(body, db);
        logger_utils_1.logger.info(`Successfully added car.`);
        res
            .status(201)
            .json({ message: "Car added successful", success: true, result });
    }
    catch (error) {
        logger_utils_1.logger.error(error);
        const errorStatus = error.status || 500;
        res.status(errorStatus).json({ message: error.message, errorStatus });
    }
});
exports.addCar = addCar;
