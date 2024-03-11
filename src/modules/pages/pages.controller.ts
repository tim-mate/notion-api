import { Request, Response } from "express";
import PageService from "./pages.service";

class PageController {
  async getAll() {}

  async getOne() {}

  async add(req: Request, res: Response) {
    const { owner } = req.body;
    const createdPage = await PageService.add(owner);

    res.status(201).json(createdPage);
  }

  async delete() {}

  async updateStatus() {}
}

export default new PageController();
