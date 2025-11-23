import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { userService } from '../services/userService';

export const userController = {
  fetchSelfData: asyncHandler(async (req: Request, res: Response) => {
    const { userID } = req.params;

    const userData = await userService.getScoreSummary(userID);

    if (!userData) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const ranks = await userService.getRanks({
      totalPoints: userData.totalPoints,
      weeklyPoints: userData.weeklyPoints,
    });

    res.status(200).json({ userData, ...ranks });
  }),

  fetchUserData: asyncHandler(async (req: Request, res: Response) => {
    const { userID } = req.params;

    const userData = await userService.getPublicProfile(userID);

    if (!userData) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const ranks = await userService.getRanks({
      totalPoints: userData.totalPoints,
      weeklyPoints: userData.weeklyPoints,
    });

    res.status(200).json({ userData, ...ranks });
  }),
};
