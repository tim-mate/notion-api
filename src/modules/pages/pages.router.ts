import express from "express";

import { updateStatusSchema, renameSchema, addBlockSchema } from "./models/Page";
import PageController from "./pages.controller";
import { isValidId, isValidType, validateBody, validateUpdateBlockBody } from "middlewares";
import { ctrlWrapper } from "helpers";

const pagesRouter = express.Router();

pagesRouter.get("/", ctrlWrapper(PageController.getAll));

pagesRouter.get("/:id", isValidId, ctrlWrapper(PageController.getOne));

pagesRouter.post("/", ctrlWrapper(PageController.add));

pagesRouter.delete("/:id", isValidId, ctrlWrapper(PageController.delete));

pagesRouter.patch(
  "/:id/favorite",
  isValidId,
  validateBody(updateStatusSchema),
  ctrlWrapper(PageController.updateStatus),
);

pagesRouter.patch("/:id/title", isValidId, validateBody(renameSchema), ctrlWrapper(PageController.rename));

pagesRouter.post("/:id/blocks", isValidId, validateBody(addBlockSchema), ctrlWrapper(PageController.addBlock));

pagesRouter.delete("/:pageId/blocks/:blockId", ctrlWrapper(PageController.deleteBlock));

pagesRouter.patch(
  "/:pageId/blocks/:blockId/:type",
  isValidId,
  isValidType,
  validateUpdateBlockBody,
  ctrlWrapper(PageController.updateBlock),
);

export default pagesRouter;
