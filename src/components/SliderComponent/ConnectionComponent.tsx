'use client'

import { useState } from 'react'
import Image from 'next/image'

import { TiDelete } from 'react-icons/ti'

import DrawOutlineButton from '../AnimatedButton/DrawOutlineButton'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

import Link from 'next/link'
import { IoHome } from 'react-icons/io5'


export default function ConnectionComponent({ onNextButtonClick, onPrevButtonClick, isSmallScreen }) {
  const [selectedLogo, setSelectedLogo] = useState(null)
  const [connections, setConnections] = useState([])

  const handleLogoClick = (logo) => {
    if (!connections.some((connection) => connection.src === logo.src)) {
      const newConnection = { src: logo.src, alt: logo.alt, link: '' }
      setConnections([...connections, newConnection])
    }
  }

  const handleInputChange = (e, index) => {
    const updatedConnections = [...connections]
    updatedConnections[index] = { ...updatedConnections[index], link: e.target.value }
    setConnections(updatedConnections)
  }

  const handleRemoveConnection = (index, event) => {
    event.preventDefault() // To prevent form submission and reload of the page
    setConnections(connections.filter((_, i) => i !== index))
  }

  const logos = [
    { src: '/connectionlogo/github.png', alt: 'github logo', name: 'GitHub' },
    { src: '/connectionlogo/facebook.png', alt: 'facebook logo', name: 'Facebook' },
    { src: '/connectionlogo/google.png', alt: 'google logo', name: 'Google' },
    { src: '/connectionlogo/youtube.png', alt: 'youtube logo', name: 'YouTube' },
    { src: '/connectionlogo/twitter.png', alt: 'twitter logo', name: 'Twitter' },
    { src: '/connectionlogo/instagram.png', alt: 'instagram logo', name: 'Instagram' },
    { src: '/connectionlogo/linkedin.png', alt: 'linkedin logo', name: 'LinkedIn' },
    { src: '/connectionlogo/snapchat.png', alt: 'snapchat logo', name: 'Snapchat' },
    { src: '/connectionlogo/apple.png', alt: 'apple logo', name: 'Apple' },
    { src: '/connectionlogo/figma.png', alt: 'figma logo', name: 'Figma' },
  ]

  return (
    <div className='-ml-3 mb-12 mt-2 flex flex-col items-center md:ml-0 lg:mb-0'>
      <div
        id='connection'
        className='relative flex h-[900px] w-[300px] flex-col py-4 md:w-[600px] md:rounded-3xl md:bg-black/10 md:px-10 md:shadow-md md:shadow-purple-700/70 md:backdrop-blur-md lg:h-[550px] lg:w-[800px]'
      >
        <div className='flex flex-col'>
          <div className='relative my-3 flex justify-center text-2xl font-semibold drop-shadow lg:my-5 lg:text-5xl'>
            CONNECTION
          </div>
          {connections.length < 4 ? (
            <div className='mt-3 flex flex-wrap justify-center gap-x-10 gap-y-5'>
              {logos.map((logo, index) => (
                <div
                  key={index}
                  onClick={() => handleLogoClick(logo)}
                  style={
                    connections.some((connection) => connection.src === logo.src)
                      ? { filter: 'grayscale(100%)', transform: 'scale(0.8)', transition: 'all 0.3s ease-in-out' }
                      : { transition: 'all 0.3s ease-in-out' }
                  }
                >
                  <Image src={logo.src} alt={logo.alt} width={40} height={40} loading='lazy' />
                </div>
              ))}
            </div>
          ) : (
            <div className='mt-3 flex flex-wrap justify-center gap-x-10 gap-y-5'>
              {logos.map((logo, index) => (
                <div
                  key={index}
                  style={{
                    transition: 'all 0.3s ease-in-out',
                    filter: 'grayscale(100%)',
                    transform: 'scale(0.8)',
                  }}
                >
                  <Image src={logo.src} alt={logo.alt} width={40} height={40} loading='lazy' />
                </div>
              ))}
            </div>
          )}

          <form>
            {connections.length > 0 && (
              <div className='mt-10 flex flex-wrap justify-center gap-4'>
                {connections.map((connection, index) => (
                  <div key={index} className='flex w-full items-center justify-center'>
                    <Image src={connection.src} alt={connection.alt} width={30} height={30} />
                    <label htmlFor='type' className='hidden'></label>
                    <input
                      id='connection-link'
                      type='text'
                      className='ml-2 w-1/2 rounded-md bg-white/20 p-2'
                      value={connection.link || ''}
                      onChange={(e) => handleInputChange(e, index)}
                      placeholder='Enter link here'
                    />
                    <button
                      className='rounded px-2 py-1 font-bold text-white hover:text-red-700'
                      onClick={(e) => handleRemoveConnection(index, e)}
                      id='remove-connection'
                    >
                      <TiDelete />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Submit and Next Button */}
            {!isSmallScreen ? (
              <>
                <div className='mt-7 flex justify-center'>
                  <DrawOutlineButton aria-label='generate'>Submit</DrawOutlineButton>
                </div>
                <div className='absolute bottom-4 right-4'>

                  <Link href='/hero3'>
                    <button
                      className='mr-2 rounded-full bg-purple-400/20 transition-all duration-150 hover:scale-105 hover:bg-purple-300/30'
                      type='submit'
                      aria-label='home btn'
                    >
                      <p className='p-4'>
                        <IoHome />
                      </p>
                    </button>
                  </Link>

                  <button
                    className='rounded-full bg-purple-400/20 transition-all duration-150 hover:scale-105 hover:bg-purple-300/30'
                    type='submit'
                    onClick={onNextButtonClick}
                    aria-label='next'
                  >
                    <p className='p-4'>
                      <FaArrowRight />
                    </p>
                  </button>
                </div>
              </>
            ) : (

              <div className='absolute bottom-4 right-4 flex gap-x-1'>
                <Link href='/hero3'>
                  <DrawOutlineButton type='submit' aria-label='next slide'>
                    <IoHome className='my-1' />
                  </DrawOutlineButton>
                </Link>

                <DrawOutlineButton type='submit' onClick={onNextButtonClick} aria-label='next slide'>
                  Next
                </DrawOutlineButton>
              </div>
            )}
          </form>

          {/* Back Button */}
          {!isSmallScreen ? (
            <div>
              <div className='absolute bottom-4 left-4 mt-4'>
                <button
                  className='rounded-full bg-purple-400/20 transition-all duration-150 hover:scale-105 hover:bg-purple-300/30'
                  onClick={onPrevButtonClick}
                  aria-label='prev'
                >
                  <p className='p-4'>
                    <FaArrowLeft />
                  </p>
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className='absolute bottom-4 left-4 mt-4'>
                <DrawOutlineButton onClick={onPrevButtonClick} aria-label='prev'>

                  Back

                </DrawOutlineButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
