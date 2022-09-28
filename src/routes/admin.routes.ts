import { partial } from "lodash";
import { changeUserStatus } from "../controller/admin/update";
import { addTag, addCategory } from "../controller/admin/add";

const adminRoutes = (router: any, db: any) => {
  router.put("/changeUserStatus", partial(changeUserStatus, db));
  router.post("/addTag", partial(addTag, db));
  router.post("/addCategory", partial(addCategory, db));
  return router;
};

export { adminRoutes };
