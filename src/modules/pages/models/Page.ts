import { Schema, Types, Model, model } from "mongoose";
import { BlockType } from "types";
import Joi from "joi";

export type BlockPayload = { [key: string]: unknown };

export interface BlockDto {
  _id: Types.ObjectId;
  type: BlockType;
  payload: BlockPayload;
}

// export interface CreateBlockDto {
//   type: BlockType;
//   payload: BlockPayload;
// }

// export interface UpdateBlockDto {
//   payload: BlockPayload;
// }

export interface IPage {
  title: string;
  owner: Types.ObjectId;
  favorite: boolean;
  blocks: BlockDto[];
}

type PageDocumentProps = {
  title: string;
  owner: Types.ObjectId;
  favorite: boolean;
  blocks: Types.DocumentArray<BlockDto>;
};

type PageModelType = Model<IPage, object, PageDocumentProps>;

const BLOCK_TYPES = ["text", "table"];

const blockSchema = new Schema<BlockDto>(
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

const pageSchema = new Schema<IPage, PageModelType>(
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

export const updateBlockSchema = Joi.object({
  payload: Joi.object({
    content: Joi.string(),
    color: Joi.string(),
    backgroundColor: Joi.string(),
    bold: Joi.boolean(),
    italic: Joi.boolean(),
    underlined: Joi.boolean(),
    strikethrough: Joi.boolean(),
  })
    .required()
    .or("content", "color", "backgroundColor", "bold", "italic", "underlined", "strikethrough"),
});

export const Page = model<IPage, PageModelType>("Page", pageSchema);
