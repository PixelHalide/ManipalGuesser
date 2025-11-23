import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { SignUpRequestBody } from '../types/requests';
import { userService } from '../services/userService';

export const authController = {
  signUp: asyncHandler(async (req: Request<unknown, unknown, SignUpRequestBody>, res: Response) => {
    const { userID, userName, userImage, globalName, discordUser } = req.body;

    if (!userID || !userName) {
      res.status(400).json({ error: 'userID and userName are required' });
      return;
    }

    await userService.createUser({
      userID,
      userName,
      userImage: userImage ?? null,
      globalName: globalName ?? null,
      discordUser: discordUser ?? null,
    });

    res.status(200).send('Success');
  }),
};
