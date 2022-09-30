import { Request, Response } from "express";

import { logger } from "../../utils/logger.utils";
import { deleteCategoryServcie, deleteTagServcie, deleteCarServcie } from "../../service/admin/delete";

export const deleteCategory = async (db: any, req: Request, res: Response) => {
  const { id } = req.body;
  
  try {
    logger.info(`Trying to delete category.`);
    const result = await deleteCategoryServcie(id, db);
    logger.info(`Successfully deleted category.`);

    res
      .status(201)
      .json({ message: "category deleted successful", success: true, result });
  } catch (error: any) {
    logger.error(error);
    const errorStatus = error.status || 500;

    res.status(errorStatus).json({ message: error.message, errorStatus });
  }
};

export const deleteTag = async (db: any, req: Request, res: Response) => {
    const { id } = req.body;
    
    try {
      logger.info(`Trying to delete tag.`);
      const result = await deleteTagServcie(id, db);
      logger.info(`Successfully deleted tag.`);
  
      res
        .status(201)
        .json({ message: "tag deleted successful", success: true, result });
    } catch (error: any) {
      logger.error(error);
      const errorStatus = error.status || 500;
  
      res.status(errorStatus).json({ message: error.message, errorStatus });
    }
  };

  export const deleteCar = async (db: any, req: Request, res: Response) => {
    const { id } = req.body;
    
    try {
      logger.info(`Trying to delete car.`);
      const result = await deleteCarServcie(id, db);
      logger.info(`Successfully deleted car.`);
  
      res
        .status(201)
        .json({ message: "Car deleted successful", success: true, result });
    } catch (error: any) {
      logger.error(error);
      const errorStatus = error.status || 500;
  
      res.status(errorStatus).json({ message: error.message, errorStatus });
    }
  };
