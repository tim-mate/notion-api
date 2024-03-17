import express from "express";

import { signupSchema, verifyEmailSchema, loginSchema } from "./models/User";
import UserController from "./users.controller";
import { validateBody, authenticate } from "shared/middlewares";
import { ctrlWrapper } from "shared/helpers";

const usersRouter = express.Router();

usersRouter.post("/signup", validateBody(signupSchema), ctrlWrapper(UserController.signup));

usersRouter.get("/verify/:verificationToken", ctrlWrapper(UserController.verifyEmail));

usersRouter.post("/verify", validateBody(verifyEmailSchema), ctrlWrapper(UserController.resendVerificationEmail));

usersRouter.post("/login", validateBody(loginSchema), ctrlWrapper(UserController.login));

usersRouter.post("/logout", authenticate, ctrlWrapper(UserController.logout));

usersRouter.get("/current", authenticate, ctrlWrapper(UserController.getCurrent));

export default usersRouter;
