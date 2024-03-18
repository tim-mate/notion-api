import { Response, NextFunction } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import { AuthenticatedRequest, HttpStatus } from "../types";
import { HttpError, ObjectID } from "../helpers";
import { User } from "../../modules/users/models/User.js";

dotenv.config();
const { SECRET_KEY } = process.env;

export const authenticate = async (req: AuthenticatedRequest, _: Response, next: NextFunction) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(HttpError(HttpStatus.Unauthorized));
  }

  try {
    const payload = jwt.verify(token, SECRET_KEY!);
    if (typeof payload !== "object" || !("id" in payload)) {
      return next(HttpError(HttpStatus.Unauthorized));
    }

    const user = await User.findById(ObjectID(payload.id));
    if (!user || !user.token || user.token !== token) {
      next(HttpError(HttpStatus.Unauthorized));
    }

    req.user = user;
    next();
  } catch (error) {
    next(HttpError(HttpStatus.Unauthorized));
  }
};
