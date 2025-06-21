import { useState } from 'react'
//import Image from './Image'
import Map from './Map'
import test from './assets/test.jpg'

const Home = () => {

    const [mapHover, set_hover] = useState(false);

  return (
    <div>
        <div className='flex justify-center items-center min-h-screen'>
            <div className='relative'>
                <img src={test} className='max-w-screen max-h-screen'/>
                <div onMouseOver={() => {set_hover(true)}} onMouseLeave={() => {set_hover(false)}} className='absolute bottom-10 right-10'>
                    <Map
                    height={mapHover ? 400 : 125}
                    width={mapHover ? 400 : 125}/>
                    <button
                        className={`inline-flex h-12 items-center justify-center rounded-md bg-neutral-950 px-6 font-medium text-neutral-50 active:scale-110 mt-2 transition-all`}
                        style={{ width: mapHover ? 400 : 125 }}
                    >
                        Click me
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home
