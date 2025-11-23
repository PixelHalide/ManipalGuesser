import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { feedbackService } from '../services/feedbackService';
import { FeedbackRequestBody } from '../types/requests';

const isMessageValid = (message: unknown): message is string => {
  if (typeof message !== 'string') {
    return false;
  }

  if (message.length === 0 || message.length > 400) {
    return false;
  }

  return !/[$<>]/.test(message);
};

export const feedbackController = {
  submitForm: asyncHandler(async (req: Request<unknown, unknown, FeedbackRequestBody>, res: Response) => {
    const { name, message } = req.body;

    if (!isMessageValid(message)) {
      res.status(400).json({ error: 'Invalid message input' });
      return;
    }

    await feedbackService.submitFeedback(name, message);

    res.status(200).json({ success: true });
  }),
};
