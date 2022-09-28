"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = require("winston");
const getWinstonLogger = () => {
    return (0, winston_1.createLogger)({
        level: process.env.LOGGING_LEVEL || 'info',
        format: winston_1.format.simple(),
        transports: [new winston_1.transports.Console()]
    });
};
exports.logger = getWinstonLogger();
