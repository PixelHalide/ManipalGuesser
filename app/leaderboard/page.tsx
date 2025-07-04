'use client';

interface LeaderboardData {
  userID: string;
  userName: string;
  userEmail: string;
  userImage: string;
  weeklyPoints: number;
  totalPoints: number;
  signedUpAt: string;
}

const page = async () => {

  let data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leaderboard/total/0`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  let leaderboardData: LeaderboardData[] = [];
  return (
    <div>

    </div>
  )
}

export default page
