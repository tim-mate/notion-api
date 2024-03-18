"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../../shared/types");
const helpers_1 = require("../../shared/helpers");
const pages_service_js_1 = __importDefault(require("./pages.service.js"));
class PageController {
    async getAll(req, res) {
        const user = req.user;
        if (!user) {
            throw (0, helpers_1.HttpError)(types_1.HttpStatus.Unauthorized);
        }
        const { page = 1, limit, favorite } = req.query;
        const pages = await pages_service_js_1.default.getAll(user._id, Number(page), Number(limit), String(favorite));
        res.json(pages);
    }
    async getOne(req, res) {
        const page = await pages_service_js_1.default.getOne((0, helpers_1.ObjectID)(req.params.id));
        res.json(page);
    }
    async add(req, res) {
        const user = req.user;
        if (!user) {
            throw (0, helpers_1.HttpError)(types_1.HttpStatus.Unauthorized);
        }
        const createdPage = await pages_service_js_1.default.add(user._id);
        res.status(types_1.HttpStatus.Created).json(createdPage);
    }
    async delete(req, res) {
        const deletedPage = await pages_service_js_1.default.delete((0, helpers_1.ObjectID)(req.params.id));
        res.json(deletedPage);
    }
    async updateStatus(req, res) {
        const { favorite } = req.body;
        const updatedPage = await pages_service_js_1.default.updateStatus((0, helpers_1.ObjectID)(req.params.id), favorite);
        res.json(updatedPage);
    }
    async rename(req, res) {
        const { title } = req.body;
        const updatedPage = await pages_service_js_1.default.rename((0, helpers_1.ObjectID)(req.params.id), title);
        res.json(updatedPage);
    }
    async addBlock(req, res) {
        const { type } = req.body;
        const updatedPage = await pages_service_js_1.default.addBlock((0, helpers_1.ObjectID)(req.params.id), type);
        res.status(types_1.HttpStatus.Created).json(updatedPage);
    }
    async updateBlock(req, res) {
        const { pageId, blockId } = req.params;
        const { payload } = req.body;
        const updatedPage = await pages_service_js_1.default.updateBlock((0, helpers_1.ObjectID)(pageId), (0, helpers_1.ObjectID)(blockId), payload);
        res.json(updatedPage);
    }
    async deleteBlock(req, res) {
        const { pageId, blockId } = req.params;
        const updatedPage = await pages_service_js_1.default.deleteBlock((0, helpers_1.ObjectID)(pageId), (0, helpers_1.ObjectID)(blockId));
        res.json(updatedPage);
    }
}
exports.default = new PageController();
//# sourceMappingURL=pages.controller.js.map