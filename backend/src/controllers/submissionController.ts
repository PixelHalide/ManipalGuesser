import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { submissionService } from '../services/submissionService';
import { SubmissionRequestBody } from '../types/requests';

const isValidNumber = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value);

const getClientIp = (req: Request<any, any, any>): string => {
  const forwarded = req.get('x-forwarded-for');

  if (forwarded) {
    return forwarded.split(',')[0]?.trim() || 'unknown';
  }

  return req.get('x-real-ip') || req.ip || 'unknown';
};

export const submissionController = {
  submit: asyncHandler(async (req: Request<unknown, unknown, SubmissionRequestBody>, res: Response) => {
    const { boardPercentage, metMarks } = req.body;

    if (!isValidNumber(boardPercentage) || !isValidNumber(metMarks)) {
      res.status(400).json({ error: 'Invalid submission payload' });
      return;
    }

    await submissionService.submitSubmission({
      boardPercentage,
      metMarks,
      timestamp: new Date(),
      ip: getClientIp(req),
      userAgent: req.get('user-agent') || 'unknown',
    });

    res.status(201).json({ success: true });
  }),
};