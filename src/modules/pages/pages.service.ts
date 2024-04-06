import { Types } from "mongoose";

import { HttpStatus } from "../../shared/types";
import { HttpError } from "../../shared/helpers";
import { BlockTypeAlias, BlockTypeEnum, BlockPayload } from "./types";
import { Page } from "./models/Page.js";
import { createPayload } from "./helpers/createPayload.js";

class PageService {
  constructor(private pagesRepository: typeof Page) {}

  getAll(owner: Types.ObjectId, page: number, limit: number, favorite: string | null) {
    const filter = favorite ? { owner, favorite } : { owner };
    const options = limit ? { skip: limit * (page - 1), limit } : {};

    return this.pagesRepository.find(filter, {}, options);
  }

  async getOne(id: Types.ObjectId) {
    const page = await this.pagesRepository.findById(id);
    if (!page) {
      throw HttpError(HttpStatus.NotFound);
    }

    return page;
  }

  async add(owner: Types.ObjectId) {
    const page = await this.pagesRepository.create({ owner });
    const pageWithBlock = await this.addBlock(page._id, BlockTypeEnum.Text);

    return pageWithBlock;
  }

  async delete(id: Types.ObjectId) {
    const deletedPage = await this.pagesRepository.findByIdAndDelete(id);
    if (!deletedPage) {
      throw HttpError(HttpStatus.NotFound);
    }

    return deletedPage;
  }

  async updateStatus(id: Types.ObjectId, favorite: boolean) {
    const updatedPage = await this.pagesRepository.findByIdAndUpdate(id, { favorite }, { new: true });
    if (!updatedPage) {
      throw HttpError(HttpStatus.NotFound);
    }

    return updatedPage;
  }

  async rename(id: Types.ObjectId, title: string) {
    const updatedPage = await this.pagesRepository.findByIdAndUpdate(id, { title }, { new: true });
    if (!updatedPage) {
      throw HttpError(HttpStatus.NotFound);
    }

    return updatedPage;
  }

  async addBlock(id: Types.ObjectId, type: BlockTypeAlias) {
    const page = await this.pagesRepository.findById(id);
    if (!page) {
      throw HttpError(HttpStatus.NotFound);
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
      throw HttpError(HttpStatus.NotFound);
    }

    const block = page.blocks.id(blockId);
    if (!block) {
      throw HttpError(HttpStatus.NotFound);
    }

    block.payload = { ...block.payload, ...payload };
    const updatedPage = await page.save();
    return updatedPage;
  }

  async deleteBlock(pageId: Types.ObjectId, blockId: Types.ObjectId) {
    const page = await this.pagesRepository.findById(pageId);
    if (!page) {
      throw HttpError(HttpStatus.NotFound);
    }

    const block = page.blocks.id(blockId);
    if (!block) {
      throw HttpError(HttpStatus.NotFound);
    }

    block.deleteOne();
    const updatedPage = await page.save();
    return updatedPage;
  }
}

export default new PageService(Page);
