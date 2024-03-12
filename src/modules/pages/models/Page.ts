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

const blockSchema = new Schema<Block>(
  {
    type: {
      type: String,
      required: true,
    },
    payload: {
      type: Schema.Types.Mixed,
      default: {},
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

export const Page = model("Page", pageSchema);
