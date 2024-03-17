import { Types } from "mongoose";

export const ObjectID = (id: string): Types.ObjectId => new Types.ObjectId(id);
