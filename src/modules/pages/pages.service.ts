import { Page } from "./models/Page";

class PageService {
  public pagesRepository;

  constructor(pageModel: typeof Page) {
    this.pagesRepository = pageModel;
  }

  async getAll() {}

  async getOne() {}

  async add() {}

  async delete() {}

  async updateStatus() {}
}

export default new PageService(Page);
