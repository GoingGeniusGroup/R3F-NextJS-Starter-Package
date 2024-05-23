'use client'

import { CardBody, CardContainer, CardItem } from '@/components/card/card'
// import { Button } from "@/components/ui/button"

import axios from 'axios'

import dynamic from 'next/dynamic'
// import Image from 'next/image'
// import { Suspense } from 'react'

const Avatar = dynamic(() => import('@/components/Avatar').then((mod) => mod.Avatar), { ssr: false })
const SkinsCard = dynamic(() => import('@/components/card/SkinsCard'), { ssr: false })

import { useUser } from '@/context/UserContext/UserContext'
import { useCallback, useEffect, useState } from 'react'

import SpringModal from '@/components/FormModal/SpringModal'

//icons
import { FaRegEdit } from 'react-icons/fa'

// For the card flip QR code
import QRCode from 'qrcode'
import { usePathname } from 'next/navigation'

// For the carousel
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md'
import useEmblaCarousel from 'embla-carousel-react'

// For carousel inside slide 1
import AvatarImageComponent from '@/components/avatarImage/page'

import DrawOutlineButton from '@/components/AnimatedButton/DrawOutlineButton'

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

// import { ConstantColorFactor } from 'three'

// Cards
import GeniusIDFlipCard from '@/components/card/GeniusIDFlipCard'
import ExperienceFlipCard from '@/components/card/experienceFlipCard'
import CardsFlipCard from '@/components/card/cardsFlipCard'

// Custom tooltip component for chart
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className='flex flex-col gap-4 rounded-md bg-slate-900 p-4'>
        <p className='text-base'>{label}</p>
        <p className='text-sm text-indigo-400'>
          <span className='ml-2'>{payload[0].payload.percentage}</span>%
        </p>
      </div>
    )
  }
}

