import { isEmpty } from 'lodash'
import mongoose from 'mongoose';
import IUser from '../../interface/user';
import { userSchema } from '../../model/user.model';

const User: any = mongoose.model("User",userSchema)

export const updateUserStatus = async (status: string, id: string, db: any) => {
    if (isEmpty(db)) {
      const error = {
        message: 'No db connection',
        status: 500
      }
      throw error
    }
  
      const userFromMongo: any = await User.find({
        id
      })
      const user: IUser = userFromMongo

      if (isEmpty(user)) {
        const error = {
          message: `User was not found in MongoDB`,
          status: 404
        }
        throw error
      }
      const result = await User.findOneAndUpdate(user.id, 
        {status}, {new: true}
      )
      
      return result
    }
