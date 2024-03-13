import { Types } from "mongoose";
import { Request, Response } from "express";

import PageService from "./pages.service";
import { BlockType } from "types";

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

  async updateStatus(req: Request, res: Response) {
    const { favorite }: { favorite: boolean } = req.body;
    const params = req.params;
    const id: unknown = params.id;
    const updatedPage = await PageService.updateStatus(id as Types.ObjectId, favorite);

    res.json(updatedPage);
  }

  // async updateStatus(req: Request, res: Response) {
  //   const params = req.params;
  //   const id: unknown = params.id;
  //   const updatedPage = await PageService.updateStatus(id as Types.ObjectId, req.body);

  //   res.json(updatedPage);
  // }

  async rename(req: Request, res: Response) {
    const params = req.params;
    const id: unknown = params.id;
    const { title }: { title: string } = req.body;
    const updatedPage = await PageService.rename(id as Types.ObjectId, title);

    res.json(updatedPage);
  }

  async addBlock(req: Request, res: Response) {
    const params = req.params;
    const id: unknown = params.id;
    const { type }: { type: BlockType } = req.body;
    const updatedPage = await PageService.addBlock(id as Types.ObjectId, type);

    res.status(201).json(updatedPage);
  }
}

export default new PageController();
