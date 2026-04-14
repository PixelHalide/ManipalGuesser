import { MongoClient } from 'mongodb';
import { env } from './src/config/env.js';

const client = new MongoClient(env.connectionString);

try {
  await client.connect();
  console.log('Connected to MongoDB');
  
  const db = client.db(env.dbName);
  const collection = db.collection('submissions');
  
  const count = await collection.countDocuments();
  console.log(`Total submissions: ${count}`);
  
  const recent = await collection.find().sort({ _id: -1 }).limit(5).toArray();
  console.log('\nRecent submissions:');
  console.log(JSON.stringify(recent, null, 2));
  
} catch (err) {
  console.error('Error:', err);
} finally {
  await client.close();
}
