import { Types } from "mongoose";

import { BlockType } from "types";
import { Page, BlockPayload } from "./models/Page";
import { HttpError } from "helpers";

class PageService {
  public pagesRepository;

  constructor(pageModel: typeof Page) {
    this.pagesRepository = pageModel;
  }

  getAll() {
    return this.pagesRepository.find();
  }

  async getOne(id: Types.ObjectId) {
    const foundPage = await this.pagesRepository.findById(id);
    if (!foundPage) {
      throw HttpError(404);
    }

    return foundPage;
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

  // async updateStatus(id: Types.ObjectId, newStatus: { favorite: boolean }) {
  //   const updatedPage = await this.pagesRepository.findByIdAndUpdate(id, newStatus, { new: true });
  //   if (!updatedPage) {
  //     throw HttpError(404);
  //   }

  //   return updatedPage;
  // }

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

    let payload;

    switch (type) {
      case "text":
        payload = {
          content: "",
          color: "black",
          backgroundColor: "white",
          bold: false,
          italic: false,
          underlined: false,
          strikethrough: false,
        };
        break;

      default:
        payload = { content: "" };
    }

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

    const blockIndex = page.blocks.findIndex((block) => block._id.equals(blockId));
    if (blockIndex === -1) {
      throw HttpError(404);
    }

    const block = page.blocks[blockIndex];
    block.payload = { ...block.payload, ...payload };
    const updatedPage = await page.save();
    return updatedPage;
  }
}

export default new PageService(Page);
