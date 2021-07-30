"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var loginController_1 = __importDefault(require("../../../controllers/auth/loginController"));
var registerController_1 = __importDefault(require("../../../controllers/auth/registerController"));
var router = express_1.Router({ mergeParams: true });
// router.use(authorize);
/**
 * @route POST /api/users/register
 * @desc Register user
 * @access public
 */
router.route('/register').post(registerController_1.default);
/**
 * @route POST /api/users/login
 * @desc Register user
 * @access public
 */
router.route('/login').post(loginController_1.default);
exports.default = router;
