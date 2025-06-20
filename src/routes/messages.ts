import { Router } from 'express';
import {
  sendMessageToUser,
  getMessagesForUser,
} from '../controllers/messagesController';
import { authenticate } from '../middlewares/auth';

const router = Router();

// POST /app/messages/users/:user_name
router.post('/messages/users/:user_name', authenticate, sendMessageToUser);

// GET /app/messages/users/:user_name
router.get('/messages/users/:user_name', authenticate, getMessagesForUser);

export default router;
