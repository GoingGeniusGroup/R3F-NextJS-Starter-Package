'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { TbCards } from 'react-icons/tb'
import Image from 'next/image'
import CustomToolTip from '../../../MyComponents/CustomToolTip'
import { useUser } from '@/UserClientProvider'
import { useSidebar } from '../../../dom/SidebarProvider'

const Hud = ({ loggedIn }: { loggedIn: boolean }) => {
  const user = useUser()
  const pathname = usePathname()
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar()

  const username = user ? user.user?.username : ''

  return (
    <>
      {/* HUD */}
      <div
        className={`z-40 mx-auto h-16 items-center justify-center px-0 py-2 transition-all duration-300 ease-in-out ${pathname === '/hud' ? 'flex' : 'hidden'}`}
      >
        <div className='flex h-10 items-center justify-center gap-2 rounded-full bg-white/10 px-12 shadow-lg backdrop-blur-md md:gap-x-5 '>
          {/* If not logged in then show the button to open the sidebar */}
          {loggedIn ? (
            <Link
              href='/slider'
              aria-label='Go to slider'
              className='group py-2 font-semibold transition duration-300 ease-out hover:scale-105 hover:text-violet-300'
            >
              <TbCards className='size-6 text-white drop-shadow' />
              <CustomToolTip content='Slider' top='-7' left='-13' translateY='-20' />
            </Link>
          ) : (
            <button
              aria-label='Go to slider'
              className='group py-2 font-semibold transition duration-300 ease-out hover:scale-105 hover:text-violet-300'
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <TbCards className='size-6 text-white drop-shadow' />
              <CustomToolTip content='Slider' top='-7' left='-13' translateY='-20' />
            </button>
          )}

          <Link
            href='https://ggrelativity.xyz/login'
            aria-label='gg relativity'
            target='_blank'
            className='group py-2 font-semibold  transition duration-300 ease-out hover:scale-105'
          >
            <Image src='/logos/relativity.svg' width={47} height={47} alt='GG Logo' className='p-2' />
            <CustomToolTip content='GG Relativity' top='-7' left='-20' translateY='-10' />
          </Link>
          <Link
            href='https://www.goinggenius.com.np/'
            aria-label='GG Office'
            target='_blank'
            className='group py-2 font-semibold  transition duration-300 ease-out hover:scale-105'
          >
            <Image src='/gglogo.svg' width={42} height={42} alt='GG Logo' className='p-2' />
            <CustomToolTip content='Going Genius' top='-7' left='-22' translateY='-10' />
          </Link>
          <Link
            href='https://portals.goinggenius.com.np/users/login'
            aria-label='G'
            target='_blank'
            className='group py-2 font-semibold  transition duration-300 ease-out hover:scale-105'
          >
            <Image src='/logos/portals.svg' width={48} height={48} alt='GG Logo' className='p-2' />
            <CustomToolTip content='GG Protals' top='-7' left='-19' translateY='-10' />
          </Link>

          {loggedIn ? (
            <Link
              href={`/public-profile/${username}`}
              aria-label=''
              className='group py-2 font-semibold transition duration-300 ease-out hover:scale-105'
            >
              <Image src='/logos/lgo.png' width={38} height={38} alt='GG Logo' className='p-2' />
              <CustomToolTip content='Public Profile' top='-7' left='-24' translateY='-10' />
            </Link>
          ) : (
            <button
              aria-label='Go to slider'
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className='group py-2 font-semibold transition duration-300 ease-out hover:scale-105'
            >
              <Image src='/logos/lgo.png' width={38} height={38} alt='GG Logo' className='p-2' />
              <CustomToolTip content='Public Profile' top='-7' left='-24' translateY='-10' />
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export default Hud
