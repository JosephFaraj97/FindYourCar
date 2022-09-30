import { partial } from "lodash";
import { signUp, login } from "../controller/authentication";

const authenticationRoutes = (router: any, db: any) => {
  router.post("/signup", partial(signUp, db));

  router.post("/login", partial(login, db));
  return router;
};

export { authenticationRoutes };
