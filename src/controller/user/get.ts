import { Request, Response } from "express";

import { logger } from "../../utils/logger.utils";
import { getCarsByCategory as getCarsByCategoryService } from "../../service/user/get";

export const getCarsByCategory = async (db: any, req: Request, res: Response) => {
    try {
      logger.info(`Trying to get car by category.`);
      const result = await getCarsByCategoryService(db);
      logger.info(`Successfully got car by category.`);
  
      res.status(201)
        .json({ result });
    } catch (error: any) {
      logger.error(error);
      const errorStatus = error.status || 500;
  
      res.status(errorStatus).json({ message: error.message, errorStatus });
    }
  };