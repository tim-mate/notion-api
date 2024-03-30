"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPayload = void 0;
const types_1 = require("../../../shared/types");
const helpers_1 = require("../../../shared/helpers");
const types_2 = require("../types");
const constants_1 = require("../constants");
const createPayload = (type) => {
    let payload;
    switch (type) {
        case types_2.BlockTypeEnum.BigHeading:
        case types_2.BlockTypeEnum.MediumHeading:
        case types_2.BlockTypeEnum.SmallHeading:
        case types_2.BlockTypeEnum.Text:
            payload = {
                content: "",
                ...constants_1.DEFAULT_TEXT_STYLES,
            };
            break;
        case types_2.BlockTypeEnum.Table:
            payload = {
                table: [
                    [
                        { text: "", styles: constants_1.DEFAULT_TEXT_STYLES },
                        { text: "", styles: constants_1.DEFAULT_TEXT_STYLES },
                    ],
                    [
                        { text: "", styles: constants_1.DEFAULT_TEXT_STYLES },
                        { text: "", styles: constants_1.DEFAULT_TEXT_STYLES },
                    ],
                    [
                        { text: "", styles: constants_1.DEFAULT_TEXT_STYLES },
                        { text: "", styles: constants_1.DEFAULT_TEXT_STYLES },
                    ],
                ],
                styles: {
                    rows: [constants_1.DEFAULT_COLOR_STYLES, constants_1.DEFAULT_COLOR_STYLES, constants_1.DEFAULT_COLOR_STYLES],
                    columns: [constants_1.DEFAULT_COLOR_STYLES, constants_1.DEFAULT_COLOR_STYLES],
                },
                headerRow: false,
                headerColumn: false,
            };
            break;
        default:
            throw (0, helpers_1.HttpError)(types_1.HttpStatus.BadRequest, `Type ${type} is not supported`);
    }
    return payload;
};
exports.createPayload = createPayload;
//# sourceMappingURL=createPayload.js.map