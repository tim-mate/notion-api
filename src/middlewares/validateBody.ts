import { Request, Response, NextFunction } from "express";
import { HttpError } from "helpers";

interface JoiSchema {
  validate: (body: unknown) => { error?: { message: string } };
}

export const validateBody = (schema: JoiSchema) => {
  const fn = (req: Request, _: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }

    next();
  };

  return fn;
};
