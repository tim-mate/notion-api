"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
const dotenv_1 = __importDefault(require("dotenv"));
const constants_1 = require("../constants");
dotenv_1.default.config();
const { SENDGRID_API_KEY } = process.env;
if (!SENDGRID_API_KEY) {
    console.error("Please provide SENDGRID_API_KEY in the environment variables");
    process.exit(1);
}
mail_1.default.setApiKey(SENDGRID_API_KEY);
const sendEmail = async (data) => {
    const email = { ...data, from: constants_1.COMPANY_EMAIL };
    await mail_1.default.send(email);
    return true;
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=sendEmail.js.map