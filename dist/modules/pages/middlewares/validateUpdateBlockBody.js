"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateBlockBody = void 0;
const types_1 = require("../../../shared/types");
const helpers_1 = require("../../../shared/helpers");
const types_2 = require("../types");
const Page_js_1 = require("../models/Page.js");
const validateUpdateBlockBody = (req, _, next) => {
    const { type } = req.params;
    let schema;
    switch (type) {
        case types_2.BlockTypeEnum.BigHeading:
        case types_2.BlockTypeEnum.MediumHeading:
        case types_2.BlockTypeEnum.SmallHeading:
        case types_2.BlockTypeEnum.Text:
            schema = Page_js_1.updateTextBlockSchema;
            break;
        case types_2.BlockTypeEnum.Table:
            schema = Page_js_1.updateTableBlockSchema;
            break;
        default:
            return next();
    }
    const { error } = schema.validate(req.body);
    if (error) {
        throw (0, helpers_1.HttpError)(types_1.HttpStatus.BadRequest, error.message);
    }
    next();
};
exports.validateUpdateBlockBody = validateUpdateBlockBody;
//# sourceMappingURL=validateUpdateBlockBody.js.map