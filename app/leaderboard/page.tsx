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

const page = () => {

  const [selectedPage, setSelectedPage] = useState(1)
  const [leaderboardType, setLeaderboardType] = useState<'total' | 'weekly'>('total')
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardData[]>([])
  const [playerCount, setPlayerCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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
        setLeaderboardData(response.leaderboard)
        setPlayerCount(response.totalPlayers)
      }
      setLoading(false)
    }
    fetchData()
  }, [selectedPage, leaderboardType])
  console.log(leaderboardData)
  return (
    <div className="container mx-auto px-4 py-8">
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
            setSelected={setLeaderboardType}
            pageNumber={selectedPage}
            setLeaderboardType={setLeaderboardType}
        />
      )}
    </div>
  )
}

export default page
