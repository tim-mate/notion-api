"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTableBlockSchema = exports.updateTextBlockSchema = exports.addBlockSchema = exports.renameSchema = exports.updateStatusSchema = exports.Page = void 0;
const mongoose_1 = require("mongoose");
const joi_1 = __importDefault(require("joi"));
const constants_1 = require("../constants");
const blockSchema = new mongoose_1.Schema({
    type: {
        type: String,
        enum: constants_1.BLOCK_TYPES,
        required: true,
    },
    payload: {
        type: mongoose_1.Schema.Types.Mixed,
        required: true,
    },
}, { versionKey: false, timestamps: true });
const pageSchema = new mongoose_1.Schema({
    title: {
        type: String,
        default: "Untitled",
    },
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    blocks: [blockSchema],
}, { versionKey: false, timestamps: true });
exports.Page = (0, mongoose_1.model)("Page", pageSchema);
exports.updateStatusSchema = joi_1.default.object({
    favorite: joi_1.default.boolean().required(),
});
exports.renameSchema = joi_1.default.object({
    title: joi_1.default.string().required(),
});
exports.addBlockSchema = joi_1.default.object({
    type: joi_1.default.string()
        .valid(...constants_1.BLOCK_TYPES)
        .required(),
});
exports.updateTextBlockSchema = joi_1.default.object({
    payload: joi_1.default.object({
        content: joi_1.default.string(),
        color: joi_1.default.string(),
        backgroundColor: joi_1.default.string(),
        bold: joi_1.default.boolean(),
        italic: joi_1.default.boolean(),
        underlined: joi_1.default.boolean(),
        strikethrough: joi_1.default.boolean(),
    })
        .required()
        .or("content", "color", "backgroundColor", "bold", "italic", "underlined", "strikethrough"),
});
exports.updateTableBlockSchema = joi_1.default.object({
    payload: joi_1.default.object({
        table: joi_1.default.array()
            .items(joi_1.default.array().items(joi_1.default.object({
            text: joi_1.default.string().allow(""),
            styles: joi_1.default.object(),
        })))
            .min(1),
        styles: joi_1.default.object({
            rows: joi_1.default.array().items(joi_1.default.object()),
            columns: joi_1.default.array().items(joi_1.default.object()),
        }),
        headerRow: joi_1.default.boolean(),
        headerColumn: joi_1.default.boolean(),
    })
        .required()
        .or("table", "styles", "headerRow", "headerColumn"),
});
//# sourceMappingURL=Page.js.map