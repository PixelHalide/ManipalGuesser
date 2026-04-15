import { getCollection } from '../lib/mongoClient';
import { env } from '../config/env';

interface SubmissionDocument {
  boardPercentage: number;
  metMarks: number;
  timestamp: Date;
  ip: string;
  userAgent: string;
}

export const submissionService = {
  async submitSubmission(document: SubmissionDocument): Promise<void> {
    const collection = getCollection<SubmissionDocument>('submissions', env.submissionsDbName);

    await collection.insertOne(document);
  },
};