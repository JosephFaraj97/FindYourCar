import { partial } from "lodash";
import { changeUserStatus } from "../controller/admin/update";
import { addTag, addCategory, addCar } from "../controller/admin/add";
import { deleteCategory, deleteTag, deleteCar } from "../controller/admin/delete";

const adminRoutes = (router: any, db: any) => {
  router.put("/changeUserStatus", partial(changeUserStatus, db));
  router.post("/addTag", partial(addTag, db));
  router.post("/addCategory", partial(addCategory, db));
  router.post("/addCar", partial(addCar, db));
  router.post("/deleteTag", partial(deleteTag, db));
  router.post("/deleteCategory", partial(deleteCategory, db));
  router.post("/deleteCar", partial(deleteCar, db));
  return router;
};

export { adminRoutes };
