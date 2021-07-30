import { Router } from 'express';
import groupsRouter from './groups/groupsRouter';
import userRouter from './user/userRouter';
const router = Router();
router.use('/users', userRouter);
router.use('/groups', groupsRouter);
export default router;
