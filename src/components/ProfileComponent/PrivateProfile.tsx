'use client'
import { CardBody, CardContainer } from '@/components/card/card' //----------------> module not found error in my branch
import SkillsChartComponent from '@/components/SliderComponent/SkillsChartComponent' //----------------> module not found error in my branch
import dynamic from 'next/dynamic'
// import { useUser } from '@/context/UserContext/UserContext'
import { useUser } from '@/UserClientProvider' //----------------> module not found error in my branch
import { useCallback, useEffect, useState, useRef } from 'react'
import SpringModal from '@/components/FormModal/SpringModal' //----------------> module not found error in my branch
import { TbCards } from 'react-icons/tb'

import Hud from './PublicProfileComponent/PrivateProfileComponents/Hud'

// For the card flip QR code
import QRCode from 'qrcode'
import { usePathname } from 'next/navigation'
// For the carousel
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md'
import useEmblaCarousel from 'embla-carousel-react'
// For carousel inside slide 1
import AvatarImageComponent from '../avatarImage/AvatarImage'
import DrawOutlineButton from '@/components/AnimatedButton/DrawOutlineButton' //----------------> module not found error in my branch
import Link from 'next/link'
// Cards
import GeniusIDFlipCard from '@/components/card/GeniusIDFlipCard' //----------------> module not found error in my branch
import CardsFlipCard from '@/components/card/cardsFlipCard' //----------------> module not found error in my branch
import ExperienceFlipCard from '../card/experienceFlipCard'
const Avatar = dynamic(() => import('@/components/Avatar').then((mod) => mod.Avatar), { ssr: false }) //----------------> module not found error in my branch
const SkinsCard = dynamic(() => import('@/components/card/SkinsCard'), { ssr: false }) //----------------> module not found error in my branch

import { useSidebar } from '@/components/dom/SidebarProvider' //----------------> module not found error in my branch

