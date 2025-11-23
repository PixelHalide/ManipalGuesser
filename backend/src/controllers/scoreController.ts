import { Request, Response } from 'express';
import { scoreService } from '../services/scoreService';
import { userService } from '../services/userService';
import { asyncHandler } from '../utils/asyncHandler';
import { CalcScoreRequestBody } from '../types/requests';

export const scoreController = {
  calculateScore: asyncHandler(async (req: Request<unknown, unknown, CalcScoreRequestBody>, res: Response) => {
    const { mapNumber, submittedCords, userID } = req.body;
    const normalizedMapNumber = Number(mapNumber);

    if (!Number.isFinite(normalizedMapNumber)) {
      res.status(400).json({ error: 'Invalid map number' });
      return;
    }

    if (
      !Array.isArray(submittedCords) ||
      submittedCords.length !== 2 ||
      submittedCords.some((coordinate) => typeof coordinate !== 'number')
    ) {
      res.status(400).json({ error: 'Invalid submitted coordinates' });
      return;
    }

    const result = await scoreService.calculateScore(
      normalizedMapNumber,
      submittedCords as [number, number],
    );

    if (userID) {
      await userService.applyPointsForUser(userID, result.points);
    }

    res.status(200).json(result);
  }),
};
