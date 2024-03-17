import { Schema, Types, Model, model } from "mongoose";
import Joi from "joi";

import { BlockType, BlockPayload } from "../types";
import { BLOCK_TYPES } from "../constants";

interface Block {
  _id: Types.ObjectId;
  type: BlockType;
  payload: BlockPayload;
}

interface IPage {
  title: string;
  owner: Types.ObjectId;
  favorite: boolean;
  blocks: Block[];
}

type PageDocumentProps = {
  title: string;
  owner: Types.ObjectId;
  favorite: boolean;
  blocks: Types.DocumentArray<Block>;
};

type PageModelType = Model<IPage, object, PageDocumentProps>;

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

export const Page = model<IPage, PageModelType>("Page", pageSchema);

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

export const updateTextBlockSchema = Joi.object({
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

export const updateTableBlockSchema = Joi.object({
  payload: Joi.object({
    table: Joi.array()
      .items(
        Joi.array().items(
          Joi.object({
            text: Joi.string().allow(""),
            styles: Joi.object(),
          }),
        ),
      )
      .min(1),
    styles: Joi.object({
      rows: Joi.array().items(Joi.object()),
      columns: Joi.array().items(Joi.object()),
    }),
    headerRow: Joi.boolean(),
    headerColumn: Joi.boolean(),
  })
    .required()
    .or("table", "styles", "headerRow", "headerColumn"),
});
