'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'

import SkillsComponent from '@/components/SliderComponent/SkillsComponent'
import AvatarComponent from '@/components/SliderComponent/AvatarComponent'
import ExperienceComponent from '@/components/SliderComponent/ExperienceComponent'
import ConnectionComponent from '@/components/SliderComponent/ConnectionComponent'
import UserInfoComponent from '@/components/SliderComponent/UserInfoComponent'
import Card2Component from '@/components/SliderComponent/Card2Component'

type PropType = {
  slides: number[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = ({ options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const tabs = ['Genius ID', 'Avatar', 'Card', 'Connection', 'Experience', 'Skills']

  const [selected, setSelected] = useState(tabs[0])
  const [slideIndex, setSlideIndex] = useState(0)
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  const handleChangeSlide = (index) => {
    setSlideIndex(index)
    if (emblaApi) emblaApi.scrollTo(index)
  }

  const handleScroll = useCallback(
    (event) => {
      if (!emblaApi) return

      const deltaY = event.deltaY

      if (deltaY > 0) {
        emblaApi.scrollNext()
      } else if (deltaY < 0) {
        emblaApi.scrollPrev()
      }
    },
    [emblaApi],
  )

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', () => {
        const index = emblaApi.selectedScrollSnap()
        setSlideIndex(index)
        setSelected(tabs[index])
      })
    }
  }, [emblaApi])

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 766)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    window.addEventListener('wheel', handleScroll)
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('wheel', handleScroll)
    }
  }, [handleScroll])

  return (
    <>
      <section className='mx-auto mt-20 w-full'>
        <div className='overflow-hidden' ref={emblaRef}>
          <div className='mb-5 flex'>
            {[
              <UserInfoComponent
                key='UserInfoComponent'
                onPrevButtonClick={() => emblaApi.scrollPrev()}
                onNextButtonClick={() => emblaApi.scrollNext()}
                isSmallScreen={isSmallScreen}
              />,
              <AvatarComponent
                key='AvatarComponent'
                onPrevButtonClick={() => emblaApi.scrollPrev()}
                onNextButtonClick={() => emblaApi.scrollNext()}
                isSmallScreen={isSmallScreen}
              />,
              <Card2Component
                key='Card2Component'
                onPrevButtonClick={() => emblaApi.scrollPrev()}
                onNextButtonClick={() => emblaApi.scrollNext()}
                isSmallScreen={isSmallScreen}
              />,
              <ConnectionComponent
                key='ConnectionComponent'
                onPrevButtonClick={() => emblaApi.scrollPrev()}
                onNextButtonClick={() => emblaApi.scrollNext()}
                isSmallScreen={isSmallScreen}
              />,
              <ExperienceComponent
                key='ExperienceComponent'
                onPrevButtonClick={() => emblaApi.scrollPrev()}
                onNextButtonClick={() => emblaApi.scrollNext()}
                isSmallScreen={isSmallScreen}
              />,
              <SkillsComponent
                key='SkillsComponent'
                onPrevButtonClick={() => emblaApi.scrollPrev()}
                isSmallScreen={isSmallScreen}
              />,
            ].map((Component) => (
              <div key={Component.key} className='w-[900px] min-w-0 flex-none pl-4'>
                <div className='flex items-center justify-center'>{Component}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className='fixed inset-x-0 bottom-4 flex flex-col items-center justify-center'>
        <div className='mt-2 flex items-center justify-center'>
          <div className='flex gap-2 rounded-3xl p-2 px-7 shadow shadow-[#6B37CA] backdrop-blur-md md:h-10 md:items-center md:justify-center md:gap-7'>

            {tabs.map((tab, index) => (
              <Chip
                key={tab}
                text={isSmallScreen ? tab.charAt(0).toUpperCase() + tab.slice(-1) : tab}
                selected={selected === tab}
                onClick={() => handleChangeSlide(index)}
              />
            ))}
          </div>
        </div>
        <div className='flex w-full justify-start'>
          <motion.div
            className='-mb-4 mt-2 h-2 w-full rounded-r-full bg-gradient-to-r from-blue-400 to-green-500'
            initial={{ width: 0 }}
            animate={{ width: `${((slideIndex + 0.2) / (tabs.length - 1)) * 100}%` }}
            transition={{ type: 'spring', duration: 0.5 }}
          />
        </div>
      </footer>
    </>
  )
}

const Chip = ({ text, selected, onClick }) => (
  <button
    onClick={onClick}
    className={`${
      selected ? 'bg-purple-600 text-white' : 'text-slate-200 hover:bg-slate-700 hover:text-slate-200'
    } relative rounded-full px-2.5 py-0.5 text-sm transition-colors`}
  >
    <span className='relative z-10 pt-4'>{text}</span>
    {selected && (
      <motion.span
        layoutId='pill-tab'
        transition={{ type: 'spring', duration: 0.5 }}
        className='absolute inset-0 z-0 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600'
      ></motion.span>
    )}
  </button>
)

export default EmblaCarousel
