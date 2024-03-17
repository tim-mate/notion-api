import { BlockType, BlockPayload } from "../types";
import { DEFAULT_COLOR_STYLES, DEFAULT_TEXT_STYLES } from "../constants";
import { HttpError } from "shared/helpers";

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
        ...DEFAULT_TEXT_STYLES,
      };
      break;
    case "table":
      payload = {
        table: [
          [
            { text: "", styles: DEFAULT_TEXT_STYLES },
            { text: "", styles: DEFAULT_TEXT_STYLES },
          ],
          [
            { text: "", styles: DEFAULT_TEXT_STYLES },
            { text: "", styles: DEFAULT_TEXT_STYLES },
          ],
          [
            { text: "", styles: DEFAULT_TEXT_STYLES },
            { text: "", styles: DEFAULT_TEXT_STYLES },
          ],
        ],
        styles: {
          rows: [DEFAULT_COLOR_STYLES, DEFAULT_COLOR_STYLES, DEFAULT_COLOR_STYLES],
          columns: [DEFAULT_COLOR_STYLES, DEFAULT_COLOR_STYLES],
        },
        headerRow: false,
        headerColumn: false,
      };
      break;

    default:
      throw HttpError(400, `Type ${type} is not supported`);
  }

  return payload;
};
