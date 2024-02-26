'use client'
import { Text3D } from '@react-three/drei';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

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
  return (
    <>
      <div className='mx-auto flex w-full flex-col flex-wrap items-center md:flex-row  lg:w-4/5'>
        {/* 3D Text */}
        <div className='relative my-12 h-48 w-full py-6 sm:w-1/2 md:mb-40'>
          <View orbit className='relative h-full sm:h-48 sm:w-full'>
            <Suspense fallback={null}>
              <Text3D font='./fonts/Anta_Regular.json' position={[-3,-0.5,0]} rotation={[0,0.4,0]}>
                Hello Genius Dev!
              </Text3D>
              <Common color={'black'} />
            </Suspense>
          </View>
        </div>
        <div className='w-full p-6 sm:w-1/2'>
          <h2 className='mb-3 text-3xl font-bold leading-none text-gray-800'>Rendering 3D Text.</h2>
          <p className='mb-8 text-gray-600'>
           Visit this <a className='mb-8 text-blue-600' href='https://gero3.github.io/facetype.js/'>link</a> to generate .json file for your font. Make sure the fonts are liscenced before use. You need to import @react-three/drei to use Text3D element to make the font 3D inside your scene.
          </p>
        </div>
      </div>
    </>
  )
}