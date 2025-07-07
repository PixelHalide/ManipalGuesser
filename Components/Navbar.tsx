'use client'

import { useState, useEffect } from 'react'
import { Expand } from "@theme-toggles/react"
import { SessionProvider, useSession } from 'next-auth/react'
import UserIcon from './UserIcon'
import Link from 'next/link'
import Image from 'next/image'
import dark_logo from '../public/logo.png'
import logo from '../public/logo_black.png'
import SignUpIn from "./SignUpIn"


const Navbar = () => {

    const [darkMode, setDarkMode] = useState(true);
    const { data: session } = useSession();

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark')
            document.body.style.backgroundColor = '#000000'
        } else {
            document.documentElement.classList.remove('dark')
            document.body.style.backgroundColor = '#e5e7eb'
        }
    }, [darkMode])

    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
    }

    return (
        <div className={`absolute top-0 z-30 bg-gray-200 dark:bg-neutral-900 dark:text-neutral-200 border-[#383838] dark:border-gray-300 border-b-2 transition-all w-screen`}>
            <nav className="flex flex-wrap md:flex-row justify-between items-center mb-2 pt-2 px-4 text-sm md:text-lg">
                <div>
                    <div className='flex flex-row items-center'>
                        <Image
                            src={darkMode ? dark_logo : logo}
                            alt="Logo"
                            className='w-8 h-8'
                            width={32}
                            height={32}
                        />
                        <p className='font-prompt font-extrabold text-2xl md:text-4xl mt-2 ml-3'>ManipalGuessr</p>
                    </div>
                </div>
                <div className='flex flex-col md:flex-row justify-center items-center'>
                    <div className='p-2'>
                        <Link href="/" className="py-1 px-4 hover:text-gray-600 dark:hover:text-gray-400 transition-colors duration-200">
                            Home
                        </Link>
                    </div>
                    <div className='p-2'>
                        <Link href="/leaderboard" className="py-1 px-4 hover:text-gray-600 dark:hover:text-gray-400 transition-colors duration-200">
                            Leaderboard
                        </Link>
                    </div>
                    <div className='p-2'>
                        <Link href="/contact" className="py-1 px-4 hover:text-gray-600 dark:hover:text-gray-400 transition-colors duration-200">
                            Contact Us
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-4">
                    <Expand
                        toggled={darkMode}
                        toggle={toggleDarkMode}
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                    />
                    <div className="mt-2 md:mt-0">
                        <SessionProvider session={session}>
                            {!session?.user ? <SignUpIn /> : <UserIcon />}
                        </SessionProvider>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar