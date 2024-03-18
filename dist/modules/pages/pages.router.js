"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../../shared/middlewares");
const helpers_1 = require("../../shared/helpers");
const Page_js_1 = require("./models/Page.js");
const middlewares_2 = require("./middlewares");
const pages_controller_js_1 = __importDefault(require("./pages.controller.js"));
const pagesRouter = express_1.default.Router();
pagesRouter.get("/", middlewares_1.authenticate, (0, helpers_1.ctrlWrapper)(pages_controller_js_1.default.getAll));
pagesRouter.get("/:id", middlewares_1.authenticate, middlewares_2.isValidId, (0, helpers_1.ctrlWrapper)(pages_controller_js_1.default.getOne));
pagesRouter.post("/", middlewares_1.authenticate, (0, helpers_1.ctrlWrapper)(pages_controller_js_1.default.add));
pagesRouter.delete("/:id", middlewares_1.authenticate, middlewares_2.isValidId, (0, helpers_1.ctrlWrapper)(pages_controller_js_1.default.delete));
pagesRouter.patch("/:id/favorite", middlewares_1.authenticate, middlewares_2.isValidId, (0, middlewares_1.validateBody)(Page_js_1.updateStatusSchema), (0, helpers_1.ctrlWrapper)(pages_controller_js_1.default.updateStatus));
pagesRouter.patch("/:id/title", middlewares_1.authenticate, middlewares_2.isValidId, (0, middlewares_1.validateBody)(Page_js_1.renameSchema), (0, helpers_1.ctrlWrapper)(pages_controller_js_1.default.rename));
pagesRouter.post("/:id/blocks", middlewares_1.authenticate, middlewares_2.isValidId, (0, middlewares_1.validateBody)(Page_js_1.addBlockSchema), (0, helpers_1.ctrlWrapper)(pages_controller_js_1.default.addBlock));
pagesRouter.delete("/:pageId/blocks/:blockId", middlewares_1.authenticate, middlewares_2.isValidId, (0, helpers_1.ctrlWrapper)(pages_controller_js_1.default.deleteBlock));
pagesRouter.patch("/:pageId/blocks/:blockId/:type", middlewares_1.authenticate, middlewares_2.isValidId, middlewares_2.isValidType, middlewares_2.validateUpdateBlockBody, (0, helpers_1.ctrlWrapper)(pages_controller_js_1.default.updateBlock));
exports.default = pagesRouter;
//# sourceMappingURL=pages.router.js.map