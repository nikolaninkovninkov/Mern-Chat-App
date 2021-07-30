import express from 'express';
import RegisterInfo from '../../types/RegisterInfo';
import UserModel from '../../models/User';
import bcrypt from 'bcryptjs';
import DatabaseUser from '../../types/DatabaseUser';
import ServerClientError from '../../types/ServerClientError';
import tokenJWT from '../../auth/tokenJWT';
async function register(req: express.Request, res: express.Response) {
  const registerInfo: RegisterInfo = req.body;
  const foundUsersEmail: DatabaseUser[] = await UserModel.find({
    email: registerInfo.email,
  });
  const foundUsersUsername: DatabaseUser[] = await UserModel.find({
    username: registerInfo.username,
  });
  if (foundUsersEmail.length > 1 || foundUsersUsername.length > 1) {
    throw new Error('Two users registered with that username/email');
  }
  if (foundUsersEmail.length > 0 || foundUsersUsername.length > 0) {
    if (foundUsersEmail.length > 0) {
      res.status(400).json({
        message: 'User already registered with that email',
      } as ServerClientError);
      return;
    }
    res.status(400).json({
      message: 'User already registered with that username',
    } as ServerClientError);
    return;
  }

  const newUser = new UserModel({
    ...registerInfo,
  });
  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save().then((user: DatabaseUser) => {
        tokenJWT(req, res, user);
      });
    });
  });
}
export default register;
