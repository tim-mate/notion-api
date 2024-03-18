import { HttpStatus } from "../../../shared/types";
import { HttpError } from "../../../shared/helpers";
import { BlockTypeEnum, BlockTypeAlias, BlockPayload } from "../types";
import { DEFAULT_COLOR_STYLES, DEFAULT_TEXT_STYLES } from "../constants";

export const createPayload = (type: BlockTypeAlias): BlockPayload => {
  let payload: BlockPayload;

  switch (type) {
    case BlockTypeEnum.Text:
      payload = {
        content: "",
        ...DEFAULT_TEXT_STYLES,
      };
      break;
    case BlockTypeEnum.Table:
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
      throw HttpError(HttpStatus.BadRequest, `Type ${type} is not supported`);
  }

  return payload;
};
