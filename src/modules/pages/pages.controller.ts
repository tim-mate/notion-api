import { Request, Response } from "express";

import { ObjectID } from "shared/helpers";
import { BlockType, BlockPayload } from "./types";
import PageService from "./pages.service";
import { AuthenticatedRequest } from "shared/types";
import { HttpError } from "shared/helpers";

class PageController {
  async getAll(req: AuthenticatedRequest, res: Response) {
    const user = req.user;
    if (!user) {
      throw HttpError(401);
    }

    const { page = 1, limit, favorite } = req.query;
    const pages = await PageService.getAll(user._id, Number(page), Number(limit), Boolean(favorite));
    res.json(pages);
  }

  async getOne(req: Request, res: Response) {
    const page = await PageService.getOne(ObjectID(req.params.id));
    res.json(page);
  }

  async add(req: AuthenticatedRequest, res: Response) {
    const user = req.user;
    if (!user) {
      throw HttpError(401);
    }

    const createdPage = await PageService.add(user._id);
    res.status(201).json(createdPage);
  }

  async delete(req: Request, res: Response) {
    const deletedPage = await PageService.delete(ObjectID(req.params.id));
    res.json(deletedPage);
  }

  async updateStatus(req: Request, res: Response) {
    const { favorite }: { favorite: boolean } = req.body;
    const updatedPage = await PageService.updateStatus(ObjectID(req.params.id), favorite);

    res.json(updatedPage);
  }

  async rename(req: Request, res: Response) {
    const { title }: { title: string } = req.body;
    const updatedPage = await PageService.rename(ObjectID(req.params.id), title);

    res.json(updatedPage);
  }

  async addBlock(req: Request, res: Response) {
    const { type }: { type: BlockType } = req.body;
    const updatedPage = await PageService.addBlock(ObjectID(req.params.id), type);

    res.status(201).json(updatedPage);
  }

  async updateBlock(req: Request, res: Response) {
    const { pageId, blockId } = req.params;
    const { payload }: { payload: BlockPayload } = req.body;
    const updatedPage = await PageService.updateBlock(ObjectID(pageId), ObjectID(blockId), payload);

    res.json(updatedPage);
  }

  async deleteBlock(req: Request, res: Response) {
    const { pageId, blockId } = req.params;
    const updatedPage = await PageService.deleteBlock(ObjectID(pageId), ObjectID(blockId));

    res.json(updatedPage);
  }
}

export default new PageController();
