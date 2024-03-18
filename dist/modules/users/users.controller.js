"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../../shared/types");
const helpers_1 = require("../../shared/helpers");
const users_service_js_1 = __importDefault(require("./users.service.js"));
class UserController {
    async signup(req, res) {
        const newUser = await users_service_js_1.default.signup(req.body);
        res.status(types_1.HttpStatus.Created).json({
            user: { email: newUser.email },
        });
    }
    async verifyEmail(req, res) {
        await users_service_js_1.default.verifyEmail(req.params.verificationToken);
        res.json({
            message: "Email is successfully verified",
        });
    }
    async resendVerificationEmail(req, res) {
        await users_service_js_1.default.resendVerificationEmail(req.body.email);
        res.json({
            message: "Verification email was successfully sent",
        });
    }
    async login(req, res) {
        const { email } = req.body;
        const token = await users_service_js_1.default.login(req.body);
        res.json({
            token,
            user: {
                email,
            },
        });
    }
    async logout(req, res) {
        const { user } = req;
        if (!user) {
            throw (0, helpers_1.HttpError)(types_1.HttpStatus.Unauthorized);
        }
        await users_service_js_1.default.logout(user._id);
        res.status(types_1.HttpStatus.NoContent).send();
    }
    async getCurrent(req, res) {
        const { user } = req;
        if (!user) {
            throw (0, helpers_1.HttpError)(types_1.HttpStatus.Unauthorized);
        }
        res.json({
            user: {
                email: user.email,
            },
        });
    }
}
exports.default = new UserController();
//# sourceMappingURL=users.controller.js.map