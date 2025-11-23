export interface UserDocument {
  userID: string;
  userName: string;
  userImage: string | null;
  globalName?: string | null;
  discordUser?: string | null;
  weeklyPoints: number;
  totalPoints: number;
  gamesPlayed: number;
  gamesPlayedWeekly: number;
  averagePoints: number;
  averagePointsWeekly: number;
  signedUpAt: string;
}

export type LeaderboardUser = Pick<
  UserDocument,
  | 'userID'
  | 'userName'
  | 'userImage'
  | 'weeklyPoints'
  | 'totalPoints'
  | 'discordUser'
  | 'averagePoints'
  | 'averagePointsWeekly'
  | 'gamesPlayed'
  | 'gamesPlayedWeekly'
>;

export interface UserScoreSummary
  extends Pick<
    UserDocument,
    | 'weeklyPoints'
    | 'totalPoints'
    | 'averagePoints'
    | 'averagePointsWeekly'
    | 'gamesPlayed'
    | 'gamesPlayedWeekly'
  > {}

export type NewUserPayload = Pick<
  UserDocument,
  'userID' | 'userName' | 'userImage' | 'globalName' | 'discordUser'
> & {
  signedUpAt?: string;
};
