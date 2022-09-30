import { isEmpty } from "lodash";
import { v4 as uuidv4 } from "uuid";
import ICar from "../../interface/car";

import { insert, findOne, find } from "../../utils/db.utils";

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
  const collection = db.collection("tag");
  const tag = await findOne(collection, {
    name,
  });
  if (tag) {
    throw { message: "tag already exists", success: false };
  } else {
    await insert(collection, data);
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
  const collection = db.collection("category");
  const category = await findOne(collection, {
    name,
  });
  if (category) {
    throw { message: "Category already exists", success: false };
  } else {
    await insert(collection, data);
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
  const collectionTag = db.collection("tag");
  const tag: any = await find(collectionTag, {});

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
  const collectionCategory = db.collection("category");
  const category = await findOne(collectionCategory, {
    id: data.category,
  });
  if (!category) {
    const error = {
      message: "Please entre a valid category",
      status: 400,
    };
    throw error;
  }
  const collection = db.collection("cars");
  const car = await findOne(collection, {
    id: data.id,
  });
  if (car) {
    throw { message: "car already exists", success: false };
  } else {
    data.id = uuidv4();
    data.createdDate = new Date();
    console.log(data.createdDate);
    await insert(collection, data);
    return data;
  }
};
