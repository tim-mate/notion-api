import { Request, Response } from "express";

import { AuthenticatedRequest, HttpStatus } from "shared/types";
import { HttpError, ObjectID } from "shared/helpers";
import { BlockTypeAlias, BlockPayload } from "./types";
import PageService from "./pages.service";

class PageController {
  async getAll(req: AuthenticatedRequest, res: Response) {
    const user = req.user;
    if (!user) {
      throw HttpError(HttpStatus.Unauthorized);
    }

    const { page = 1, limit, favorite } = req.query;
    const pages = await PageService.getAll(user._id, Number(page), Number(limit), String(favorite));

    res.json(pages);
  }

  async getOne(req: Request, res: Response) {
    const page = await PageService.getOne(ObjectID(req.params.id));
    res.json(page);
  }

  async add(req: AuthenticatedRequest, res: Response) {
    const user = req.user;
    if (!user) {
      throw HttpError(HttpStatus.Unauthorized);
    }

    const createdPage = await PageService.add(user._id);
    res.status(HttpStatus.Created).json(createdPage);
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
    const { type }: { type: BlockTypeAlias } = req.body;
    const updatedPage = await PageService.addBlock(ObjectID(req.params.id), type);

    res.status(HttpStatus.Created).json(updatedPage);
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
