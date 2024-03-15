import { User } from "./models/User";

class UserService {
  public usersRepository;

  constructor(userModel: typeof User) {
    this.usersRepository = userModel;
  }

  signup() {}

  verifyEmail() {}

  resendVerificationEmail() {}

  login() {}

  logout() {}

  getCurrent() {}
}

export default new UserService(User);
