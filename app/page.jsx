'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import FormModal from '@/components/FormModal/Modal'
import { motion } from 'framer-motion'

const Logo = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Logo), { ssr: false })
const Avatar_2 = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Avatar), { ssr: false })
const Avatar_1 = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Avatar_1), { ssr: false })
const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div className='flex h-96 w-full flex-col items-center justify-center'>
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

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [cardBackground, setCardBackground] = useState('project-card-bg.jpg')
  const [cardAvatar, setCardAvatar] = useState('aa.png')
  return (
    <>
      <div className='relative flex flex-col h-full w-full ' id='about-me'>
        <div className='flex items-center justify-center w-full h-full p-10 z-20'>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className='rounded-2xl text-white border-2 p-2 hover:bg-violet-900 shadow-md shadow-violet-600 backdrop-blur-xl'
            onClick={() => {
              setIsModalOpen(true)
            }}
          >
            Open Project Modal
          </motion.button>
          <FormModal show={isModalOpen} onclose={setIsModalOpen}>
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
        </div>
      </div>
    </>
  )
}
