import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

import { updateTextBlockSchema, updateTableBlockSchema } from "../models/Page";
import { HttpError } from "shared/helpers";

export const validateUpdateBlockBody = (req: Request, _: Response, next: NextFunction) => {
  const { type } = req.params;
  let schema: ObjectSchema<unknown>;

  switch (type) {
    case "text":
      schema = updateTextBlockSchema;
      break;
    case "table":
      schema = updateTableBlockSchema;
      break;
    default:
      return next();
  }

  const { error } = schema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }

  next();
};
