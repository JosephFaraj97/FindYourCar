import { isEmpty } from 'lodash'
import IUser from '../../interface/user';

import { insert, findOne, updateById } from "../../utils/db.utils";

export const updateUserStatus = async (status: string, id: string, db: any) => {
    if (isEmpty(db)) {
      const error = {
        message: 'No db connection',
        status: 500
      }
      throw error
    }
  
    const collection = db.collection('users')
  
      const userFromMongo: any = await findOne(collection, {
        id
      })
      const mongoId = userFromMongo._id
      delete userFromMongo._id
      const user: IUser = userFromMongo
      if (isEmpty(user)) {
        const error = {
          message: `User was not found in MongoDB`,
          status: 404
        }
        throw error
      }

      user.status = status
      const result = await updateById(collection, ((mongoId.toString()).split(" "))[0], {
        ...user
      })
  
      return result
    }
