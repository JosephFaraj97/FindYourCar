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
exports.deleteCar = exports.deleteTag = exports.deleteCategory = void 0;
const logger_utils_1 = require("../../utils/logger.utils");
const delete_1 = require("../../service/admin/delete");
const deleteCategory = (db, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        logger_utils_1.logger.info(`Trying to delete category.`);
        const result = yield (0, delete_1.deleteCategoryServcie)(id, db);
        logger_utils_1.logger.info(`Successfully deleted category.`);
        res
            .status(201)
            .json({ message: "category deleted successful", success: true, result });
    }
    catch (error) {
        logger_utils_1.logger.error(error);
        const errorStatus = error.status || 500;
        res.status(errorStatus).json({ message: error.message, errorStatus });
    }
});
exports.deleteCategory = deleteCategory;
const deleteTag = (db, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        logger_utils_1.logger.info(`Trying to delete tag.`);
        const result = yield (0, delete_1.deleteTagServcie)(id, db);
        logger_utils_1.logger.info(`Successfully deleted tag.`);
        res
            .status(201)
            .json({ message: "tag deleted successful", success: true, result });
    }
    catch (error) {
        logger_utils_1.logger.error(error);
        const errorStatus = error.status || 500;
        res.status(errorStatus).json({ message: error.message, errorStatus });
    }
});
exports.deleteTag = deleteTag;
const deleteCar = (db, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        logger_utils_1.logger.info(`Trying to delete car.`);
        const result = yield (0, delete_1.deleteCarServcie)(id, db);
        logger_utils_1.logger.info(`Successfully deleted car.`);
        res
            .status(201)
            .json({ message: "Car deleted successful", success: true, result });
    }
    catch (error) {
        logger_utils_1.logger.error(error);
        const errorStatus = error.status || 500;
        res.status(errorStatus).json({ message: error.message, errorStatus });
    }
});
exports.deleteCar = deleteCar;
