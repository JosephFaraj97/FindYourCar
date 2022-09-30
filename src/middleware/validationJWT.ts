import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger.utils";
import IUser from "../interface/user";
import jwt from "jsonwebtoken";

const TOKEN_EXPIRETIME = process.env.TOKEN_EXPIRETIME || 3600;
const TOKEN_SECRET = process.env.TOKEN_SECRET || "password";

const extractJWT = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization?.split(" ")[1];

  logger.info("Trying to validate token.");
  if (token) {
    jwt.verify(token, TOKEN_SECRET, (error, decoded) => {
      if (error) {
        return res.status(404).json({
          message: error.message,
          error,
        });
      } else {
        res.locals.jwt = decoded;
        logger.info("Token validated.");
        next();
      }
    });
  } else {
    return res.status(404).json({
      message: "Unauthorized",
    });
  }
};

const signJWT = (
  user: IUser,
  callback: (error: Error | null, token: string | null) => void
): void => {
  const time = new Date().getTime();
  const expiryTime = time + Number(TOKEN_EXPIRETIME) * 100000;
  const expiryTimeInSecond = Math.floor(expiryTime / 1000);

  try{
    jwt.sign({ 
        id: user.id,
        role: user.role },
         TOKEN_SECRET,
         { algorithm: 'HS256',
        expiresIn: expiryTimeInSecond },
        (error, token) => {
            if(error){
                callback(error, null)
            } else if(token) {
                callback(null, token)
            }
        })
  } catch(error: any){
    logger.error(error.message)
    callback(error, null)
  }
};

export { extractJWT, signJWT };
