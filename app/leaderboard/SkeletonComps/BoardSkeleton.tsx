import BoardSelect from "./BoardSelectSkeleton"
import SkeletonBody from "./SkeletonBody";

interface LoadingProps {
  isSelected: 'total' | 'weekly';
}

const BoardSkeleton = ({ isSelected }: LoadingProps) => {

  return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center dark:text-neutral-200 mb-8">
          Loading Leaderboard...
        </h1>
        <BoardSelect isSelected={isSelected} />
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
                {Array.from({ length: 10 }).map((_, index) => (
                  <SkeletonBody key={index} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
    </div>
  )
}

export default BoardSkeleton
