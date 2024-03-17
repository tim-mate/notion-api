import { HttpError } from "shared/helpers";
import { Request, Response } from "express";

import { AuthenticatedRequest } from "shared/types";
import UserService from "./users.service";

class UserController {
  async signup(req: Request, res: Response) {
    const newUser = await UserService.signup(req.body);

    res.status(201).json({
      user: { email: newUser.email },
    });
  }

  async verifyEmail(req: Request, res: Response) {
    await UserService.verifyEmail(req.params.verificationToken);

    res.json({
      message: "Email is successfully verified",
    });
  }

  async resendVerificationEmail(req: Request, res: Response) {
    await UserService.resendVerificationEmail(req.body.email);

    res.json({
      message: "Verification email was successfully sent",
    });
  }

  async login(req: Request, res: Response) {
    const { email }: { email: string } = req.body;
    const token = await UserService.login(req.body);

    res.json({
      token,
      user: {
        email,
      },
    });
  }

  async logout(req: AuthenticatedRequest, res: Response) {
    const user = req.user;
    if (!user) {
      throw HttpError(401);
    }

    await UserService.logout(user._id);
    res.status(204).send();
  }

  getCurrent() {}
}

export default new UserController();
