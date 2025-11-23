import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { LeaderboardCategory } from '../types/requests';
import { userService } from '../services/userService';

const isLeaderboardCategory = (value: string): value is LeaderboardCategory =>
  value === 'weekly' || value === 'total';

export const leaderboardController = {
  getLeaderboard: asyncHandler(async (req: Request, res: Response) => {
    const page = Number.parseInt(req.params.page ?? '1', 10) || 1;
    const categoryParam = req.params.category;

    if (!isLeaderboardCategory(categoryParam)) {
      res.status(400).json({ error: 'Invalid category' });
      return;
    }

    const limit = 10;
    const data = await userService.getLeaderboard(categoryParam, page, limit);

    res.status(200).json(data);
  }),
};
