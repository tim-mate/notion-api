"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const pages_router_js_1 = __importDefault(require("./modules/pages/pages.router.js"));
const users_router_js_1 = __importDefault(require("./modules/users/users.router.js"));
const types_1 = require("./shared/types");
const middlewares_1 = require("./shared/middlewares");
const app = (0, express_1.default)();
const morganFormat = app.get("env") === "development" ? "dev" : "short";
app.use((0, morgan_1.default)(morganFormat));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/v1/pages", pages_router_js_1.default);
app.use("/api/v1/users", users_router_js_1.default);
app.use((_, res) => {
    res.status(types_1.HttpStatus.NotFound).json({ message: "Route is not found" });
});
app.use(middlewares_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map