"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.verifyEmailSchema = exports.signupSchema = exports.User = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: 6,
    },
    token: {
        type: String,
        default: null,
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        required: [true, "Verification token is required"],
        default: null,
    },
}, { versionKey: false, timestamps: true });
exports.User = (0, mongoose_1.model)("User", userSchema);
exports.signupSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    email: joi_1.default.string().required(),
    password: joi_1.default.string().min(6).required(),
});
exports.verifyEmailSchema = joi_1.default.object({
    email: joi_1.default.string().required(),
});
exports.loginSchema = joi_1.default.object({
    email: joi_1.default.string().required(),
    password: joi_1.default.string().min(6).required(),
});
//# sourceMappingURL=User.js.map