'use client'

import { CardBody, CardContainer, CardItem } from '@/components/card/card'
// import { Button } from "@/components/ui/button"

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { Suspense } from 'react'
import { Avatar } from 'src/components/Avatar'
import { useState } from 'react'
import FormModal from '@/components/FormModal/Modal'
import { motion } from 'framer-motion'
import { LogosFacebook } from '@/logo/LogosFacebook'
import { SkillIconsInstagram } from '@/logo/SkillIconsInstagram'
import { SkillIconsLinkedin } from '@/logo/SkillIconsLinkedin'
import { LogosGoogleIcon } from '@/logo/LogosGoogleIcon'
import { LogosYoutubeIcon } from '@/logo/LogosYoutubeIcon'
import { LogosApple } from '@/logo/LogosApple'
import { LogosFigma } from '@/logo/LogosFigma'
import { LogosTwitch } from '@/logo/LogosTwitch'
import { SkillIconsGithubDark } from '@/logo/SkillIconsGithubDark'

const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div className='flex h-96 w-full flex-col items-center justify-center'>
      import {SkillIconsLinkedin} from '@/logo/SkillIconsLinkedin'
      <svg className='-ml-1 mr-3 size-5 animate-spin text-black' fill='none' viewBox='0 0 24 24'>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  ),
})
const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })
const Type = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Type), { ssr: false })

