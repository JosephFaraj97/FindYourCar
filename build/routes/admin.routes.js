"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const lodash_1 = require("lodash");
const update_1 = require("../controller/admin/update");
const add_1 = require("../controller/admin/add");
const delete_1 = require("../controller/admin/delete");
const adminRoutes = (router, db) => {
    router.put("/changeUserStatus", (0, lodash_1.partial)(update_1.changeUserStatus, db));
    router.post("/addTag", (0, lodash_1.partial)(add_1.addTag, db));
    router.post("/addCategory", (0, lodash_1.partial)(add_1.addCategory, db));
    router.post("/addCar", (0, lodash_1.partial)(add_1.addCar, db));
    router.post("/deleteTag", (0, lodash_1.partial)(delete_1.deleteTag, db));
    router.post("/deleteCategory", (0, lodash_1.partial)(delete_1.deleteCategory, db));
    router.post("/deleteCar", (0, lodash_1.partial)(delete_1.deleteCar, db));
    return router;
};
exports.adminRoutes = adminRoutes;
