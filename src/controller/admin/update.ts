import { Request, Response } from "express";

import { logger } from "../../utils/logger.utils";
import { updateUserStatus } from "../../service/admin/update";

export const changeUserStatus = async (db: any, req: Request, res: Response) => {
  const { status, id } = req.body;

  try {
    logger.info(`Trying to change user status.`);
    const t = await updateUserStatus(status, id, db);
    console.log("ttttt",t)
    logger.info(`Successfully changed user status.`);

    res
      .status(201)
      .json({ message: "Status changed successful", success: true, t: t });
  } catch (error: any) {
    logger.error(error);
    const errorStatus = error.status || 500;

    res.status(errorStatus).json({ message: error.message, errorStatus });
  }
};
