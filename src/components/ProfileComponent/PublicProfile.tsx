'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { FaAnglesUp } from 'react-icons/fa6'
const Avatar = dynamic(() => import('@/components/Avatar').then((mod) => mod.Avatar), { ssr: false })
import useUserAndGuildData from '@/components/CustomHooks/useUserAndGuildData'
import UserContent from './PublicProfileComponent/UserContent'

export default function PublicProfile({ username }) {
  const { users, guilds } = useUserAndGuildData()
  const [fetchedData, setFetchedData] = useState([])
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const [skills, setSkills] = useState([])

  // Check if the screen is small
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1025) // Adjust the breakpoint as needed
    }

    handleResize() // Initial check
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Map the user data to the format needed
  useEffect(() => {
    if (users.length && guilds.length) {
      const filteredData = users
        .filter((user) => user.username === username) // Filter by username
        .map((user) => {
          const guild = guilds.find((g) => g.id === user.guild_id)
          const avatarUrl = user.avatar.length > 0 ? user.avatar[0].avatar_url : ''

          return {
            name: `${user.first_name} ${user.last_name}`,
            username: user.username,
            user_image:
              user.image_urls.length > 0 ? user.image_urls[user.image_urls.length - 1] : '/card/defaultbuddha.svg',
            description: user.description,
            guild: guild ? guild.guild_name : 'Unknown Guild',
            avatarurl: avatarUrl,
            country: user.region.country, // country as country code
            city: user.region.city,
            skillsData: user.skills,
            experienceData: user.experience,
          }
        })
      setFetchedData(filteredData)
    }
  }, [users, guilds, username])

  // Extract skills from fetchedData (Modified to match the format for skillsChart component)
  useEffect(() => {
    if (fetchedData[0]?.skillsData) {
      const skillsData = fetchedData[0].skillsData
      const newSkills = skillsData.map((data) => ({
        skill_name: data.skill[0].skill_name, // Access the skill name
        percentage: data.skill[0].percentage, // Access the percentage
      }))
      setSkills(newSkills)
    }
  }, [fetchedData]) // Only re-run when fetchedData changes

  // Scroll to top button
  const [showScrollToTop, setShowScrollToTop] = useState(false)

  // Show the button after scrolling
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.pageYOffset > 200) // Show the button after scrolling 200px down
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Function to scroll to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scrolling
    })
  }

  // avatar url and selected user guild
  const avatar_url = fetchedData[0]?.avatarurl
  const userGuild = fetchedData[0]?.guild

  return (
    <div className='flex size-full'>
      {/* Video BG */}
      <div className='fixed top-0 h-screen w-full'>
        {userGuild && (
          <video key={userGuild} className='absolute inset-0 size-full object-cover' autoPlay loop muted>
            {userGuild === 'BUDDHA' ? (
              <source src='/livewallpapers/buddha.mp4' type='video/mp4' />
            ) : userGuild === 'VAJRA' ? (
              <source src='/livewallpapers/vajra.mp4' type='video/mp4' />
            ) : userGuild === 'PADMA' ? (
              <source src='/livewallpapers/padma.mp4' type='video/mp4' />
            ) : userGuild === 'KARMA' ? (
              <source src='/livewallpapers/karma.mp4' type='video/mp4' />
            ) : userGuild === 'RATNA' ? (
              <source src='/livewallpapers/earth.mp4' type='video/mp4' />
            ) : (
              <source src='/livewallpapers/forest.mp4' type='video/mp4' />
            )}
          </video>
        )}
      </div>

      {users ? (
        <>
          {/* Avatar and Username */}
          {!isSmallScreen ? (
            <div className='fixed flex h-screen w-[25%] items-center justify-center overflow-y-hidden'>
              {users && (
                <>
                  <div className='fixed left-6 z-0 flex h-full w-1/4 flex-col items-start justify-center'>
                    <div className=' flex flex-col items-center justify-center pt-4 text-8xl font-extrabold drop-shadow'>
                      {username.split('').map((letter, index) => (
                        <span key={index}>{letter.toUpperCase()}</span>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {avatar_url && (
                <div className='z-40 size-full'>
                  <Avatar
                    modelSrc={`${avatar_url}`}
                    animationSrc='/male-spawn-animation.fbx'
                    // style={{ background: 'rgb(9,20,26)', pointerEvents: 'none' }}
                    fov={40}
                    cameraTarget={1.5}
                    cameraInitialDistance={30}
                    effects={{
                      ambientOcclusion: true,
                    }}
                  />
                </div>
              )}
            </div>
          ) : (
            <>
              {avatar_url && (
                <div className='fixed top-7 h-[700px] w-full'>
                  <Avatar
                    modelSrc={`${avatar_url}`}
                    animationSrc='/male-spawn-animation.fbx'
                    style={{ background: 'rgb(9,20,26)', pointerEvents: 'none' }}
                    fov={40}
                    cameraTarget={1.5}
                    cameraInitialDistance={30}
                    effects={{
                      ambientOcclusion: true,
                    }}
                  />
                </div>
              )}
            </>
          )}

          {/* Mid Part */}
          <div className='flex w-full justify-center'>
            <UserContent
              user={fetchedData[0]}
              skillsData={skills}
              guild={guilds}
              experience={fetchedData[0]?.experienceData}
            />
          </div>

          {/* Scroll to top button */}
          <button
            className={`fixed bottom-10 right-10 z-50 ${
              showScrollToTop ? 'translate-y-0' : 'translate-y-[-100rem]'
            } rounded-full bg-purple-700/30 p-3 text-white transition-all duration-500 hover:bg-pink-300/40 hover:text-pink-200`}
            onClick={scrollToTop}
          >
            <FaAnglesUp size={24} />
          </button>
        </>
      ) : (
        <div className='flex h-screen w-full items-center justify-center'>
          <div className='text-center text-2xl font-bold'>Loading...</div>
        </div>
      )}
    </div>
  )
}
