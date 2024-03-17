import { createPayload } from "./helpers/createPayload";
import { Types } from "mongoose";

import { BlockType, BlockPayload } from "./types";
import { Page } from "./models/Page";
import { HttpError } from "shared/helpers";

class PageService {
  constructor(private pagesRepository: typeof Page) {}

  getAll() {
    return this.pagesRepository.find();
  }

  async getOne(id: Types.ObjectId) {
    const page = await this.pagesRepository.findById(id);
    if (!page) {
      throw HttpError(404);
    }

    return page;
  }

  add(owner: Types.ObjectId) {
    return this.pagesRepository.create({ owner });
  }

  async delete(id: Types.ObjectId) {
    const deletedPage = await this.pagesRepository.findByIdAndDelete(id);
    if (!deletedPage) {
      throw HttpError(404);
    }

    return deletedPage;
  }

  async updateStatus(id: Types.ObjectId, favorite: boolean) {
    const updatedPage = await this.pagesRepository.findByIdAndUpdate(id, { favorite }, { new: true });
    if (!updatedPage) {
      throw HttpError(404);
    }

    return updatedPage;
  }

  async rename(id: Types.ObjectId, title: string) {
    const updatedPage = await this.pagesRepository.findByIdAndUpdate(id, { title }, { new: true });
    if (!updatedPage) {
      throw HttpError(404);
    }

    return updatedPage;
  }

  async addBlock(id: Types.ObjectId, type: BlockType) {
    const page = await this.pagesRepository.findById(id);
    if (!page) {
      throw HttpError(404);
    }

    const payload = createPayload(type);
    const newBlock = { type, payload };
    page.blocks.push(newBlock);
    const updatedPage = await page.save();
    return updatedPage;
  }

  async updateBlock(pageId: Types.ObjectId, blockId: Types.ObjectId, payload: BlockPayload) {
    const page = await this.pagesRepository.findById(pageId);
    if (!page) {
      throw HttpError(404);
    }

    const block = page.blocks.id(blockId);
    if (!block) {
      throw HttpError(404);
    }

    block.payload = { ...block.payload, ...payload };
    const updatedPage = await page.save();
    return updatedPage;
  }

  async deleteBlock(pageId: Types.ObjectId, blockId: Types.ObjectId) {
    const page = await this.pagesRepository.findById(pageId);
    if (!page) {
      throw HttpError(404);
    }

    const block = page.blocks.id(blockId);
    if (!block) {
      throw HttpError(404);
    }

    block.deleteOne();
    const updatedPage = await page.save();
    return updatedPage;
  }
}

export default new PageService(Page);
