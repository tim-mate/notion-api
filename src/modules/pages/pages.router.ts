import express from "express";

import { validateBody, authenticate } from "../../shared/middlewares";
import { ctrlWrapper } from "../../shared/helpers";
import { updateStatusSchema, renameSchema, addBlockSchema } from "./models/Page.js";
import { isValidId, isValidType, validateUpdateBlockBody } from "./middlewares";
import PageController from "./pages.controller.js";

const pagesRouter = express.Router();

pagesRouter.get("/", authenticate, ctrlWrapper(PageController.getAll));

pagesRouter.get("/:id", authenticate, isValidId, ctrlWrapper(PageController.getOne));

pagesRouter.post("/", authenticate, ctrlWrapper(PageController.add));

pagesRouter.delete("/:id", authenticate, isValidId, ctrlWrapper(PageController.delete));

pagesRouter.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(updateStatusSchema),
  ctrlWrapper(PageController.updateStatus),
);

pagesRouter.patch(
  "/:id/title",
  authenticate,
  isValidId,
  validateBody(renameSchema),
  ctrlWrapper(PageController.rename),
);

pagesRouter.post(
  "/:id/blocks",
  authenticate,
  isValidId,
  validateBody(addBlockSchema),
  ctrlWrapper(PageController.addBlock),
);

pagesRouter.delete("/:pageId/blocks/:blockId", authenticate, isValidId, ctrlWrapper(PageController.deleteBlock));

pagesRouter.patch(
  "/:pageId/blocks/:blockId/:type",
  authenticate,
  isValidId,
  isValidType,
  validateUpdateBlockBody,
  ctrlWrapper(PageController.updateBlock),
);

export default pagesRouter;
