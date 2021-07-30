"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var _a = mongoose_1.Schema.Types, String = _a.String, ObjectId = _a.ObjectId;
var uuid_1 = require("uuid");
var MessageSchema = new mongoose_1.Schema({
    group: {
        type: ObjectId,
        ref: 'Group',
        required: true,
    },
    sender: {
        type: ObjectId,
        ref: 'User',
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    displayId: {
        type: String,
        required: true,
        default: uuid_1.v4(),
    },
}, { timestamps: true });
exports.default = mongoose_1.model('Message', MessageSchema);
