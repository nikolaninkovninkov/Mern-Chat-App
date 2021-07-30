"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGroup = exports.edit = exports.create = exports.getAll = void 0;
var Group_1 = __importDefault(require("../../models/Group"));
var authorize_1 = require("../../auth/authorize");
/**
 * in the following functions, payload is used as the user directly
 * may cause issues when updating the user data, a new token must be sent
 */
function getAll(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var verifyCallback;
        var _this = this;
        return __generator(this, function (_a) {
            verifyCallback = function (payload) { return __awaiter(_this, void 0, void 0, function () {
                var user, groups;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            user = payload;
                            return [4 /*yield*/, Group_1.default.find({
                                    members: user._id,
                                })];
                        case 1:
                            groups = _a.sent();
                            res.status(200).json({ allGroups: groups });
                            return [2 /*return*/];
                    }
                });
            }); };
            authorize_1.authorize2(req, res, verifyCallback, 'none', 'authenticated');
            return [2 /*return*/];
        });
    });
}
exports.getAll = getAll;
/**
 * remove default name, use data, too lazy today
 */
function create(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var createInput, verifyCallback;
        var _this = this;
        return __generator(this, function (_a) {
            createInput = req.body;
            verifyCallback = function (payload) { return __awaiter(_this, void 0, void 0, function () {
                var user, newGroup, save, _a, _b;
                var _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            user = payload;
                            newGroup = new Group_1.default(__assign(__assign({}, createInput), { members: [user._id], creator: user._id }));
                            return [4 /*yield*/, newGroup.save()];
                        case 1:
                            save = _d.sent();
                            _b = (_a = res
                                .status(200))
                                .json;
                            _c = {
                                newGroup: newGroup
                            };
                            return [4 /*yield*/, Group_1.default.find({ members: user._id })];
                        case 2:
                            _b.apply(_a, [(_c.allGroups = _d.sent(),
                                    _c)]);
                            return [2 /*return*/];
                    }
                });
            }); };
            authorize_1.authorize2(req, res, verifyCallback, 'none', 'authenticated');
            return [2 /*return*/];
        });
    });
}
exports.create = create;
function edit(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var editInput, displayId, verifyCallback;
        var _this = this;
        return __generator(this, function (_a) {
            editInput = req.body;
            displayId = req.params.groupDisplayId;
            verifyCallback = function (payload) { return __awaiter(_this, void 0, void 0, function () {
                var user, updatedGroup, _a, _b;
                var _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            user = payload;
                            return [4 /*yield*/, Group_1.default.findOneAndUpdate({ displayId: displayId }, { name: editInput.name }, { new: true })];
                        case 1:
                            updatedGroup = _d.sent();
                            _b = (_a = res
                                .status(200))
                                .json;
                            _c = {
                                updatedGroup: updatedGroup
                            };
                            return [4 /*yield*/, Group_1.default.find({ members: user._id })];
                        case 2:
                            _b.apply(_a, [(_c.allGroups = _d.sent(),
                                    _c)]);
                            return [2 /*return*/];
                    }
                });
            }); };
            authorize_1.authorize2(req, res, verifyCallback, 'groups', 'creator');
            return [2 /*return*/];
        });
    });
}
exports.edit = edit;
function deleteGroup(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var displayId, verifyCallback;
        var _this = this;
        return __generator(this, function (_a) {
            displayId = req.params.groupDisplayId;
            verifyCallback = function (payload) { return __awaiter(_this, void 0, void 0, function () {
                var user, deletedGroup, _a, _b;
                var _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            user = payload;
                            return [4 /*yield*/, Group_1.default.findOneAndDelete({
                                    displayId: displayId,
                                })];
                        case 1:
                            deletedGroup = _d.sent();
                            _b = (_a = res
                                .status(200))
                                .json;
                            _c = {};
                            return [4 /*yield*/, Group_1.default.find({ members: user._id })];
                        case 2:
                            _b.apply(_a, [(_c.allGroups = _d.sent(), _c)]);
                            return [2 /*return*/];
                    }
                });
            }); };
            authorize_1.authorize2(req, res, verifyCallback, 'groups', 'creator');
            return [2 /*return*/];
        });
    });
}
exports.deleteGroup = deleteGroup;
