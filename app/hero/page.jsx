'use client'

import { CardBody, CardContainer, CardItem } from '@/components/card/card';
// import { Button } from "@/components/ui/button"

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Suspense } from 'react';
import { Avatar } from 'src/components/Avatar';


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
const Type = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Type), { ssr: false })



export default function Hero() {
  return (
    // <div className="bg-[#f7f7f7] px-4 py-0 sm:px-6 lg:px-8">
    //   <div className="mx-auto flex h-screen max-w-6xl">
    //     <div className='absolute grid grid-cols-1 gap-8 md:grid-cols-3 '>
    //         <div className="md:col-span-1">
    //       <h2 className="mb-6 text-3xl font-extrabold text-gray-900">Natalie Sihombing</h2>
    //       <nav className="flex flex-col space-y-4">
    //         <div className="flex items-center space-x-2">
    //           <LaptopIcon className="size-6 text-gray-600" />
    //           <div>
    //             <h3 className="text-lg font-medium text-gray-900">Web Development</h3>
    //             <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    //           </div>
    //         </div>
    //         <div className="flex items-center space-x-2">
    //           <SplineIcon className="size-6 text-gray-600" />
    //           <div>
    //             <h3 className="text-lg font-medium text-gray-900">UI/UX Design</h3>
    //             <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    //           </div>
    //         </div>
    //         <div className="flex items-center space-x-2">
    //           <ReplyIcon className="size-6 text-gray-600" />
    //           <div>
    //             <h3 className="text-lg font-medium text-gray-900">Web Consulting</h3>
    //             <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    //           </div>
    //         </div>
    //       </nav>
    //     </div></div>
    //     {/* <div className="flex justify-center md:col-span-1"> */}
    //       <div className="h-screen bg-transparent p-6">
    //         {/* Image */}
    //         {/* <Image
    //             alt="hero"
    //             height="384"
    //             src="https://models.readyplayer.me/658be9e8fc8bec93d06806f3.png?size=1024?quality=100"
    //             width="384"
    //         /> */}
    //         {/* .glb */}

    //         <Avatar 
    //         modelSrc="https://models.readyplayer.me/658be9e8fc8bec93d06806f3.glb?morphTargets=ARKit,Eyes Extra&textureAtlas=none&lod=0"
    //         shadows
    //         animationSrc="/male-idle-3.fbx"
    //         style={{ background: 'rgb(9,20,26)' }}
    //         fov={40}
    //         cameraTarget={1.5}
    //         cameraInitialDistance={30}
    //         effects={{
    //           ambientOcclusion: true
    //         }}
    //         />
    //         {/* <Avatar
    //         backLightColor="#fff0d6"
    //         backLightIntensity={1.2}
    //         backLightPosition={[0, Object]}
    //         background={{
    //           color: 'rgb(9,20,26)'
    //         }}
    //         cameraInitialDistance={18}
    //         cameraTarget={10}
    //         effects={{
    //           bloom: {
    //             intensity: 4,
    //             kernelSize: 1,
    //             luminanceSmoothing: 1,
    //             luminanceThreshold: 1,
    //             materialIntensity: 1,
    //             mipmapBlur: true
    //           }
    //         }}
    //         environment="apartment"
    //         fillLightColor="#99ccff"
    //         fillLightIntensity={2}
    //         // fillLightPosition={[object Object]}
    //         keyLightColor="#e8e3df"
    //         keyLightIntensity={1.2}
    //         fov={40}
    //         // lightTarget={[object Object]}
    //         modelSrc="https://models.readyplayer.me/65d5fe627fe6ce384b5195e6.glb?morphTargets=ARKit,Eyes Extra&textureAtlas=none&lod=0"
    //       /> */}
    //       </div>
    //     {/* </div> */}
    //     <div className="w-1/2 md:col-span-1">
    //       <h2 className="mb-6 text-3xl font-extrabold text-gray-900">Web Specialist based in Jakarta</h2>
    //       <p className="mb-6 text-gray-500">
    //         Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
    //         dolore magna aliqua.
    //       </p>
    //       <p className="mb-6 text-gray-500">
    //         Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    //       </p>
    //       {/* <Button className="w-full bg-black text-white">Hire me</Button> */}
    //       <div className="mt-8 grid grid-cols-3 gap-4 text-center">
    //         <div>
    //           <h3 className="text-lg font-semibold text-gray-900">13 Years</h3>
    //           <p className="text-sm text-gray-500">Experience</p>
    //         </div>
    //         <div>
    //           <h3 className="text-lg font-semibold text-gray-900">256+</h3>
    //           <p className="text-sm text-gray-500">Clients</p>
    //         </div>
    //         <div>
    //           <h3 className="text-lg font-semibold text-gray-900">99.8%</h3>
    //           <p className="text-sm text-gray-500">Satisfaction</p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className='h-screen w-full'>
        <div className='flex items-center'>
            <View className='flex h-20 w-full flex-col items-center justify-center'>
            <Suspense fallback={null}>
              <Type scale={2} position={[0, 0, 0]} />
              <Common />
            </Suspense>
          </View>
        </div>
        <Avatar 
        modelSrc="https://models.readyplayer.me/658be9e8fc8bec93d06806f3.glb?morphTargets=ARKit,Eyes Extra&textureAtlas=none&lod=0"
        shadows
        animationSrc="/male-idle-3.fbx"
        style={{ background: 'rgb(9,20,26)' }}
        fov={40}
        cameraTarget={1.5}
        cameraInitialDistance={30}
        effects={{
            ambientOcclusion: true
        }}    
        />
        {/* <EnvironmentModel environment="spaceStation" scale={1} /> */}
        <div className='right-[30%] top-[32%] size-full md:absolute'>
            <div className='ml-[12%] flex flex-col items-center justify-center'> 
                <h2 className="mb-12 text-4xl font-extrabold">Ayush Lama</h2>
                <nav className="flex flex-col space-y-4">
                    <div className="flex items-center space-x-2">
                        <LaptopIcon className="size-" />
                        <div>
                            <h3 className="text-lg font-medium">Web Development</h3>
                            <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <SplineIcon className="size-" />
                        <div>
                            <h3 className="text-lg font-medium">UI/UX Design</h3>
                            <p className="text-sm text-gray-500">Figma Design and Brand Design.</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <ReplyIcon className="size-6" />
                        <div>
                            <h3 className="text-lg font-medium">Development</h3>
                            <p className="text-sm text-gray-500">Development Project Lead in Various Section</p>
                        </div>
                    </div>
                </nav>
            </div> 
        </div> 
        {/* <div className='left-[30%] top-[36%] size-full md:absolute '>
            <div className='flex flex-col items-center justify-center'>
                <h2 className="mb-12 text-center text-3xl font-extrabold text-gray-900">Web Specialist based in Nepal</h2>
                <p className="mb-6 w-[35%] text-center text-gray-500">
                Going Genius Tech Lead in Three.Js technology.
                </p>
                <p className="mb-6 w-[35%] text-center text-gray-500">
                Genius User For Genius Experience. Passkeys and Secured Login.
                </p>
            </div>   
        </div> */}
        <div className='left-[30%] top-[10%] size-full md:absolute '>
        <div className='flex flex-col items-center justify-center'>
        <CardContainer className="hover:shadow-3xl dark:border-none dark:hover:border-none dark:hover:shadow-3xl">
          <CardBody className="group/card relative size-auto rounded-xl border border-black/[0.1] bg-gray-50 p-6 sm:w-[30rem] dark:border-white/[0.2] dark:bg-black dark:hover:shadow-3xl dark:hover:shadow-emerald-500/[0.1]">
            <div className="flex">
              <CardItem
                className="mt-4 w-full"
                >
                <Image
                  src="https://models.readyplayer.me/658be9e8fc8bec93d06806f3.png?size=1024?quality=100"
                  height="500"
                  width="500"
                  className="rounded-xl object-cover group-hover/card:shadow-xl"
                  alt="thumbnail"
                />
              </CardItem>
              <div className="flex flex-col">
                <CardItem
                  translateZ="50"
                  className="text-2xl font-bold text-neutral-600 dark:text-white"
                  >
                  Ayush Lama
                </CardItem>
                <CardItem
                  as="p"
                  translateZ="60"
                  className="mt-2 max-w-sm text-lg text-[#39ff14] dark:text-[#39ff14]"
                >
                Jr.CEO
                </CardItem>
                <div className="mt-20 flex items-center justify-between">
                  <CardItem
                    translateZ={20}
                    as="button"
                    className="right-0 rounded-xl bg-black px-4 py-2 text-xs font-bold text-white dark:bg-white dark:text-black"
                  >
                  Follow
                  </CardItem>
                  <CardItem
                    translateZ={20}
                    as="button"
                    className="ml-2 rounded-xl bg-black px-4 py-2 text-xs font-bold text-white dark:bg-white dark:text-black"
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
    </div>
  )
}

function LaptopIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" />
    </svg>
  )
}


function ReplyIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 17 4 12 9 7" />
      <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
    </svg>
  )
}


function SplineIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="19" cy="5" r="2" />
      <circle cx="5" cy="19" r="2" />
      <path d="M5 17A12 12 0 0 1 17 5" />
    </svg>
  )
}