export default function PrivateProfile() {
  const { user } = useUser()
  const [skillsData, setSkillsData] = useState([])
  const [avatarsData, setAvatarsData] = useState([])
  const [cardsData, setCardsData] = useState([])
  const [experience, setExperience] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const isScrollingRef = useRef(false)
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar()

  const handleChangeSlide = (index) => {
    if (emblaApi) emblaApi.scrollTo(index)
  }

  const handleScroll = useCallback(
    (event) => {
      if (!emblaApi || isScrollingRef.current) return

      isScrollingRef.current = true

      const deltaY = event.deltaY

      if (deltaY > 0) {
        emblaApi.scrollNext()
      } else if (deltaY < 0) {
        emblaApi.scrollPrev()
      }

      setTimeout(() => {
        isScrollingRef.current = false
      }, 500) // Adjust debounce delay as needed
    },
    [emblaApi],
  )

  useEffect(() => {
    window.addEventListener('wheel', handleScroll)
    return () => {
      window.removeEventListener('wheel', handleScroll)
    }
  }, [handleScroll])
  // Main Carousel

  useEffect(() => {
    if (emblaApi) {
      console.log(emblaApi.slideNodes()) // Access API
    }
  }, [emblaApi])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  // carousel inside Slide 1
  const [emblaRef2, emblaApi2] = useEmblaCarousel({ loop: true })
  useEffect(() => {
    if (emblaApi2) {
      console.log(emblaApi2.slideNodes()) // Access API
    }
  }, [emblaApi2])

  const scrollPrev2 = useCallback(() => {
    if (emblaApi2) emblaApi2.scrollPrev()
  }, [emblaApi2])

  const scrollNext2 = useCallback(() => {
    if (emblaApi2) emblaApi2.scrollNext()
  }, [emblaApi2])

  // Carousel inside slide 2
  const [emblaRef3, emblaApi3] = useEmblaCarousel({ loop: true })

  useEffect(() => {
    if (emblaApi3) {
      console.log(emblaApi3.slideNodes()) // Access API
    }
  }, [emblaApi3])

  const scrollPrev3 = useCallback(() => {
    if (emblaApi3) emblaApi3.scrollPrev()
  }, [emblaApi3])

  const scrollNext3 = useCallback(() => {
    if (emblaApi3) emblaApi3.scrollNext()
  }, [emblaApi3])

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
  }, [experience, user])

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
  // Flip Card QR
  const [isFlipped, setIsFlipped] = useState(false)
  const [imgSrc, setImgSrc] = useState('')
  const pathname = usePathname()
  QRCode.toDataURL(pathname).then(setImgSrc)
  // Flip Card QR end
  // Flip Card QR
  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }
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

  return (
    <div className='relative mt-20 flex flex-col lg:size-full'>
      <div className='absolute top-[40%] flex h-[360px] w-full items-center justify-center lg:relative lg:h-[600px]'>
        {avatarsData && avatarsData.length !== 0 ? (
          <Avatar
            modelSrc={`${avatarsData.slice(-1)[0].avatar_url}`}
            shadows
            animationSrc='/male-idle-3.fbx'
            style={{ background: 'rgb(9,20,26)', pointerEvents: 'none' }}
            fov={40}
            cameraTarget={1.5}
            cameraInitialDistance={30}
            effects={{
              ambientOcclusion: true,
            }}
          />
        ) : (
          <Avatar
            modelSrc='https://models.readyplayer.me/658be9e8fc8bec93d06806f3.glb?morphTargets=ARKit,Eyes Extra&textureAtlas=none&lod=0'
            shadows
            animationSrc='/male-idle-3.fbx'
            style={{ background: 'rgb(9,20,26)', pointerEvents: 'none' }}
            fov={40}
            cameraTarget={1.5}
            cameraInitialDistance={30}
            effects={{
              ambientOcclusion: true,
            }}
          />
        )}
      </div>
      {/* Carousel */}
      <div className='top-10 flex size-full justify-between px-4 lg:absolute'>
        <div className='overflow-hidden' ref={emblaRef}>
          <div className='flex '>
            {/* Slide 1 */}
            <div className='w-full shrink-0 grow lg:min-w-0 '>
              <div className='flex size-full flex-col px-4 lg:flex-row lg:justify-between'>
                <div className='h-full lg:ml-24 lg:w-[27%]'>
                  {user ? (
                    <div className='flex flex-col items-center justify-center'>
                      {/* Carousel */}
                      <div className='w-full overflow-hidden' ref={emblaRef2}>
                        <div className='flex items-center'>
                          <div className='w-full shrink-0 grow md:min-w-0 '>
                            <div className='flex flex-col justify-center'>
                              <div className='relative my-4 flex justify-center text-xl font-semibold drop-shadow md:text-5xl'>
                                Genius ID
                                <Link
                                  className='absolute -top-5 right-9 px-2 py-1 text-sm text-black dark:text-white'
                                  aria-label='edit button'
                                  href='/slider'
                                >
                                  <TbCards />
                                </Link>
                              </div>
                              <div className='flex justify-center'>
                                <GeniusIDFlipCard
                                  first_name={user.first_name}
                                  last_name={user.last_name}
                                  email={user.email}
                                  contact={user.phone_number}
                                  address={user.address}
                                />
                              </div>
                            </div>
                          </div>
                          {cardsData.length != 0 ? (
                            cardsData.map((card) => (
                              <div key={card.card_id} className='w-full shrink-0 grow lg:min-w-0 '>
                                <div className='flex flex-col justify-center'>
                                  <div className='my-4 flex justify-center text-xl font-semibold drop-shadow md:text-5xl'>
                                    {card.type.charAt(0).toUpperCase() + card.type.slice(1)}
                                    <Link
                                      className='absolute -top-4 right-7 px-2 py-1 text-sm text-black dark:text-white'
                                      aria-label='edit button'
                                      href='/slider'
                                    >
                                      <TbCards />
                                    </Link>
                                  </div>
                                  <div className='flex justify-center'>
                                    <CardsFlipCard
                                      type={card.type}
                                      name={card.name}
                                      dateIn={card.date_in}
                                      dateOut={card.date_out}
                                      emergency_address={card.emergency_address}
                                      emergency_details={card.emergency_details}
                                      emergency_contact={card.emergency_contact}
                                      blood_group={card.blood_group}
                                      description={card.description}
                                    />
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className='w-full shrink-0 grow lg:min-w-0 '>
                              <DrawOutlineButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                SignUp to create a card
                              </DrawOutlineButton>
                            </div>
                          )}
                        </div>
                        <div className='my-4 flex justify-center gap-x-24 text-2xl sm:gap-x-36'>
                          <button aria-label='previos button' onClick={scrollPrev2}>
                            <MdNavigateBefore />
                          </button>
                          <button aria-label='next button' onClick={scrollNext2}>
                            <MdNavigateNext />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className='flex flex-col items-center justify-center'>
                      {/* Carousel */}
                      <div className='w-full overflow-hidden' ref={emblaRef2}>
                        <div className='flex items-center'>
                          <div className='w-full shrink-0 grow md:min-w-0 '>
                            <div className='flex flex-col justify-center'>
                              <div className='relative my-4 flex justify-center text-xl font-semibold drop-shadow md:text-5xl'>
                                Genius ID
                              </div>
                              <div className='flex justify-center'>
                                <GeniusIDFlipCard
                                  first_name='DEFAULT'
                                  last_name='DEFAULT'
                                  email='DEFAULT@'
                                  contact='DEFAULT'
                                  address='DEFAULT'
                                />
                              </div>
                            </div>
                          </div>
                          <div className='w-full shrink-0 grow lg:min-w-0 '>
                            <div className='flex flex-col justify-center'>
                              <div className='relative my-4 flex justify-center text-xl font-semibold drop-shadow md:text-5xl'>
                                CARD2
                              </div>
                              <div className='flex justify-center'>
                                <CardsFlipCard
                                  type='DEFAULT'
                                  name='DEFAULT'
                                  dateIn='DEFAULT'
                                  dateOut='DEFAULT'
                                  description={undefined}
                                  blood_group={undefined}
                                  emergency_contact={undefined}
                                  emergency_address={undefined}
                                  emergency_details={undefined}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='my-4 flex justify-center gap-x-24 text-2xl sm:gap-x-36'>
                          <button aria-label='Previous btn' onClick={scrollPrev2}>
                            <MdNavigateBefore />
                          </button>
                          <button aria-label='Next btn' onClick={scrollNext2}>
                            <MdNavigateNext />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className='my-5 flex flex-col items-center py-5'>
                    <div className='rounded-lg bg-purple-900/50 p-5'>
                      <p className='mb-4 px-4 text-center'>Some premium features for paid users</p>
                      <div className='flex justify-center gap-x-2'>
                        <DrawOutlineButton onClick={() => setIsOpen(true)}>GG+</DrawOutlineButton>
                        {user ? (
                          <Link href={`/public-profile/${user.username}`}>
                            <DrawOutlineButton>View Public Profile</DrawOutlineButton>
                          </Link>
                        ) : (
                          <DrawOutlineButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                            SignUp to Create your own Card
                          </DrawOutlineButton>
                        )}
                      </div>
                    </div>
                    {/* Spring Pop Up Modal */}
                    <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} />
                  </div>
                </div>
                <div className='mt-60 h-full lg:mr-20 lg:mt-0 lg:w-[30%] '>
                  <div className='my-4 flex justify-center text-xl font-semibold drop-shadow md:text-5xl'>Avatar</div>
                  <div className='flex min-h-48 items-center justify-center px-4'>
                    <div className='mb-7 flex min-h-48 items-center justify-center gap-x-14 px-4 md:px-8 xl:px-10'>
                      {user ? (
                        <AvatarImageComponent />
                      ) : (
                        <div className='-mt-8'>
                          <DrawOutlineButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                            SignUp to view your own Avatars
                          </DrawOutlineButton>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Skin Card Component */}
                  <SkinsCard />
                </div>
              </div>
            </div>
            {/* Slide 2 */}
            <div className='w-full shrink-0 grow lg:min-w-0'>
              <div className='flex size-full flex-col px-4 lg:flex-row lg:justify-between'>
                <div className='h-full lg:ml-24 lg:w-[27%]'>
                  <div className='relative my-4 flex justify-center text-xl font-semibold drop-shadow md:text-5xl'>
                    Experience
                    {user && (
                      <Link
                        className='absolute -top-5 right-9 px-2 py-1 text-sm text-black dark:text-white'
                        aria-label='edit button'
                        href='/slider'
                      >
                        <TbCards />
                      </Link>
                    )}
                  </div>
                  <div className='flex flex-col items-center justify-center'>
                    {/* Carousel */}
                    {user && experience.length != 0 ? (
                      <>
                        <div className='w-full overflow-hidden' ref={emblaRef3}>
                          <div className='flex items-center'>
                            {experience.map((exp) => (
                              <div key={exp.name} className='w-full shrink-0 grow lg:min-w-0 '>
                                <div className='flex flex-col justify-center'>
                                  <div className='flex justify-center'>
                                    <ExperienceFlipCard
                                      type={exp.type}
                                      projectName={exp.name}
                                      skills={exp.project_skills.join(', ')}
                                      toolsAndTech={exp.tools}
                                      imageUrl={
                                        exp.project_pictures
                                          ? exp.project_pictures[exp.project_pictures.length - 1]
                                          : '/card/abstract3.webp'
                                      } // Get the last image in the array
                                    />
                                  </div>
                                  <div className='my-3 flex justify-center'>
                                    <div className='flex flex-col'>
                                      <p className='px-4 font-bold text-violet-400'>DESCRIPTION</p>
                                      <p>{exp.description}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className='my-4 flex justify-center gap-x-24 text-2xl sm:gap-x-36'>
                          <button onClick={scrollPrev3} aria-label='prev button'>
                            <MdNavigateBefore />
                          </button>
                          <button onClick={scrollNext3} aria-label='next button'>
                            <MdNavigateNext />
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className='flex flex-col justify-center'>
                        <p className='my-20 flex text-center'>Seems like you have not signed in yet...</p>
                        <DrawOutlineButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                          SignUp to Create your Experience
                        </DrawOutlineButton>
                      </div>
                    )}
                  </div>
                  <div className='mt-4 flex justify-center'>
                    {/* https://r3-f-next-js-starter-package.vercel.app/ */}
                    {user && (
                      <Link
                        // href={`http://localhost:3001//api/public/users/${user.gg_id}`}
                        // target='_blank'
                        href='#'
                        aria-label='Booking button'
                      >
                        <DrawOutlineButton>Booking Comming Soon!!</DrawOutlineButton>
                      </Link>
                    )}
                  </div>
                </div>
                <div className='mt-60 h-full lg:mr-24 lg:mt-0 lg:w-[30%] '>
                  <div className='my-4 flex justify-center text-xl font-semibold drop-shadow md:text-5xl'>
                    Skills
                    {user && (
                      <Link
                        className='absolute -top-5 right-12 px-2 py-1 text-sm text-black dark:text-white'
                        aria-label='edit button'
                        href='/slider'
                      >
                        <TbCards />
                      </Link>
                    )}
                  </div>
                  <CardContainer className='mt-10 py-0 hover:shadow-3xl dark:border-none dark:hover:border-none dark:hover:shadow-3xl'>
                    <CardBody className='group/card relative'>
                      <div className='flex min-h-48 flex-col items-center justify-center px-4 md:px-8 xl:px-10'>
                        {user && skillsData.length > 0 ? (
                          <SkillsChartComponent skills={skillsData} />
                        ) : (
                          // Render loading indicator or placeholder while data is being fetched
                          <div className='rounded-lg border p-5'>
                            <DrawOutlineButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                              SignUp to View your Skills
                            </DrawOutlineButton>
                          </div>
                        )}
                      </div>
                    </CardBody>
                  </CardContainer>
                </div>
              </div>
            </div>
            {/* Slide 3 */}
            {/* <div className='w-full shrink-0 grow lg:min-w-0'>
              <div className='flex size-full flex-col px-4 lg:flex-row lg:justify-between'>
                <div className='h-full lg:ml-24 lg:w-[30%] '>
                  {user ? (
                    <div className='flex flex-col items-center justify-center'>
                      <div className='relative my-4 flex justify-center  text-xl font-semibold drop-shadow lg:text-5xl'>
                        Achievements
                      </div>
                      <p>Logged In users Achievements</p>
                      <div className='mt-20 h-96 w-52 rounded-xl bg-purple-900/20'></div>
                    </div>
                  ) : (
                    <div className='flex flex-col items-center justify-center '>
                      <div className='relative my-4 flex justify-center text-xl font-semibold drop-shadow md:text-5xl'>
                        <p>Achievements</p>
                      </div>
                      Awards
                    </div>
                  )}
                </div>

                <div className='mt-60 h-full lg:mr-24 lg:mt-0 lg:w-[30%]'>
                  <div className='relative my-4 flex justify-center text-xl font-semibold drop-shadow md:text-5xl'>
                    Recommendations
                  </div>
                </div>
              </div>
            </div> */}
          </div>
          <button
            className='absolute hidden lg:left-10 lg:top-[45%] lg:block lg:text-5xl'
            onClick={scrollPrev}
            aria-label='Previous Slide'
          >
            <MdNavigateBefore />
          </button>
          <button
            className='absolute hidden lg:right-10 lg:top-[45%] lg:block lg:text-5xl'
            onClick={scrollNext}
            aria-label='Next Slide'
          >
            <MdNavigateNext />
          </button>
        </div>
      </div>

      {user ? (
        <div className='fixed bottom-2 w-full justify-center'>
          <Hud loggedIn={true} />
        </div>
      ) : (
        <div className='fixed bottom-2 w-full justify-center'>
          <div>
            <Hud loggedIn={false} />
          </div>
        </div>
      )}
    </div>
  )
}
