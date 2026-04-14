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

export const getDb = (dbName?: string): Db => getMongoClient().db(dbName ?? env.dbName);

export const getCollection = <TDocument extends Document = Document>(name: string, dbName?: string): Collection<TDocument> =>
  getDb(dbName).collection<TDocument>(name);

export const closeMongoClient = async (): Promise<void> => {
  if (client) {
    await client.close();
    client = null;
  }
};
