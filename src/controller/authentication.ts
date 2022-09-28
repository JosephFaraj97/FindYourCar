import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import cryptojs from "crypto-js";

import { logger } from "../utils/logger.utils";
import { insert, findOne } from "../utils/db.utils";
import { isEmpty } from "lodash";
import IUser from "../interface/user";
import { signJWT } from "../middleware/validationJWT";


const signUp = async ( db: any, req: Request, res: Response) => {
  if (isEmpty(db)) {
    const error = {
      message: "No db connection",
      status: 500,
    };
    throw error;
  }
  
  const { email, password, name, role } = req.body;

  logger.info("Trying to signup user.");
  const collection = await db.collection("users");
  const userByEmail = await findOne(collection, {
    email
  })

  if(userByEmail) {
    res.status(400).json({message: "User already exists"})
  }

    const user:IUser = {
      id: uuidv4(),
      email,
      name,
      role,
      password: cryptojs.MD5(password).toString(),
      status: "ENABLED",
    };
  const userMongoInsertionResult: any = await insert(collection, { ...user });
  delete userMongoInsertionResult.password;

  signJWT(user, (error, token) => {
    if (error) throw { message: error.message, status: 401 };
    else if (token) {
      logger.info("Successfully signup.");

      res
        .status(201)
        .json({ message: "Authentication successful", user, token });
    }
  });
};

const login = async ( db: any, req: Request, res: Response) => {
  if (isEmpty(db)) {
    const error = {
      message: "No db connection",
      status: 500,
    };
    throw error;
  }
  
  const { email, password } = req.body;
    logger.info("Trying to login user.");
    const collection = await db.collection("users");
    const userByEmail: any = await findOne(collection, {
        email
    })
    delete userByEmail._id
    const user: IUser = userByEmail

    if(user.password.includes(cryptojs.MD5(password).toString())){
        signJWT(user, (error, token) => {
            if (error) throw { message: error.message, status: 401 };
            else if (token) {
              logger.info("Successfully signed in.");
              res
                .status(201)
                .json({ message: "Authentication successful", user, token });
            }
          });
    }else{
        res.status(401).json({
            message: "Email or password wrong",
          });
    }

};

export { signUp, login };
