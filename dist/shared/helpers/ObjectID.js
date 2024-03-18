"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectID = void 0;
const mongoose_1 = require("mongoose");
const ObjectID = (id) => {
    if (!(0, mongoose_1.isValidObjectId)(id)) {
        throw new Error(`${id} is not a valid id`);
    }
    return new mongoose_1.Types.ObjectId(id);
};
exports.ObjectID = ObjectID;
//# sourceMappingURL=ObjectID.js.map