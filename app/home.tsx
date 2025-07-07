'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import ScoreScreen from '../Components/GuessScreen/ScoreScreen';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import dynamic from 'next/dynamic';
import Configuration from '../config.json';

// Dynamically import ResultMap to prevent SSR issues
const Map = dynamic(() => import('../Components/Map'), {
    ssr: false,
});

interface Config {
    mapCount: number;
    imageFormat: string;
}

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
    const [previousMap, set_previousMap] = useState<number | null>(null);

    const { data: session } = useSession()

    const config: Config = Configuration as Config;
    const imgPath = `/locationPictures/${mapNumber}.${config.imageFormat}`;

    useEffect(() => {
        let randomMap = Math.floor((Math.random() * config.mapCount) + 1);

        while (randomMap === previousMap && config.mapCount > 1) {
            randomMap = Math.floor((Math.random() * config.mapCount) + 1);
        }
        set_map(randomMap);
    }, [previousMap]);

    const fetchCords = (cords: [number, number]) => {
        set_cords([cords[0],cords[1]]);
    }

    const resetGame = () => {
        set_points(0);
        set_image_cords(null);
        set_hover(false);
        set_cords(null);
        set_submit(false);
        set_previousMap(mapNumber);

        let randomMap = Math.floor((Math.random() * config.mapCount) + 1);

        while (randomMap === mapNumber && config.mapCount > 1) {
            randomMap = Math.floor((Math.random() * config.mapCount) + 1);
        }

        set_map(randomMap);
    };

  const submitGuess = async () => {
    if (!markerCords) {
      console.log('no marker coordinates selected.');
      return;
    }
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${baseUrl}/calcScore`, {
        method:"POST",
        headers: {'Content-Type': 'application/json'},
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
    <div className="h-screen w-screen bg-black overflow-hidden">
        {guessSubmitted && markerCords && imageCords && <ScoreScreen
            attainedScore={points}
            clickedLocation={markerCords}
            actualLocation={imageCords}
            onNextGame={resetGame}
            distanceFromActualLocation={guessDistance}
            />}
        <div className='flex justify-center items-center h-full w-full'>
            <div className='relative h-full w-full'>
                {mapNumber && (
                    <TransformWrapper
                        initialScale={1.5}
                        minScale={0.5}
                        maxScale={5}
                        centerOnInit={true}
                        limitToBounds={false}
                        panning={{ disabled: false, velocityDisabled: false }}
                        wheel={{ step: 0.2 }}
                    >
                        <TransformComponent
                            wrapperStyle={{ height: "100vh", width: "100vw" }}
                            contentStyle={{ height: "100vh", width: "100vw" }}
                        >
                            <LazyLoadImage
                                src={imgPath}
                                alt="Manipal location to guess"
                                className='object-cover h-full w-full'
                                width={1920}
                                height={1080}
                            />
                        </TransformComponent>
                    </TransformWrapper>
                )}
                {!guessSubmitted && mapNumber && <div onMouseOver={() => {set_hover(true)}} onMouseLeave={() => {set_hover(false)}} className='fixed bottom-10 right-10 z-50'>
                    <Map
                    height={mapHover ? 25 : 7.8125}
                    width={mapHover ? 25 : 7.8125}
                    setCords={fetchCords}
                    />
                    <button
                        className={`inline-flex h-12 items-center justify-center rounded-md font-medium mt-2 transition-all ${
                            markerCords
                                ? 'bg-neutral-950 text-neutral-50 active:scale-110 cursor-pointer'
                                : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                        }`}
                        style={{
                            width: mapHover ? '25rem' : '7.8125rem',
                            paddingLeft: '1.5rem',
                            paddingRight: '1.5rem'
                        }}
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
