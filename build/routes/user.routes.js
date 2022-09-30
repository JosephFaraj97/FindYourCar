"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const lodash_1 = require("lodash");
const get_1 = require("../controller/user/get");
const add_1 = require("../controller/user/add");
const userRoutes = (router, db) => {
    router.get('/getCarsByCategory', (0, lodash_1.partial)(get_1.getCarsByCategory, db));
    router.post('/createTrip', (0, lodash_1.partial)(add_1.createTrip, db));
    router.post('/getAvailableCars', (0, lodash_1.partial)(add_1.getAvailableCar, db));
    return router;
};
exports.userRoutes = userRoutes;
