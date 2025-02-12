import Router from 'express';
import { getMessages } from '../controllers/messageControllers.js';
import { findUser } from '../middleware/getUser.js';

const router = Router();

router.get('/',findUser,getMessages);

export default router;