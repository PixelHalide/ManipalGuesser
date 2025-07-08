
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config()

const CONNECTION_STRING = process.env.CONNECTION_STRING;
const DB_NAME = process.env.DB_NAME;

if (!CONNECTION_STRING) {
  throw new Error('CONNECTION_STRING environment variable is not defined');
}

const client = new MongoClient(CONNECTION_STRING);
const db = client.db(DB_NAME);

const collection = db.collection('userData');

const resetWeekly = async () => {
  try {

    await collection.updateMany({}, {
    $set: {
        weeklyPoints: 0,
        gamesPlayedWeekly: 0,
        averagePointsWeekly: 0,
    }
    });
    console.log('Weekly data reset successfully');
}
    catch (error) {
        console.error('Error resetting weekly data:', error);
    }
    finally {
        client.close();
    }
};

resetWeekly()