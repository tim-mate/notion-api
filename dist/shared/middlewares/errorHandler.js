"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (err, _req, res, _next) => {
    const { status = 500, message = "Server error" } = err;
    res.status(status).json({ message });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map