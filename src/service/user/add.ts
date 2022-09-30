import { isEmpty } from "lodash";
import { v4 as uuidv4 } from "uuid";
import { getDistance } from "geolib";

import { ITrip, ICoordinate } from "../../interface/trip";
import { insert, findOne, find } from "../../utils/db.utils";

export const createTrip = async (userCoordinates: ICoordinate, db: any) => {
  if (isEmpty(db)) {
    const error = {
      message: "No db connection",
      status: 500,
    };
    throw error;
  }

  const collectionCar = db.collection("cars");
  return new Promise((resolve, reject) => {
    collectionCar
      .aggregate([
        {
          $addFields: {
            isNear: {
              $function: {
                body: `
                    function(longitudeCar, latitudeCar, longitudeUser,latitudeUser){
                            var a = longitudeCar - longitudeUser;
                            var b = latitudeCar - latitudeUser;
                            
                            var c = Math.sqrt( a*a + b*b );
                            var data = {
                                distance: c *1000,
                                isNear: c * 1000 < 10000
                            }
                            return data;
                        }`,
                args: [
                  "$latitude",
                  "$longitude",
                  userCoordinates.longitude,
                  userCoordinates.latitude,
                ],
                lang: "js",
              },
            },
          },
        },
      ])
      .toArray(function (err: any, res: any) {
        if (err) reject(err);
        const lowest = res.reduce((previous: any, current: any) => {
          return current.age < previous.age ? current : previous;
        });
        resolve(lowest);
      });
  });
};

export const getAvailableCar = async (data: any, db: any) => {
  if (isEmpty(db)) {
    const error = {
      message: "No db connection",
      status: 500,
    };
    throw error;
  }
  const tags = (data.tags).split(",") || [];
  
  const collectionCar = db.collection("cars");
  return new Promise((resolve, reject) => {
    collectionCar
      .aggregate([
        {
          $match: {
            $expr: {
              $and: [
                {
                  $eq: [`$${data.criteria}`, data.value],
                },
                data.category ? { $eq: ["$category", data?.category ]} : {},
                data.tags ? { tag: tags } : {}
              ],
            },
          },
        },

        {
          $lookup: {
            from: "category",
            localField: "category",
            foreignField: "id",
            as: "category",
          },
        },
        {
          $lookup: {
            from: "tag",
            localField: "tag",
            foreignField: "id",
            as: "tag",
          },
        },   
         { '$facet'    : {
            metadata: [ { $count: "total" }, { $addFields: { page: data.page } } ],
            data: [ { $skip: data.rows }, { $limit: data.rows } ] // add projection here wish you re-shape the docs
        } }
      ])  .sort({ createdDate: 1 })
      .skip(data.page)
      .limit(data.rows + data.page)
      .toArray(function (err: any, res: any) {
        if (err) reject(err);
        resolve(res);
      });
  });
};
