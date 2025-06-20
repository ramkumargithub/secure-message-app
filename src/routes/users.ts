import { Router } from 'express';
import { listUsers } from '../controllers/usersController';
import { authenticate } from '../middlewares/auth';

const router = Router();

// GET /app/users (requires auth)
router.get('/users', authenticate, listUsers);

export default router;
