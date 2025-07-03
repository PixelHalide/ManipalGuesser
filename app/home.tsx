'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import ScoreScreen from '../Components/GuessScreen/ScoreScreen';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import dynamic from 'next/dynamic';

// Dynamically import ResultMap to prevent SSR issues
const Map = dynamic(() => import('../Components/Map'), {
    ssr: false,
});

interface BackendReturn {
    points: number
    imageCords: [number, number]
    distanceInMeters: number
}

const Home = () => {

    const [points, set_points] =  useState<number>(0);
    const [imageCords, set_image_cords] =  useState<[number, number] | null>();
    const [mapHover, set_hover] = useState(false);
    const [guessDistance, set_distance] = useState<number>(0);
    const [markerCords, set_cords] = useState<[number, number] | null>(null);
    const [guessSubmitted, set_submit] = useState(false);
    const [mapNumber, set_map] = useState<number | null>(null);

    const { data: session } = useSession()

    const imgPath = `/manipalPictures/${mapNumber}.jpg`

    useEffect(() => {
        set_map(Math.floor((Math.random() * 15) + 1));
    }, []);

    const fetchCords = (cords: [number, number]) => {
        set_cords([cords[0],cords[1]]);
    }

    const resetGame = () => {
        set_points(0);
        set_image_cords(null);
        set_hover(false);
        set_cords(null);
        set_submit(false);
        set_map(Math.floor((Math.random() * 15) + 1));
    };

  const submitGuess = async () => {
    if (!markerCords) {
      console.log('no marker coordinates selected.');
      return;
    }
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${baseUrl}/calcScore`, {
        method:"POST",
        headers: {'Content-Type': 'application/json', },
        body: JSON.stringify({"mapNumber":mapNumber,"submittedCords":markerCords, "userID": session?.user?.id || null}),
    })
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong on the server.');
    }

    const data: BackendReturn = await response.json();

    console.log(data);
    set_points(data.points);
    set_image_cords(data.imageCords)
    set_distance(data.distanceInMeters);
    set_submit(true);
  }

  return (
    <div>
        {guessSubmitted && markerCords && imageCords && <ScoreScreen
            attainedScore={points}
            clickedLocation={markerCords}
            actualLocation={imageCords}
            onNextGame={resetGame}
            distanceFromActualLocation={guessDistance}
            />}
        <div className='flex justify-center items-center h-screen overflow-hidden'>
            <div className='relative'>
                {mapNumber && (
                    <TransformWrapper>
                        <TransformComponent>
                            <LazyLoadImage
                                src={imgPath}
                                alt="Manipal location to guess"
                                className='max-h-screen object-contain'
                                width={1920}
                                height={1080}
                            />
                        </TransformComponent>
                    </TransformWrapper>
                )}
                {!guessSubmitted && mapNumber && <div onMouseOver={() => {set_hover(true)}} onMouseLeave={() => {set_hover(false)}} className='absolute bottom-10 right-10'>
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
                        onClick={() => {
                            if (markerCords) {
                                submitGuess();
                            }
                        }}
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
