'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { CardBody, CardContainer, CardItem } from '../../src/components/card/card'

const Logo_1 = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Logo_1), { ssr: false })
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

export default function Card() {
  return (
    <>
      <div className='mx-auto flex w-full flex-col flex-wrap items-center md:flex-row  lg:w-4/5'>
        <div className='flex w-full flex-col items-start justify-center p-12 text-center md:w-2/5 md:text-left'>
          <p className='w-full uppercase'> GG User Next + React Three Fiber</p>
          <h1 className='my-4 text-5xl font-bold leading-tight'>Next 3D Starter</h1>
          <p className='mb-8 text-2xl leading-normal'>A minimalist starter for Next.js, React-three-fiber and Threejs.</p>
        </div>
      </div>
      <div className='mx-auto flex w-full flex-col flex-wrap items-center p-12 md:flex-row  lg:w-4/5'>
        <div className='relative my-12 h-48 py-6 sm:w-1/2 md:mb-40'>
          <View orbit className='relative size-full sm:h-48  sm:w-full'>
            <Logo_1 scale={2} position={[120, -12, -80]} />
            <Common color={'lightblue'}/>
          </View>
        </div>
      </div>
      <div>
        <CardContainer className="hover:shadow-3xl dark:border-none dark:hover:border-none dark:hover:shadow-3xl">
          <CardBody className="group/card relative size-auto rounded-xl border border-black/[0.1] bg-gray-50 p-6 dark:border-white/[0.2] dark:bg-black dark:hover:shadow-3xl dark:hover:shadow-emerald-500/[0.1] sm:w-[30rem]">
            <div className="flex">
              <CardItem
                className="mt-4 w-full"
                >
                <Image
                  src="/aa.png"
                  height="1000"
                  width="1000"
                  className="size-full rounded-xl object-cover group-hover/card:shadow-xl"
                  alt="thumbnail"
                />
              </CardItem>
              <div className="flex flex-col">
                <CardItem
                  translateZ="50"
                  className="text-2xl font-bold text-neutral-600 dark:text-white"
                  >
                  Genius Card 
                </CardItem>
                <CardItem
                  as="p"
                  translateZ="60"
                  className="mt-2 max-w-sm text-lg text-[#39ff14] dark:text-[#39ff14]"
                >
                Coming Soon!
                </CardItem>
                <div className="mt-20 flex items-center justify-between">
                  <CardItem
                    translateZ={20}
                    as="button"
                    className="right-0 rounded-xl bg-black px-4 py-2 text-xs font-bold text-white dark:bg-white dark:text-black"
                  >
                  Sign up
                  </CardItem>
                </div>
              </div>
            </div>
          </CardBody>
        </CardContainer>
      </div>
    </>
  )
}
