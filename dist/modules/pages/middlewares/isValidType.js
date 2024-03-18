"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidType = void 0;
const types_1 = require("../../../shared/types");
const helpers_1 = require("../../../shared/helpers");
const constants_1 = require("../constants");
const isValidType = (req, _, next) => {
    const { type } = req.params;
    if (!constants_1.BLOCK_TYPES.includes(type)) {
        next((0, helpers_1.HttpError)(types_1.HttpStatus.BadRequest, `Type ${type} is not supported`));
    }
    next();
};
exports.isValidType = isValidType;
//# sourceMappingURL=isValidType.js.map