'use client'

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import FormModal from '@/components/Modal/FormModal';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div className="relative flex flex-col h-full w-full" id="about-me">
        <video
          autoPlay
          muted
          loop
          className="rotate-180 absolute top-[-366px]  h-screen w-full left-0 z-[-1] object-cover "
        >
          <source src="/bg/blackhole.webm" type="video/webm"/>
        </video>

        <div className='container absolute z-10 mx-auto w-full h-full flex items-center justify-center'>
          <button
            className='rounded-2xl'
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Open Project Modal
          </button>
          <FormModal
            show={isModalOpen}
            onclose={setIsModalOpen}
          >
          
            <h1>Projects Modal</h1>
          </FormModal>
        </div>
      </div>
    </>
  )
}
