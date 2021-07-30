import express from 'express';
import jwt, { VerifyErrors, JwtPayload } from 'jsonwebtoken';
import DatabaseGroup from '../types/DatabaseGroup';
import DatabaseUser from '../types/DatabaseUser';
import Role from '../types/Role';
import GroupModel from '../models/Group';
import MessageModel from '../models/Message';

import DatabaseMessage from '../types/DatabaseMessage';
export default function authorize(token: string, callback: any) {
  jwt.verify(token, process.env.JWT_SECRET + '', callback);
}
function sendAuthorizationError(res: express.Response) {
  res.status(403).send('Access forbidden');
}
function sendNotFoundError(res: express.Response) {
  res.status(404).send('Resource not found');
}
export function authorize2(
  req: express.Request,
  res: express.Response,
  callback: (payload: JwtPayload) => Promise<void>,
  resource: 'groups' | 'messages' | 'none',
  role: Role,
) {
  const token = req.headers.token as string;
  jwt.verify(token, process.env.JWT_SECRET + '', async (error, payload) => {
    if (error) sendAuthorizationError(res);
    if (!payload) return;
    const uid = payload._id as string;
    if (resource == 'groups') {
      const gdid = req.params.groupDisplayId;
      const group: DatabaseGroup = await GroupModel.findOne({
        displayId: gdid,
      });
      if (!group) {
        sendNotFoundError(res);
        return;
      }
      if (role == 'member') {
        if (!group.members.includes(uid)) {
          sendAuthorizationError(res);
          return;
        }
      }
      if (role == 'creator') {
        if (group.creator != uid) {
          sendAuthorizationError(res);
          return;
        }
      }
    }
    if (resource == 'messages') {
      const mdid = req.params.messageDisplayId;
      const message: DatabaseMessage = await MessageModel.findOne({
        displayId: mdid,
      });
      if (!message) {
        sendNotFoundError(res);
        return;
      }
      if (role == 'creator') {
        if (message.sender != uid) {
          sendAuthorizationError(res);
          return;
        }
      }
    }

    if (payload) await callback(payload);
  });
}
