import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();

const morganFormat = app.get("env") === "development" ? "dev" : "short";

app.use(morgan(morganFormat));
app.use(cors());
app.use(express.json());

export default app;
