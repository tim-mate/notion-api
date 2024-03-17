import { Request } from "express";
import { Types, Document } from "mongoose";
import { IUser } from "modules/users/models/User";

export interface CustomError extends Error {
  status?: number;
  code?: number;
}

export type UserDocument =
  | (Document<unknown, object, IUser> &
      IUser & {
        _id: Types.ObjectId;
      })
  | null;

export interface AuthenticatedRequest extends Request {
  user?: UserDocument;
}
