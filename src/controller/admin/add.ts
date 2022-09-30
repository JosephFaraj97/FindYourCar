import { Request, Response } from "express";

import { logger } from "../../utils/logger.utils";
import { addCategoryServcie, addTagServcie, addCarServcie } from "../../service/admin/add";
import ICar from "../../interface/car";

export const addCategory = async (db: any, req: Request, res: Response) => {
  const { name } = req.body;
  
  try {
    logger.info(`Trying to add category.`);
    const result = await addCategoryServcie(name, db);
    logger.info(`Successfully added category.`);

    res
      .status(201)
      .json({ message: "Category added successful", success: true, result });
  } catch (error: any) {
    logger.error(error);
    const errorStatus = error.status || 500;

    res.status(errorStatus).json({ message: error.message, errorStatus });
  }
};

export const addTag = async (db: any, req: Request, res: Response) => {
    const { name} = req.body;
    
    try {
      logger.info(`Trying to add tag.`);
      const result = await addTagServcie(name, db);
      logger.info(`Successfully added tag.`);
  
      res
        .status(201)
        .json({ message: "Tag added successful", success: true, result });
    } catch (error: any) {
      logger.error(error);
      const errorStatus = error.status || 500;
  
      res.status(errorStatus).json({ message: error.message, errorStatus });
    }
  };

  export const addCar = async (db: any, { body }: { body: ICar }, res: Response) => {

    try {
      logger.info(`Trying to add car.`);
      const result = await addCarServcie(body, db);
      logger.info(`Successfully added car.`);
  
      res
        .status(201)
        .json({ message: "Car added successful", success: true, result });
    } catch (error: any) {
      logger.error(error);
      const errorStatus = error.status || 500;
  
      res.status(errorStatus).json({ message: error.message, errorStatus });
    }
  };
