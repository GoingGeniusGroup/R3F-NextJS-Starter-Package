'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useUser } from '@/context/UserContext/UserContext'

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: '-100%' },
}

const Navbar = ({ user }) => {
  const [isToggled, setToggle] = useState(false)

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
      <motion.nav
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className='sticky top-0 container mx-auto flex flex-col items-center justify-between z-10 border-b-1 backdrop-blur-xl shadow-md shadow-violet-500 rounded-2xl text-slate-50 '
      >
        <div className='container mx-auto flex items-center justify-between px-6 py-2 h-20'>
          <Link href='' className='flex relative items-center justify-center pl-1'>
            <img src='/aa.png' className='rounded-full h-20 p-2'></img>
          </Link>

          <div className='hidden md:flex'>
            <div className='flex items-center justify-center gap-2 md:gap-8 rounded-full border-x-2 px-20 py-3 shadow-md shadow-violet-600'>
              <Link href='#' className='font-semibold hover:border-b-2 hover:text-sky-600 py-4'>
                Home
              </Link>
              <Link href='#' className='font-semibold hover:border-b-2 hover:text-sky-600 py-4'>
                Skills
              </Link>
              <Link href='#' className='font-semibold hover:border-b-2 hover:text-sky-600 py-4'>
                Profile
              </Link>
            </div>
          </div>
          <div className='relative flex items-center justify-center'>
            <span className='px-2 font-medium text-lg'>John Doe</span>
            <Link
              href='#'
              className='hidden md:flex items-center justify-end group focus:outline-none z-10 hover:ring-2 hover:ring-white hover:ring-offset-2 hover:ring-offset-gray-800 rounded-full'
              id='user-menu-button'
            >
              <svg xmlns='http://www.w3.org/2000/svg' width='25' height='25' viewBox='0 0 24 24'>
                <path
                  fill='currentColor'
                  fill-rule='evenodd'
                  d='M3.5 9.568v4.864c0 2.294 0 3.44.722 4.153c.655.647 1.674.706 3.596.712c-.101-.675-.122-1.48-.128-2.428a.734.734 0 0 1 .735-.734a.735.735 0 0 1 .744.726c.006 1.064.033 1.818.14 2.39c.103.552.267.87.507 1.108c.273.27.656.445 1.38.54c.744.1 1.73.101 3.145.101h.985c1.415 0 2.401-.002 3.146-.1c.723-.096 1.106-.272 1.378-.541c.273-.27.451-.648.548-1.362c.1-.734.102-1.709.102-3.105V8.108c0-1.397-.002-2.37-.102-3.105c-.097-.714-.275-1.093-.547-1.362c-.273-.27-.656-.445-1.38-.54C17.728 3 16.742 3 15.327 3h-.985c-1.415 0-2.401.002-3.146.1c-.723.096-1.106.272-1.379.541c-.24.237-.404.556-.507 1.108c-.107.572-.134 1.326-.14 2.39a.735.735 0 0 1-.744.726a.734.734 0 0 1-.735-.734c.006-.948.027-1.753.128-2.428c-1.922.006-2.94.065-3.596.712c-.722.713-.722 1.86-.722 4.153m2.434 2.948a.723.723 0 0 1 0-1.032l1.97-1.946a.746.746 0 0 1 1.046 0a.723.723 0 0 1 0 1.032l-.71.7h7.086c.408 0 .74.327.74.73c0 .403-.332.73-.74.73H8.24l.71.7a.723.723 0 0 1 0 1.032a.746.746 0 0 1-1.046 0z'
                  clip-rule='evenodd'
                />
              </svg>
              <span className='hidden group-hover:flex text-sm font-semibold'>Logout</span>
            </Link>
            <button className='md:hidden' id='nav-hamburger' onClick={() => setToggle(!isToggled)}>
              <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24'>
                <path
                  fill='currentColor'
                  d='M12 22c-4.714 0-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22'
                  opacity='.5'
                />
                <path
                  fill='currentColor'
                  d='M18.75 8a.75.75 0 0 1-.75.75H6a.75.75 0 0 1 0-1.5h12a.75.75 0 0 1 .75.75m0 4a.75.75 0 0 1-.75.75H6a.75.75 0 0 1 0-1.5h12a.75.75 0 0 1 .75.75m0 4a.75.75 0 0 1-.75.75H6a.75.75 0 0 1 0-1.5h12a.75.75 0 0 1 .75.75'
                />
              </svg>
            </button>
          </div>
        </div>

        {isToggled && (
          <motion.div
            className='mobile-nav-items w-full md:hidden'
            variants={navAnimate}
            initial='hidden'
            animate='show'
            exit='exit'
          >
            <div className='flex flex-col items-center justify-center gap-4 md:gap-8 z-10 rounded-b-3xl shadow-md shadow-violet-600'>
              <Link
                href='#'
                className='w-full text-center font-semibold rounded-b-2xl hover:border-b-2 border-violet-500 hover:text-fuchsia-300 py-4 hover:text-lg'
              >
                Home
              </Link>
              <Link
                href='#'
                className='w-full text-center font-semibold rounded-b-2xl hover:border-b-2 border-violet-500 hover:text-fuchsia-300 py-4 hover:text-lg'
              >
                Skills
              </Link>
              <Link
                href='#'
                className='w-full text-center font-semibold rounded-b-2xl hover:border-b-2 border-violet-500 hover:text-fuchsia-300 py-4 hover:text-lg'
              >
                Profile
              </Link>
              <Link
                href='#'
                className='w-full flex justify-center items-center rounded-b-2xl hover:border-b-2 border-violet-500 hover:text-fuchsia-300 py-4 hover:text-lg'
              >
                <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24'>
                  <path
                    fill='currentColor'
                    fillRule='evenodd'
                    d='M3.5 9.568v4.864c0 2.294 0 3.44.722 4.153c.655.647 1.674.706 3.596.712c-.101-.675-.122-1.48-.128-2.428a.734.734 0 0 1 .735-.734a.735.735 0 0 1 .744.726c.006 1.064.033 1.818.14 2.39c.103.552.267.87.507 1.108c.273.27.656.445 1.38.54c.744.1 1.73.101 3.145.101h.985c1.415 0 2.401-.002 3.146-.1c.723-.096 1.106-.272 1.378-.541c.273-.27.451-.648.548-1.362c.1-.734.102-1.709.102-3.105V8.108c0-1.397-.002-2.37-.102-3.105c-.097-.714-.275-1.093-.547-1.362c-.273-.27-.656-.445-1.38-.54C17.728 3 16.742 3 15.327 3h-.985c-1.415 0-2.401.002-3.146.1c-.723.096-1.106.272-1.379.541c-.24.237-.404.556-.507 1.108c-.107.572-.134 1.326-.14 2.39a.735.735 0 0 1-.744.726a.734.734 0 0 1-.735-.734c.006-.948.027-1.753.128-2.428c-1.922.006-2.94.065-3.596.712c-.722.713-.722 1.86-.722 4.153m2.434 2.948a.723.723 0 0 1 0-1.032l1.97-1.946a.746.746 0 0 1 1.046 0a.723.723 0 0 1 0 1.032l-.71.7h7.086c.408 0 .74.327.74.73c0 .403-.332.73-.74.73H8.24l.71.7a.723.723 0 0 1 0 1.032a.746.746 0 0 1-1.046 0z'
                    clipRule='evenodd'
                  />
                </svg>
                Logout
              </Link>
            </div>
          </motion.div>
        )}
      </motion.nav>
    </>
  )
}

export default Navbar
