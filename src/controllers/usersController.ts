import { Request, Response } from 'express';
import { getAllUsersWithAvailability } from '../services/userService';

export const listUsers = async (_req: Request, res: Response) => {
  try {
    const users = await getAllUsersWithAvailability();
    return res.json({ users });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch users' });
  }
};
