import ResultMap from "./ResultMap"
import ProgressBar from "./ProgressBar"

interface ScoreProp {
    attainedScore: number,
    clickedLocation : [number, number],
    actualLocation: [number, number],
    onNextGame: () => void
}

const ScoreScreen = ({ attainedScore, clickedLocation, actualLocation, onNextGame } : ScoreProp) => {
  return (
    <div className='fixed inset-0 bg-black/50 z-50 flex justify-center items-center'>
        <div className='flex flex-col justify-center p-10 bg-[#EEEEEE] dark:bg-neutral-800 rounded-lg text-center'>
            <ResultMap
            clickedLocation={clickedLocation}
            actualLocation={actualLocation}
            />
            <ProgressBar
            targetProgress={((attainedScore*100)/5000)}
            intervalTime={20}
            />
            <div className="grid grid-cols-3 items-center">
              <div></div>
              <p className="text-center dark:text-neutral-200">Attained Score: {attainedScore.toFixed(0)}</p>
              <button onClick={onNextGame} className="inline-flex h-10 md:h-12 items-center justify-center rounded-md bg-neutral-950 dark:bg-neutral-200 px-4 md:px-6 font-medium text-neutral-50 dark:text-neutral-700 transition active:scale-110 cursor-pointer justify-self-end">Next Game</button>
            </div>
        </div>
    </div>
  )
}

export default ScoreScreen
