import express from "express";

import UserController from "./users.controller";
import { ctrlWrapper } from "helpers";

const usersRouter = express.Router();

usersRouter.post("/signup", ctrlWrapper(UserController.signup));

usersRouter.get("/verify/:verificationToken", ctrlWrapper(UserController.verifyEmail));

usersRouter.post("/verify", ctrlWrapper(UserController.resendVerificationEmail));

usersRouter.post("/login", ctrlWrapper(UserController.login));

usersRouter.post("/logout", ctrlWrapper(UserController.logout));

usersRouter.get("/current", ctrlWrapper(UserController.getCurrent));

export default usersRouter;
