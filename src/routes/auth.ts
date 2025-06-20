import { Router } from 'express';
import { registerUser } from '../controllers/authController';

const router = Router();

// POST /app/users/register
router.post('/users/register', registerUser);

export default router;
