import { partial } from 'lodash'
import { getCarsByCategory } from "../controller/user/get";
import { createTrip, getAvailableCar } from "../controller/user/add";

const userRoutes = (router: any, db: any) => {
    router.get(
      '/getCarsByCategory',
      partial(getCarsByCategory, db)
    )

    router.post(
        '/createTrip',
        partial(createTrip, db)
      )

      router.post(
        '/getAvailableCars',
        partial(getAvailableCar, db)
      )
    return router
  }
  
  export { userRoutes }
  