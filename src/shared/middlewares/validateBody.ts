import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

import { HttpStatus } from "../types";
import { HttpError } from "../helpers";

export const validateBody = (schema: ObjectSchema<unknown>) => {
  const fn = (req: Request, _: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(HttpStatus.BadRequest, error.message));
    }

    next();
  };

  return fn;
};
