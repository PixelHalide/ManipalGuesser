import ResultMap from "./ResultMap"

interface ScoreProp {
    attainedScore: number,
    clickedLocation : [number, number],
    actualLocation: [number, number]
}

const ScoreScreen = ({ attainedScore, clickedLocation, actualLocation } : ScoreProp) => {
  return (
    <div className='fixed inset-0 bg-black/50 z-50'>
        <div className='flex flex-col justify-center p-10 bg-white rounded-lg text-center'>
            <ResultMap
            clickedLocation={clickedLocation}
            actualLocation={actualLocation}
            />
            <p>Attained Score: {attainedScore.toFixed(0)}</p>
        </div>

    </div>
  )
}

export default ScoreScreen
