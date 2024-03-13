import { Request, Response, NextFunction } from "express";
import { isValidObjectId } from "mongoose";
import { HttpError } from "helpers";

export const isValidId = (req: Request, _: Response, next: NextFunction) => {
  const { id, pageId, blockId } = req.params;
  const ids = [id, pageId, blockId];

  ids.forEach((id) => {
    if (id && !isValidObjectId(id)) {
      next(HttpError(400, `${id} is not a valid id`));
    }
  });

  next();

  // if (id && !isValidObjectId(id)) {
  //   next(HttpError(400, `${id} is not a valid id`));
  // }

  // if (pageId && !isValidObjectId(pageId)) {
  //   next(HttpError(400, `${pageId} is not a valid id`));
  // }

  // if (blockId && !isValidObjectId(blockId)) {
  //   next(HttpError(400, `${blockId} is not a valid id`));
  // }

  // next();
};
