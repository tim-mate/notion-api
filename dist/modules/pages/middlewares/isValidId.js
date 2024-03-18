"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidId = void 0;
const mongoose_1 = require("mongoose");
const types_1 = require("../../../shared/types");
const helpers_1 = require("../../../shared/helpers");
const isValidId = (req, _, next) => {
    const { id, pageId, blockId } = req.params;
    const ids = [id, pageId, blockId];
    ids.forEach((id) => {
        if (id && !(0, mongoose_1.isValidObjectId)(id)) {
            next((0, helpers_1.HttpError)(types_1.HttpStatus.BadRequest, `${id} is not a valid id`));
        }
    });
    next();
};
exports.isValidId = isValidId;
//# sourceMappingURL=isValidId.js.map