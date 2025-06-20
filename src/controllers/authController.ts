import { Request, Response } from 'express';
import { createUser } from '../services/userService';

export const registerUser = async (req: Request, res: Response) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    const user = await createUser(username);
    return res.status(201).json({ message: 'User registered', user });
  } catch (err) {
    return res.status(409).json({ error: (err as Error).message });
  }
};
