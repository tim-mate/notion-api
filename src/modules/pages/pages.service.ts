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

  delete() {}

  updateStatus() {}
}

export default new PageService(Page);
