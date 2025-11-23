import { Request, Response } from 'express';

export const healthController = {
  ping: (req: Request, res: Response): void => {
    console.log('API is Up');
    res.status(200).send('API is Up');
  },
};
