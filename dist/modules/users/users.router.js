"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../../shared/middlewares");
const helpers_1 = require("../../shared/helpers");
2;
const User_js_1 = require("./models/User.js");
const users_controller_js_1 = __importDefault(require("./users.controller.js"));
const usersRouter = express_1.default.Router();
usersRouter.post("/signup", (0, middlewares_1.validateBody)(User_js_1.signupSchema), (0, helpers_1.ctrlWrapper)(users_controller_js_1.default.signup));
usersRouter.get("/verify/:verificationToken", (0, helpers_1.ctrlWrapper)(users_controller_js_1.default.verifyEmail));
usersRouter.post("/verify", (0, middlewares_1.validateBody)(User_js_1.verifyEmailSchema), (0, helpers_1.ctrlWrapper)(users_controller_js_1.default.resendVerificationEmail));
usersRouter.post("/login", (0, middlewares_1.validateBody)(User_js_1.loginSchema), (0, helpers_1.ctrlWrapper)(users_controller_js_1.default.login));
usersRouter.post("/logout", middlewares_1.authenticate, (0, helpers_1.ctrlWrapper)(users_controller_js_1.default.logout));
usersRouter.get("/current", middlewares_1.authenticate, (0, helpers_1.ctrlWrapper)(users_controller_js_1.default.getCurrent));
exports.default = usersRouter;
//# sourceMappingURL=users.router.js.map