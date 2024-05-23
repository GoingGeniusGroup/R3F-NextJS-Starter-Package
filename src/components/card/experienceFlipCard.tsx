'use client'

import { CardBody } from '@/components/card/card'
import Image from 'next/image'

import { useState } from 'react'

import QRCode from 'qrcode'
import { usePathname } from 'next/navigation'

export default function ExperienceFlipCard({ type, projectName, skills, toolsAndTech }) {
  // Flip Card QR
  const [imgSrc, setImgSrc] = useState('')
  const pathname = usePathname()
  QRCode.toDataURL(pathname).then(setImgSrc)
  // Flip Card QR end

  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }
  return (
    <>
      <CardBody>
        {/* Event Image  */}
        <div className='group h-[239px] p-3 [prespective:1000px]'>
          {/* Flip the card when clicked */}
          <div
            className={`relative size-full rounded-xl shadow-md transition-all  duration-500 [transform-style:preserve-3d] 
            ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
            onClick={handleFlip}
          >
            <Image unoptimized src='/card/abstract3.webp' alt='Experience' fill className='rounded-lg object-cover' />
            <div className='absolute top-0 flex w-full justify-end'>
              <p className='pr-3 pt-1 font-bold text-pink-300'>{type.toUpperCase()}</p>
            </div>
            <div className='absolute inset-0 cursor-default rounded-xl '>
              {/* Card Details */}
              <div className='absolute top-5 flex flex-col p-5 text-sm text-white '>
                <nav className='mb-1 flex list-none flex-wrap'>
                  <ul>
                    <li className='mb-2 w-full text-xl font-semibold'>
                      <p>{projectName.toUpperCase()}</p>
                    </li>
                    <li className='my-2 mb-1 w-full'>
                      <p>Skills : {skills}</p>
                    </li>
                    <li className='my-2 mb-1 w-full'>
                      <p>Tools : {toolsAndTech}</p>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className='absolute bottom-2 left-4 flex w-full items-center justify-between'>
              <div className='text-base font-bold text-purple-300'>GOING GENIUS</div>
              <Image className='mr-5 mt-1' width={30} height={30} src='/GGlogo.png' alt='logo' />
            </div>

            {/* QRCode */}
            <div className='absolute inset-0  rounded-lg bg-black px-12 text-center text-slate-200 [backface-visibility:hidden] [transform:rotateY(180deg)]'>
              <div className='flex size-full items-center justify-center '>
                {imgSrc && (
                  <Image className='rounded-sm object-cover' alt='qr code' src={imgSrc} width={92} height={92} />
                )}
              </div>
              <div className='absolute bottom-2 left-4 flex w-full items-center justify-between'>
                <div className='text-base font-bold text-purple-600'>GOING GENIUS</div>
                <Image className='mr-5 mt-1' width={30} height={30} src='/GGlogo.png' alt='logo' />
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </>
  )
}
