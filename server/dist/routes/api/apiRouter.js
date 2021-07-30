"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var groupsRouter_1 = __importDefault(require("./groups/groupsRouter"));
var userRouter_1 = __importDefault(require("./user/userRouter"));
var router = express_1.Router();
router.use('/users', userRouter_1.default);
router.use('/groups', groupsRouter_1.default);
exports.default = router;
