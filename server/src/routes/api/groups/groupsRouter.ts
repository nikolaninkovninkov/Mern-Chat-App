import { Router } from 'express';
import authorize from '../../../auth/authorize';
import {
  create,
  getAll,
  edit,
  deleteGroup,
} from '../../../controllers/group/groups';
import {
  deleteMessage,
  editMessage,
  getMessages,
  sendMessage,
} from '../../../controllers/messages/messages';
const router = Router();
// router.use(authorize);
router.route('/').get(getAll).post(create);
router.route('/:groupDisplayId').delete(deleteGroup).put(edit);
router.route('/:groupDisplayId/messages').get(getMessages).post(sendMessage);
router
  .route('/:groupDisplayId/messages/:messageDisplayId')
  .delete(deleteMessage)
  .put(editMessage);
export default router;
