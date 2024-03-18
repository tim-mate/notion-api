import mongoose from "mongoose";
import dotenv from "dotenv";

import app from "../app.js";

dotenv.config();
const { DB_HOST, PORT } = process.env;

if (!DB_HOST || !PORT) {
  console.error("Please provide DB_HOST and PORT in the environment variables");
  process.exit(1);
}

const startApp = async () => {
  try {
    await mongoose.connect(DB_HOST);
    console.log("Successful database connection");
    app.listen(PORT, () => {
      console.log(`Server is running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startApp();
