'use client';

import { ArrowLeft, Trophy, Medal, Award, User, ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import BoardSelect from "./BoardSelect";
import { useState } from 'react';

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

const Board = ({ leaderboardData}: {leaderboardData: LeaderboardData[]}) => {

  const [leaderboardType, setSelected] = useState<'overall' | 'weekly'>('overall');

  return (
      <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center dark:text-neutral-200 mb-8">
        {leaderboardType === 'overall' ? (
          <>
            <span className="text-blue-400">Overall</span> Leaderboard
          </>
        ) : (
          <>
            <span className="text-green-400">Weekly</span> Leaderboard
          </>
        )}
      </h1>
      <BoardSelect
        onSelect={setSelected}
        isSelected={leaderboardType}
      />
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-900/80 rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-neutral-200 p-4">
            <h2 className="text-xl font-semibold">Rank</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {leaderboardData.map((player, index) => (
              <div key={player.userID} className="p-4 flex items-center justify-between hover:bg-gray-700">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-700 text-blue-800 font-semibold">
                      {index === 0 ? (
                        <Trophy className="w-4 h-4 text-yellow-400" />
                      ) : index === 1 ? (
                        <Medal className="w-4 h-4 text-gray-300" />
                      ) : index === 2 ? (
                        <Award className="w-4 h-4 text-amber-600" />
                      ) : (
                        <span className="text-gray-500">{index + 1}</span>
                      )}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 ml-6">
                    <img
                      src={player.userImage}
                      alt={player.userName}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex flex-col">
                      <h3 className="font-medium text-neutral-200">{player.userName}</h3>
                      <h4 className="text-sm text-neutral-500">@{player.discordUser}</h4>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-neutral-200">
                    {player.totalPoints.toFixed(0)} pts
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {leaderboardData.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No leaderboard data available</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Board
