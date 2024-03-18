import { Types, isValidObjectId } from "mongoose";

export const ObjectID = (id: string): Types.ObjectId => {
  if (!isValidObjectId(id)) {
    throw new Error(`${id} is not a valid id`);
  }

  return new Types.ObjectId(id);
};
