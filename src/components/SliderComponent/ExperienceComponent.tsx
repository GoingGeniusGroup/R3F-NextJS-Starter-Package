'use client'

import { motion } from 'framer-motion'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

import { useState, useEffect } from 'react'
import { useUser } from '@/context/UserContext/UserContext'
import { TiDelete } from 'react-icons/ti'

import ExperienceFlipCard from '../card/experienceFlipCard'

import DrawOutlineButton from '../AnimatedButton/DrawOutlineButton'

import axios from 'axios'
import Link from 'next/link'

import { TagsInput } from 'react-tag-input-component'
import dynamic from 'next/dynamic'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

import { IoHome } from 'react-icons/io5'

export default function ExperienceComponent({ onNextButtonClick, onPrevButtonClick, isSmallScreen }) {
  const { user } = useUser()
  const [projects, setProjects] = useState([
    { experience_id: '', type: '', name: '', description: '', tools: [], project_skills: [] },
  ])

  // fetch experience data
  useEffect(() => {
    const fetchExpData = () => {
      try {
        if (user.experience.length !== 0) {

          // const modifiedProjects = user.experience.map((exp) => ({
          //   ...exp, // Keep all properties of the original experience object
          //   skills: exp.skills.map((skill) => skill.skill), // Modify the 'skills' property
          // }))
          // setProjects(modifiedProjects)
          // console.log(modifiedProjects)

          setProjects(user.experience)
        }
      } catch (error) {
        console.log('Error fetching cards data:', error)
      }
    }

    if (user) {
      fetchExpData() // Fetch data only if user is available
    }
  }, [user])

  function checkActiveExp(element) {
    return element.gg_id === user.gg_id
  }

  const handleExpSubmit = async (e: any, index: number) => {
    e.preventDefault()
    const submit = {
      gg_id: user.gg_id,
      type: projects[index].type,
      name: projects[index].name,
      description: projects[index].description,
      tools: projects[index].tools,
      project_skills: projects[index].project_skills,
    }
    try {
      await axios({
        url: `/api/internal/experience`,
        method: 'POST',
        data: submit,
      })
      alert('Experience Info saved')
    } catch (error) {
      alert('failed to save the exp info')
    }
  }
  const handleExpUpdate = async (e: any, index: number, experience_id) => {
    e.preventDefault()
    const submit = {
      gg_id: user.gg_id,
      type: projects[index].type,
      name: projects[index].name,
      description: projects[index].description,
      tools: projects[index].tools,
      project_skills: projects[index].project_skills,
    }
    try {
      await axios({
        url: `/api/internal/experience/${experience_id}`,
        method: 'PUT',
        data: submit,
      })
      alert('Experience info updated')
    } catch (error) {
      alert('Error updating exp info')
    }
  }

  const handleExpDelete = async (experience_id) => {
    try {
      await axios({
        url: `/api/internal/experience/${experience_id}`,
        method: 'DELETE',
      })
      alert('Experience info deleted')
    } catch (error) {

      alert('Error deleting exp info')

    }
  }

  const handleProjectNameChange = (index, newName) => {
    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects]
      updatedProjects[index].name = newName
      return updatedProjects
    })
  }

  const handleProjectTypeChange = (index, newType) => {
    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects]
      updatedProjects[index].type = newType
      return updatedProjects
    })
  }

  const handleProjectDescriptionChange = (index, newDescription) => {
    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects]
      updatedProjects[index].description = newDescription
      return updatedProjects
    })
  }

  const handleAddProject = () => {
    setProjects((prevProjects) => [
      ...prevProjects,
      { experience_id: '', type: '', name: 'Project Name', description: '', project_skills: [], tools: [] },
    ])
  }

  const handleDeleteProject = (index, experience_id) => {
    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects]
      updatedProjects.splice(index, 1)
      if (experience_id) {
        handleExpDelete(experience_id)
      }
      return updatedProjects
    })
  }

  const handleSkillsChange = (index, newSkills) => {
    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects]
      updatedProjects[index].project_skills = newSkills
      return updatedProjects
    })
  }
  const handleToolsChange = (index, newTools) => {
    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects]
      updatedProjects[index].tools = newTools
      return updatedProjects
    })
  }

  return (
    <div className='-ml-3 mb-12 mt-2 flex flex-col items-center md:mb-0 md:ml-0'>
      <div className='relative flex flex-col py-4 md:w-[600px] md:rounded-3xl md:bg-black/10 md:px-10 md:shadow-md md:shadow-purple-700 md:backdrop-blur-md lg:h-[550px] lg:w-[800px]'>
        <div className='flex h-screen w-full flex-col '>
          <div className='relative my-3 flex justify-center text-2xl font-semibold drop-shadow lg:my-5 lg:text-5xl'>
            EXPERIENCE
            <div className='absolute right-0 top-10 text-sm'>
              <DrawOutlineButton
                onClick={() => {
                  handleAddProject()
                }}
                aria-label='add project button'
              >
                Add Project &emsp; +
              </DrawOutlineButton>
            </div>
          </div>

          <Tabs>
            {/* TabList */}
            <TabList className='mt-20 flex flex-col sm:flex-row sm:items-start sm:justify-start lg:my-6'>
              {projects.map((project, index) => (
                <Tab key={index} className='ml-3 flex cursor-pointer px-1'>
                  {project.name}
                  <button
                    className='ml-2 text-gray-900 hover:text-red-500'
                    aria-label='delete button'
                    onClick={() => handleDeleteProject(index, project.experience_id)}
                  >
                    <TiDelete />
                  </button>
                </Tab>
              ))}
            </TabList>

            {/* TabPanel */}
            {projects.map((project, index) => (
              <TabPanel key={index}>
                <div className='flex flex-col lg:flex-row lg:justify-between'>
                  {/* Card Image / Container */}
                  <div className='flex flex-col'>
                    <div className='flex justify-center'>
                      {project.project_skills && (
                        <ExperienceFlipCard
                          type={project.type}
                          projectName={project.name}
                          skills={project.project_skills.join(', ')}
                          toolsAndTech={project.tools.join(', ')}
                        />
                      )}
                    </div>
                    <div className='mt-1 flex justify-center'>
                      <a
                        href='https://quickslot.kinde.com/auth/cx/_:nav&m:login&psid:75967cd63ea14e95aeffecd5c6e34633'
                        target='_blank'
                        aria-label='booking button'
                      >
                        <DrawOutlineButton aria-label='booking button'>Booking</DrawOutlineButton>
                      </a>
                    </div>
                  </div>

                  {/* Form for user input */}
                  <div className='w-full lg:w-[50%]'>
                    {user && checkActiveExp(project) != true ? (
                      <form
                        onSubmit={(e) => handleExpSubmit(e, index)}
                        className='mx-auto mt-4 flex w-full max-w-lg flex-col items-center justify-center'
                      >
                        <div className='flex w-full flex-col gap-y-2 px-4'>
                          <div className='flex flex-row items-center justify-between'>
                            <div>
                              <label
                                htmlFor='educational'
                                className={` ${project.type === 'educational' ? 'font-bold text-purple-400' : 'text-white hover:text-purple-400'}`}
                              >
                                Educational
                              </label>
                              <input
                                type='radio'
                                aria-label='educational'
                                id='educational'
                                name='type'
                                value='educational'
                                checked={project.type === 'educational'}
                                onChange={(e) => handleProjectTypeChange(index, e.target.value)}
                                className='hidden'
                              />
                            </div>
                            <div>
                              <input
                                type='radio'
                                aria-label='work'
                                id='work'
                                name='type'
                                value='work'
                                checked={project.type === 'work'}
                                onChange={(e) => handleProjectTypeChange(index, e.target.value)}
                                className='hidden'
                              />
                              <label
                                htmlFor='work'
                                className={`${project.type === 'work' ? 'font-bold text-purple-400' : 'text-white hover:text-purple-400'}`}
                              >
                                Work
                              </label>
                            </div>
                            <div>
                              <input
                                type='radio'
                                aria-label='emergency'
                                id='emergency'
                                name='type'
                                value='emergency'
                                checked={project.type === 'emergency'}
                                onChange={(e) => handleProjectTypeChange(index, e.target.value)}
                                className='hidden'
                              />
                              <label
                                htmlFor='emergency'
                                className={` ${project.type === 'emergency' ? 'font-bold text-purple-400' : 'text-white hover:text-purple-400'}`}
                              >
                                Emergency
                              </label>
                            </div>
                          </div>

                          <div className='mt-4 flex flex-col lg:mt-0 lg:flex-row lg:justify-between'>
                            <label htmlFor='projectName'>Name</label>
                            <input
                              id='projectName'
                              aria-label='projectName'
                              type='text'
                              value={project.name}
                              onChange={(e) => handleProjectNameChange(index, e.target.value)}
                              placeholder='Project Name'
                              className='rounded-md bg-white/20 px-3 lg:w-[70%]'
                              required
                            />
                          </div>
                          <div className='flex flex-col lg:flex-row lg:justify-between'>
                            <label htmlFor='description'>Description</label>
                            <input
                              id='description'
                              aria-label='description'
                              type='text'
                              value={project.description}
                              onChange={(e) => handleProjectDescriptionChange(index, e.target.value)}
                              placeholder='Project Description'
                              className='rounded-md bg-white/20 px-3  lg:w-[70%]'
                            />
                          </div>
                          <div className='flex flex-col lg:flex-row lg:justify-between'>
                            <label className='text-gray-900 dark:text-white' htmlFor='file_input'>
                              ProjPic
                            </label>
                            <input
                              className='block cursor-pointer rounded-lg text-sm text-gray-900 focus:outline-none lg:w-[70%]  dark:bg-black/30 dark:text-white dark:placeholder:text-white'
                              id='file_input'
                              type='file'
                              aria-label='file_input'
                            />
                          </div>
                          <div className='flex flex-col lg:flex-row lg:justify-between'>
                            <label htmlFor=''>Skills</label>
                            <div className='text-sm text-gray-900 focus:outline-none lg:w-[70%]  dark:bg-white dark:text-black dark:placeholder:text-black'>
                              <TagsInput
                                value={project.project_skills}
                                onChange={(tags) => handleSkillsChange(index, tags)}
                                aria-label='skills_input'
                                name='skills'
                                placeHolder='Enter skills'
                              />
                            </div>
                          </div>
                          <div className='flex flex-col lg:flex-row lg:justify-between'>
                            <label htmlFor=''>Tools</label>
                            <div className='text-sm text-gray-900 focus:outline-none lg:w-[70%]  dark:bg-white dark:text-black dark:placeholder:text-black'>
                              <TagsInput
                                value={project.tools}
                                onChange={(tags) => handleToolsChange(index, tags)}
                                aria-label='tools_input'
                                name='tools'
                                placeHolder='Enter tools used'
                              />
                            </div>
                          </div>
                        </div>
                        {/* Next and Generate Button */}
                        {!isSmallScreen ? (
                          <>
                            <div className='mt-4'>
                              <DrawOutlineButton type='submit' aria-label='generate'>
                                Generate
                              </DrawOutlineButton>
                            </div>
                            <div className='absolute bottom-4 right-4'>
                              <Link href='/hero3'>
                                <button
                                  className='mr-2 rounded-full bg-purple-400/20 transition-all duration-150 hover:scale-105 hover:bg-purple-300/30'
                                  type='submit'
                                  aria-label='home btn'
                                >
                                  <p className='p-4'>
                                    <IoHome />
                                  </p>
                                </button>
                              </Link>
                              <button
                                className='rounded-full bg-purple-400/20 transition-all duration-150 hover:scale-105 hover:bg-purple-300/30'
                                type='submit'
                                onClick={onNextButtonClick}
                                aria-label='next'
                              >
                                <p className='p-4'>
                                  <FaArrowRight />
                                </p>
                              </button>
                            </div>
                          </>
                        ) : (
                          <div className='absolute bottom-4 right-4 flex gap-x-1'>
                            <Link href='/hero3'>
                              <DrawOutlineButton type='submit' onClick={onNextButtonClick} aria-label='next slide'>
                                <IoHome className='my-1' />
                              </DrawOutlineButton>
                            </Link>
                            <DrawOutlineButton type='submit' onClick={onNextButtonClick} aria-label='next slide'>
                              Next
                            </DrawOutlineButton>
                          </div>
                        )}
                      </form>
                    ) : (
                      <form
                        onSubmit={(e) => handleExpUpdate(e, index, project.experience_id)}
                        className='mx-auto mt-4 flex w-full max-w-lg flex-col items-center justify-center'
                      >
                        <div className='flex w-full flex-col gap-y-2 px-4'>
                          <div className='flex flex-row items-center justify-between'>
                            <div>
                              <label
                                htmlFor='educational'
                                className={` ${project.type === 'educational' ? 'font-bold text-purple-400' : 'text-white hover:text-purple-400'}`}
                              >
                                Educational
                              </label>
                              <input
                                type='radio'
                                aria-label='educational'
                                id='educational'
                                name='type'
                                value='educational'
                                checked={project.type === 'educational'}
                                onChange={(e) => handleProjectTypeChange(index, e.target.value)}
                                className='hidden'
                              />
                            </div>
                            <div>
                              <input
                                type='radio'
                                aria-label='work'
                                id='work'
                                name='type'
                                value='work'
                                checked={project.type === 'work'}
                                onChange={(e) => handleProjectTypeChange(index, e.target.value)}
                                className='hidden'
                              />
                              <label
                                htmlFor='work'
                                className={`${project.type === 'work' ? 'font-bold text-purple-400' : 'text-white hover:text-purple-400'}`}
                              >
                                Work
                              </label>
                            </div>
                            <div>
                              <input
                                type='radio'
                                aria-label='emergency'
                                id='emergency'
                                name='type'
                                value='emergency'
                                checked={project.type === 'emergency'}
                                onChange={(e) => handleProjectTypeChange(index, e.target.value)}
                                className='hidden'
                              />
                              <label
                                htmlFor='emergency'
                                className={` ${project.type === 'emergency' ? 'font-bold text-purple-400' : 'text-white hover:text-purple-400'}`}
                              >
                                Emergency
                              </label>
                            </div>
                          </div>

                          <div className='mt-4 flex flex-col lg:mt-0 lg:flex-row lg:justify-between'>
                            <label htmlFor='projectName'>Name</label>
                            <input
                              id='projectName'
                              aria-label='projectName'
                              type='text'
                              value={project.name}
                              onChange={(e) => handleProjectNameChange(index, e.target.value)}
                              placeholder='Project Name'
                              className='rounded-md bg-white/20 px-3 lg:w-[70%]'
                              required
                            />
                          </div>
                          <div className='flex flex-col lg:flex-row lg:justify-between'>
                            <label htmlFor='description'>Description</label>
                            <input
                              id='description'
                              aria-label='description'
                              type='text'
                              value={project.description}
                              onChange={(e) => handleProjectDescriptionChange(index, e.target.value)}
                              placeholder='Project Description'
                              className='rounded-md bg-white/20 px-3  lg:w-[70%]'
                            />
                          </div>
                          <div className='flex flex-col lg:flex-row lg:justify-between'>
                            <label className='text-gray-900 dark:text-white' htmlFor='file_input'>
                              ProjPic
                            </label>
                            <input
                              className='block cursor-pointer rounded-lg text-sm text-gray-900 focus:outline-none lg:w-[70%]  dark:bg-black/30 dark:text-white dark:placeholder:text-white'
                              id='file_input'
                              type='file'
                              aria-label='file_input'
                            />
                          </div>
                          <div className='flex flex-col lg:flex-row lg:justify-between'>
                            <label htmlFor=''>Skills</label>
                            <div className='bg-black text-sm text-gray-900 focus:outline-none lg:w-[70%] dark:text-black dark:placeholder:text-black'>
                              <TagsInput
                                value={project.project_skills}
                                onChange={(tags) => handleSkillsChange(index, tags)}
                                aria-label='skills_input'
                                name='skills'
                                placeHolder='Enter skills'
                              />
                            </div>
                          </div>
                          <div className='flex flex-col lg:flex-row lg:justify-between'>
                            <label htmlFor=''>Tools</label>
                            <div className='bg-black text-sm text-gray-900 focus:outline-none  lg:w-[70%] dark:text-black dark:placeholder:text-black'>
                              <TagsInput
                                value={project.tools}
                                onChange={(tags) => handleToolsChange(index, tags)}
                                aria-label='tools_input'
                                name='tools'
                                placeHolder='Enter tools used'
                              />
                            </div>
                          </div>
                        </div>
                        {/* Next and Update Button */}
                        {!isSmallScreen ? (
                          <>
                            <div className='mt-4'>
                              <DrawOutlineButton type='submit' aria-label='update'>
                                Update
                              </DrawOutlineButton>
                            </div>
                            <div className='absolute bottom-4 right-4'>
                              <Link href='/hero3'>
                                <button
                                  className='mr-2 rounded-full bg-purple-400/20 transition-all duration-150 hover:scale-105 hover:bg-purple-300/30'
                                  type='submit'
                                  aria-label='home btn'
                                >
                                  <p className='p-4'>
                                    <IoHome />
                                  </p>
                                </button>
                              </Link>
                              <button
                                className='rounded-full bg-purple-400/20 transition-all duration-150 hover:scale-105 hover:bg-purple-300/30'
                                type='submit'
                                onClick={onNextButtonClick}
                                aria-label='next'
                              >
                                <p className='p-4'>
                                  <FaArrowRight />
                                </p>
                              </button>
                            </div>
                          </>
                        ) : (
                          <div className='absolute bottom-4 right-4 flex gap-x-1'>
                            <Link href='/hero3'>
                              <DrawOutlineButton type='submit' onClick={onNextButtonClick} aria-label='next slide'>
                                <IoHome className='my-1' />
                              </DrawOutlineButton>
                            </Link>
                            <DrawOutlineButton type='submit' onClick={onNextButtonClick} aria-label='next slide'>
                              Next
                            </DrawOutlineButton>
                          </div>
                        )}
                      </form>
                    )}
                  </div>
                </div>
              </TabPanel>
            ))}
          </Tabs>

          {/* Back Button */}

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

                  <p className='px-4'>Back</p>
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
  )
}
