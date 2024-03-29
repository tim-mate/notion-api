import { Request, Response } from "express";

import { AuthenticatedRequest, HttpStatus } from "../../shared/types";
import { HttpError } from "../../shared/helpers";
import UserService from "./users.service.js";

class UserController {
  async signup(req: Request, res: Response) {
    const newUser = await UserService.signup(req.body);

    res.status(HttpStatus.Created).json({
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
    const { user } = req;
    if (!user) {
      throw HttpError(HttpStatus.Unauthorized);
    }

    await UserService.logout(user._id);
    res.status(HttpStatus.NoContent).send();
  }

  async getCurrent(req: AuthenticatedRequest, res: Response) {
    const { user } = req;
    if (!user) {
      throw HttpError(HttpStatus.Unauthorized);
    }

    res.json({
      user: {
        email: user.email,
      },
    });
  }
}

export default new UserController();
