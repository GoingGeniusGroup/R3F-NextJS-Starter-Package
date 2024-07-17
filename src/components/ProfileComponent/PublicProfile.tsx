'use client'
import dynamic from 'next/dynamic'
import { useEffect, useState, useRef } from 'react'
import toast from 'react-hot-toast'
import { FaAnglesUp } from 'react-icons/fa6'
const Avatar = dynamic(() => import('@/components/Avatar').then((mod) => mod.Avatar), { ssr: false })
import UserContent from './PublicProfileComponent/UserContent'

const getSelectedPublicUser = async (username) => {
  try {
    const res = await fetch(`/api/public/users/${username}`)
    if (!res.ok) {
      return toast.error('Failed to get the user')
    }
    // console.log('user', res.data)
    return res.json()
  } catch (error) {
    toast.error('Internal server error')
  }
}

const getGuilds = async () => {
  try {
    const res = await fetch(`/api/public/guilds`)
    if (!res.ok) {
      toast.error('Failed to fetch guilds data')
      return []
    }
    return res.json()
  } catch (error) {
    toast.error('Internal Server Error')
    return []
  }
}

export default function PublicProfile({ username }) {
  const [user, setUser] = useState(null)
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  const [guilds, setGuilds] = useState([])
  const [skillsData, setSkillsData] = useState([])
  const [avatarsData, setAvatarsData] = useState([])
  const [cardsData, setCardsData] = useState([])
  const [experience, setExperience] = useState([])

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1025) // Adjust the breakpoint as needed
    }

    handleResize() // Initial check
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const fetchedGuilds = await getGuilds()
      setGuilds(fetchedGuilds)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const getPublicUser = async () => {
      const publicUser = await getSelectedPublicUser(username)
      setUser(publicUser)
    }
    getPublicUser()
  }, [])

  // Experience data
  useEffect(() => {
    const fetchExpData = async () => {
      try {
        setExperience(user.experience)
      } catch (error) {
        console.log('Error fetching experience data:', error)
      }
    }
    if (user) {
      fetchExpData() // Fetch data only if user is available
    }
  }, [user])

  // Fetch skills data
  function checkExistingSkills(skill, exp_skills) {
    for (let i = 0; i < exp_skills.length; i++) {
      if (exp_skills[i].includes(skill)) {
        return true
      }
    }
    return false
  }

  useEffect(() => {
    const fetchSkillsData = async () => {
      try {
        const skillsSet = new Set() // Create a Set to store unique JSON strings

        if (experience.length !== 0) {
          const exp_skill_obj = {}
          const exp_skills = []

          user.skills.forEach((skillObj) => {
            // Add the skillObj to skillsSet
            skillsSet.add(
              JSON.stringify({
                skill_name: skillObj.skill[0].skill_name,
                percentage: skillObj.skill[0].percentage,
              }),
            )
            // Iterate over each skill element in skillObj.skill array
            skillObj.skill.forEach((element) => {
              // Add the skill name to exp_skills array
              exp_skills.push(element.skill_name)
              // Create an entry in exp_skill_obj for the skill percentage
              exp_skill_obj[element.skill_name] = element.percentage
              // Create an entry in exp_skill_obj for the skill_id
              exp_skill_obj[element.skill_name + '_id'] = skillObj.skill_id
            })
          })

          user.experience.forEach((element) => {
            if (element.project_skills.length !== 0) {
              element.project_skills.forEach((skill) => {
                if (!checkExistingSkills(skill, exp_skills)) {
                  skillsSet.add(
                    JSON.stringify({
                      skill_name: skill,
                      percentage: 0,
                    }),
                  ) // Add each object to the Set after converting it to a string
                } else {
                  skillsSet.add(
                    JSON.stringify({
                      skill_name: skill,
                      percentage: exp_skill_obj[`${skill}`],
                    }),
                  )
                }
              })
            }
          })
        }

        // Convert the Set back to an array of objects
        if (skillsSet.size !== 0) {
          const skillsArray = Array.from(skillsSet).map((strObj: string) => JSON.parse(strObj))
          setSkillsData(skillsArray)
        }
      } catch (error) {
        console.log('failed to fetch the skills data')
      }
    }

    if (user) {
      fetchSkillsData() // Fetch data only if user is available
    }
  }, [user, experience])

  // Cards data
  useEffect(() => {
    const fetchCardsData = async () => {
      try {
        setCardsData(user.cards)
      } catch (error) {
        console.log('Error fetching skills data:', error)
      }
    }
    if (user) {
      fetchCardsData() // Fetch data only if user is available
    }
  }, [user])

  // Avatar
  useEffect(() => {
    const fetchAvatarsData = async () => {
      try {
        setAvatarsData(user.avatar)
      } catch (error) {
        console.log('Error fetching avatars data:', error)
      }
    }
    if (user) {
      fetchAvatarsData() // Fetch data only if user is available
    }
  }, [user])

  const [showScrollToTop, setShowScrollToTop] = useState(false)

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

  return (
    <div className='flex size-full'>
      {/* Video BG */}
      <div className='fixed top-0 h-screen w-full'>
        {user && (
          <video key={user.guild_id} className='absolute inset-0 size-full object-cover' autoPlay loop muted>
            {user?.guild_id === guilds.find((guild) => guild.guild_name === 'BUDDHA')?.id ? (
              <source src='/livewallpapers/buddha.mp4' type='video/mp4' />
            ) : user?.guild_id === guilds.find((guild) => guild.guild_name === 'VAJRA')?.id ? (
              <source src='/livewallpapers/vajra.mp4' type='video/mp4' />
            ) : user?.guild_id === guilds.find((guild) => guild.guild_name === 'PADMA')?.id ? (
              <source src='/livewallpapers/padma.mp4' type='video/mp4' />
            ) : user?.guild_id === guilds.find((guild) => guild.guild_name === 'KARMA')?.id ? (
              <source src='/livewallpapers/karma.mp4' type='video/mp4' />
            ) : user?.guild_id === guilds.find((guild) => guild.guild_name === 'RATNA')?.id ? (
              <source src='/livewallpapers/earth.mp4' type='video/mp4' />
            ) : (
              <source src='/livewallpapers/forest.mp4' type='video/mp4' />
            )}
          </video>
        )}
      </div>

      {user ? (
        <>
          {/* Avatar and Username */}
          {!isSmallScreen ? (
            <div className='fixed flex h-screen w-[25%] items-center justify-center overflow-y-hidden'>
              {user && (
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

              {avatarsData && avatarsData.length !== 0 && (
                <div className='z-40 size-full'>
                  <Avatar
                    modelSrc={`${avatarsData.slice(-1)[0].avatar_url}`}
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
              {avatarsData && avatarsData.length !== 0 && (
                <div className='fixed top-7 h-[700px] w-full'>
                  <Avatar
                    modelSrc={`${avatarsData.slice(-1)[0].avatar_url}`}
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
            <UserContent user={user} skillsData={skillsData} guild={guilds} experience={experience} />
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
