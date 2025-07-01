'use client'

import { useState, useEffect } from 'react'
import { Expand } from "@theme-toggles/react"
import { Session } from "next-auth"
import UserIcon from './UserIcon'
import Link from 'next/link'
import Image from 'next/image'
import dark_logo from '../public/logo.png'
import logo from '../public/logo_black.png'
import SignUpIn from "./SignUpIn"

interface NavbarProps {
    session: Session | null
}

const Navbar = ({ session }: NavbarProps) => {
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark')
            document.body.style.backgroundColor = '#212121'
        } else {
            document.documentElement.classList.remove('dark')
            document.body.style.backgroundColor = '#EEEEEE'
        }
    }, [darkMode])

    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
    }

    console.log(session)
    return (
        <div className={`sticky top-0 z-30 bg-[#EEEEEE] dark:bg-[#212121] dark:text-neutral-200 border-[#383838] dark:border-gray-300 border-b-2 transition-all`}>
            <nav className="flex flex-wrap flex-col md:flex-row justify-between items-center mb-2 pt-2 px-4 text-sm md:text-lg">
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
                    <div className='hover:bg-gray-200 p-2 rounded-2xl transition duration-200 dark:hover:text-black'>
                        <Link href="/" className="py-1 px-4 rounded transition-all">
                            Home
                        </Link>
                    </div>
                    <div className='hover:bg-gray-200 p-2 rounded-2xl transition duration-200 dark:hover:text-black'>
                        <Link href="/leaderboard" className="py-1 px-4 rounded hover:text-gray-700 transition-all">
                            Leaderboard
                        </Link>
                    </div>
                    <div className='hover:bg-gray-200 p-2 rounded-2xl transition duration-200 dark:hover:text-black'>
                        <div className="py-1 px-4 rounded hover:text-gray-700 transition-all">
                            Contact Us
                        </div>
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
                        {!session?.user ? <SignUpIn /> : <UserIcon session={session} />}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar