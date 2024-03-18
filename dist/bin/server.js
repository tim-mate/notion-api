"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const app_js_1 = __importDefault(require("../app.js"));
dotenv_1.default.config();
const { DB_HOST, PORT } = process.env;
if (!DB_HOST || !PORT) {
    console.error("Please provide DB_HOST and PORT in the environment variables");
    process.exit(1);
}
const startApp = async () => {
    try {
        await mongoose_1.default.connect(DB_HOST);
        console.log("Successful database connection");
        app_js_1.default.listen(PORT, () => {
            console.log(`Server is running. Use our API on port: ${PORT}`);
        });
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
};
startApp();
//# sourceMappingURL=server.js.map