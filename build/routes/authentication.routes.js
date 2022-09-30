"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationRoutes = void 0;
const lodash_1 = require("lodash");
const authentication_1 = require("../controller/authentication");
const authenticationRoutes = (router, db) => {
    router.post("/signup", (0, lodash_1.partial)(authentication_1.signUp, db));
    router.post("/login", (0, lodash_1.partial)(authentication_1.login, db));
    return router;
};
exports.authenticationRoutes = authenticationRoutes;
