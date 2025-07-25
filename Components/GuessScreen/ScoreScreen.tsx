'use client'

import dynamic from 'next/dynamic'
import ProgressBar from "./ProgressBar"

// Dynamically import ResultMap to prevent SSR issues
const ResultMap = dynamic(() => import('./ResultMap'), {
    ssr: false
})

interface ScoreProp {
    attainedScore: number,
    clickedLocation : [number, number],
    actualLocation: [number, number],
    distanceFromActualLocation: number,
    onNextGame: () => void
}

const ScoreScreen = ({ attainedScore, clickedLocation, actualLocation, distanceFromActualLocation,  onNextGame } : ScoreProp) => {
  return (
    <div className='fixed inset-0 bg-black/50 z-50 flex justify-center items-center'>
        <div className='flex flex-col max-w-[95vw] justify-center p-4 md:p-10 bg-[#EEEEEE] dark:bg-neutral-800 rounded-lg text-center'>
            <div className='overflow-hidden rounded-lg'>
              <ResultMap
              clickedLocation={clickedLocation}
              actualLocation={actualLocation}
              />
            </div>
            <ProgressBar
            targetProgress={((attainedScore*100)/5000)}
            intervalTime={20}
            />
            <div className="flex flex-col md:grid md:grid-cols-3 items-center gap-4">
              <div className="hidden md:block"></div>
              <div className='flex flex-col items-center'>
                <p className="text-center dark:text-neutral-200">Score: {attainedScore.toFixed(0)}</p>
                <p className="text-center dark:text-neutral-200">Distance: {distanceFromActualLocation.toFixed(2)} meters</p>
              </div>
              <button onClick={onNextGame} className="inline-flex h-10 md:h-12 items-center justify-center rounded-md bg-neutral-950 dark:bg-neutral-200 px-4 md:px-6 font-medium text-neutral-50 dark:text-neutral-700 transition active:scale-110 cursor-pointer md:justify-self-end">Next Game</button>
            </div>
        </div>
    </div>
  )
}

export default ScoreScreen
