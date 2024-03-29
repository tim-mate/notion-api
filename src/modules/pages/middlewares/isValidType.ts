import { Request, Response, NextFunction } from "express";

import { HttpStatus } from "../../../shared/types";
import { HttpError } from "../../../shared/helpers";
import { BLOCK_TYPES } from "../constants";

export const isValidType = (req: Request, _: Response, next: NextFunction) => {
  const { type } = req.params;
  if (!BLOCK_TYPES.includes(type)) {
    next(HttpError(HttpStatus.BadRequest, `Type ${type} is not supported`));
  }

  next();
};
