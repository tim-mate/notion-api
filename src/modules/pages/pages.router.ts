import express from "express";

import PageController from "./pages.controller";
import { updateStatusSchema, renameSchema, addBlockSchema, updateBlockSchema } from "./models/Page";
import { isValidId, validateBody } from "middlewares";
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

pagesRouter.patch(
  "/:pageId/blocks/:blockId",
  isValidId,
  validateBody(updateBlockSchema),
  ctrlWrapper(PageController.updateBlock),
);

// pagesRouter.delete("/:pageId/blocks/:blockId", ctrlWrapper(PageController.deleteBlock));

export default pagesRouter;
