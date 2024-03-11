import express from "express";

import PageController from "./pages.controller";

const pagesRouter = express.Router();

pagesRouter.get("/", PageController.getAll);

pagesRouter.get("/:id", PageController.getOne);

pagesRouter.post("/", PageController.add);

pagesRouter.delete("/:id", PageController.delete);

pagesRouter.patch("/:id/favorite", PageController.updateStatus);

export default pagesRouter;

