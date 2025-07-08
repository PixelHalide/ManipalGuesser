import Image from 'next/image';

interface UserAPIResponse {
    userData: User;
    userTotalRank: number;
    userWeeklyRank: number;
}

interface User {
    userImage: string;
    userName: string;
    discordUser: string;
    weeklyPoints: number;
    totalPoints: number;
    gamesPlayed: number;
    gamesPlayedWeekly: number;
    averagePoints: number;
    averagePointsWeekly: number;
}

interface PageProps {
  params: Promise<{ userID: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

const UserPage = async ({ params }: PageProps) => {
  const resolvedParams = await params;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fetchUserData/${resolvedParams.userID}`, {
        method: 'GET',
    });

    if (!response.ok) {
        return (
            <div>
                <h1 className="text-black dark:text-neutral-200">Error fetching user data</h1>
            </div>
        );
    }

    const userData: UserAPIResponse = await response.json();

    if (!userData) {
        return (
        <div>
            <h1 className="text-black dark:text-neutral-200">Please log in to view your profile</h1>
        </div>
        );
    }

    const { userData: user, userTotalRank, userWeeklyRank } = userData;

  return (
    <div className='flex flex-col items-center'>
        <Image
            src={user.userImage}
            alt="User Icon"
            width={100}
            height={100}
            className="rounded-full object-cover mt-12"
        />
        <h1 className="text-gray-900 dark:text-neutral-200 text-6xl text-center mt-4">{user.userName}</h1>
        <h2 className="text-gray-600 dark:text-neutral-400 text-2xl text-center">@{user.discordUser}</h2>

        <div className='flex flex-col sm:flex-row gap-8 items-center justify-center mb-10 mt-12'>
            <div className='bg-blue-800/20 text-blue-400 border border-blue-400/60 px-8 py-8 rounded-lg shadow-[0_0_30px_0_rgba(96,165,250,0.3)]'>
                <h2 className='text-blue-600 dark:text-blue-500 text-center text-4xl mb-4'>Overall</h2>
                <p className={` ${userTotalRank === 1 ? 'text-yellow-300 dark:text-shadow-amber-300 text-shadow-black  text-shadow-md' : 'text-gray-900 dark:text-neutral-200'} text-6xl text-center mb-6`}>#{userTotalRank}</p>
                <div className='flex flex-row justify-between gap-4'>
                    <div className='flex flex-col items-center p-4 bg-gray-200/80 dark:bg-gray-700/50 rounded-lg min-w-[80px]'>
                        <p className='text-2xl font-bold text-gray-900 dark:text-white'>{user.totalPoints.toFixed(0)}</p>
                        <p className='text-sm text-gray-600 dark:text-gray-400'>Points</p>
                    </div>
                    <div className='flex flex-col items-center p-4 bg-gray-200/80 dark:bg-gray-700/50 rounded-lg min-w-[80px]'>
                        <p className='text-2xl font-bold text-gray-900 dark:text-white'>{user.gamesPlayed}</p>
                        <p className='text-sm text-gray-600 dark:text-gray-400'>Games</p>
                    </div>
                    <div className='flex flex-col items-center p-4 bg-gray-200/80 dark:bg-gray-700/50 rounded-lg min-w-[80px]'>
                        <p className='text-2xl font-bold text-gray-900 dark:text-white'>{user.averagePoints.toFixed(0)}</p>
                        <p className='text-sm text-gray-600 dark:text-gray-400'>Avg Points</p>
                    </div>
                </div>
            </div>
            <div className='bg-green-400/20 text-green-400 border border-green-400/60 px-8 py-8 rounded-lg shadow-[0_0_30px_0_rgba(34,197,94,0.3)]'>
                <h2 className='text-green-600 dark:text-green-500 text-center text-4xl mb-4'>Weekly</h2>
                <p className={` ${userWeeklyRank === 1 ? 'text-yellow-300 dark:text-shadow-amber-300 text-shadow-black text-shadow-md' : 'text-gray-900 dark:text-neutral-200'} text-6xl text-center mb-6`}>#{userWeeklyRank}</p>
                <div className='flex flex-row justify-between gap-4'>
                    <div className='flex flex-col items-center p-4 bg-gray-200/80 dark:bg-gray-700/50 rounded-lg min-w-[80px]'>
                        <p className='text-2xl font-bold text-gray-900 dark:text-white'>{user.weeklyPoints.toFixed(0)}</p>
                        <p className='text-sm text-gray-600 dark:text-gray-400'>Points</p>
                    </div>
                    <div className='flex flex-col items-center p-4 bg-gray-200/80 dark:bg-gray-700/50 rounded-lg min-w-[80px]'>
                        <p className='text-2xl font-bold text-gray-900 dark:text-white'>{user.gamesPlayedWeekly}</p>
                        <p className='text-sm text-gray-600 dark:text-gray-400'>Games</p>
                    </div>
                    <div className='flex flex-col items-center p-4 bg-gray-200/80 dark:bg-gray-700/50 rounded-lg min-w-[80px]'>
                        <p className='text-2xl font-bold text-gray-900 dark:text-white'>{user.averagePointsWeekly.toFixed(0)}</p>
                        <p className='text-sm text-gray-600 dark:text-gray-400'>Avg Points</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserPage
