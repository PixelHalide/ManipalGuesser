'use client'

import { useState, useEffect } from 'react'
import { Expand } from "@theme-toggles/react"
import { SessionProvider, useSession } from 'next-auth/react'
import UserIcon from './UserIcon'
import Link from 'next/link'
import Image from 'next/image'
import dark_logo from '../public/logo.png'
import logo from '../public/logo_black.png'
import hamburgerDark from '../public/hamburger-dark.svg'
import hamburgerLight from '../public/hamburger-light.svg'
import SignUpIn from "./SignUpIn"

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const { data: session } = useSession()

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      document.body.style.backgroundColor = '#000000'
    } else {
      document.documentElement.classList.remove('dark')
      document.body.style.backgroundColor = '#e5e7eb'
    }
  }, [darkMode])

  const toggleDarkMode = () => setDarkMode(!darkMode)
  const toggleMenu = () => setMenuOpen(prev => !prev)

  return (
    <div className="bg-gray-200 dark:bg-neutral-900 dark:text-neutral-200 border-[#383838] dark:border-gray-300 border-b-2 w-full transition-all">
      <nav className="relative flex items-center justify-between px-4 py-3 md:px-6">
        <div className="flex items-center">
          <Image
            src={darkMode ? dark_logo : logo}
            alt="Logo"
            className="w-8 h-8"
            width={32}
            height={32}
          />
          <p className="font-prompt font-extrabold text-2xl md:text-4xl mt-0 ml-3 whitespace-nowrap">ManipalGuessr</p>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 hidden lg:flex gap-6 md:gap-4 text-sm lg:text-lg">
            <Link href="/" className="hover:text-gray-600 dark:hover:text-gray-400">Home</Link>
            <Link href="/leaderboard" className="hover:text-gray-600 dark:hover:text-gray-400">Leaderboard</Link>
            <Link href="/contact" className="hover:text-gray-600 dark:hover:text-gray-400">Contact Us</Link>
            <Link href="/about" className="hover:text-gray-600 dark:hover:text-gray-400">About Us</Link>
        </div>
        <div className="flex items-center gap-4">
          <Expand
            toggled={darkMode}
            toggle={toggleDarkMode}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
          <div className='hidden lg:block'>
            <SessionProvider session={session}>
              {!session?.user ? <SignUpIn /> : <UserIcon />}
            </SessionProvider>
          </div>

          <div className="lg:hidden">
            <button onClick={toggleMenu}>
              <Image src={darkMode ? hamburgerDark : hamburgerLight } alt="Menu" width={28} height={28} />
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`lg:hidden bg-neutral-900 text-white flex flex-col items-center transition-all duration-700 ease-in-out transform overflow-hidden
            ${menuOpen
            ? 'max-h-96 opacity-100 scale-100 translate-y-0 py-4 space-y-4 border-t border-neutral-600'
            : 'max-h-0 opacity-0 scale-95 -translate-y-4 py-0 space-y-0 border-t border-transparent'}`}>
            <Link href="/" onClick={toggleMenu} className="hover:text-gray-400 transition-colors">Home</Link>
            <Link href="/leaderboard" onClick={toggleMenu} className="hover:text-gray-400 transition-colors">Leaderboard</Link>
            <Link href="/contact" onClick={toggleMenu} className="hover:text-gray-400 transition-colors">Contact Us</Link>
            <Link href="/about" onClick={toggleMenu} className="hover:text-gray-400 transition-colors">About Us</Link>
            <SessionProvider session={session}>
              {!session?.user ? <SignUpIn /> : <UserIcon />}
            </SessionProvider>
      </div>
    </div>
  )
}

export default Navbar
