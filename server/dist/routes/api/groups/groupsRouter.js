"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var groups_1 = require("../../../controllers/group/groups");
var messages_1 = require("../../../controllers/messages/messages");
var router = express_1.Router();
// router.use(authorize);
router.route('/').get(groups_1.getAll).post(groups_1.create);
router.route('/:groupDisplayId').delete(groups_1.deleteGroup).put(groups_1.edit);
router.route('/:groupDisplayId/messages').get(messages_1.getMessages).post(messages_1.sendMessage);
router
    .route('/:groupDisplayId/messages/:messageDisplayId')
    .delete(messages_1.deleteMessage)
    .put(messages_1.editMessage);
exports.default = router;
