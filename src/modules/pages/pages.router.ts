import express from "express";

import PageController from "./pages.controller";
import { isValidId } from "middlewares";
import { ctrlWrapper } from "helpers";

const pagesRouter = express.Router();

pagesRouter.get("/", ctrlWrapper(PageController.getAll));

pagesRouter.get("/:id", isValidId, ctrlWrapper(PageController.getOne));

pagesRouter.post("/", ctrlWrapper(PageController.add));

pagesRouter.delete("/:id", isValidId, ctrlWrapper(PageController.delete));

pagesRouter.patch("/:id/favorite", isValidId, ctrlWrapper(PageController.updateStatus));

export default pagesRouter;
