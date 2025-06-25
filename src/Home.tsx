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
    const [mapNumber] = useState(Math.floor((Math.random() * 15) + 1));

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
    }, []);

    const fetchCords = (cords: [number, number]) => {
        set_cords([cords[0],cords[1]]);
    }

    const toRadians = (deg: number): number => deg * Math.PI / 180;


  const submitGuess = () => {
    if (!markerCords || ! imageCords) {
      console.log('no marker coordinates selected.');
      return;
    }

    const R = 6371e3; // Earth's radius
    const lat1 = toRadians(imageCords[0]);
    const lon1 = toRadians(imageCords[1]);
    const lat2 = toRadians(markerCords[0]);
    const lon2 = toRadians(markerCords[1]);

    const deltaLat = lat2 - lat1;
    const deltaLon = lon2 - lon1;

    // Haversine formula
    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Distance in meters
    let distanceInMeters = R * c;

    // if distance is less than 10 meters, set to 0
    if (distanceInMeters < 10) {
      distanceInMeters = 0;
    }
    let points = -2.59*distanceInMeters + 5000
    /*
    Assuming a square map of 1.87km^2, if the guess is on the opposite corner, the points awarded are 0
    Fo a perfect guess, 5k points are awarded.
    */
   if (points < 0) points = 0;
    console.log(points);
    set_points(points);
    set_submit(true);
  }

  return (
    <div>
            {guessSubmitted && markerCords && imageCords && <ScoreScreen
            attainedScore={points}
            clickedLocation={markerCords}
            actualLocation={imageCords}
            />}
        <div className='flex justify-center items-center min-h-screen'>

            <div className='relative'>
                <TransformWrapper>
                    <TransformComponent>
                        <img src={imgPath} className='max-w-screen max-h-screen object-fit'/>
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
