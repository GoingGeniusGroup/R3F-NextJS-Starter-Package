'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useUser } from '@/context/UserContext/UserContext'

import { LuLogOut } from 'react-icons/lu'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import path from 'path'
import { IoMdArrowRoundBack } from 'react-icons/io'

import Hamburger from 'hamburger-react'

const Navbar = () => {
  const [isToggled, setToggle] = useState(false)

  const [isOpen, setOpen] = useState(false)
  const closeMenu = () => {
    setOpen(false)
  }

  const pathname = usePathname()
  const [hideMiddleNav, setHideMiddleNav] = useState(false)
  const [hideTopRightNav, setHideTopRightNav] = useState(false)

  useEffect(() => {
    if (
      pathname === '/' ||
      pathname === '/slider' ||
      pathname === '/signin' ||
      pathname === '/signup' ||
      pathname === '/slider2'
    ) {
      setHideMiddleNav(true)
    } else {
      setHideMiddleNav(false)
    }

    if (pathname === '/signin' || pathname === '/signup') {
      setHideTopRightNav(true)
    }
  }, [pathname])

  const { user, logout } = useUser()
  const navAnimate = {
    hidden: {
      scaleX: 0,
    },
    show: {
      scaleX: 1,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
    exit: {
      width: 0,
      transition: {
        delay: 0.4,
      },
    },
  }

  return (
    <>
      <motion.nav className='container sticky top-0 z-50 mx-auto flex flex-col items-center justify-between rounded-2xl text-slate-50 '>
        {/* Logo and Sign In/Sign Out */}
        <div className='container absolute mx-auto flex h-20 items-center justify-between px-4 py-2 '>
          {/* Logo */}
          <Link href='' className='flex items-center justify-center pl-1 '>
            <Image
              src='/GGlogo.png'
              className='animate-rotate-y rounded-full p-2 animate-duration-[4000ms] animate-infinite'
              height={85}
              width={85}
              alt='GG Logo'
            />
          </Link>

          {/* SignIn, SignOut and Logout */}
          <div className='flex items-center justify-center'>
            {user ? (
              user.first_name != null ? (
                <div className='flex'>
                  <span className='px-2 text-sm font-medium'>{user.first_name + ' ' + user.last_name}</span>
                  <Link
                    href='/signin'
                    onClick={logout}
                    className='group z-10 hidden items-center justify-end rounded-full hover:scale-105 focus:outline-none md:flex'
                    id='user-menu-button'
                    aria-label='Sign Out'
                  >
                    <LuLogOut className='mr-4 size-6 text-red-500' />
                  </Link>
                  <div className='-mr-2 flex items-center md:hidden'>
                    <Hamburger toggled={isOpen} toggle={setOpen} />
                  </div>
                </div>
              ) : (
                <div className='flex'>
                  <Link
                    href='/signin'
                    onClick={logout}
                    className='group z-10 hidden items-center justify-end rounded-full hover:scale-105  focus:outline-none md:flex'
                    id='user-menu-button'
                  >
                    <LuLogOut className='mr-4 size-6 text-red-500' />
                  </Link>
                  <div className='-mr-2 flex items-center md:hidden'>
                    <Hamburger toggled={isOpen} toggle={setOpen} />
                  </div>
                </div>
              )
            ) : (
              <>
                {hideTopRightNav ? null : (
                  <div>
                    <Link
                      href='/signin'
                      className='rounded-2xl p-2 text-white shadow-md shadow-violet-600 backdrop-blur-xl hover:scale-105 hover:bg-violet-900  '
                    >
                      Sign-In
                    </Link>
                    <div className='-mr-2 flex items-center md:hidden'>
                      <Hamburger toggled={isOpen} toggle={setOpen} />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        {/* For desktop view nav bar */}
        {hideMiddleNav ? null : (
          <div className='container mx-auto flex h-20 items-center justify-center px-4 py-2 '>
            <div className='hidden md:flex'>
              <div className='flex h-16 items-center justify-center gap-2 rounded-full px-20 py-2 shadow-md shadow-[#6B37CA] backdrop-blur-md md:gap-7 lg:gap-14'>
                {pathname === '/maps' ? (
                  <Link href='/avatars' className='py-2 text-2xl font-bold text-[#AD00FF]'>
                    AVATARS
                  </Link>
                ) : (
                  <Link
                    href='/avatars'
                    className='py-2 font-semibold transition duration-300 ease-out hover:scale-105 hover:text-purple-600'
                  >
                    AVATARS
                  </Link>
                )}
                {pathname === '/guilds' ? (
                  <Link href='/guilds' className='py-2 text-2xl font-bold text-[#AD00FF]'>
                    GUILDS
                  </Link>
                ) : (
                  <Link
                    href='/guilds'
                    className='py-2 font-semibold transition duration-300 ease-out hover:scale-105 hover:text-purple-600'
                  >
                    GUILDS
                  </Link>
                )}
                {pathname === '/hero3' ? (
                  <Link href='/hero3' className='py-2 text-2xl font-bold text-[#AD00FF]'>
                    HOME
                  </Link>
                ) : (
                  <Link
                    href='/hero3'
                    className='py-2 font-semibold transition duration-300 ease-out hover:scale-105 hover:text-purple-600'
                  >
                    HOME
                  </Link>
                )}
                {pathname.startsWith('/regions') ? (
                  <Link href='/regions' className='py-2 text-2xl font-bold text-[#AD00FF]'>
                    REGIONS
                  </Link>
                ) : (
                  <Link
                    href='/regions'
                    className='py-2 font-semibold transition duration-300 ease-out hover:scale-105 hover:text-purple-600'
                  >
                    REGIONS
                  </Link>
                )}
                {pathname === '/experience' ? (
                  <Link href='/experience' className='py-2 text-2xl font-bold text-[#AD00FF]'>
                    EXP
                  </Link>
                ) : (
                  <Link
                    href='/experience'
                    className='py-2 font-semibold transition duration-300 ease-out hover:scale-105 hover:text-purple-600'
                  >
                    EXP
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Hamburger */}

        <div
          className={`fixed inset-0 md:hidden ${isOpen ? 'bg-black/30 opacity-100' : 'pointer-events-none opacity-0 '}`}
          onClick={closeMenu}
        ></div>
        <div
          className={`fixed inset-y-0 left-0 z-30 transition-all duration-200 md:hidden ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          } flex w-[75%] flex-col bg-white shadow-xl dark:bg-black`}
        >
          <div className='p-4 '>
            <button
              type='button'
              onClick={() => setOpen(false)}
              className='rounded-md text-gray-300 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white'
              aria-label='Close panel'
            >
              <span className='sr-only'>Close panel</span>
              <IoMdArrowRoundBack className='text-black dark:text-white' />
            </button>
          </div>
          <div className='px-4 py-6 '>
            {/* Navbar for Hamburger */}
            <ul className='flex flex-col gap-y-4'>
              <li>
                <Link
                  href='/avatars'
                  className='w-full rounded-b-2xl border-violet-500 py-4 text-center font-semibold hover:border-b-2 hover:text-lg hover:text-fuchsia-300'
                >
                  AVATARS
                </Link>
              </li>
              <li>
                <Link
                  href='/guilds'
                  className='w-full rounded-b-2xl border-violet-500 py-4 text-center font-semibold hover:border-b-2 hover:text-lg hover:text-fuchsia-300'
                >
                  GUILDS
                </Link>
              </li>
              <li>
                <Link
                  href='hero3'
                  className='w-full rounded-b-2xl border-violet-500 py-4 text-center font-semibold hover:border-b-2 hover:text-lg hover:text-fuchsia-300'
                >
                  HOME
                </Link>
              </li>
              <li>
                <Link href='regions'>REGIONS</Link>
              </li>
              <li>
                <Link href='experience'>EXP</Link>
              </li>
              <li>
                <Link
                  href='/signin'
                  onClick={logout}
                  className='flex w-full items-center justify-center rounded-b-2xl border-violet-500 py-4 hover:border-b-2 hover:text-lg hover:text-fuchsia-300'
                  aria-label='Sign Out'
                >
                  <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24'>
                    <path
                      fill='currentColor'
                      fillRule='evenodd'
                      d='M3.5 9.568v4.864c0 2.294 0 3.44.722 4.153c.655.647 1.674.706 3.596.712c-.101-.675-.122-1.48-.128-2.428a.734.734 0 0 1 .735-.734a.735.735 0 0 1 .744.726c.006 1.064.033 1.818.14 2.39c.103.552.267.87.507 1.108c.273.27.656.445 1.38.54c.744.1 1.73.101 3.145.101h.985c1.415 0 2.401-.002 3.146-.1c.723-.096 1.106-.272 1.378-.541c.273-.27.451-.648.548-1.362c.1-.734.102-1.709.102-3.105V8.108c0-1.397-.002-2.37-.102-3.105c-.097-.714-.275-1.093-.547-1.362c-.273-.27-.656-.445-1.38-.54C17.728 3 16.742 3 15.327 3h-.985c-1.415 0-2.401.002-3.146.1c-.723.096-1.106.272-1.379.541c-.24.237-.404.556-.507 1.108c-.107.572-.134 1.326-.14 2.39a.735.735 0 0 1-.744.726a.734.734 0 0 1-.735-.734c.006-.948.027-1.753.128-2.428c-1.922.006-2.94.065-3.596.712c-.722.713-.722 1.86-.722 4.153m2.434 2.948a.723.723 0 0 1 0-1.032l1.97-1.946a.746.746 0 0 1 1.046 0a.723.723 0 0 1 0 1.032l-.71.7h7.086c.408 0 .74.327.74.73c0 .403-.332.73-.74.73H8.24l.71.7a.723.723 0 0 1 0 1.032a.746.746 0 0 1-1.046 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* Hamburger */}
      </motion.nav>
    </>
  )
}

export default Navbar
