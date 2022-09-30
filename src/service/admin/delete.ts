import { isEmpty } from "lodash";
import ICar from "../../interface/car";

import { findOne, removeById } from "../../utils/db.utils";

export const deleteTagServcie = async (id: string, db: any) => {
  if (isEmpty(db)) {
    const error = {
      message: "No db connection",
      status: 500,
    };
    throw error;
  }
  const collection = db.collection("tag");
  const tag: any = await findOne(collection, {
    id,
  });
  
  if (!tag) {
    throw { message: "No tag found", success: false };
  } else {
    const result = await removeById(collection, ((tag._id).toString()).split(" ")[0]);
    return result;
  }
};

export const deleteCategoryServcie = async (id: string, db: any) => {
  if (isEmpty(db)) {
    const error = {
      message: "No db connection",
      status: 500,
    };
    throw error;
  }
  const collection = db.collection("category");
  const category: any = await findOne(collection, {
    id,
  });
  if (!category) {
    throw { message: "No category found.", success: false };
  } else {
    const result = await removeById(collection, ((category._id).toString()).split(" ")[0]);
    return result;
  }
};

export const deleteCarServcie = async (id: string, db: any) => {
    if (isEmpty(db)) {
      const error = {
        message: "No db connection",
        status: 500,
      };
      throw error;
    }
    const collection = db.collection("cars");
    const car: any = await findOne(collection, {
      id,
    });
    if (!car) {
      throw { message: "No car found.", success: false };
    } else {
      const result = await removeById(collection, ((car._id).toString()).split(" ")[0]);
      return result;
    }
  };
