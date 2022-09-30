import { Request, Response } from "express";

import { logger } from "../../utils/logger.utils";
import { createTrip as createTripService,
        getAvailableCar as getAvailableCarService } from "../../service/user/add";
import { ICoordinate } from "../../interface/trip";

export const createTrip = async (db: any, req: Request, res: Response) => {
    const { longitude, latitude } = req.body
    const coordinate: ICoordinate = {
        latitude,
        longitude
    }
    try {
      logger.info(`Trying to get the closest car.`);
      const result = await createTripService(coordinate ,db);
      logger.info(`Successfully got the closest car.`);
  
      res.status(201)
        .json({ result });
    } catch (error: any) {
      logger.error(error);
      const errorStatus = error.status || 500;
  
      res.status(errorStatus).json({ message: error.message, errorStatus });
    }
  };

  export const getAvailableCar = async (db: any, req: Request, res: Response) => {
    const { page, rows, criteria, value, category, tags } = req.body
    const data = {
        page,
        rows,
        criteria,
        value,
        category,
        tags
    }
    try {
      logger.info(`Trying to get available cars.`);
      const result = await getAvailableCarService(data ,db);
      logger.info(`Successfully got available cars.`);
  
      res.status(201)
        .json({ result });
    } catch (error: any) {
      logger.error(error);
      const errorStatus = error.status || 500;
  
      res.status(errorStatus).json({ message: error.message, errorStatus });
    }
  };