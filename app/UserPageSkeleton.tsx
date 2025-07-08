import { LogOut } from "lucide-react"

const UserPageSkeleton = () => {
  return (
    <div className='flex flex-col items-center'>
        <div className="animate-pulse rounded-full p-12 bg-gray-300 dark:bg-gray-700 mt-12"/>

        <h1 className="text-gray-900 dark:text-neutral-200 text-6xl text-center mt-4">Loading User...</h1>

        <div className="h-6 w-48 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse mt-4 mb-8"/>

        <div className='flex flex-col sm:flex-row gap-8 items-center justify-center mb-10 mt-12'>
            <div className='bg-blue-800/20 text-blue-400 border border-blue-400/60 px-8 py-8 rounded-lg shadow-[0_0_30px_0_rgba(96,165,250,0.3)]'>
                <h2 className='text-blue-600 dark:text-blue-500 text-center text-4xl mb-4'>Overall</h2>
                <div className="h-12 w-24 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse mx-auto mb-6"/>
                <div className='flex flex-row justify-between gap-4'>
                    <div className='flex flex-col items-center p-4 bg-gray-200/80 dark:bg-gray-700/50 rounded-lg min-w-[80px]'>
                        <div className="h-8 w-16 bg-gray-300 dark:bg-gray-600 rounded-md animate-pulse mb-6"/>
                        <p className='text-sm text-gray-600 dark:text-gray-400'>Points</p>
                    </div>
                    <div className='flex flex-col items-center p-4 bg-gray-200/80 dark:bg-gray-700/50 rounded-lg min-w-[80px]'>
                        <div className="h-8 w-16 bg-gray-300 dark:bg-gray-600 rounded-md animate-pulse mb-6"/>
                        <p className='text-sm text-gray-600 dark:text-gray-400'>Games</p>
                    </div>
                    <div className='flex flex-col items-center p-4 bg-gray-200/80 dark:bg-gray-700/50 rounded-lg min-w-[80px]'>
                        <div className="h-8 w-16 bg-gray-300 dark:bg-gray-600 rounded-md animate-pulse mb-6"/>
                        <p className='text-sm text-gray-600 dark:text-gray-400'>Avg Points</p>
                    </div>
                </div>
            </div>
            <div className='bg-green-400/20 text-green-400 border border-green-400/60 px-8 py-8 rounded-lg shadow-[0_0_30px_0_rgba(34,197,94,0.3)]'>
                <h2 className='text-green-600 dark:text-green-500 text-center text-4xl mb-4'>Weekly</h2>
                <div className="h-12 w-24 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse mx-auto mb-6"/>
                <div className='flex flex-row justify-between gap-4'>
                    <div className='flex flex-col items-center p-4 bg-gray-200/80 dark:bg-gray-700/50 rounded-lg min-w-[80px]'>
                        <div className="h-8 w-16 bg-gray-300 dark:bg-gray-600 rounded-md animate-pulse mb-6"/>
                        <p className='text-sm text-gray-600 dark:text-gray-400'>Points</p>
                    </div>
                    <div className='flex flex-col items-center p-4 bg-gray-200/80 dark:bg-gray-700/50 rounded-lg min-w-[80px]'>
                        <div className="h-8 w-16 bg-gray-300 dark:bg-gray-600 rounded-md animate-pulse mb-6"/>
                        <p className='text-sm text-gray-600 dark:text-gray-400'>Games</p>
                    </div>
                    <div className='flex flex-col items-center p-4 bg-gray-200/80 dark:bg-gray-700/50 rounded-lg min-w-[80px]'>
                        <div className="h-8 w-16 bg-gray-300 dark:bg-gray-600 rounded-md animate-pulse mb-6"/>
                        <p className='text-sm text-gray-600 dark:text-gray-400'>Avg Points</p>
                    </div>
                </div>
            </div>
        </div>
        <button disabled className="inline-flex h-12 items-center justify-center rounded-md bg-gray-400 dark:bg-gray-600 px-6 font-medium text-neutral-50 transition animate-pulse">
            <LogOut className='mr-2' />Log Out
        </button>
    </div>
  )
}

export default UserPageSkeleton
