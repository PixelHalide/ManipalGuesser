import { useState, useEffect } from 'react'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { gps } from "exifr";
import ScoreScreen from './GuessScreen/ScoreScreen';
import Map from './Map'

const Home = () => {

    const [points, set_points] =  useState<number>(0);
    const [imageCords, set_image_cords] =  useState<[number, number] | null>();
    const [mapHover, set_hover] = useState(false);
    const [markerCords, set_cords] = useState<[number, number] | null>(null);
    const [guessSubmitted, set_submit] = useState(false);
    const [mapNumber, set_map] = useState(Math.floor((Math.random() * 15) + 1));

    const imgPath = `/manipalPictures/${mapNumber}.jpg`

    // Extract EXIF GPS data from the test image on mount using exifr
    useEffect(() => {
        async function extractExif() {
            try {
                const response = await fetch(imgPath);
                const blob = await response.blob();
                const coords = await gps(blob as Blob);
                if (coords?.latitude != null && coords?.longitude != null) {
                    set_image_cords([coords.latitude, coords.longitude]);
                } else {
                    console.log('No GPS data found in EXIF');
                }
            } catch (err) {
                console.error('Error extracting EXIF:', err);
            }
        }
        extractExif();
    }, [mapNumber]);

    const fetchCords = (cords: [number, number]) => {
        set_cords([cords[0],cords[1]]);
    }

    const resetGame = () => {
        // Reset all game state
        set_points(0);
        set_image_cords(null);
        set_hover(false);
        set_cords(null);
        set_submit(false);
        // Generate new random map number
        set_map(Math.floor((Math.random() * 15) + 1));
    };

  const submitGuess = async () => {
    if (!markerCords || ! imageCords) {
      console.log('no marker coordinates selected.');
      return;
    }
    const response = await fetch("http://localhost:8000/calcScore", {
        method:"POST",
        headers: {'Content-Type': 'application/json', },
        body: JSON.stringify({"mapNumber":mapNumber,"submittedCords":markerCords}),
    })
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong on the server.');
    }

    const data = await response.json();

    console.log(data);
    set_points(data.points);
    set_submit(true);
  }

  return (
    <div>
        {guessSubmitted && markerCords && imageCords && <ScoreScreen
            attainedScore={points}
            clickedLocation={markerCords}
            actualLocation={imageCords}
            onNextGame={resetGame}
            />}
        <div className='flex justify-center items-center min-h-screen max'>

            <div className='relative'>
                <TransformWrapper>
                    <TransformComponent>
                        <img src={imgPath} className='max-w-screen max-h-screen object-contain h-fit'/>
                    </TransformComponent>
                </TransformWrapper>
                {!guessSubmitted && <div onMouseOver={() => {set_hover(true)}} onMouseLeave={() => {set_hover(false)}} className='absolute bottom-10 right-10'>
                    <Map
                    height={mapHover ? 400 : 125}
                    width={mapHover ? 400 : 125}
                    setCords={fetchCords}
                    />
                    <button
                        className={`inline-flex h-12 items-center justify-center rounded-md px-6 font-medium mt-2 transition-all ${
                            markerCords
                                ? 'bg-neutral-950 text-neutral-50 active:scale-110 cursor-pointer'
                                : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                        }`}
                        style={{ width: mapHover ? 400 : 125 }}
                        onClick={() => {markerCords && submitGuess()}}
                        disabled={!markerCords}
                    >
                        Submit
                    </button>
                </div>}
            </div>
        </div>
    </div>
  )
}

export default Home
