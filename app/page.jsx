'use client'

import { Avatar } from '@@/src/components/Avatar';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const Logo = dynamic(() => import('@@/src/components/canvas/Examples').then((mod) => mod.Logo), { ssr: false })
const Avatar_2 = dynamic(() => import('@@/src/components/canvas/Examples').then((mod) => mod.Avatar), { ssr: false })
const Avatar_1 = dynamic(() => import('@@/src/components/canvas/Examples').then((mod) => mod.Avatar_1), { ssr: false })
const View = dynamic(() => import('@@/src/components/canvas/View').then((mod) => mod.View), {
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
const Common = dynamic(() => import('@@/src/components/canvas/View').then((mod) => mod.Common), { ssr: false })

export default function Page() {
  return (
    <>
      <div className='mx-auto flex w-full flex-col flex-wrap items-center md:flex-row  lg:w-4/5'>
        {/* jumbo */}
        <div className='flex w-full flex-col items-start justify-center p-12 text-center md:w-2/5 md:text-left'>
          <p className='w-full uppercase'>Next + React Three Fiber GG-User Module</p>
          <h1 className='my-4 text-5xl font-bold leading-tight'>Next 3D Starter</h1>
          <p className='mb-8 text-2xl leading-normal'>A minimalist starter for React, React-three-fiber and Threejs with Avatar creator and User Auth.
          Integrating StoryBook, component standarization will be easier.
          </p>
        </div>

        <div className='w-full text-center md:w-3/5'>
          <View className='flex h-96 w-full flex-col items-center justify-center'>
            <Suspense fallback={null}>
              <Logo route='/card' scale={0.6} position={[0, 0, 0]} />
              <Common color={'white'}/>
            </Suspense>
          </View>
        </div>
      </div>
      <div className='mx-auto flex w-full flex-col flex-wrap items-center p-12 md:flex-row  lg:w-4/5'>
        {/* first row */}
        <div className='relative h-48 w-full py-6 sm:w-1/2 md:my-12 md:mb-40'>
          <h2 className='mb-3 text-3xl font-bold leading-none text-gray-800'>Your Avatars are propagated</h2>
          <p className='mb-8 text-gray-600'>Drag, scroll, pinch, and rotate the canvas to explore the 3D scene.</p>
          <a className='mb-8 text-blue-600' href='https://gguser.readyplayer.me/avatar?frameApi'>Download your Avatar from here using Ready Player Me.</a>
          <p className='mb-8 text-gray-600'>
            To get resources to generate your avatar in different poses,file-format, quality: You can visit this...  
            <a className='mb-8 text-blue-600' href='https://docs.google.com/spreadsheets/d/1bDsUj-m5wBob4ps1g2d1YFN90HoLANMxi13KvetPhs0/edit?usp=sharing'>
              link
            </a> 
          </p>
        </div>
        <div className='relative my-12 h-48 w-full py-6 sm:w-1/2 md:mb-40'>
          <View orbit className='relative h-full  sm:h-48 sm:w-full'>
            <Suspense fallback={null}>
              <Avatar_2 scale={2} position={[0, -1.6, 0]} rotation={[0.0, 0, 0]} />
              <Common color={'lightyellow'} />
            </Suspense>
          </View>
        </div>
        {/* second row */}
        <div className='relative my-12 h-48 w-full py-6 sm:w-1/2 md:mb-40'>
          <View orbit className='relative h-full animate-bounce sm:h-48 sm:w-full'>
            <Suspense fallback={null}>
              <Avatar_1 modelSrc="https://models.readyplayer.me/65d5fe627fe6ce384b5195e6.glb?morphTargets=ARKit,Eyes Extra&textureAtlas=none&lod=0"/>
              <Common color={'lightblue'} />
            </Suspense>
          </View>
        </div>
        <div className='w-full p-6 sm:w-1/2'>
          <h2 className='mb-3 text-3xl font-bold leading-none text-gray-800'>Ready Player Me Downloaded .glb</h2>
          <p className='mb-8 text-gray-600'>
           I have named this component Avatar_1. To change your avatar model in this div, go to src/components/canvas/examples.jsx and change the /avatar_1.glb to your file name.
          </p>
        </div>
      </div>
        {/* first row */}
      <div className='mx-auto flex w-full flex-col flex-wrap items-center md:flex-row  lg:w-4/5'>
      <div className='relative h-48 w-full py-6 sm:w-1/2 md:my-12 md:mb-40'>
          <h2 className='mb-3 text-3xl font-bold leading-none text-gray-800'>Your Animated Avatars are propagated</h2>
          <p className='mb-8 text-gray-600'>Drag, scroll, pinch, and rotate the canvas to explore the 3D scene.</p>
          <a className='mb-8 text-blue-600' href='https://gguser.readyplayer.me/avatar?frameApi'>Edit your Avatar from here using Ready Player Me.</a>
          <p className='mb-8 text-gray-600'> Replace 65d5fe627fe6ce384b5195e6.glb with your avatar_number.glb in Avatar component. And, change male-spawn-animation.fbx with file_name.fbx to change animation.
           Animation reference files are located in /public.   
          </p>
        </div>
      <div className='relative my-12 h-96 w-full py-6 sm:w-1/2 md:mb-40'>
          <Avatar 
            modelSrc="https://models.readyplayer.me/65d5fe627fe6ce384b5195e6.glb?morphTargets=ARKit,Eyes Extra&textureAtlas=none&lod=0"
            shadows
            animationSrc="/male-spawn-animation.fbx"
            style={{ background: 'rgb(9,20,26)' }}
            fov={45}
            effects={{
              ambientOcclusion: true
            }}
            >
          </Avatar>
      </div>
      </div>
    </>
  )
}