export default function Hero() {
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false)
  const [isCardModalOpen, setIsCardModalOpen] = useState(false)
  const [isWorkModalOpen, setIsWorkModalOpen] = useState(false)
  const [isConnectionModalOpen, setIsConnectionModalOpen] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [cardBackground, setCardBackground] = useState('project-card-bg.jpg')
  const [cardAvatar, setCardAvatar] = useState('aa.png')
  const [jobTitle, setJobTitle] = useState('')

  const closeAllModals = () => {
    setIsSkillModalOpen(false)
    setIsCardModalOpen(false)
    setIsWorkModalOpen(false)
    setIsConnectionModalOpen(false)
  }

  const openSkillModal = () => {
    closeAllModals()
    setIsSkillModalOpen(true)
  }

  const openCardModal = () => {
    closeAllModals()
    setIsCardModalOpen(true)
  }

  const openWorkModal = () => {
    closeAllModals()
    setIsWorkModalOpen(true)
  }

  const openConnectionModal = () => {
    closeAllModals()
    setIsConnectionModalOpen(true)
  }

  return (
    <div className='h-screen w-full'>
      <div className='flex items-center bg-none'>
        <View className='flex h-20 w-full flex-col items-center justify-center bg-none'>
          <Suspense fallback={null}>
            <Type scale={2} position={[0, 0, 0]} />
            <Common />
          </Suspense>
        </View>
      </div>
      <Avatar
        modelSrc='https://models.readyplayer.me/658be9e8fc8bec93d06806f3.glb?morphTargets=ARKit,Eyes Extra&textureAtlas=none&lod=0'
        shadows
        animationSrc='/male-idle-3.fbx'
        style={{ background: 'rgb(9,20,26)' }}
        fov={40}
        cameraTarget={1.5}
        cameraInitialDistance={30}
        effects={{
          ambientOcclusion: true,
        }}
      />
      {/* <EnvironmentModel environment="spaceStation" scale={1} /> */}
      <div className='right-[30%] top-[32%] size-full md:absolute'>
        <div className='ml-[12%] flex flex-col items-center justify-center'>
          <h2 className='mb-12 text-4xl font-extrabold'>Ayush Lama</h2>
          <nav className='flex flex-col space-y-4'>
            <div className='flex items-center space-x-2'>
              <LaptopIcon className='size-6' />
              <div>
                <h3 className='text-lg font-medium '>Web Development</h3>
                <p className='text-sm text-gray-500'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
            <div className='flex items-center space-x-2'>
              <SplineIcon className='size-6' />
              <div>
                <h3 className='text-lg font-medium'>UI/UX Design</h3>
                <p className='text-sm text-gray-500'>Figma Design and Brand Design.</p>
              </div>
            </div>
            <div className='flex items-center space-x-2'>
              <ReplyIcon className='size-6' />
              <div>
                <h3 className='text-lg font-medium'>Development</h3>
                <p className='text-sm text-gray-500'>Development Project Lead in Various Section</p>
              </div>
            </div>
          </nav>
        </div>
      </div>

      <div className='left-[30%] top-[10%] size-full md:absolute '>
        <div className='flex flex-col items-center justify-center'>
          <CardContainer className='hover:shadow-3xl dark:border-none dark:hover:border-none dark:hover:shadow-3xl'>
            <CardBody className='group/card relative size-auto rounded-xl border border-black/[0.1] bg-gray-50 p-6 sm:w-[30rem] dark:border-white/[0.2] dark:bg-black dark:hover:shadow-3xl dark:hover:shadow-emerald-500/[0.1]'>
              <div className='flex'>
                <CardItem className='mt-4 w-full'>
                  <Image
                    src='https://models.readyplayer.me/658be9e8fc8bec93d06806f3.png?size=1024?quality=100'
                    height='500'
                    width='500'
                    className='rounded-xl object-cover group-hover/card:shadow-xl'
                    alt='thumbnail'
                  />
                </CardItem>
                <div className='flex flex-col'>
                  <CardItem translateZ='50' className='text-2xl font-bold text-neutral-600 dark:text-white'>
                    Ayush Lama
                  </CardItem>
                  <CardItem as='p' translateZ='60' className='mt-2 max-w-sm text-lg text-[#39ff14] dark:text-[#39ff14]'>
                    Jr.CEO
                  </CardItem>
                  <div className='mt-20 flex items-center justify-between'>
                    <CardItem
                      translateZ={20}
                      as='button'
                      className='right-0 rounded-xl bg-black px-4 py-2 text-xs font-bold text-white dark:bg-white dark:text-black'
                    >
                      Follow
                    </CardItem>
                    <CardItem
                      translateZ={20}
                      as='button'
                      className='ml-2 rounded-xl bg-black px-4 py-2 text-xs font-bold text-white dark:bg-white dark:text-black'
                    >
                      Edit
                    </CardItem>
                  </div>
                </div>
              </div>
            </CardBody>
          </CardContainer>
        </div>
      </div>
      <div className='flex space-x-40 items-center justify-center'>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className='rounded-2xl text-white border-2 p-3 px-14 hover:bg-violet-900 shadow-md shadow-violet-600 backdrop-blur-xl'
          onClick={() => {
            setIsSkillModalOpen(true)
          }}
        >
          Skill
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className='rounded-2xl text-white border-2 p-3 px-14 hover:bg-violet-900 shadow-md shadow-violet-600 backdrop-blur-xl'
          onClick={() => {
            setIsCardModalOpen(true)
          }}
        >
          Card
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className='rounded-2xl text-white border-2 p-3 px-14 hover:bg-violet-900 shadow-md shadow-violet-600 backdrop-blur-xl'
          onClick={() => {
            setIsWorkModalOpen(true)
          }}
        >
          Work
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className='rounded-2xl text-white border-2 p-3 px-10 hover:bg-violet-900 shadow-md shadow-violet-600 backdrop-blur-xl'
          onClick={() => {
            setIsConnectionModalOpen(true)
          }}
        >
          Connection
        </motion.button>
      </div>
      <div>
        <FormModal show={isSkillModalOpen} onClick={openSkillModal} onclose={setIsSkillModalOpen}>
          <form action='#' method='' className='w-full max-w-lg mx-auto flex flex-col items-center justify-center'>
            {/* skill chart pending... */}

            <div className='flex items-center space-x-4'>
              <input
                type=''
                placeholder='Communication'
                className='ring-1 ring-gray-300 rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-purple-300 text-gray-800'
              />
              <input
                type=''
                placeholder='%'
                className='ring-1 ring-gray-300 rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-purple-300 text-gray-800'
              />
              <input type='checkbox' id='checkbox' className='mt-2' />
            </div>

            <div className='flex items-center space-x-4'>
              <input
                type=''
                placeholder='Communication'
                className='ring-1 ring-gray-300 rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-purple-300 text-gray-800'
              />
              <input
                type=''
                placeholder='%'
                className='ring-1 ring-gray-300 rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-purple-300 text-gray-800'
              />
              <input type='checkbox' id='checkbox' className='mt-2' />
            </div>

            <div className='flex items-center space-x-4'>
              <input
                type=''
                placeholder='Communication'
                className='ring-1 ring-gray-300 rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-purple-300 text-gray-800'
              />
              <input
                type=''
                placeholder='%'
                className='ring-1 ring-gray-300 rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-purple-300 text-gray-800'
              />
              <input type='checkbox' id='checkbox' className='mt-2' />
            </div>

            <div className='flex items-center space-x-4'>
              <input
                type=''
                placeholder='Communication'
                className='ring-1 ring-gray-300 rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-purple-300 text-gray-800'
              />
              <input
                type=''
                placeholder='%'
                className='ring-1 ring-gray-300 rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-purple-300 text-gray-800'
              />
              <input type='checkbox' id='checkbox' className='mt-2' />
            </div>

            <button className='inline-block bg-[#191970] text-white font-bold rounded-lg mt-2 px-6 py-2 hover:scale-110 transition duration-500 cursor-pointer'>
              Generate
            </button>
          </form>
        </FormModal>
        <FormModal show={isCardModalOpen} onClick={openCardModal} onclose={setIsCardModalOpen}>
          <form action='#' method='' className='w-full max-w-lg mx-auto flex flex-col items-center justify-center'>
            <CardContainer className='hover:shadow-3xl dark:border-none dark:hover:border-none dark:hover:shadow-3xl py-0'>
              <CardBody className='group/card relative size-auto rounded-xl border border-black/[0.1] bg-gray-50 p-6 sm:w-[30rem] dark:border-white/[0.2] dark:bg-black dark:hover:shadow-3xl dark:hover:shadow-emerald-500/[0.1]'>
                <div className='flex'>
                  <CardItem className='mt-2 w-1/2'>
                    <Image
                      // key={avatarData.url}
                      // src={avatarData.url}
                      src='/aa.png'
                      height='1000'
                      width='1000'
                      className='size-full rounded-xl object-cover group-hover/card:shadow-xl'
                      alt='thumbnail'
                    />
                  </CardItem>
                  <div className='flex flex-col'>
                    <CardItem translateZ='50' className='text-2xl font-bold text-neutral-600 dark:text-white'>
                      {name}
                    </CardItem>
                    <CardItem
                      as='p'
                      translateZ='60'
                      className='mt-2 max-w-sm text-lg text-[#39ff14] dark:text-[#39ff14]'
                    >
                      {jobTitle}
                    </CardItem>

                    <div className='mt-20 flex items-center justify-between'></div>
                  </div>
                </div>
              </CardBody>
            </CardContainer>
            <div>
              <input
                type=''
                placeholder='Avatar ID'
                className='ring-1 ring-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-yellow-300 text-gray-800'
              />
            </div>
            <div>
              <input
                type='Name'
                placeholder='Full Name'
                className='ring-1 ring-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-yellow-300 text-gray-800'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <input
                type='text'
                placeholder='Job Title'
                className='ring-1 ring-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-yellow-300 text-gray-800'
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </div>
            <div>
              <input
                type='address'
                placeholder='Address'
                className='ring-1 ring-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-yellow-300 text-gray-800'
              />
            </div>
            <div>
              <input
                type='text'
                placeholder='Phone Number'
                className='ring-1 ring-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-yellow-300 text-gray-800'
              />
            </div>

            <button className='inline-block bg-[#191970] text-white font-bold rounded-lg mt-2 px-6 py-2 hover:scale-110 transition duration-500 cursor-pointer'>
              Generate
            </button>
          </form>
        </FormModal>
        <FormModal show={isWorkModalOpen} onClick={openWorkModal} onclose={setIsWorkModalOpen}>
          <form action='#' method='' className='w-full max-w-lg mx-auto flex flex-col items-center justify-center'>
            <div className='image-preview relative bg-white h-44 w-50 object-fit overflow-hidden rounded-md mb-10'>
              <img src={`/${cardBackground}`} />
              <div className='avatar-img absolute right-2 top-0 h-20 w-40 z-10'>
                <img src={`/${cardAvatar}`} />
              </div>
              <div id='name-preview' className='absolute bottom-0 bw-full rounded-lg p-3 backdrop-blur-2xl'>
                {name}
              </div>
              <div id='description-preview' className='absolute top-0 w-full rounded-t-sm p-3'>
                {description}
              </div>
            </div>
            <div className='form-section grid grid-rows-4 grid-cols-3 gap-10 text-white grid-'>
              <div className='upload-images flex col-start-1 col-end-4'>
                <div className='avatar-bg text-center'>
                  <label htmlFor='avatar-bg' className='mx-auto'>
                    Card Background
                  </label>
                  <input type='file' onChange={(e) => setCardBackground(e.target.files[0].name)} />
                </div>
                <div className='avatar text-center'>
                  <label htmlFor='avatar-img' className='mx-auto'>
                    Avatar
                  </label>
                  <input type='file' id='avatar-img' onChange={(e) => setCardAvatar(e.target.files[0].name)} />
                </div>
              </div>
              <div className='flex flex-col col-start-1 col-span-4'>
                <label htmlFor='project-name' className='pr-5 text-'>
                  Name
                </label>
                <input
                  type='text'
                  id='project-name'
                  className='w-80 h-8 p-2 text-black'
                  placeholder='Project Name'
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className='col-start-1 col-span-4'>
                <label htmlFor='project-descrip' className='pr-5 text-'>
                  Description
                </label>
                <textarea
                  id='project-descrip'
                  className='w-full h-12 p-1 resize-none text-black'
                  placeholder='Description'
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className='btn col-start-1 col-span-4 flex items-center justify-center' type='submit'>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className='rounded-2xl text-white border-2 p-2 hover:bg-violet-900 shadow-md shadow-violet-600 backdrop-blur-xl'
                >
                  Pathaideu
                </motion.button>
              </div>
            </div>
          </form>
        </FormModal>
        <FormModal show={isConnectionModalOpen} onClick={openConnectionModal} onclose={setIsConnectionModalOpen}>
          <div
            className='grid grid-cols-3 md:grid-cols-5 lg:grid-cols-center lg:justify-center gap-6 m-5 p-4 justify-center items-center'
            style={{ fontSize: '50px' }}
          >
            <LogosFacebook className='w-16 h-16' />
            <SkillIconsInstagram className='w-16 h-16' />
            <SkillIconsLinkedin className='w-16 h-16' />
            <LogosGoogleIcon className='w-16 h-16' />
            <LogosYoutubeIcon className='w-16 h-16' />
            <LogosApple className='w-16 h-16' />
            <LogosFigma className='w-16 h-16' />
            <LogosTwitch className='w-16 h-16' />
            <SkillIconsGithubDark className='w-16 h-16' />
          </div>

          <form action='#' method='' className='w-full max-w-lg mx-auto flex flex-col items-center justify-center'>
            <input
              type=''
              placeholder='Instagram'
              className='ring-1 ring-gray-300 rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-purple-300 text-gray-800'
            />
            <input
              type=''
              placeholder='Facebook'
              className='ring-1 ring-gray-300 rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-purple-300 text-gray-800'
            />
            <input
              type=''
              placeholder='Spotify'
              className='ring-1 ring-gray-300 rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-purple-300 text-gray-800'
            />
            <input
              type=''
              placeholder='Github'
              className='ring-1 ring-gray-300 rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-purple-300 text-gray-800'
            />
            <button className='inline-block bg-[#191970] text-white font-bold rounded-lg mt-2 px-6 py-2 hover:scale-110 transition duration-500 cursor-pointer'>
              Generate
            </button>
          </form>
        </FormModal>
      </div>
    </div>
  )
}

function LaptopIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16' />
    </svg>
  )
}

function ReplyIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <polyline points='9 17 4 12 9 7' />
      <path d='M20 18v-2a4 4 0 0 0-4-4H4' />
    </svg>
  )
}

function SplineIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <circle cx='19' cy='5' r='2' />
      <circle cx='5' cy='19' r='2' />
      <path d='M5 17A12 12 0 0 1 17 5' />
    </svg>
  )
}