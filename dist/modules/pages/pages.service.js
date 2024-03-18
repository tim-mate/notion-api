"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../../shared/types");
const helpers_1 = require("../../shared/helpers");
const Page_js_1 = require("./models/Page.js");
const createPayload_js_1 = require("./helpers/createPayload.js");
class PageService {
    pagesRepository;
    constructor(pagesRepository) {
        this.pagesRepository = pagesRepository;
    }
    getAll(owner, page, limit, favorite) {
        const filter = favorite ? { owner, favorite } : { owner };
        const options = limit ? { skip: limit * (page - 1), limit } : {};
        return this.pagesRepository.find(filter, {}, options);
    }
    async getOne(id) {
        const page = await this.pagesRepository.findById(id);
        if (!page) {
            throw (0, helpers_1.HttpError)(types_1.HttpStatus.NotFound);
        }
        return page;
    }
    add(owner) {
        return this.pagesRepository.create({ owner });
    }
    async delete(id) {
        const deletedPage = await this.pagesRepository.findByIdAndDelete(id);
        if (!deletedPage) {
            throw (0, helpers_1.HttpError)(types_1.HttpStatus.NotFound);
        }
        return deletedPage;
    }
    async updateStatus(id, favorite) {
        const updatedPage = await this.pagesRepository.findByIdAndUpdate(id, { favorite }, { new: true });
        if (!updatedPage) {
            throw (0, helpers_1.HttpError)(types_1.HttpStatus.NotFound);
        }
        return updatedPage;
    }
    async rename(id, title) {
        const updatedPage = await this.pagesRepository.findByIdAndUpdate(id, { title }, { new: true });
        if (!updatedPage) {
            throw (0, helpers_1.HttpError)(types_1.HttpStatus.NotFound);
        }
        return updatedPage;
    }
    async addBlock(id, type) {
        const page = await this.pagesRepository.findById(id);
        if (!page) {
            throw (0, helpers_1.HttpError)(types_1.HttpStatus.NotFound);
        }
        const payload = (0, createPayload_js_1.createPayload)(type);
        const newBlock = { type, payload };
        page.blocks.push(newBlock);
        const updatedPage = await page.save();
        return updatedPage;
    }
    async updateBlock(pageId, blockId, payload) {
        const page = await this.pagesRepository.findById(pageId);
        if (!page) {
            throw (0, helpers_1.HttpError)(types_1.HttpStatus.NotFound);
        }
        const block = page.blocks.id(blockId);
        if (!block) {
            throw (0, helpers_1.HttpError)(types_1.HttpStatus.NotFound);
        }
        block.payload = { ...block.payload, ...payload };
        const updatedPage = await page.save();
        return updatedPage;
    }
    async deleteBlock(pageId, blockId) {
        const page = await this.pagesRepository.findById(pageId);
        if (!page) {
            throw (0, helpers_1.HttpError)(types_1.HttpStatus.NotFound);
        }
        const block = page.blocks.id(blockId);
        if (!block) {
            throw (0, helpers_1.HttpError)(types_1.HttpStatus.NotFound);
        }
        block.deleteOne();
        const updatedPage = await page.save();
        return updatedPage;
    }
}
exports.default = new PageService(Page_js_1.Page);
//# sourceMappingURL=pages.service.js.map