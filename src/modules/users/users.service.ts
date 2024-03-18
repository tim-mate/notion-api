import { Types } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

import { HttpStatus } from "shared/types";
import { HttpError } from "shared/helpers";
import { User } from "./models/User";
import { SignupUserDto, LoginUserDto } from "./types";
import { sendEmail } from "./helpers";

dotenv.config();
const { BASE_URL, SECRET_KEY, SALT_ROUNDS, TOKEN_TTL } = process.env;

if (!BASE_URL || !SECRET_KEY || !SALT_ROUNDS || !TOKEN_TTL) {
  console.error("Please provide the required environment variables");
  process.exit(1);
}

class UserService {
  constructor(private usersRepository: typeof User) {}

  async signup(data: SignupUserDto) {
    const { email, password } = data;
    const user = await this.usersRepository.findOne({ email });
    if (user) {
      throw HttpError(HttpStatus.Conflict, "Email is already in use");
    }

    const salt = await bcrypt.genSalt(Number(SALT_ROUNDS));
    const hashedPassword = await bcrypt.hash(password, salt);
    const verificationToken = uuidv4();

    const newUser = await this.usersRepository.create({ ...data, password: hashedPassword, verificationToken });

    const verificationEmail = {
      subject: "Verify email",
      to: email,
      html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click here to verify your email</a>`,
    };
    await sendEmail(verificationEmail);
    return newUser;
  }

  async verifyEmail(verificationToken: string) {
    const user = await this.usersRepository.findOne({ verificationToken });
    if (!user) {
      throw HttpError(HttpStatus.NotFound);
    }

    if (user.isEmailVerified) {
      throw HttpError(HttpStatus.BadRequest, "Verification has already been passed");
    }

    await this.usersRepository.findByIdAndUpdate(user._id, { verificationToken: null, isEmailVerified: true });
  }

  async resendVerificationEmail(email: string) {
    const user = await this.usersRepository.findOne({ email });
    if (!user) {
      throw HttpError(HttpStatus.NotFound);
    }

    if (user.isEmailVerified) {
      throw HttpError(HttpStatus.BadRequest, "Verification has already been passed");
    }

    const verificationEmail = {
      subject: "Verify email",
      to: email,
      html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click here to verify your email</a>`,
    };
    await sendEmail(verificationEmail);
  }

  async login(data: LoginUserDto) {
    const { email, password } = data;
    const user = await this.usersRepository.findOne({ email });
    if (!user) {
      throw HttpError(HttpStatus.Unauthorized, "Incorrect email or password");
    }

    if (!user.isEmailVerified) {
      throw HttpError(HttpStatus.Unauthorized, "Please, verify your email");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw HttpError(HttpStatus.Unauthorized, "Incorrect email or password");
    }

    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY!, { expiresIn: TOKEN_TTL });
    await this.usersRepository.findByIdAndUpdate(user._id, { token });
    return token;
  }

  async logout(id: Types.ObjectId) {
    await this.usersRepository.findByIdAndUpdate(id, { token: null });
  }
}

export default new UserService(User);
