"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var uuid_1 = require("uuid");
var _a = mongoose_1.Schema.Types, String = _a.String, ObjectId = _a.ObjectId;
var GroupSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    creator: {
        type: ObjectId,
        ref: 'User',
        required: true,
    },
    members: [
        {
            type: ObjectId,
            ref: 'User',
            required: true,
        },
    ],
    displayId: {
        type: String,
        required: true,
        default: uuid_1.v4(),
    },
}, { timestamps: true });
exports.default = mongoose_1.model('Group', GroupSchema);
