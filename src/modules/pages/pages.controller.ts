import { Types } from "mongoose";
import { Request, Response } from "express";
import PageService from "./pages.service";

class PageController {
  async getAll(_: Request, res: Response) {
    const pages = await PageService.getAll();

    res.json(pages);
  }

  async getOne(req: Request, res: Response) {
    const params = req.params;
    const id: unknown = params.id;
    const foundPage = await PageService.getOne(id as Types.ObjectId);

    res.json(foundPage);
  }

  async add(req: Request, res: Response) {
    const { owner } = req.body;
    const createdPage = await PageService.add(owner);

    res.status(201).json(createdPage);
  }

  async delete(req: Request, res: Response) {
    const params = req.params;
    const id: unknown = params.id;
    const deletedPage = await PageService.delete(id as Types.ObjectId);

    res.json(deletedPage);
  }

  async updateStatus() {}
}

export default new PageController();
