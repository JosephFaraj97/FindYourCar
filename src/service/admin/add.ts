import { isEmpty } from "lodash";
import { v4 as uuidv4 } from "uuid";
import ICar from "../../interface/car";

import { insert, findOne, find } from "../../utils/testdb.utils";
import { tagSchema, carSchema, categorySchema } from "../../model/car.model";
import mongoose from "mongoose";

const Tag = mongoose.model("tags",tagSchema)
const Category = mongoose.model("categories",categorySchema)
const Car = mongoose.model("cars",carSchema)


export const addTagServcie = async (name: string, db: any) => {
  if (isEmpty(db)) {
    const error = {
      message: "No db connection",
      status: 500,
    };
    throw error;
  }
  const data = {
    id: uuidv4(),
    name,
  };
  const tagToSaveToMongo = new Tag(data);
  const tag = await Tag.findOne({
    name,
  });
  if (tag) {
    throw { message: "tag already exists", success: false };
  } else {
    await tagToSaveToMongo.save();
    return data;
  }
};

export const addCategoryServcie = async (name: string, db: any) => {
  if (isEmpty(db)) {
    const error = {
      message: "No db connection",
      status: 500,
    };
    throw error;
  }
  const data = {
    id: uuidv4(),
    name,
  };
  const categoryToSaveToMongo = new Category(data);
  const category = await Category.findOne({
    name,
  });
  if (category) {
    throw { message: "Category already exists", success: false };
  } else {
    await categoryToSaveToMongo.save();
    return data;
  }
};

export const addCarServcie = async (data: ICar, db: any) => {
  if (isEmpty(db)) {
    const error = {
      message: "No db connection",
      status: 500,
    };
    throw error;
  }
  if (!data.image) {
    const error = {
      message: "Car should have at least one image",
      status: 400,
    };
    throw error;
  }
  let tagsArray: string[] = [];
  const tag: any = await Tag.find({});

  tag.forEach((element: any) => {
    tagsArray.push(element.id);
  });
  const allFounded = (data.tag).every( value => tagsArray.includes(value) );
  if(!allFounded){
    const error = {
        message: "Please entre a valid tag",
        status: 400,
      };
      throw error;
  }
  const category = await Category.findOne({
    id: data.category,
  });
  if (!category) {
    const error = {
      message: "Please entre a valid category",
      status: 400,
    };
    throw error;
  }

  data.id = uuidv4();
  const car = await Car.findOne({
    id: data.id,
  });

  const carToSaveToMongo = new Car(data);
  if (car) {
    throw { message: "car already exists", success: false };
  } else {
    data.id = uuidv4();
    data.createdDate = new Date();
    await carToSaveToMongo.save();
    return data;
  }
};
