import express from "express";

import PageController from "./pages.controller";
import { ctrlWrapper } from "helpers";

const pagesRouter = express.Router();

pagesRouter.get("/", ctrlWrapper(PageController.getAll));

pagesRouter.get("/:id", ctrlWrapper(PageController.getOne));

pagesRouter.post("/", ctrlWrapper(PageController.add));

pagesRouter.delete("/:id", ctrlWrapper(PageController.delete));

pagesRouter.patch("/:id/favorite", ctrlWrapper(PageController.updateStatus));

export default pagesRouter;
