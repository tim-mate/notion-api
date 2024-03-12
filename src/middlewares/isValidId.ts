import { Request, Response, NextFunction } from "express";
import { isValidObjectId } from "mongoose";
import { HttpError } from "helpers";

export const isValidId = (req: Request, _: Response, next: NextFunction) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    next(HttpError(400, `${id} is not a valid id`));
  }

  next();
};
