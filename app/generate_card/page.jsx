import React from 'react'
import { LogosGoogleIcon } from '@/logo/LogosGoogleIcon'
import { LogosApple } from '@/logo/LogosApple'
import { LogosFacebook } from '@/logo/LogosFacebook'
import styles from './generate_card.module.css'
import { CardBody, CardContainer, CardItem } from '@/components/card/card'
import Image from 'next/image'

const SignIn = () => {
  return (
    <div className='flex w-full min-h-screen '>
      <div className='flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0 bg-black w-full pl-28 pt-5 text-white'>
        <div className='flex flex-col space-y-8 justify-between pt-5'>
          <div>
            <h1 className='font-bold text-4xl tracking-wide'> GG Card</h1>
            <h2 className='pt-2 text-white text-xl'>Welcome!</h2>
            <p className='pt-2 text-white text-sm'>Please provide us with your information for your</p>
            <p className='text-yellow-300 text-sm'>Genius Card</p>
          </div>
          <div>
            <CardContainer className='hover:shadow-3xl dark:border-none dark:hover:border-none dark:hover:shadow-3xl py-0'>
              <CardBody className='group/card relative size-auto rounded-xl border border-black/[0.1] bg-gray-50 p-6 sm:w-[30rem] dark:border-white/[0.2] dark:bg-black dark:hover:shadow-3xl dark:hover:shadow-emerald-500/[0.1]'>
                <div className='flex'>
                  <CardItem className='mt-4 w-full'>
                    <Image
                      src='/aa.png'
                      height='1000'
                      width='1000'
                      className='size-full rounded-xl object-cover group-hover/card:shadow-xl'
                      alt='thumbnail'
                    />
                  </CardItem>
                  <div className='flex flex-col'>
                    <CardItem translateZ='50' className='text-2xl font-bold text-neutral-600 dark:text-white'>
                      Genius Card
                    </CardItem>
                    <CardItem
                      as='p'
                      translateZ='60'
                      className='mt-2 max-w-sm text-lg text-[#39ff14] dark:text-[#39ff14]'
                    >
                      Coming Soon!
                    </CardItem>
                    <div className='mt-20 flex items-center justify-between'></div>
                  </div>
                </div>
              </CardBody>
            </CardContainer>
          </div>

          <div className={styles.container}>
            <div className='signinform bg-white rounded-3xl shadow-lg p-8 text-gray-600 '>
              <h1 className='font-bold text-black justify-center text-center text-3xl'> Generate Your Genius Card</h1>
              <form action='' className='flex flex-col space-y-4 p-5'>
                <div>
                  <input
                    type='Name'
                    placeholder='Full Name'
                    className='ring-1 ring-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-yellow-300'
                  />
                </div>
                <div>
                  <input
                    type='text'
                    placeholder='Phone Number'
                    className='ring-1 ring-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-yellow-300'
                  />
                </div>
                <div>
                  <input
                    type='email'
                    placeholder='Email'
                    className='ring-1 ring-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-yellow-300'
                  />
                </div>
                <div>
                  <input
                    type='address'
                    placeholder='Address'
                    className='ring-1 ring-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-yellow-300'
                  />
                </div>

                <button className='inline-block bg-black text-white font-bold rounded-lg px-6 py-2 hover:scale-110 transition duration-500 cursor-pointer'>
                  Generate
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SignIn
