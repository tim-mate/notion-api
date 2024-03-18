import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

import { HttpStatus } from "../../../shared/types";
import { HttpError } from "../../../shared/helpers";
import { BlockTypeEnum, BlockTypeAlias } from "../types";
import { updateTextBlockSchema, updateTableBlockSchema } from "../models/Page.js";

export const validateUpdateBlockBody = (req: Request, _: Response, next: NextFunction) => {
  const { type }: { type?: BlockTypeAlias } = req.params;
  let schema: ObjectSchema<unknown>;

  switch (type) {
    case BlockTypeEnum.Text:
      schema = updateTextBlockSchema;
      break;
    case BlockTypeEnum.Table:
      schema = updateTableBlockSchema;
      break;
    default:
      return next();
  }

  const { error } = schema.validate(req.body);
  if (error) {
    throw HttpError(HttpStatus.BadRequest, error.message);
  }

  next();
};
