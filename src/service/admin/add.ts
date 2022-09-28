import { isEmpty } from "lodash";
import { v4 as uuidv4 } from "uuid";

import { insert, findOne, updateById } from "../../utils/db.utils";

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
    const result = await insert(collection, data);
    return result;
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
  const tag = await findOne(collection, {
    name,
  });
  if (tag) {
    throw { message: "Category already exists", success: false };
  } else {
    const result = await insert(collection, data);
    return result;
  }
};
