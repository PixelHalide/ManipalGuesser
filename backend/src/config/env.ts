import dotenv from 'dotenv';

dotenv.config();

const PORT = Number(process.env.PORT ?? 8000);
const CONNECTION_STRING = process.env.CONNECTION_STRING;
const DB_NAME = process.env.DB_NAME;

if (!CONNECTION_STRING) {
  throw new Error('CONNECTION_STRING environment variable is not defined');
}

if (!DB_NAME) {
  throw new Error('DB_NAME environment variable is not defined');
}

export const env = {
  port: PORT,
  connectionString: CONNECTION_STRING,
  dbName: DB_NAME,
};
