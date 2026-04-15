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

export interface SubmissionRequestBody {
  boardPercentage: number;
  metMarks: number;
  bandScore: number;
  predictedRank: number;
}

export type LeaderboardCategory = 'weekly' | 'total';
