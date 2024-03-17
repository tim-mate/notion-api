import { Request, Response } from "express";
import UsersService from "./users.service";

class UserController {
  async signup(req: Request, res: Response) {
    const newUser = await UsersService.signup(req.body);

    res.status(201).json({
      user: { email: newUser.email },
    });
  }

  async verifyEmail(req: Request, res: Response) {
    await UsersService.verifyEmail(req.params.verificationToken);

    res.json({
      message: "Email is successfully verified",
    });
  }

  async resendVerificationEmail(req: Request, res: Response) {
    await UsersService.resendVerificationEmail(req.body.email);

    res.json({
      message: "Verification email was successfully sent",
    });
  }

  async login(req: Request, res: Response) {
    const { email }: { email: string } = req.body;
    const token = await UsersService.login(req.body);

    res.json({
      token,
      user: {
        email,
      },
    });
  }

  logout() {}

  getCurrent() {}
}

export default new UserController();
