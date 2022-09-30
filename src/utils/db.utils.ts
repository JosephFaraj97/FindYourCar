import { isEmpty } from "lodash";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";

export const insert = (collection: any, body: any) => {
  if (isEmpty(collection)) throw { message: "Missing Collection", status: 500 };
  if (isEmpty(body)) throw { message: "Missing Body", status: 500 };

  return new Promise((resolve, reject) => {
    collection.insertOne(body, {}, (error: any, result: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

export const findById = (collection: any, id: string) => {
  if (isEmpty(collection)) throw { message: "Missing Collection", status: 500 };
  if (isEmpty(id)) throw { message: "Missing id", status: 500 };

  if (!mongoose.isValidObjectId(id)) {
    return null;
  }

  return new Promise((resolve, reject) => {
    collection.findOne({ _id: new ObjectId(id) }, (error: any, result: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

export const findOne = (collection: any, query: any) => {
  if (isEmpty(collection)) throw { message: "Missing Collection", status: 500 };
  if (isEmpty(query)) throw { message: "Missing query", status: 500 };

  return new Promise((resolve, reject) => {
    collection.findOne(query, (error: any, result: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

export const updateById = (collection: any, id: string, body: any) => {
  if (isEmpty(collection)) throw { message: "Missing Collection", status: 500 };
  if (isEmpty(id)) throw { message: "Missing id", status: 500 };
  if (isEmpty(body)) throw { message: "Missing Body", status: 500 };

  return new Promise((resolve, reject) => {
    collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: body || {},
      },
      (error: any, result: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

export const removeById = (collection: any, id: string) => {
  if (isEmpty(collection)) throw { message: "Missing Collection", status: 500 };
  if (isEmpty(id)) throw { message: "Missing id", status: 500 };

  return new Promise((resolve, reject) => {
    collection.deleteOne(
      { _id: new ObjectId(id) },
      (error: any, result: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.deletedCount === 1);
        }
      }
    );
  });
};

export const find = (collection: any, params: any, sort = {}, includeFields = {}) => {
    if (isEmpty(collection)) throw { message: "Missing Collection", status: 500 };
  
    return new Promise((resolve, reject) => {
        collection
          .find(params, includeFields)
          .sort(sort)
          .toArray((error: any, result: any) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          });
      });
  };
