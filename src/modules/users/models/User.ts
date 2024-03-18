import Joi from "joi";
import { Schema, Model, model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  token: string;
  isEmailVerified: boolean;
  verificationToken: string;
}

export type UserModelType = Model<IUser>;

const userSchema = new Schema<IUser, UserModelType>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    token: {
      type: String,
      default: null,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verification token is required"],
      default: null,
    },
  },
  { versionKey: false, timestamps: true },
);

export const User = model<IUser, UserModelType>("User", userSchema);

export const signupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

export const verifyEmailSchema = Joi.object({
  email: Joi.string().required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});
