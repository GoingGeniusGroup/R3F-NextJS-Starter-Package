'use client'

import { CardBody, CardContainer, CardItem } from '@/components/card/card'
import Image from 'next/image'

import { useState } from 'react'
import { useUser } from '@/context/UserContext/UserContext'

import QRCode from 'qrcode'
import { usePathname } from 'next/navigation'

export default function CardsFlipCard({
  type,
  name,
  dateIn,
  dateOut,
  description,
  bloodGroup,
  emergencyContact,
  emergencyAddress,
  emergencyDetails,
}) {
  // Flip Card QR
  const [imgSrc, setImgSrc] = useState('')
  const pathname = usePathname()
  const { user } = useUser()
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
          {/* Card Front */}
          {type === 'Educational' ? (
            <div
              className={`relative size-full rounded-xl shadow-md transition-all  duration-500 [transform-style:preserve-3d] 
            ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
              onClick={handleFlip}
            >
              {/* Card Front */}
              <Image unoptimized src='/card/abstract1.webp' alt='Card Front' fill className='rounded-lg object-cover' />
              <div className='absolute top-0 flex w-full justify-end'>
                <p className='pr-3 pt-1 font-bold text-purple-600'>{type.toUpperCase()}</p>
              </div>
              <div className='absolute inset-0 cursor-default rounded-xl '>
                {/* Card Details */}
                <div className='absolute top-5 flex flex-col p-5 text-sm text-white'>
                  <nav className='mb-1 flex list-none flex-wrap'>
                    <ul className='mb-2 w-full text-xl font-semibold'>
                      {user != null ? (
                        user.first_name != null && user.last_name != null ? (
                          <li>{user.first_name.toUpperCase() + ' ' + user.last_name.toUpperCase()}</li>
                        ) : (
                          <li>PERSON NAME</li>
                        )
                      ) : (
                        <li>PERSON NAME</li>
                      )}
                    </ul>
                    <ul>
                      <li className='my-2 mb-1 w-full'>{name}</li>
                    </ul>
                    <div className='flex w-full justify-between'>
                      <ul>
                        <li className='my-2 mb-1 w-full'>Date In : {dateIn}</li>
                        <li className='my-2 mb-1 w-full'>Date Out : {dateOut}</li>
                      </ul>
                    </div>
                  </nav>
                </div>
              </div>
              <div className='absolute bottom-2 left-4 flex w-full items-center justify-between'>
                <div className='text-base font-bold text-purple-600'>GOING GENIUS</div>
                <Image className='mr-5 mt-1' width={30} height={30} src='/GGlogo.png' alt='logo' />
              </div>

              {/* QRCode */}
              <div className='absolute inset-0 rounded-lg bg-black px-12 py-8 text-center text-slate-200 [backface-visibility:hidden] [transform:rotateY(180deg)]'>
                <div className='flex items-center justify-between'>
                  <p className='w-[60%] flex-wrap break-words'>Description : {description}</p>
                  {imgSrc && (
                    <Image className='mb-4 rounded-sm object-cover' alt='qr code' src={imgSrc} width={92} height={92} />
                  )}
                </div>
                <div className='absolute bottom-2 left-4 flex w-full items-center justify-between'>
                  <div className='text-base font-bold text-purple-600'>GOING GENIUS</div>
                  <Image className='mr-5 mt-1' width={30} height={30} src='/GGlogo.png' alt='logo' />
                </div>
              </div>
            </div>
          ) : type === 'Work' ? (
            <div
              className={`relative size-full rounded-xl shadow-md transition-all  duration-500 [transform-style:preserve-3d] 
            ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
              onClick={handleFlip}
            >
              {/* Card Front */}
              <Image unoptimized src='/card/abstract2.webp' alt='Card Front' fill className='rounded-lg object-cover' />
              <div className='absolute top-0 flex w-full justify-end'>
                <p className='pr-3 pt-1 font-bold text-purple-600'>{type.toUpperCase()}</p>
              </div>
              <div className='absolute inset-0 cursor-default rounded-xl '>
                {/* Card Details */}
                <div className='absolute top-5 flex flex-col p-5 text-sm text-white'>
                  <nav className='mb-1 flex list-none flex-wrap'>
                    <ul className='mb-2 w-full text-xl font-semibold'>
                      {user != null ? (
                        user.first_name != null && user.last_name != null ? (
                          <li>{user.first_name.toUpperCase() + ' ' + user.last_name.toUpperCase()}</li>
                        ) : (
                          <li>PERSON NAME</li>
                        )
                      ) : (
                        <li>PERSON NAME</li>
                      )}
                    </ul>
                    <ul>
                      <li className='my-2 mb-1 w-full'>{name}</li>
                    </ul>
                    <div className='flex w-full justify-between'>
                      <ul>
                        <li className='my-2 mb-1 w-full'>Date In : {dateIn}</li>
                        <li className='my-2 mb-1 w-full'>Date Out : {dateOut}</li>
                      </ul>
                    </div>
                  </nav>
                </div>
              </div>
              <div className='absolute bottom-2 left-4 flex w-full items-center justify-between'>
                <div className='text-base font-bold text-purple-600'>GOING GENIUS</div>
                <Image className='mr-5 mt-1' width={30} height={30} src='/GGlogo.png' alt='logo' />
              </div>

              {/* QRCode */}
              <div className='absolute inset-0 rounded-lg bg-black px-12 py-8 text-center text-slate-200 [backface-visibility:hidden] [transform:rotateY(180deg)]'>
                <div className='flex items-center justify-between'>
                  <p className='w-[60%] flex-wrap break-words'>Description : {description}</p>
                  {imgSrc && (
                    <Image className='mb-4 rounded-sm object-cover' alt='qr code' src={imgSrc} width={92} height={92} />
                  )}
                </div>
                <div className='absolute bottom-2 left-4 flex w-full items-center justify-between'>
                  <div className='text-base font-bold text-purple-600'>GOING GENIUS</div>
                  <Image className='mr-5 mt-1' width={30} height={30} src='/GGlogo.png' alt='logo' />
                </div>
              </div>
            </div>
          ) : type === 'Emergency' ? (
            <div
              className={`relative size-full rounded-xl shadow-md transition-all  duration-500 [transform-style:preserve-3d] 
            ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
              onClick={handleFlip}
            >
              {/* Card Front */}
              <Image unoptimized src='/card/abstract3.webp' alt='Card Front' fill className='rounded-lg object-cover' />
              <div className='absolute top-0 flex w-full justify-end'>
                <p className='pr-3 pt-1 font-bold text-purple-600'>{type.toUpperCase()}</p>
              </div>
              <div className='absolute inset-0 cursor-default rounded-xl '>
                {/* Card Details */}
                <div className='absolute top-5 flex flex-col p-5 text-sm text-white'>
                  <nav className='mb-1 flex list-none flex-wrap'>
                    <ul className='mb-2 w-full text-xl font-semibold'>
                      {user != null ? (
                        user.first_name != null && user.last_name != null ? (
                          <li>{user.first_name.toUpperCase() + ' ' + user.last_name.toUpperCase()}</li>
                        ) : (
                          <li>PERSON NAME</li>
                        )
                      ) : (
                        <li>PERSON NAME</li>
                      )}
                    </ul>
                    <ul>
                      <li className='my-2 mb-1 w-full'>{name}</li>
                    </ul>
                    <div className='flex w-full justify-between'>
                      <ul>
                        <li className='my-2 mb-1 w-full'>Blood Group : {bloodGroup}</li>
                        <li className='my-2 mb-1 w-full'>Emergency Contact : {emergencyContact}</li>
                        <li className='my-2 mb-1 w-full'>Emergency Address : {emergencyAddress}</li>
                      </ul>
                    </div>
                  </nav>
                </div>
              </div>
              <div className='absolute bottom-2 left-4 flex w-full items-center justify-between'>
                <div className='text-base font-bold text-purple-600'>GOING GENIUS</div>
                <Image className='mr-5 mt-1' width={30} height={30} src='/GGlogo.png' alt='logo' />
              </div>

              {/* QRCode */}
              <div className='absolute inset-0 rounded-lg bg-black px-12 py-8 text-center text-slate-200 [backface-visibility:hidden] [transform:rotateY(180deg)]'>
                <div className='flex items-center justify-between'>
                  <p className='w-[60%] flex-wrap break-words'>Details : {emergencyDetails}</p>
                  {imgSrc && (
                    <Image className='mb-4 rounded-sm object-cover' alt='qr code' src={imgSrc} width={92} height={92} />
                  )}
                </div>
                <div className='absolute bottom-2 left-4 flex w-full items-center justify-between'>
                  <div className='text-base font-bold text-purple-600'>GOING GENIUS</div>
                  <Image className='mr-5 mt-1' width={30} height={30} src='/GGlogo.png' alt='logo' />
                </div>
              </div>
            </div>
          ) : (
            <div
              className={`relative size-full rounded-xl shadow-md transition-all  duration-500 [transform-style:preserve-3d] 
            ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
              onClick={handleFlip}
            >
              {/* Card Front */}
              <Image unoptimized src='/card/abstract4.webp' alt='Card Front' fill className='rounded-lg object-cover' />
              <div className='absolute top-0 flex w-full justify-end'>
                <p className='pr-3 pt-1 font-bold text-purple-600'>{type.toUpperCase()}</p>
              </div>
              <div className='absolute inset-0 cursor-default rounded-xl '>
                {/* Card Details */}
                <div className='absolute top-5 flex flex-col p-5 text-sm text-white'>
                  <nav className='mb-1 flex list-none flex-wrap'>
                    <ul className='mb-2 w-full text-xl font-semibold'>
                      {user != null ? (
                        user.first_name != null && user.last_name != null ? (
                          <li>{user.first_name.toUpperCase() + ' ' + user.last_name.toUpperCase()}</li>
                        ) : (
                          <li>PERSON NAME</li>
                        )
                      ) : (
                        <li>PERSON NAME</li>
                      )}
                    </ul>
                    <ul>
                      <li className='my-2 mb-1 w-full'>{name}</li>
                    </ul>
                    <div className='flex w-full justify-between'>
                      <ul>
                        <li className='my-2 mb-1 w-full'>Date In : {dateIn}</li>
                        <li className='my-2 mb-1 w-full'>Date Out : {dateOut}</li>
                      </ul>
                    </div>
                  </nav>
                </div>
              </div>
              <div className='absolute bottom-2 left-4 flex w-full items-center justify-between'>
                <div className='text-base font-bold text-purple-600'>GOING GENIUS</div>
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
          )}
        </div>
      </CardBody>
    </>
  )
}
