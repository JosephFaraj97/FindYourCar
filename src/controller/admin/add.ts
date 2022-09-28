import { Request, Response } from "express";

import { logger } from "../../utils/logger.utils";
import { addCategoryServcie, addTagServcie } from "../../service/admin/add";

export const addCategory = async (db: any, req: Request, res: Response) => {
  const { name } = req.body;
  
  try {
    logger.info(`Trying to add category.`);
    const result = await addCategoryServcie(name, db);
    logger.info(`Successfully added category.`);

    res
      .status(201)
      .json({ message: "category added successful", success: true, result });
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
        .json({ message: "tag added successful", success: true, result });
    } catch (error: any) {
      logger.error(error);
      const errorStatus = error.status || 500;
  
      res.status(errorStatus).json({ message: error.message, errorStatus });
    }
  };
