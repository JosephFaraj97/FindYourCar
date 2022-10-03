import { isEmpty } from "lodash";

import { ICoordinate } from "../../interface/trip";
import mongoose from "mongoose";
import { carSchema } from "../../model/car.model";

const Car: any = mongoose.model("Car",carSchema)

export const createTrip = async (userCoordinates: ICoordinate, db: any) => {
  if (isEmpty(db)) {
    const error = {
      message: "No db connection",
      status: 500,
    };
    throw error;
  }

  let nearest = await Car.aggregate([
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
      nearest = nearest.reduce((previous: any, current: any) => {
         return current.isNear.distance < previous.isNear.distance ? current : previous;
      });
      return nearest
};

export const getAvailableCar = async (data: any, db: any) => {
  if (isEmpty(db)) {
    const error = {
      message: "No db connection",
      status: 500,
    };
    throw error;
  }
  let tags: string ;
  tags = data.tags? data.tags.split(",") : '';
  const r = Car.aggregate([
        {
          $match: {
            $expr: {
              $and: [
                {
                  $eq: [`$${data.criteria}`, data.value],
                }
              ],
            },
          },
        },

        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "id",
            as: "categories",
          },
        },
        {
          $lookup: {
            from: "tags",
            localField: "tag",
            foreignField: "id",
            as: "tags",
          },
        },   
         { '$facet'    : {
            metadata: [ { $count: "total" }, { $addFields: { page: data.page } } ],
            data: [ { $skip: data.rows }, { $limit: data.rows } ] 
        } }
      ]).sort({ createdDate: 1 })
      .skip(data.page)
      .limit(data.rows + data.page)
      
      return r;
};
