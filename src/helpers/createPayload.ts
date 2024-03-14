import { BlockType, BlockPayload } from "types";
import { HttpError } from "./HttpError";

export const createPayload = (type: BlockType): BlockPayload => {
  let payload;

  switch (type) {
    case "text":
      payload = {
        content: "",
        color: "black",
        backgroundColor: "white",
        bold: false,
        italic: false,
        underlined: false,
        strikethrough: false,
      };
      break;

    default:
      throw HttpError(404, `Type ${type} is not supported`);
  }

  return payload;
};
