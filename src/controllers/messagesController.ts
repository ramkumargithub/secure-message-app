import { Request, Response } from 'express';
import { sendMessage, getMessagesForUser } from '../services/messageService';

export const sendMessageToUser = async (req: Request, res: Response) => {
  const sender = req.user?.username;
  const recipient = req.params.user_name;
  const { message } = req.body;

  if (!message || !recipient || !sender) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await sendMessage(sender, recipient, message);
    return res.status(200).json({ message: 'Message sent' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to send message' });
  }
};

export const getMessagesForUser = async (req: Request, res: Response) => {
  const username = req.params.user_name;

  try {
    const messages = await getMessagesForUser(username);
    return res.json({ messages });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to retrieve messages' });
  }
};
