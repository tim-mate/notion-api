import express from "express";
import morgan from "morgan";
import cors from "cors";

import pagesRouter from "modules/pages/pages.router";
import usersRouter from "modules/users/users.router";
import { errorHandler } from "shared/middlewares";

const app = express();

const morganFormat = app.get("env") === "development" ? "dev" : "short";

app.use(morgan(morganFormat));
app.use(cors());
app.use(express.json());

app.use("/api/v1/pages", pagesRouter);
app.use("/api/v1/users", usersRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route is not found" });
});

app.use(errorHandler);

export default app;
