import { isEmpty } from "lodash";

export const getCarsByCategory = async(db: any) => {
    if (isEmpty(db)) {
        const error = {
          message: "No db connection",
          status: 500,
        };
        throw error;
    }

    const collection = await db.collection('category')

    return new Promise((resolve, reject) => {
        collection.aggregate([
            { $lookup:
               {
                 from: 'cars',
                 localField: 'id',
                 foreignField: 'category',
                 as: 'cars',
               }
             }
            ]).toArray(function(err: any, res: any) {
                if (err) reject(err);
                resolve(res);
              });
    }) 
}

