import { Response, NextFunction } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import { User } from "modules/users/models/User";
import { HttpError, ObjectID } from "../helpers";
import { AuthenticatedRequest } from "shared/types";

dotenv.config();
const { SECRET_KEY } = process.env;

export const authenticate = async (req: AuthenticatedRequest, _: Response, next: NextFunction) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(HttpError(401));
  }

  try {
    const payload = jwt.verify(token, SECRET_KEY!);
    if (typeof payload !== "object" || !("id" in payload)) {
      return next(HttpError(401));
    }

    const user = await User.findById(ObjectID(payload.id));
    if (!user) {
      next(HttpError(401));
    }

    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401));
  }
};
