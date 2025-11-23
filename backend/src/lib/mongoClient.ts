import { Collection, Db, Document, MongoClient } from 'mongodb';
import { env } from '../config/env';

let client: MongoClient | null = null;

export const connectMongoClient = async (): Promise<MongoClient> => {
  if (client) {
    return client;
  }

  client = new MongoClient(env.connectionString);
  await client.connect();
  return client;
};

export const getMongoClient = (): MongoClient => {
  if (!client) {
    throw new Error('MongoClient has not been initialized. Call connectMongoClient() first.');
  }

  return client;
};

export const getDb = (): Db => getMongoClient().db(env.dbName);

export const getCollection = <TDocument extends Document = Document>(name: string): Collection<TDocument> =>
  getDb().collection<TDocument>(name);

export const closeMongoClient = async (): Promise<void> => {
  if (client) {
    await client.close();
    client = null;
  }
};
