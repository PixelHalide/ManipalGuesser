import ResultMap from "./ResultMap"

interface ScoreProp {
    attainedScore: number,
    clickedLocation : [number, number],
    actualLocation: [number, number]
}

const ScoreScreen = ({ attainedScore, clickedLocation, actualLocation } : ScoreProp) => {
  return (
    <div className='fixed inset-0 bg-black/50 z-50'>
        <div className='justify-center px-100 py-50 bg-white rounded-lg'>
            <ResultMap
            clickedLocation={clickedLocation}
            actualLocation={actualLocation}
            />
        </div>
    <p>Attained Score: {attainedScore}</p>
    </div>
  )
}

export default ScoreScreen
