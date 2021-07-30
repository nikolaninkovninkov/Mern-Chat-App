import express from 'express';
import DatabaseUser from '../types/DatabaseUser';
import jwt from 'jsonwebtoken';
/**
 * @param res => response to get sent
 * @param user => user object from loginController
 */
function tokenJWT(
  req: express.Request,
  res: express.Response,
  user: DatabaseUser,
) {
  jwt.sign(JSON.stringify(user), process.env.JWT_SECRET + '', (err, token) => {
    if (err) throw err;
    res.json({ token });
  });
}
export default tokenJWT;
