'use client'

import {useState} from 'react'
import Navbar from './Navbar'

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [dark, set_dark] = useState(true);

  const switchTheme = () => {
    set_dark(!dark);
  }

  return (
    <div className={`min-h-screen flex flex-col bg-[#EEEEEE] dark:bg-[#181818] transition-all ${dark ? 'dark' : ''}`}>
        <Navbar
        switchTheme={switchTheme}
        darkState={dark}
        />
        <div className="flex-grow">
          {children}
        </div>
    </div>
  )
}

export default ThemeProvider
