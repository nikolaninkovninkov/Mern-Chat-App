import express from 'express';
import { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import DatabaseUser from '../../types/DatabaseUser';
import GroupModel from '../../models/Group';
import DatabaseGroup from '../../types/DatabaseGroup';
import { authorize2 } from '../../auth/authorize';
/**
 * in the following functions, payload is used as the user directly
 * may cause issues when updating the user data, a new token must be sent
 */

async function getAll(req: express.Request, res: express.Response) {
  const verifyCallback = async (payload: JwtPayload) => {
    const user = payload as DatabaseUser;
    const groups: DatabaseGroup[] = await GroupModel.find({
      members: user._id,
    });
    res.status(200).json({ allGroups: groups });
  };
  authorize2(req, res, verifyCallback, 'none', 'authenticated');
}
/**
 * remove default name, use data, too lazy today
 */
async function create(req: express.Request, res: express.Response) {
  const createInput = req.body as { name: string };
  const verifyCallback = async (payload: JwtPayload) => {
    const user = payload as DatabaseUser;
    const newGroup = new GroupModel({
      ...createInput,
      members: [user._id],
      creator: user._id,
    });

    const save = await newGroup.save();
    res
      .status(200)
      .json({
        newGroup,
        allGroups: await GroupModel.find({ members: user._id }),
      });
  };
  authorize2(req, res, verifyCallback, 'none', 'authenticated');
}
async function edit(req: express.Request, res: express.Response) {
  const editInput = req.body as { name: string };
  const displayId = req.params.groupDisplayId;
  const verifyCallback = async (payload: JwtPayload) => {
    const user = payload as DatabaseUser;
    const updatedGroup = await GroupModel.findOneAndUpdate(
      { displayId: displayId },
      { name: editInput.name },
      { new: true },
    );
    res
      .status(200)
      .json({
        updatedGroup,
        allGroups: await GroupModel.find({ members: user._id }),
      });
  };
  authorize2(req, res, verifyCallback, 'groups', 'creator');
}
async function deleteGroup(req: express.Request, res: express.Response) {
  const displayId = req.params.groupDisplayId;
  const verifyCallback = async (payload: JwtPayload) => {
    const user = payload as DatabaseUser;
    const deletedGroup = await GroupModel.findOneAndDelete({
      displayId: displayId,
    });
    res
      .status(200)
      .json({ allGroups: await GroupModel.find({ members: user._id }) });
  };
  authorize2(req, res, verifyCallback, 'groups', 'creator');
}

export { getAll, create, edit, deleteGroup };
