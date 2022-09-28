"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_utils_1 = require("./utils/logger.utils");
const authentication_routes_1 = require("./routes/authentication.routes");
const admin_routes_1 = require("./routes/admin.routes");
const routes_config_1 = require("./config/routes.config");
const validationJWT_1 = require("./middleware/validationJWT");
const app = (0, express_1.default)();
const port = 3000;
require('dotenv').config();
const db = require('./config/mongoDB.config');
app.use('/authentication', (0, authentication_routes_1.authenticationRoutes)((0, routes_config_1.defaultRouter)(), db));
app.use('/admin', validationJWT_1.extractJWT, (0, admin_routes_1.adminRoutes)((0, routes_config_1.defaultRouter)(), db));
app.listen(port, () => {
    logger_utils_1.logger.info(`Server running on port: ${port}`);
});
