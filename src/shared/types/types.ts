import { Request } from "express";
import { Types, Document } from "mongoose";

import { IUser } from "modules/users/models/User";

export interface CustomError extends Error {
  status?: number;
}

export enum HttpStatus {
  Created = 201,
  NoContent = 204,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  Conflict = 409,
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
