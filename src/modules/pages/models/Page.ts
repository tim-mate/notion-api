import { Schema, Types, model } from "mongoose";
import Joi from "joi";

type Payload = { [key: string]: unknown };

interface Block {
  type: string;
  payload: Payload;
}

export interface IPage {
  title: string;
  owner: Types.ObjectId;
  favorite: boolean;
  blocks: Types.DocumentArray<Block>;
}

const BLOCK_TYPES = ["text", "table"];

const blockSchema = new Schema<Block>(
  {
    type: {
      type: String,
      enum: BLOCK_TYPES,
      required: true,
    },
    payload: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

const pageSchema = new Schema<IPage>(
  {
    title: {
      type: String,
      default: "Untitled",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    blocks: [blockSchema],
  },
  { versionKey: false, timestamps: true },
);

export const updateStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

export const renameSchema = Joi.object({
  title: Joi.string().required(),
});

export const addBlockSchema = Joi.object({
  type: Joi.string()
    .valid(...BLOCK_TYPES)
    .required(),
});

export const Page = model("Page", pageSchema);
