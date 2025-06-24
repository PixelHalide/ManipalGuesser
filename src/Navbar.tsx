import { Expand } from "@theme-toggles/react"
import dark_logo from './assets/logo.png'
import logo from './assets/logo_black.png'

interface DarkModeProp {
    darkState: boolean,
    switchTheme: () => void
}

const Navbar = ({switchTheme, darkState} : DarkModeProp) => {

  return (
    <div className='sticky top-0 z-30 bg-[#EEEEEE] dark:bg-[#212121] dark:text-neutral-200 border-[#383838] dark:border-gray-300 border-b-2'>
        <nav className="flex flex-wrap flex-col md:flex-row justify-between items-center mb-2 pt-2 px-4 text-sm md:text-lg">
            <div>
              <div className='flex flex-row'>
                <img src={`${darkState ? dark_logo : logo}`} alt="Logo" className='w-10 h-10'/>
                <p className='font-prompt font-extrabold text-2xl md:text-4xl mx-4'>ManipalGuessr</p>
              </div>
            </div>
              <div className='flex flex-col md:flex-row justify-center items-center'>
                <div className='hover:bg-gray-200 p-2 rounded-2xl transition duration-200 dark:hover:text-black'>
                  <div className="py-1 px-4 rounded transition-all">
                    Home
                  </div>
                </div>
                <div className='hover:bg-gray-200 p-2 rounded-2xl transition duration-200 dark:hover:text-black'>
                  <div className="py-1 px-4 rounded hover:text-gray-700 transition-all">
                    About Us
                  </div>
                </div>
                <div className='hover:bg-gray-200 p-2 rounded-2xl transition duration-200 dark:hover:text-black'>
                  <div className="py-1 px-4 rounded hover:text-gray-700 transition-all">
                    Contact Us
                  </div>
                </div>
              </div>
            <Expand toggled={darkState} toggle={switchTheme}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}  />
        </nav>
    </div>
  )
}

export default Navbar