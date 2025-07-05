import PageContainer from "./PageContainer";

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

const page = async () => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leaderboard/total/1`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  let leaderboardData: LeaderboardData[] = [];

  if (data.ok) {
    const response = await data.json();
    leaderboardData = response.leaderboard;
  }

  console.log(leaderboardData);

  return (
    <div>
      <PageContainer leaderboardData={leaderboardData} />
    </div>
  )
}

export default page
