import { isEmpty } from "lodash";
import mongoose from "mongoose";
import { categorySchema } from "../../model/car.model";


const Category: any = mongoose.model("Category",categorySchema)

export const getCarsByCategory = async(db: any) => {
    if (isEmpty(db)) {
        const error = {
          message: "No db connection",
          status: 500,
        };
        throw error;
    }

    return Category.aggregate([
            { $lookup:
               {
                 from: 'cars',
                 localField: 'id',
                 foreignField: 'category',
                 as: 'cars',
               }
             }
            ])
}

