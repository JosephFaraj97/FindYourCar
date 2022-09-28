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
exports.changeUserStatus = void 0;
const logger_utils_1 = require("../../utils/logger.utils");
const update_1 = require("../../service/admin/update");
const changeUserStatus = (db, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { status, id } = req.body;
    try {
        logger_utils_1.logger.info(`Trying to change user status.`);
        yield (0, update_1.updateUserStatus)(status, id, db);
        logger_utils_1.logger.info(`Successfully changed user status.`);
        res
            .status(201)
            .json({ message: "Status changed successful", success: true });
    }
    catch (error) {
        logger_utils_1.logger.error(error);
        const errorStatus = error.status || 500;
        res.status(errorStatus).json({ message: error.message, errorStatus });
    }
});
exports.changeUserStatus = changeUserStatus;
