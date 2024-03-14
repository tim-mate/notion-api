import { BlockType, BlockPayload } from "types";
import { HttpError } from "./HttpError";

// enum PayloadType {
//   Text = "TEXT",
//   Table = "TABLE",
// }

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
    case "table":
      payload = {
        table: [
          ["", ""],
          ["", ""],
          ["", ""],
        ],
        headerRow: false,
        headerColumn: false,
      };
      break;

    default:
      throw HttpError(400, `Type ${type} is not supported`);
  }

  return payload;
};
