'use client';

import { Trophy, Medal, Award } from "lucide-react";
import BoardSelect from "./BoardSelect";
import PageSelect from './PageSelect';

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
  gamesPlayedWeekly: number;
}

interface PageSelectProps {
  totalPlayers: number;
  leaderboardData: LeaderboardData[];
  leaderboardType: 'total' | 'weekly';
  setPageNumber(page: number): void;
  setSelected(type: 'total' | 'weekly'): void;
  pageNumber: number;
}

const Board = ({ leaderboardData, totalPlayers, leaderboardType, setPageNumber, setSelected, pageNumber }: PageSelectProps ) => {


  const getRankIcon = (index: number) => {
    if (pageNumber === 1){
      if (index === 0) {
        return <Trophy className="w-4 h-4 text-yellow-400" />;
      } else if (index === 1) {
        return <Medal className="w-4 h-4 text-gray-300" />;
      } else if (index === 2) {
        return <Award className="w-4 h-4 text-amber-600" />;
      }}
    let rank = index;
    if (pageNumber > 1) {rank += (pageNumber - 1) * 10;}
    return <span className="text-neutral-200">{rank + 1}</span>;
  };

  const getBackgroundColor = (index: number) => {
    if (pageNumber === 1) {
      if (index === 0) return "bg-gradient-to-r from-yellow-500/10 to-yellow-400/5 border-yellow-400/20";
      if (index === 1) return "bg-gradient-to-r from-neutral-100/10 to-gray-400/5 border-gray-400/20";
      if (index === 2) return "bg-gradient-to-r from-amber-600/10 to-amber-500/5 border-amber-500/20";
    }
    return "bg-gray-900/50 border-gray-800/50";
  }

  return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center dark:text-neutral-200 mb-8">
          {leaderboardType === 'total' ? (
            <>
              <span className="text-blue-500">Overall</span> Leaderboard
            </>
          ) : (
            <>
              <span className="text-green-500">Weekly</span> Leaderboard
            </>
          )}
        </h1>
        <BoardSelect
          onSelect={setSelected}
          isSelected={leaderboardType}
        />
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900/80 rounded-lg shadow-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-blue-500 to-purple-600 text-neutral-200">
                  <th className="text-left p-4 text-xl font-semibold">Rank</th>
                  <th className="text-left p-4 text-xl font-semibold">Player</th>
                  <th className="text-center p-4 text-xl font-semibold">Points</th>
                  <th className="text-center p-4 text-xl font-semibold">Avg Points Per game</th>
                  <th className="text-center p-4 text-xl font-semibold">Games Played</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {leaderboardData.map((player, index) => (
                  <tr key={player.userID} className={`hover:bg-gray-700 ${getBackgroundColor(index)}`}>
                    <td className="p-4">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-700 text-blue-800 font-semibold">
                        {getRankIcon(index)}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
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
                    </td>
                    <td className="p-4 text-center">
                      <div className="text-lg font-semibold text-neutral-200">
                        {leaderboardType === 'total' ? player.totalPoints.toFixed(0) : player.weeklyPoints.toFixed(0)} pts
                      </div>
                    </td>
                      <td className="p-4 text-center">
                        <div className="text-lg font-semibold text-neutral-200">
                          {leaderboardType === 'total' ? player.averagePoints.toFixed(0) : player.averagePointsWeekly.toFixed(0)} pts
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="text-lg font-semibold text-neutral-200">
                          {leaderboardType === 'total' ? player.gamesPlayed.toFixed(0) : player.gamesPlayedWeekly.toFixed(0)}
                        </div>
                      </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {leaderboardData.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No leaderboard data available</p>
            </div>
          )}
        </div>
        <PageSelect
          currentPage={pageNumber}
          totalPlayers={totalPlayers}
          onPageChange={(page) => setPageNumber(page)}
        />
    </div>
  )
}

export default Board
