import { Types } from "mongoose";
import { Page } from "./models/Page";

class PageService {
  public pagesRepository;

  constructor(pageModel: typeof Page) {
    this.pagesRepository = pageModel;
  }

  getAll() {
    return this.pagesRepository.find();
  }

  getOne() {}

  add(owner: Types.ObjectId) {
    return this.pagesRepository.create({ owner });
  }

  delete() {}

  updateStatus() {}
}

export default new PageService(Page);
