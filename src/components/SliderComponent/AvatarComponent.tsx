'use client'

import Image from 'next/image'

import { Avatar } from 'src/components/Avatar'
import { useUser } from '@/context/UserContext/UserContext'
import { useState, useEffect, useMemo } from 'react'
import AvatarImageComponent from '../avatarImage/page'
import FormModal2 from '../FormModal/Modal2'
import Avatar_creator from '@/components/avatar-creator/avatar'

import axios from 'axios'

import DrawOutlineButton from '../AnimatedButton/DrawOutlineButton'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

async function getAvatarById(id: string) {
  try {
    const res = await axios.get(`/api/internal/avatar/${id}`)
    if (res.status !== 200) {
      throw new Error('failed to fetch the avatars')
    }
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export default function AvatarComponent({ onNextButtonClick, onPrevButtonClick, isSmallScreen }) {
  const { user } = useUser()
  const [avatarsData, setAvatarsData] = useState([])

  const [isCardModalOpen, setIsCardModalOpen] = useState(false)

  const openCardModal = () => {
    setIsCardModalOpen(true)
  }

  useEffect(() => {
    const fetchAvatarsData = async () => {
      try {
        const testData = await getAvatarById(user.gg_id)
        setAvatarsData(testData)
      } catch (error) {
        console.error('Error fetching avatars data:', error)
      }
    }

    if (user) {
      fetchAvatarsData() // Fetch data only if user is available and avatarsData is empty
    }
  }, [user])

  const memoizedAvatarsData = useMemo(() => avatarsData, [avatarsData]) // Memoize the avatars data to prevent re-rendering

  const guildData = [
    {
      name: 'BUDDHA',
      symbol: (
        <svg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <circle cx='11' cy='11' r='11' fill='white' />
          <path
            d='M6.17881 4.75887L10.8764 5.64775M6.17881 4.75887L3 10.0544M6.17881 4.75887L8.29801 3H14.2848L15.5916 4.75887M10.8764 5.64775V11.1891M10.8764 5.64775L15.5916 4.75887M10.8764 11.1891L6.17881 13.8369M10.8764 11.1891L15.5916 13.8369M6.17881 13.8369L3 10.0544M6.17881 13.8369L7.69757 19M3 10.0544V12.4563L5.47241 17.7329L7.69757 19M15.5916 4.75887L18.3996 10.0544M18.3996 10.0544L15.5916 13.8369M18.3996 10.0544L19 12.4563L16.2804 17.7329L14.2848 19M15.5916 13.8369L14.2848 19M7.69757 19H14.2848'
            stroke='black'
          />
        </svg>
      ),
      color: 'FFFFFF',
      description: ' WHITE Guild of the Vairochana family',
      image: '/svgs/vairocana.svg',
    },
    {
      name: 'VAJRA',
      symbol: (
        <svg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <circle cx='11' cy='11' r='11' fill='#4A9BD5' />
          <path
            d='M10.6428 3L3 7.00455M10.6428 3L19 7.00455M10.6428 3V6.27645M3 7.00455V15.0137M3 7.00455L10.6428 6.27645M3 7.00455L5.87957 13.3026M3 15.0137L10.6428 19M3 15.0137L5.87957 13.3026M10.6428 19L19 15.0137M10.6428 19L5.87957 13.3026M10.6428 19L15.2544 13.3026M19 15.0137V7.00455M19 15.0137L15.2544 13.3026M19 7.00455L10.6428 6.27645M19 7.00455L15.2544 13.3026M10.6428 6.27645L5.87957 13.3026M10.6428 6.27645L15.2544 13.3026M5.87957 13.3026H15.2544'
            stroke='#030303'
          />
        </svg>
      ),
      color: '0000FF',
      description: ' BLUE Guild of the Akshobhya family',
      image: '/svgs/akshobhya.svg',
    },
    {
      name: 'KARMA',
      symbol: (
        <svg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <circle cx='11' cy='11' r='11' fill='#46B58F' />
          <path
            d='M3 7.02733L10.9046 3L19 7.02733M3 7.02733L10.9046 10.7995M3 7.02733V15.0638L10.9046 19M19 7.02733L10.9046 10.7995M19 7.02733V15.0638L10.9046 19M10.9046 10.7995V19'
            stroke='black'
          />
        </svg>
      ),
      color: '00FF00',
      description: ' Green Guild of the Amoghasiddhi family selihgosadilnho uiogcseou voshdof',
      image: '/svgs/amoghasiddhi.svg',
    },
    {
      name: 'RATNA',
      symbol: (
        <svg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <circle cx='11' cy='11' r='11' fill='#F0BE65' />
          <path
            d='M3 6.87713H19M3 6.87713L11.0758 3L19 6.87713M3 6.87713V15.3595L11.0758 19M3 6.87713L11.0758 19M19 6.87713L11.0758 19M19 6.87713V15.3595L11.0758 19'
            stroke='black'
          />
        </svg>
      ),
      color: 'FFF200',
      description: ' YELLOW/GOLD Guild of the Ratnasambhava family',
      image: '/svgs/ratnasambhava.svg',
    },
    {
      name: 'PADMA',
      symbol: (
        <svg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <circle cx='11' cy='11' r='11' fill='#DA4C5C' />
          <path d='M4 17L10.9521 3L18 17M4 17H18M4 17L10.9521 12.5073L18 17' stroke='black' />
          <path d='M11 12.7351V3' stroke='black' />
        </svg>
      ),
      color: 'FF0000',
      description: ' RED Guild of the Amitabha family',
      image: '/svgs/amitabha.svg',
    },
  ]
  const [selectedGuild, setSelectedGuild] = useState('')

  const selectedGuildData = guildData.find((guild) => guild.name === selectedGuild)

  return (
    <div className='-ml-3 mb-12 mt-2 flex flex-col items-center md:ml-0 lg:mb-0'>
      <div
        id='My Avatar'
        className='relative flex h-[900px] w-[300px] flex-col py-4 md:w-[600px] md:rounded-3xl  md:bg-black/10 md:px-10 md:shadow-md md:shadow-purple-700 md:backdrop-blur-md lg:h-[550px] lg:w-[800px]'
        // style={{ minHeight: '300px' }} //Reserve space for dynamic content
      >
        <div className='flex w-full flex-col'>
          <div className='relative my-3 flex justify-center text-2xl font-semibold drop-shadow lg:my-5 lg:text-5xl'>
            AVATAR & GUILDS
          </div>

          <div className='mt-5 rounded-[20px] '>
            <div className='flex flex-col lg:flex-row lg:justify-between'>
              {/* Avatar and AvatarImageComponent Container */}
              <div className='flex flex-col items-center justify-center lg:w-[35%]'>
                {memoizedAvatarsData && memoizedAvatarsData.length != 0 ? (
                  <div className='relative'>
                    <Avatar
                      modelSrc={`${avatarsData.slice(-1)[0].avatar_url}`}
                      // shadows
                      animationSrc='/male-idle-3.fbx'
                      style={{ background: 'rgb(9,20,26)', width: '350px', height: '350px', pointerEvents: 'none' }}
                      fov={40}
                      cameraTarget={1.5}
                      cameraInitialDistance={30}
                      effects={{
                        ambientOcclusion: true,
                      }}
                    />
                    {/* <div className='absolute bottom-14 left-20'>
                      <AvatarImageComponent />
                    </div> */}
                  </div>
                ) : (
                  <div className='relative'>
                    <Avatar
                      modelSrc='https://models.readyplayer.me/658be9e8fc8bec93d06806f3.glb?morphTargets=ARKit,Eyes Extra&textureAtlas=none&lod=0'
                      // shadows
                      animationSrc='/male-idle-3.fbx'
                      style={{ background: 'rgb(9,20,26)', width: '350px', height: '350px', pointerEvents: 'none' }}
                      fov={40}
                      cameraTarget={1.5}
                      cameraInitialDistance={30}
                      effects={{
                        ambientOcclusion: true,
                      }}
                    />
                    {/* <div className='absolute bottom-14 left-20'>
                      <AvatarImageComponent />
                    </div> */}
                  </div>
                )}
              </div>
              {/* Guilds Component */}
              <div className='w-full rounded-lg bg-gradient-to-r from-pink-300/70 to-pink-400/40 p-4 shadow-lg lg:w-[65%]'>
                {selectedGuildData && (
                  <div className='mt-4 rounded-lg border border-white p-4'>
                    <h2 className='text-lg font-bold'>{selectedGuildData.name} Guild</h2>
                    <p className='text-sm text-gray-300'>{selectedGuildData.description}</p>
                    <Image
                      src={selectedGuildData.image}
                      alt={selectedGuildData.name}
                      className='mt-2'
                      width={56}
                      height={56}
                    />
                  </div>
                )}
                {/* GUILDS SELECTION */}
                <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between'>
                  <label htmlFor='guilds' className='text-lg font-semibold text-gray-700 lg:text-xl'>
                    Guilds
                  </label>
                  <div className='relative flex items-center justify-between gap-x-4 px-4 lg:w-[70%]'>
                    {guildData.map((guild, index) => (
                      <div key={index} className='group lg:relative'>
                        <input
                          type='radio'
                          id={guild.name.toString()}
                          name='guild'
                          value={`Guild ${guild.name}`}
                          className='hidden'
                          checked={selectedGuild === guild.name}
                          onChange={() => setSelectedGuild(guild.name)}
                          aria-label='Guild Selection'
                        />
                        <label
                          htmlFor={guild.name}
                          className={`cursor-pointer transition-transform duration-200 ${
                            selectedGuild === guild.name ? 'scale-105 text-pink-500' : 'text-white'
                          }`}
                          style={{
                            color: selectedGuild === guild.name ? `#${guild.color}` : `#FFFFFF`,
                            fontSize: selectedGuild === guild.name ? '1.2em' : '1em',
                          }}
                        >
                          {guild.symbol}
                          <div
                            className={`absolute bottom-full left-1/2 z-50 hidden -translate-x-1/2 rounded-xl bg-black/80 p-4 text-white shadow-md group-hover:block`}
                          >
                            <div style={{ width: '150px' }}>
                              <Image
                                src={guild.image}
                                alt={guild.name}
                                width={150}
                                height={50}
                                className='rounded-md'
                              />
                            </div>
                            <p
                              className='mt-2 flex justify-center text-xs font-bold'
                              style={{
                                color: `#${guild.color}`,
                              }}
                            >
                              {guild.name}
                            </p>
                            <p className='text-xs'>{guild.description}</p>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {!isSmallScreen ? (
              <div className='absolute left-96 top-96 transition-all duration-200 lg:left-20 lg:mt-14'>
                <DrawOutlineButton
                  onClick={() => {
                    setIsCardModalOpen(true)
                  }}
                >
                  Create Avatar &emsp; +
                </DrawOutlineButton>
              </div>
            ) : (
              <div className='absolute top-96 flex w-full justify-center'>
                <DrawOutlineButton
                  onClick={() => {
                    setIsCardModalOpen(true)
                  }}
                >
                  Create Avatar &emsp; +
                </DrawOutlineButton>
              </div>
            )}
            {isCardModalOpen && (
              <div className='absolute left-0 top-0 flex size-full items-center justify-center'>
                <FormModal2 show={isCardModalOpen} onclose={setIsCardModalOpen}>
                  <Avatar_creator />
                </FormModal2>
              </div>
            )}
            {!isSmallScreen ? (
              <div>
                <div className='absolute bottom-4 left-4 mt-4'>
                  <button
                    className='rounded-full bg-purple-400/20 transition-all duration-150 hover:scale-105 hover:bg-purple-300/30'
                    onClick={onPrevButtonClick}
                    aria-label='prev'
                  >
                    <p className='p-4'>
                      <FaArrowLeft />
                    </p>
                  </button>
                </div>
                <div className='absolute bottom-4 right-4 mt-4'>
                  <button
                    className='rounded-full bg-purple-400/20 transition-all duration-150 hover:scale-105 hover:bg-purple-300/30'
                    onClick={onNextButtonClick}
                    aria-label='prev'
                  >
                    <p className='p-4'>
                      <FaArrowRight />
                    </p>
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className='absolute bottom-4 left-4 mt-4'>
                  <DrawOutlineButton onClick={onPrevButtonClick} aria-label='prev'>
                    Back
                  </DrawOutlineButton>
                </div>
                <div className='absolute bottom-4 right-4'>
                  <DrawOutlineButton onClick={onNextButtonClick} aria-label='next slide'>
                    Next
                  </DrawOutlineButton>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
