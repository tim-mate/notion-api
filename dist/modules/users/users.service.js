"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const uuid_1 = require("uuid");
const types_1 = require("../../shared/types");
const helpers_1 = require("../../shared/helpers");
const User_js_1 = require("./models/User.js");
const helpers_2 = require("./helpers");
dotenv_1.default.config();
const { BASE_URL, SECRET_KEY, SALT_ROUNDS, TOKEN_TTL } = process.env;
if (!BASE_URL || !SECRET_KEY || !SALT_ROUNDS || !TOKEN_TTL) {
    console.error("Please provide the required environment variables");
    process.exit(1);
}
class UserService {
    usersRepository;
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async signup(data) {
        const { email, password } = data;
        const user = await this.usersRepository.findOne({ email });
        if (user) {
            throw (0, helpers_1.HttpError)(types_1.HttpStatus.Conflict, "Email is already in use");
        }
        const salt = await bcrypt_1.default.genSalt(Number(SALT_ROUNDS));
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        const verificationToken = (0, uuid_1.v4)();
        const newUser = await this.usersRepository.create({ ...data, password: hashedPassword, verificationToken });
        const verificationEmail = {
            subject: "Verify email",
            to: email,
            html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click here to verify your email</a>`,
        };
        await (0, helpers_2.sendEmail)(verificationEmail);
        return newUser;
    }
    async verifyEmail(verificationToken) {
        const user = await this.usersRepository.findOne({ verificationToken });
        if (!user) {
            throw (0, helpers_1.HttpError)(types_1.HttpStatus.NotFound);
        }
        if (user.isEmailVerified) {
            throw (0, helpers_1.HttpError)(types_1.HttpStatus.BadRequest, "Verification has already been passed");
        }
        await this.usersRepository.findByIdAndUpdate(user._id, { verificationToken: null, isEmailVerified: true });
    }
    async resendVerificationEmail(email) {
        const user = await this.usersRepository.findOne({ email });
        if (!user) {
            throw (0, helpers_1.HttpError)(types_1.HttpStatus.NotFound);
        }
        if (user.isEmailVerified) {
            throw (0, helpers_1.HttpError)(types_1.HttpStatus.BadRequest, "Verification has already been passed");
        }
        const verificationEmail = {
            subject: "Verify email",
            to: email,
            html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click here to verify your email</a>`,
        };
        await (0, helpers_2.sendEmail)(verificationEmail);
    }
    async login(data) {
        const { email, password } = data;
        const user = await this.usersRepository.findOne({ email });
        if (!user) {
            throw (0, helpers_1.HttpError)(types_1.HttpStatus.Unauthorized, "Incorrect email or password");
        }
        if (!user.isEmailVerified) {
            throw (0, helpers_1.HttpError)(types_1.HttpStatus.Unauthorized, "Please, verify your email");
        }
        const isPasswordCorrect = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordCorrect) {
            throw (0, helpers_1.HttpError)(types_1.HttpStatus.Unauthorized, "Incorrect email or password");
        }
        const payload = {
            id: user._id,
        };
        const token = jsonwebtoken_1.default.sign(payload, SECRET_KEY, { expiresIn: TOKEN_TTL });
        await this.usersRepository.findByIdAndUpdate(user._id, { token });
        return token;
    }
    async logout(id) {
        await this.usersRepository.findByIdAndUpdate(id, { token: null });
    }
}
exports.default = new UserService(User_js_1.User);
//# sourceMappingURL=users.service.js.map