export default function Hero3() {
  const { user } = useUser()
  const [skillsData, setSkillsData] = useState([])
  const [avatarsData, setAvatarsData] = useState([])
  const [cardsData, setCardsData] = useState([])
  const [experience, setExperience] = useState([])

  const [isOpen, setIsOpen] = useState(false)

  // Main Carousel
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

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

  // ------------------------------------------------------------

  // Experience
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

  // ------------------------------------------------------------

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
          const skillsArray = Array.from(skillsSet).map((strObj) => JSON.parse(strObj))
          setSkillsData(skillsArray)
        }
      } catch (error) {
        console.log('failed to fetch the skills data')
      }
    }

    if (user) {
      fetchSkillsData() // Fetch data only if user is available
    }
  }, [user])

  // ------------------------------------------------------------

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
    <div className='relative flex flex-col lg:size-full'>
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
                              <div className='my-4 flex justify-center text-xl font-semibold drop-shadow md:text-5xl'>
                                Genius ID
                                <a
                                  className=' px-2 py-1 text-sm text-black dark:text-white'
                                  aria-label='edit button'
                                  href='/slider'
                                >
                                  <FaRegEdit />
                                </a>
                              </div>
                              <div className='flex justify-center'>
                                <GeniusIDFlipCard
                                  first_name={user.first_name}
                                  last_name={user.last_name}
                                  email={user.email}
                                  dob={user.dob}
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
                                    <a
                                      className=' px-2 py-1 text-sm text-black dark:text-white'
                                      aria-label='edit button'
                                      href='/slider'
                                    >
                                      <FaRegEdit />
                                    </a>
                                  </div>
                                  <div className='flex justify-center'>
                                    <CardsFlipCard
                                      type={card.type}
                                      name={card.name}
                                      dateIn={card.date_in}
                                      dateOut={card.date_out}
                                    />
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className='w-full shrink-0 grow lg:min-w-0 '>
                              <div className='flex flex-col justify-center'>
                                <div className='relative my-4 flex justify-center text-xl font-semibold drop-shadow md:text-5xl'>
                                  CARD2
                                  <a
                                    className=' px-2 py-1 text-sm text-black dark:text-white'
                                    aria-label='edit button'
                                    href='/slider'
                                  >
                                    <FaRegEdit />
                                  </a>
                                </div>
                                <div className='flex justify-center'>
                                  <CardsFlipCard
                                    personName='Person Name'
                                    type='DEFAULT'
                                    name='DEFAULT'
                                    dateIn='DEFAULT'
                                    dateOut='DEFAULT'
                                  />
                                </div>
                              </div>
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
                                <a
                                  className=' px-2 py-1 text-sm text-black dark:text-white'
                                  aria-label='edit button'
                                  href='/slider'
                                >
                                  <FaRegEdit />
                                </a>
                              </div>
                              <div className='flex justify-center'>
                                <GeniusIDFlipCard
                                  first_name='DEFAULT'
                                  last_name='DEFAULT'
                                  email='DEFAULT@'
                                  dob='DEFAULT'
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
                                <a
                                  className=' px-2 py-1 text-sm text-black dark:text-white'
                                  aria-label='edit button'
                                  href='/slider'
                                >
                                  <FaRegEdit />
                                </a>
                              </div>
                              <div className='flex justify-center'>
                                <CardsFlipCard
                                  personName='Person Name'
                                  type='DEFAULT'
                                  name='DEFAULT'
                                  dateIn='DEFAULT'
                                  dateOut='DEFAULT'
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
                      <DrawOutlineButton onClick={() => setIsOpen(true)}>GG+</DrawOutlineButton>
                    </div>
                    {/* Spring Pop Up Modal */}
                    <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} />
                  </div>
                </div>

                <div className='mt-60 h-full lg:mr-20 lg:mt-0 lg:w-[30%] '>
                  <div className='my-4 flex justify-center text-xl font-semibold drop-shadow md:text-5xl'>
                    Avatar
                    <a
                      className=' px-2 py-1 text-sm text-black dark:text-white'
                      aria-label='edit button'
                      href='/slider'
                    >
                      <FaRegEdit />
                    </a>
                  </div>
                  <div className='flex min-h-48 items-center justify-center px-4'>
                    <div className='mb-7 flex min-h-48 items-center justify-center gap-x-14 px-4 md:px-8 xl:px-10'>
                      <AvatarImageComponent />
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
                    <a
                      className=' px-2 py-1 text-sm text-black dark:text-white'
                      aria-label='edit button'
                      href='/slider'
                    >
                      <FaRegEdit />
                    </a>
                  </div>
                  {user && experience.length != 0 ? (
                    <div className='flex flex-col items-center justify-center'>
                      {/* Carousel */}
                      <div className='w-full overflow-hidden' ref={emblaRef3}>
                        <div className='flex items-center'>
                          {experience.map((exp) => (
                            <div className='w-full shrink-0 grow lg:min-w-0 '>
                              <div className='flex flex-col justify-center'>
                                <div className='flex justify-center'>
                                  <ExperienceFlipCard
                                    type={exp.type}
                                    projectName={exp.name}
                                    skills={exp.project_skills.join(', ')}
                                    toolsAndTech={exp.tools}
                                  />
                                </div>
                                <div className='my-3'>
                                  <p className='px-4'>
                                    Nobis nostrum consequuntur maxime consectetur dolor ratione, in harum explicabo
                                    voluptates distinctio magni, obcaecati minus aperiam pariatur. Ratione fuga quia
                                    blanditiis sed!
                                  </p>
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
                    </div>
                  ) : (
                    <div className='flex flex-col items-center justify-center'>
                      {/* Carousel */}
                      <div className='w-full overflow-hidden' ref={emblaRef3}>
                        <div className='flex items-center'>
                          <div className='w-full shrink-0 grow lg:min-w-0 '>
                            <div className='flex flex-col justify-center'>
                              <div className='flex justify-center'>
                                <ExperienceFlipCard
                                  type='DEFAULT'
                                  projectName='DEFAULT'
                                  skills='DEFAULT'
                                  toolsAndTech='DEFAULT'
                                />
                              </div>
                              <div className='my-3'>
                                <p className='px-4'>
                                  Nobis nostrum consequuntur maxime consectetur dolor ratione, in harum explicabo
                                  voluptates distinctio magni, obcaecati minus aperiam pariatur. Ratione fuga quia
                                  blanditiis sed!
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='my-4 flex justify-center gap-x-24 text-2xl sm:gap-x-36'>
                          <button onClick={scrollPrev3} aria-label='previous button'>
                            <MdNavigateBefore />
                          </button>
                          <button onClick={scrollNext3} aria-label='next button'>
                            <MdNavigateNext />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className='mt-4 flex justify-center'>
                    {/* https://r3-f-next-js-starter-package.vercel.app/ */}
                    {user ? (
                      <a
                        href={`http://localhost:3000/api/public/users/${user.gg_id}`}
                        target='_blank'
                        aria-label='Booking button'
                      >
                        <DrawOutlineButton>Booking</DrawOutlineButton>
                      </a>
                    ) : (
                      <a href='' target='_blank' aria-label='Booking button'>
                        <DrawOutlineButton>Booking</DrawOutlineButton>
                      </a>
                    )}
                  </div>
                </div>

                <div className='mt-60 h-full lg:mr-24 lg:mt-0 lg:w-[30%] '>
                  <div className='my-4 flex justify-center pl-5 text-xl font-semibold drop-shadow md:text-5xl'>
                    Skills
                    <a
                      className=' px-2 py-1 text-sm text-black dark:text-white'
                      aria-label='edit button'
                      href='/slider'
                    >
                      <FaRegEdit />
                    </a>
                  </div>
                  <CardContainer className='mt-10 py-0 hover:shadow-3xl dark:border-none dark:hover:border-none dark:hover:shadow-3xl'>
                    <CardBody className='group/card relative'>
                      <div className='flex min-h-48 flex-co
                        {skillsData ? (
                          <div>
                            {/* Condition for changing barchart chart and radar chart*/}
                            {skillsData.length < 6 ? (
                              <ResponsiveContainer width={380} height={330}>
                                <BarChart
                                  width={420}
                                  height={330}
                                  data={skillsData}
                                  margin={{
                                    top: 5,
                                    right: 30,
                                    left: 0,
                                    bottom: 5,
                                  }}
                                >
                                  <XAxis
                                    dataKey={skillsData.skill_name}
                                    angle={-30}
                                    padding={{ left: 20, right: 20 }}
                                  />
                                  <YAxis domain={[0, 100]} />
                                  <Tooltip content={<CustomTooltip active={false} payload={[]} label='skill_name' />} />

                                  <CartesianGrid vertical={false} strokeDasharray='6 6' />
                                  <Bar
                                    name='Ram'
                                    dataKey='percentage'
                                    fill='#6E29F7'
                                    activeBar={<Rectangle fill='#268AFF' stroke='blue' />}
                                  />
                                </BarChart>
                              </ResponsiveContainer>
                            ) : (
                              // Radar chart
                              <ResponsiveContainer width={420} height={330}>
                                <RadarChart
                                  // cx={300}
                                  // cy={250}
                                  // outerRadius={150}
                                  width={420}
                                  height={330}
                                  data={skillsData}
                                >
                                  <PolarGrid />
                                  <PolarAngleAxis dataKey='skill_name' />
                                  <PolarRadiusAxis opacity={0} domain={[0, 100]} />
                                  <Radar
                                    name='Ram'
                                    dataKey='percentage'
                                    stroke='#28B5E1'
                                    strokeWidth={4}
                                    fill='#28B5E1'
                                    fillOpacity={0.4}
                                  />
                                  {/* <Tooltip /> */}
                                  {/* <Legend values="100%" /> */}
                                  <Tooltip content={<CustomTooltip active={false} payload={[]} label='skill_name' />} />
                                </RadarChart>
                              </ResponsiveContainer>
                            )}
                          </div>
                        ) : (
                          // Render loading indicator or placeholder while data is being fetched
                          <div>No Skill to show</div>
                        )}
                      </div>
                    </CardBody>
                  </CardContainer>
                </div>
              </div>
            </div>
            {/* Slide 3 */}
            <div className='w-full shrink-0 grow lg:min-w-0'>
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
            </div>
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
    </div>
  )
}
