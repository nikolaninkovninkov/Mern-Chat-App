import { Request, Response } from 'express';
import LoginInfo from '../../types/LoginInfo';
import ServerClientError from '../../types/ServerClientError';
import UserModel from '../../models/User';
import DatabaseUser from '../../types/DatabaseUser';
import { compare } from 'bcryptjs';
import tokenJWT from '../../auth/tokenJWT';
async function login(req: Request, res: Response) {
  const loginInfo = req.body as LoginInfo;
  const { username, password, email } = loginInfo;
  const foundUsers: DatabaseUser[] = email
    ? await UserModel.find({ email: username })
    : await UserModel.find({ username: username });
  if (foundUsers.length == 0) {
    res.status(400).json({
      message: 'Wrong credentials',
    } as ServerClientError);
    return;
  }
  if (foundUsers.length > 1) {
    throw new Error('Two or more users with the same username/email');
  }
  const foundUser = foundUsers[0];
  const match = await compare(password, foundUser.password);
  if (match) tokenJWT(req, res, foundUser);
  else
    res.status(400).json({ message: 'Wrong credentials' } as ServerClientError);
}
export default login;
