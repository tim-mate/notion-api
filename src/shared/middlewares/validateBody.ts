import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

import { HttpError } from "shared/helpers";

export const validateBody = (schema: ObjectSchema<unknown>) => {
  const fn = (req: Request, _: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }

    next();
  };

  return fn;
};
