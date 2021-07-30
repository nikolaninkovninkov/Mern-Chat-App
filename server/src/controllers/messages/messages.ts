import express from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { authorize2 } from '../../auth/authorize';
import DatabaseUser from '../../types/DatabaseUser';
import DatabaseMessage from '../../types/DatabaseMessage';
import MessageModel from '../../models/Message';
import GroupModel from '../../models/Group';
import DatabaseGroup from '../../types/DatabaseGroup';
async function getMessages(req: express.Request, res: express.Response) {
  const groupDisplayId = req.params.groupDisplayId;
  const verifyCallback = async (payload: JwtPayload) => {
    const group: DatabaseGroup = await GroupModel.findOne({
      displayId: groupDisplayId,
    });
    const messages: DatabaseMessage[] = await MessageModel.find({
      group: group._id,
    });
    res.status(200).json({ allMessages: messages });
  };
  authorize2(req, res, verifyCallback, 'groups', 'member');
}
async function sendMessage(req: express.Request, res: express.Response) {
  const token = req.headers.token as string;
  const groupDisplayId = req.params.groupDisplayId;
  const sendInput: { text: string } = req.body;
  const verifyCallback = async (payload: JwtPayload) => {
    const user = payload as DatabaseUser;
    const group: DatabaseGroup = await GroupModel.findOne({
      displayId: groupDisplayId,
    });
    const newMessage = new MessageModel({
      ...sendInput,
      sender: user._id,
      group: group._id,
    });
    const save: DatabaseMessage = await newMessage.save();
    res.status(200).json({
      newMessage: save,
      allMessages: await MessageModel.find({ group: group._id }),
    });
  };
  authorize2(req, res, verifyCallback, 'groups', 'member');
}
async function editMessage(req: express.Request, res: express.Response) {
  const token = req.headers.token as string;
  const { messageDisplayId } = req.params;
  const { text } = req.body as { text: string };
  const verifyCallback = async (payload: JwtPayload) => {
    const newMessage: DatabaseMessage = await MessageModel.findOneAndUpdate(
      { displayId: messageDisplayId },
      { text },
      { new: true },
    );
    const group: DatabaseGroup = await GroupModel.find({
      _id: newMessage.group,
    });
    res.status(200).json({
      editedMessage: newMessage,
      allMessages: await MessageModel.find({ group: group._id }),
    });
  };
  authorize2(req, res, verifyCallback, 'messages', 'creator');
}
async function deleteMessage(req: express.Request, res: express.Response) {
  const displayId = req.params.messageDisplayId;
  const verifyCallback = async (payload: JwtPayload) => {
    const _id: string = (await MessageModel.find({ displayId })).group;
    await MessageModel.findOneAndDelete({
      displayId,
    });
    const allMessages = await MessageModel.find({ group: _id });
    res.status(200).json({
      allMessages,
    });
  };
  authorize2(req, res, verifyCallback, 'messages', 'creator');
}
export { getMessages, sendMessage, editMessage, deleteMessage };
