import { NextFunction, Request, Response } from 'express';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error(err);

  if (res.headersSent) {
    next(err);
    return;
  }

  res.status(500).json({ error: err.message ?? 'Internal Server Error' });
};
