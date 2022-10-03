import { isEmpty } from "lodash";
import mongoose from "mongoose";
import { tagSchema, categorySchema, carSchema } from "../../model/car.model";

const Tag: any = mongoose.model("Tag",tagSchema)
const Category: any = mongoose.model("Category",categorySchema)
const Car: any = mongoose.model("Car",carSchema)

export const deleteTagServcie = async (id: string, db: any) => {
  if (isEmpty(db)) {
    const error = {
      message: "No db connection",
      status: 500,
    };
    throw error;
  }
  const tag: any = await Tag.findOne({
    id,
  });
  
  if (!tag) {
    throw { message: "No tag found", success: false };
  } else {
    const result = await Tag.deleteOne(tag.id);
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
  const category: any = await Category.findOne({
    id,
  });
  
  if (!category) {
    throw { message: "No category found.", success: false };
  } else {
    const result = await Category.deleteOne(category.id);
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
    const car: any = await Car.findOne({
      id,
    });
    
    if (!car) {
      throw { message: "No car found.", success: false };
    } else {
      const result = await Car.deleteOne(car.id);
      return result;
    }
  };
