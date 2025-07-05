'use client';

import { useState } from 'react';
import Board from "./Board";
import BoardSelect from "./BoardSelect";

interface LeaderboardData {
  userID: string;
  userName: string;
  userImage: string;
  weeklyPoints: number;
  totalPoints: number;
  discordUser: string;
  averagePoints: number;
  averagePointsWeekly: number;
  gamesPlayed: number;
  gamesPlayedWeekly?: number;
}

const PageContainer = ({leaderboardData}: {leaderboardData: LeaderboardData[]}) => {

  return (
    <div>
        <div className="container mx-auto px-4 py-8">
            <Board leaderboardData={leaderboardData} />
        </div>

    </div>
  )
}

export default PageContainer
