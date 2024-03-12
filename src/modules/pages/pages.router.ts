import express from "express";

import PageController from "./pages.controller";
import { updateStatusSchema } from "./models/Page";
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

export default pagesRouter;
