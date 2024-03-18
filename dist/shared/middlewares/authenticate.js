"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const types_1 = require("../types");
const helpers_1 = require("../helpers");
const User_js_1 = require("../../modules/users/models/User.js");
dotenv_1.default.config();
const { SECRET_KEY } = process.env;
const authenticate = async (req, _, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
        next((0, helpers_1.HttpError)(types_1.HttpStatus.Unauthorized));
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        if (typeof payload !== "object" || !("id" in payload)) {
            return next((0, helpers_1.HttpError)(types_1.HttpStatus.Unauthorized));
        }
        const user = await User_js_1.User.findById((0, helpers_1.ObjectID)(payload.id));
        if (!user || !user.token || user.token !== token) {
            next((0, helpers_1.HttpError)(types_1.HttpStatus.Unauthorized));
        }
        req.user = user;
        next();
    }
    catch (error) {
        next((0, helpers_1.HttpError)(types_1.HttpStatus.Unauthorized));
    }
};
exports.authenticate = authenticate;
//# sourceMappingURL=authenticate.js.map