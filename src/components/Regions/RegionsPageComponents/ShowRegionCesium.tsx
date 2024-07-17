'use client'
import dynamic from 'next/dynamic'
import { useState, useEffect, Suspense } from 'react'
import Image from 'next/image'
import { MdLayers } from 'react-icons/md'

// Dynamic imports
const CesiumMap = dynamic(() => import('../../LeafletMap/CesiumMap'), {
  ssr: false,
})

const MapComponent = dynamic(() => import('../../LeafletMap/LeafletMap'), {
  ssr: false,
})

const ShowRegionUsers = dynamic(() => import('./ShowRegionUsers'), {
  ssr: false,
})

interface Guild {
  name: string
  username: string
  user_image: string
  description: string
  guild: string
  avatarimg: string
  continent: string
  country: string
}

export default function ShowRegionCesium({
  selectedRegionFilter,
  guilds,
  selectedGuildFilter,
  searchTerm,
  selectedCountryFilter,
}: {
  selectedRegionFilter: string
  guilds: Guild[]
  selectedGuildFilter: string
  searchTerm: string
  selectedCountryFilter: string
}) {
  const [isClient, setIsClient] = useState(false)
  const [mapChange, setMapChange] = useState('DEFAULT')
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const [openLayer, setOpenLayer] = useState(false)

  useEffect(() => {
    setIsClient(true)

    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1025)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleMapChange = (type: string) => {
    setOpenLayer(false)
    setMapChange(type)
  }

  const handleOpenLayer = () => {
    setOpenLayer(!openLayer)
  }

  if (!isClient) return null

  return (
    <div className='relative h-screen w-full'>
      {/* Change Layers */}
      <div className='absolute bottom-3 left-8 z-50 size-16'>
        <div className='flex size-full' onClick={handleOpenLayer}>
          <div className='relative size-full cursor-pointer overflow-hidden rounded-lg border-2 border-violet-300 drop-shadow transition-all duration-300 ease-in-out hover:scale-105'>
            <Image
              src={mapChange === 'SATELLITE' ? '/img/earth.png' : '/img/worldmap.png'}
              alt={mapChange === 'SATELLITE' ? 'cesium' : 'world map'}
              fill
              objectFit='cover'
              unoptimized
              loading='lazy'
              className='rounded-lg transition-all duration-300 ease-in-out hover:scale-110'
            />
            <div className='absolute top-0 flex size-full items-center justify-center bg-black/30'>
              <p className='text-white drop-shadow'>
                <MdLayers size={30} />
              </p>
            </div>
          </div>
        </div>
        {/* Layers */}
        <div
          className={`absolute bottom-1 transition-all duration-300 ease-in-out ${
            openLayer ? 'translate-x-16' : '-translate-x-96'
          } grid h-14 w-40 grid-cols-2 gap-1 p-1`}
        >
          {/* Default */}
          <div
            className='relative size-full cursor-pointer overflow-hidden rounded-lg border-2 transition-all duration-300 ease-in-out hover:scale-105'
            onClick={(e) => {
              e.stopPropagation()
              handleMapChange('DEFAULT')
            }}
          >
            <Image
              src='/img/worldmap.png'
              alt='world map'
              fill
              objectFit='cover'
              unoptimized
              loading='lazy'
              className='rounded-lg transition-all duration-300 ease-in-out hover:scale-110'
            />
            <div className='absolute top-0 flex size-full items-center justify-center bg-black/40'>
              <p className='text-[8px] font-semibold'>DEFAULT</p>
            </div>
          </div>
          {/* Satellite */}
          <div
            className='relative size-full cursor-pointer overflow-hidden rounded-lg border-2 transition-all duration-300 ease-in-out hover:scale-105'
            onClick={(e) => {
              e.stopPropagation()
              handleMapChange('SATELLITE')
            }}
          >
            <Image
              src='/img/earth.png'
              alt='cesium'
              fill
              objectFit='cover'
              unoptimized
              loading='lazy'
              className='rounded-lg transition-all duration-300 ease-in-out hover:scale-110'
            />
            <div className='absolute top-0 flex size-full items-center justify-center bg-black/40'>
              <p className='text-[8px] font-semibold'>SATELLITE</p>
            </div>
          </div>
        </div>
      </div>

      {/* Map and Cesium */}
      <Suspense fallback={<div>Loading map...</div>}>
        <div className='fixed top-0 size-full'>
          {mapChange === 'SATELLITE' ? (
            <CesiumMap filteredContinent={selectedRegionFilter} filteredCountry={selectedCountryFilter} />
          ) : (
            <MapComponent filteredContinent={selectedRegionFilter} filteredCountry={selectedCountryFilter} />
          )}
        </div>
      </Suspense>

      {mapChange === 'DEFAULT' && (
        <>
          <div className='absolute top-0 z-30 h-20 w-full bg-gradient-to-b from-black/50'></div>
          <div className='absolute bottom-0 z-30 h-20 w-full bg-gradient-to-t from-black/50'></div>
        </>
      )}

      {/* Guilds/Users Showcase */}
      <div className='flex size-full items-center justify-end overflow-hidden'>
        <div
          className={`shadow-xl shadow-black/30 ${
            isSmallScreen
              ? 'h-[36vh] w-full px-4'
              : 'mr-4 flex w-[22%] items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm'
          }`}
        >
          <div className='flex w-full drop-shadow'>
            <ShowRegionUsers
              users={guilds}
              selectedRegionFilter={selectedRegionFilter}
              filterguild={selectedGuildFilter}
              searchTerm={searchTerm}
              selectedCountryFilter={selectedCountryFilter}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
