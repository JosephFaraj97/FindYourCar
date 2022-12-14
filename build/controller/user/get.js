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
const logger_utils_1 = require("../../utils/logger.utils");
const get_1 = require("../../service/user/get");
const getCarsByCategory = (db, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_utils_1.logger.info(`Trying to get car by category.`);
        const result = yield (0, get_1.getCarsByCategory)(db);
        logger_utils_1.logger.info(`Successfully got car by category.`);
        res.status(201)
            .json({ result });
    }
    catch (error) {
        logger_utils_1.logger.error(error);
        const errorStatus = error.status || 500;
        res.status(errorStatus).json({ message: error.message, errorStatus });
    }
});
exports.getCarsByCategory = getCarsByCategory;
