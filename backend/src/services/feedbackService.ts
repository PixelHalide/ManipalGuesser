import { getCollection } from '../lib/mongoClient';

interface FeedbackDocument {
  time: number;
  name?: string;
  message: string;
}

export const feedbackService = {
  async submitFeedback(name: string | undefined, message: string): Promise<void> {
    const collection = getCollection<FeedbackDocument>('feedback');
    const doc: FeedbackDocument = {
      time: Date.now(),
      name,
      message,
    };

    await collection.insertOne(doc);
  },
};
