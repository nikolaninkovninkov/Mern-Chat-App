"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * @param res => response to get sent
 * @param user => user object from loginController
 */
function tokenJWT(req, res, user) {
    jsonwebtoken_1.default.sign(JSON.stringify(user), process.env.JWT_SECRET + '', function (err, token) {
        if (err)
            throw err;
        res.json({ token: token });
    });
}
exports.default = tokenJWT;
