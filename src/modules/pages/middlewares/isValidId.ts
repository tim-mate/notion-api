import { Request, Response, NextFunction } from "express";
import { isValidObjectId } from "mongoose";

import { HttpStatus } from "shared/types";
import { HttpError } from "shared/helpers";

export const isValidId = (req: Request, _: Response, next: NextFunction) => {
  const { id, pageId, blockId } = req.params;
  const ids = [id, pageId, blockId];

  ids.forEach((id) => {
    if (id && !isValidObjectId(id)) {
      next(HttpError(HttpStatus.BadRequest, `${id} is not a valid id`));
    }
  });

  next();
};
