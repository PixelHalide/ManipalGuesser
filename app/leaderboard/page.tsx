'use client';

import { useState, useEffect } from 'react';
import Board from "./Board";
import BoardSkeleton from './SkeletonComps/BoardSkeleton'

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

const Page = () => {

  const [selectedPage, setSelectedPage] = useState(1);
  const [leaderboardType, setLeaderboardType] = useState<'total' | 'weekly'>('total');
  const [cachedTotalPlayers, setCachedTotalPlayers] = useState<{total: number, weekly: number}>({
    total: 0,
    weekly: 0
  });
  const [cachedPage, setCachedPage] = useState<{
    total: LeaderboardData[][],
    weekly: LeaderboardData[][]
  }>({
    total: [],
    weekly: []
  });
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardData[]>([]);
  const [playerCount, setPlayerCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleLeaderboardTypeChange = (type: 'total' | 'weekly') => {
  setLeaderboardType(type);
  setSelectedPage(1);
};

  useEffect(() => {
    if (!cachedPage[leaderboardType][selectedPage - 1]) {
      const fetchData = async () => {
      setLoading(true)
      const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leaderboard/${leaderboardType}/${selectedPage}`, {
        "method": "GET",
        headers: {
          'Content-Type': 'application/json',
          "ngrok-skip-browser-warning": "true"
        }
      })
      if (data.ok) {
        const response = await data.json()
        setCachedPage(prev => ({
          ...prev,
          [leaderboardType]: {
            ...prev[leaderboardType],
            [selectedPage - 1]: response.leaderboard
          }
        }));
        setCachedTotalPlayers(prev => ({
          ...prev,
          [leaderboardType]: response.totalPlayers
        }));
        setLeaderboardData(response.leaderboard);
        setPlayerCount(response.totalPlayers);
      }
      setLoading(false)
    }
    fetchData()}
    else {
      setLeaderboardData(cachedPage[leaderboardType][selectedPage - 1]);
      setPlayerCount(cachedTotalPlayers[leaderboardType]);
      setLoading(false);
    }
  }, [selectedPage, leaderboardType])
  console.log(leaderboardData)
  return (
    <div className="container mx-auto px-4 pb-8">
      {loading
        ? <BoardSkeleton
        isSelected={leaderboardType}
        playerCount={playerCount}
        selectedPage={selectedPage} />
        : (
        <Board
            leaderboardData={leaderboardData}
            totalPlayers={playerCount}
            leaderboardType={leaderboardType}
            setPageNumber={setSelectedPage}
            setSelected={handleLeaderboardTypeChange}
            pageNumber={selectedPage}
        />
      )}
    </div>
  )
}

export default Page
