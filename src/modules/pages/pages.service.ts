import { Types } from "mongoose";
import { Page } from "./models/Page";
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
}

export default new PageService(Page);
