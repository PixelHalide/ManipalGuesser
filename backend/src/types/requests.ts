export interface CalcScoreRequestBody {
  mapNumber: number;
  submittedCords: [number, number];
  userID?: string | null;
}

export interface SignUpRequestBody {
  userName: string;
  userImage: string | null;
  userID: string;
  globalName?: string | null;
  discordUser?: string | null;
}

export interface FeedbackRequestBody {
  name?: string;
  message: string;
}

export type LeaderboardCategory = 'weekly' | 'total';
