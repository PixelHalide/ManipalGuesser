import { Filter, FindOptions } from 'mongodb';
import { LeaderboardCategory } from '../types/requests';
import { LeaderboardUser, NewUserPayload, UserDocument, UserScoreSummary } from '../types/user';
import { getCollection } from '../lib/mongoClient';

const userCollection = () => getCollection<UserDocument>('userData');

const leaderboardProjection: FindOptions<UserDocument>['projection'] = {
  userID: 1,
  userName: 1,
  userImage: 1,
  weeklyPoints: 1,
  totalPoints: 1,
  discordUser: 1,
  averagePoints: 1,
  averagePointsWeekly: 1,
  gamesPlayed: 1,
  gamesPlayedWeekly: 1,
};

const scoreSummaryProjection: FindOptions<UserDocument>['projection'] = {
  _id: 0,
  weeklyPoints: 1,
  totalPoints: 1,
  averagePoints: 1,
  averagePointsWeekly: 1,
  gamesPlayed: 1,
  gamesPlayedWeekly: 1,
};

const publicProfileProjection: FindOptions<UserDocument>['projection'] = {
  _id: 0,
  userName: 1,
  discordUser: 1,
  userImage: 1,
  weeklyPoints: 1,
  totalPoints: 1,
  averagePoints: 1,
  averagePointsWeekly: 1,
  gamesPlayed: 1,
  gamesPlayedWeekly: 1,
};

const getRank = async (field: 'weeklyPoints' | 'totalPoints', currentValue: number): Promise<number> => {
  const count = await userCollection().countDocuments({ [field]: { $gt: currentValue } });
  return count + 1;
};

export const userService = {
  findById: (userID: string) => userCollection().findOne({ userID }),

  createUser: async (payload: NewUserPayload): Promise<void> => {
    const user = await userCollection().findOne({ userID: payload.userID });

    if (user) {
      return;
    }

    const now = payload.signedUpAt ?? new Date().toISOString();

    await userCollection().insertOne({
      ...payload,
      weeklyPoints: 0,
      totalPoints: 0,
      gamesPlayed: 0,
      gamesPlayedWeekly: 0,
      averagePoints: 0,
      averagePointsWeekly: 0,
      signedUpAt: now,
    });
  },

  applyPointsForUser: async (userID: string, points: number): Promise<void> => {
    const user = await userCollection().findOne({ userID });

    if (!user) {
      console.log(`User with ID ${userID} not found.`);
      return;
    }

    const newGamesPlayed = user.gamesPlayed + 1;
    const newGamesPlayedWeekly = user.gamesPlayedWeekly + 1;
    const newTotalPoints = user.totalPoints + points;
    const newWeeklyPoints = user.weeklyPoints + points;

    const averagePoints = newTotalPoints / newGamesPlayed;
    const averagePointsWeekly = newWeeklyPoints / newGamesPlayedWeekly;

    await userCollection().updateOne(
      { userID },
      {
        $inc: {
          weeklyPoints: points,
          totalPoints: points,
          gamesPlayed: 1,
          gamesPlayedWeekly: 1,
        },
        $set: {
          averagePoints,
          averagePointsWeekly,
        },
      },
    );
  },

  getLeaderboard: async (
    category: LeaderboardCategory,
    page: number,
    limit: number,
  ): Promise<{ leaderboard: LeaderboardUser[]; totalPlayers: number }> => {
    const skip = (page - 1) * limit;
    const sortField = category === 'weekly' ? 'weeklyPoints' : 'totalPoints';

    const leaderboard = await userCollection()
      .find({ [sortField]: { $gt: 0 } } as Filter<UserDocument>)
      .sort({ [sortField]: -1 })
      .project<LeaderboardUser>(leaderboardProjection)
      .skip(skip)
      .limit(limit)
      .toArray();

    const totalPlayers = await userCollection().countDocuments({ [sortField]: { $gt: 0 } });

    return { leaderboard, totalPlayers };
  },

  getScoreSummary: async (userID: string): Promise<UserScoreSummary | null> => {
    return userCollection().findOne({ userID }, { projection: scoreSummaryProjection });
  },

  getPublicProfile: async (userID: string): Promise<LeaderboardUser | null> => {
    return userCollection().findOne({ userID }, { projection: publicProfileProjection });
  },

  getRanks: async (user: { totalPoints: number; weeklyPoints: number }): Promise<{
    userTotalRank: number;
    userWeeklyRank: number;
  }> => {
    const [userTotalRank, userWeeklyRank] = await Promise.all([
      getRank('totalPoints', user.totalPoints),
      getRank('weeklyPoints', user.weeklyPoints),
    ]);

    return { userTotalRank, userWeeklyRank };
  },
};
