"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const lodash_1 = require("lodash");
const update_1 = require("../controller/admin/update");
const add_1 = require("../controller/admin/add");
const adminRoutes = (router, db) => {
    router.put('/changeUserStatus', (0, lodash_1.partial)(update_1.changeUserStatus, db));
    router.post('/addTag', (0, lodash_1.partial)(add_1.addTag, db));
    router.post('/addCategory', (0, lodash_1.partial)(add_1.addCategory, db));
    return router;
};
exports.adminRoutes = adminRoutes;
