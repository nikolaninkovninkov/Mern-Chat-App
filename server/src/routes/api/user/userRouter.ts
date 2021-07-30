import { Router } from 'express';
import login from '../../../controllers/auth/loginController';
import register from '../../../controllers/auth/registerController';
const router = Router({ mergeParams: true });
// router.use(authorize);
/**
 * @route POST /api/users/register
 * @desc Register user
 * @access public
 */
router.route('/register').post(register);
/**
 * @route POST /api/users/login
 * @desc Register user
 * @access public
 */
router.route('/login').post(login);
export default router;
