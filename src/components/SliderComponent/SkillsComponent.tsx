'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@/context/UserContext/UserContext'

import { FaArrowLeft } from 'react-icons/fa6'

import DrawOutlineButton from '../AnimatedButton/DrawOutlineButton'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

import { TiDelete } from 'react-icons/ti'
import { IoHome } from 'react-icons/io5'

import Link from 'next/link'

import axios from 'axios'

import {
  Bar,
  BarChart,
  CartesianGrid,
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
import { element } from 'three/examples/jsm/nodes/shadernode/ShaderNode'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className='flex flex-col gap-4 rounded-md bg-slate-900 p-4'>
        <p className='text-lg text-white'>{label}</p>
        <p className='text-sm text-indigo-400'>
          <span className='ml-2'>{payload[0].payload.percentage}</span>%
        </p>
      </div>
    )
  }
}

export default function SkillsComponent({ onPrevButtonClick, isSmallScreen }) {
  const { user } = useUser()

  const [skills, setSkills] = useState([{ gg_id: '', skill_id: '', skill_name: 'skill1', percentage: 0 }])

  function checkExistingSkills(skill: string, exp_skills: string[][]): boolean {
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
        const skillsSet = new Set<string>() // Create a Set to store unique JSON strings

        if (user.experience.length !== 0) {
          const exp_skill_obj = {}
          const exp_skills = []

          user.skills.forEach((skillObj) => {
            // Add the skillObj to skillsSet

            skillsSet.add(
              JSON.stringify({
                gg_id: skillObj.gg_id,
                skill_id: skillObj.skill_id,
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
                      gg_id: '',
                      skill_id: '',
                      skill_name: skill,
                      percentage: 0,
                    }),
                  ) // Add each object to the Set after converting it to a string
                } else {
                  skillsSet.add(
                    JSON.stringify({
                      gg_id: user.gg_id,
                      skill_id: exp_skill_obj[`${skill}` + '_id'],
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
          setSkills(skillsArray)
        }
      } catch (error) {
        console.log('failed to fetch the skills data')
      }
    }

    if (user) {
      fetchSkillsData() // Fetch data only if user is available
    }
  }, [user])

  const checkActiveSkills = (element) => {
    return element.gg_id === user.gg_id
  }

  const handleSkillSubmit = async (e: any, index: number) => {
    e.preventDefault()
    const submit = {
      gg_id: user.gg_id,
      skill: {
        skill_name: skills[index].skill_name,
        percentage: skills[index].percentage,
      },
    }
    try {
      await axios({
        url: `/api/internal/skills`,
        method: 'POST',
        data: submit,
      })
      alert('skills info saved')
      window.location.reload()
      return
    } catch (error) {
      throw new Error('failed to save the skills info')
    }
  }

  const handleSkillUpdate = async (e: any, index: number) => {
    e.preventDefault()
    const submit = {
      skill: {
        skill_name: skills[index].skill_name,
        percentage: skills[index].percentage,
      },
    }
    try {
      await axios({
        url: `/api/internal/skills/${skills[index].skill_id}`,
        method: 'PUT',
        data: submit,
      })
      alert('skills info updated')
      window.location.reload()
      return
    } catch (error) {
      console.error(error)
      throw new Error('failed to update the skills info')
    }
  }

  const handleSkillDelete = async (index: number) => {
    try {
      await axios({
        url: `/api/internal/skills/${skills[index].skill_id}`,
        method: 'DELETE',
      })
      alert('skill info deleted')
      window.location.reload()
      return
    } catch (error) {
      console.error(error)
      // throw new Error('failed to delete the skill info')
    }
  }

  const handleSkillNameChange = (index: number, newName: string) => {
    setSkills((prevSkills) => {
      const updatedSkills = [...prevSkills]
      updatedSkills[index].skill_name = newName
      return updatedSkills
    })
  }

  const handleSliderChange = (index: number, newValue: number) => {
    setSkills((prevSkills) => {
      const updatedSkills = [...prevSkills]
      updatedSkills[index].percentage = newValue
      return updatedSkills
    })
  }

  const handleAddSkill = () => {
    setSkills((prevSkills) => [...prevSkills, { gg_id: '', skill_id: '', skill_name: 'skill', percentage: 0 }])
  }

  const handleDeleteSkill = (index) => {
    setSkills((prevSkills) => {
      const updatedSkills = [...prevSkills]
      updatedSkills.splice(index, 1)
      if (skills[index].skill_id.length != 0) {
        handleSkillDelete(index)
      }
      return updatedSkills
    })
  }

  const [open, setOpen] = useState(false)

  return (
    <div className='-ml-3 mb-12 mt-2 flex flex-col items-center md:ml-0 lg:mb-0'>
      <div
        id='card'
        className='relative flex h-[900px] w-[300px] flex-col py-4 md:w-[600px] md:rounded-3xl md:bg-black/10 md:px-10 md:shadow-md md:shadow-purple-700 md:backdrop-blur-md lg:h-[550px] lg:w-[800px]'
      >
        <div className='flex w-full flex-col'>
          <div className='relative my-3 flex justify-center text-2xl font-semibold drop-shadow lg:my-5 lg:text-5xl'>
            SKILLS
            <div className='absolute right-0 top-10 text-sm '>
              <DrawOutlineButton
                onClick={() => {
                  handleAddSkill()
                }}
                aria-label='add skill button'
              >
                Add Skill &emsp; +
              </DrawOutlineButton>
            </div>
          </div>

          <Tabs>
            <TabList className='mt-20 grid grid-cols-3 lg:my-6 lg:grid-cols-6'>
              {skills.map((element, index) => (
                <Tab key={index} className='ml-3 flex cursor-pointer px-1 '>
                  {element.skill_name}
                  <button
                    aria-label='delete'
                    className='ml-2 text-gray-900 hover:text-red-500'
                    onClick={() => handleDeleteSkill(index)}
                  >
                    <TiDelete />
                  </button>
                </Tab>
              ))}
            </TabList>

            {/* TabPanel */}
            <div className='flex flex-col gap-y-5 lg:flex-row lg:gap-x-5 lg:gap-y-0'>
              <div className='w-[300px] md:w-[500px] lg:w-[60%]'>
                {skills.map((element, index) => (
                  <div key={index}>
                    {user && checkActiveSkills(element) != true ? (
                      <form onSubmit={(e) => handleSkillSubmit(e, index)}>
                        <TabPanel>
                          <div className='size-full rounded-[20px]  p-4'>
                            <div className='flex flex-col lg:flex-row  lg:justify-between'>
                              <div className='w-full'>
                                <input
                                  type='text'
                                  value={element.skill_name}
                                  onChange={(e) => handleSkillNameChange(index, e.target.value)}
                                  placeholder='Skill Name'
                                  className='w-full rounded-md bg-white/20 p-1'
                                  aria-label='skill name'
                                />

                                <div className='my-4 flex'>
                                  <input
                                    type='range'
                                    min='0'
                                    max='100'
                                    value={element.percentage}
                                    className='w-full rounded-md bg-purple-600'
                                    onChange={(e) => handleSliderChange(index, parseInt(e.target.value))}
                                    aria-label='slider'
                                  />
                                  <p className='pl-2 text-sm text-purple-300'>{element.percentage}%</p>
                                </div>
                              </div>
                            </div>
                            <label className='text-gray-900 dark:text-white' htmlFor='file_input'>
                              Certifications
                            </label>
                            <input
                              className='block w-full cursor-pointer rounded-lg  bg-gray-50 text-sm text-gray-900 focus:outline-none  dark:bg-gray-700 dark:text-gray-400 dark:placeholder:text-gray-400'
                              id='file_input'
                              type='file'
                              aria-label='file input'
                            />
                          </div>

                          {/* Go Home and Generate Button */}
                          {!isSmallScreen ? (
                            <>
                              <div className='mt-4 flex justify-center'>
                                <DrawOutlineButton type='submit' aria-label='generate'>
                                  Generate
                                </DrawOutlineButton>
                              </div>
                              <div className='absolute bottom-4 right-4'>
                                <Link href='/hero3'>
                                  <button
                                    className='rounded-full bg-purple-400/20 transition-all duration-150 hover:scale-105 hover:bg-purple-300/30'
                                    type='submit'
                                    aria-label='home btn'
                                  >
                                    <p className='p-4'>
                                      <IoHome />
                                    </p>
                                  </button>
                                </Link>
                              </div>
                            </>
                          ) : (
                            <div className='absolute bottom-4 right-4'>
                              <Link href='/hero3'>
                                <DrawOutlineButton type='submit' aria-label='go to home page'>
                                  Go To Home
                                </DrawOutlineButton>
                              </Link>
                            </div>
                          )}
                        </TabPanel>
                      </form>
                    ) : (
                      <form key={index} onSubmit={(e) => handleSkillUpdate(e, index)}>
                        <TabPanel>
                          <div className='size-full rounded-[20px]  p-4'>
                            <div className='flex flex-col lg:flex-row  lg:justify-between'>
                              <div className='w-full'>
                                <input
                                  type='text'
                                  value={element.skill_name}
                                  onChange={(e) => handleSkillNameChange(index, e.target.value)}
                                  placeholder='Skill Name'
                                  className='w-full rounded-md bg-white/20 p-1'
                                  aria-label='skill name'
                                />

                                <div className='my-4 flex'>
                                  <input
                                    type='range'
                                    min='0'
                                    max='100'
                                    value={element.percentage}
                                    className='w-full rounded-md bg-purple-600'
                                    onChange={(e) => handleSliderChange(index, parseInt(e.target.value))}
                                    aria-label='slider'
                                  />
                                  <p className='pl-2 text-sm text-purple-300'>{element.percentage}%</p>
                                </div>
                              </div>
                            </div>

                            <label className='text-gray-900 dark:text-white' htmlFor='file_input'>
                              Certifications
                            </label>
                            <input
                              className='block w-full cursor-pointer rounded-lg  bg-gray-50 text-sm text-gray-900 focus:outline-none  dark:bg-gray-700 dark:text-gray-400 dark:placeholder:text-gray-400'
                              id='file_input'
                              type='file'
                              aria-label='file input'
                            />
                          </div>
                          {/* Go Home and Update Button */}
                          {!isSmallScreen ? (
                            <>
                              <div className='mt-4 flex justify-center'>
                                <DrawOutlineButton type='submit' aria-label='generate'>
                                  Update
                                </DrawOutlineButton>
                              </div>
                              <div className='absolute bottom-4 right-4'>
                                <Link href='/hero3'>
                                  <DrawOutlineButton type='submit' aria-label='go to home page'>
                                    Go To Home
                                  </DrawOutlineButton>
                                </Link>
                              </div>
                            </>
                          ) : (
                            <div className='absolute bottom-4 right-4'>
                              <Link href='/hero3'>
                                <DrawOutlineButton type='submit' aria-label='go to home page'>
                                  Go To Home
                                </DrawOutlineButton>
                              </Link>
                            </div>
                          )}

                        </TabPanel>
                      </form>
                    )}
                  </div>
                ))}
              </div>

              <div className='mt-4 w-[300px] rounded-[20px] p-3 md:w-[500px]  lg:ml-2 lg:mt-0 lg:w-[45%]'>
                <p className='mb-2 flex justify-center'>Specification</p>

                {/* Condition for changing barchart chart and radar chart*/}
                <div className='mb-5 lg:block lg:w-full'>
                  {skills.length < 6 ? (
                    <ResponsiveContainer width='100%' height={220}>
                      <BarChart
                        width={100}
                        height={287}
                        data={skills}
                        margin={{
                          top: 5,
                          right: 20,
                          left: -20,
                          bottom: 5,
                        }}
                      >
                        <XAxis dataKey='skill_name' angle={-30} />
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
                    <ResponsiveContainer width='100%' height={220}>
                      <RadarChart
                        // cx={300}
                        // cy={250}
                        // outerRadius={150}
                        width={100}
                        height={287}
                        data={skills}
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
              </div>
            </div>
          </Tabs>


          <div className='absolute bottom-4 right-0 lg:right-4'>
            <Link href='/hero3'>
              <DrawOutlineButton aria-label='go to home page'>Go To Home</DrawOutlineButton>
            </Link>
          </div>

          {!isSmallScreen ? (
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
          ) : (
            <div className='absolute bottom-4 left-4 mt-4'>
              <DrawOutlineButton onClick={onPrevButtonClick} aria-label='prev'>

                <p className='px-4'>Back</p>
              </DrawOutlineButton>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
