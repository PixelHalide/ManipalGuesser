import ResultMap from "./ResultMap"
import ProgressBar from "./ProgressBar"

interface ScoreProp {
    attainedScore: number,
    clickedLocation : [number, number],
    actualLocation: [number, number]
}

const ScoreScreen = ({ attainedScore, clickedLocation, actualLocation } : ScoreProp) => {
  return (
    <div className='fixed inset-0 bg-black/50 z-50 flex justify-center items-center'>
        <div className='flex flex-col justify-center p-10 bg-white rounded-lg text-center'>
            <ResultMap
            clickedLocation={clickedLocation}
            actualLocation={actualLocation}
            />
            <ProgressBar
            targetProgress={((attainedScore*100)/5000)}
            intervalTime={20}
            />
            <p>Attained Score: {attainedScore.toFixed(0)}</p>
        </div>
    </div>
  )
}

export default ScoreScreen
