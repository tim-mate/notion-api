"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = void 0;
const types_1 = require("../types");
const helpers_1 = require("../helpers");
const validateBody = (schema) => {
    const fn = (req, _, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            next((0, helpers_1.HttpError)(types_1.HttpStatus.BadRequest, error.message));
        }
        next();
    };
    return fn;
};
exports.validateBody = validateBody;
//# sourceMappingURL=validateBody.js.map