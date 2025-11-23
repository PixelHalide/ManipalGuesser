import { closeMongoClient, connectMongoClient, getCollection } from './src/lib/mongoClient';
import { UserDocument } from './src/types/user';

const resetWeekly = async (): Promise<void> => {
    try {
        await connectMongoClient();
        const collection = getCollection<UserDocument>('userData');

        await collection.updateMany(
            {},
            {
                $set: {
                    weeklyPoints: 0,
                    gamesPlayedWeekly: 0,
                    averagePointsWeekly: 0,
                },
            },
        );

        console.log('Weekly data reset successfully');
    } catch (error) {
        console.error('Error resetting weekly data:', error);
    } finally {
        await closeMongoClient();
    }
};

resetWeekly();