import dynamic from 'next/dynamic'

const MapComponent = dynamic(() => import('../LeafletMap/LeafletMap'), {
  ssr: false,
})

import Image from 'next/image'
import { Suspense } from 'react'

export default function ShowRegion2({ filter }: { filter: string }) {
  const regions = [
    {
      name: 'East Asia',
      icon: 'https://cdn-icons-png.flaticon.com/128/15865/15865373.png',
      continent: 'ASIA',
      image:
        'https://imgs.search.brave.com/aSDKpjkUcexmRKTgD4x46WheLrZPpHQzTNQ5uuFYx5k/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/bXlnbG9iYWx2aWV3/cG9pbnQuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDIzLzA4/L1BhbGF3YW4tMS5q/cGc',
    },
    {
      name: 'South Asia',
      icon: 'https://cdn-icons-png.flaticon.com/128/356/356749.png',
      continent: 'ASIA',
      image:
        'https://imgs.search.brave.com/CHR1lb38tg1-9E8kcVdsTqaK2sEmUZCZo7PSvKWy3tM/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9yYXdt/YWxyb2Ftcy5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDgvMjVEQzg5RTEt/MDA2Mi00NDNFLUFG/MUQtQ0Y1ODAxMzcy/RjI4LTEwMjR4Njg0/LmpwZWc',
    },
    {
      name: 'Meso America',
      icon: 'https://cdn-icons-png.flaticon.com/128/2492/2492046.png',
      continent: 'NORTH AMERICA',
      image:
        'https://imgs.search.brave.com/t4ZToHbheBsGuZBsU4WvRJd7VQmyNn0xtgOon50vsSA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5jbnRyYXZlbGVy/LmNvbS9waG90b3Mv/NjU0ODVlNTk1M2My/NTc2YTRlMjBmODkz/L21hc3Rlci93XzMy/MCxjX2xpbWl0L0Jp/Zy1TdXItdGhvbWFz/LWNpc3pld3NraS1l/ckFwbWZSWDdlby11/bnNwbGFzaC5qcGc',
    },
    {
      name: 'North Africa',
      icon: 'https://cdn-icons-png.flaticon.com/128/15597/15597373.png',
      continent: 'AFRICA',
      image:
        'https://imgs.search.brave.com/sdPLZjS3Z9AOVh1q6THgtwaL4UU_ug4VwT_dkE3LZRI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9ibG9n/LmFzc2V0cy50aGVk/aXNjb3ZlcmVyLmNv/bS8yMDE5LzA1L2Jl/YXV0aWZ1bC1hZnJp/Y2EuanBn',
    },
    {
      name: 'Sub-Saharan Africa',
      icon: 'https://cdn-icons-png.flaticon.com/128/15597/15597373.png',
      continent: 'AFRICA',
      image:
        'https://imgs.search.brave.com/G7zOwnpcKRoEWw2tPhmfU7pdbPImUNKWtOSH4eNqslY/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9yZXMu/Y2xvdWRpbmFyeS5j/b20vdW5pdGVjaC1n/bG9iYWwtcmVzb3Vy/Y2UvaW1hZ2UvdXBs/b2FkL3YxNTgyNzAw/NTEwL25hbWliaWEx/X2gzMzFxbi5qcGc',
    },
  ]

  const filteredRegions = filter
    ? regions.filter((region) => region.continent === filter)
    : regions.filter((region) => region.continent === 'NORTH AMERICA') // default is this region

  return (
    <>
      <div className='relative flex flex-col'>
        <div className='flex w-full justify-end pr-5'>
          <div className='h-[550px] w-[50%]'>
            <Suspense fallback={<div>Loading map...</div>}>
              {/* <MapComponent filteredContinent={filter} /> */}
            </Suspense>
            {/* <Image src='/svgs/na.svg' width={500} height={500} alt='world map' /> */}
          </div>
          <div className='mx-10 flex w-[30%] flex-col items-center justify-center rounded-md bg-black/50'>
            <div className='mx-10 my-6 flex flex-wrap justify-center gap-5 lg:ml-24 lg:justify-start'>
              {filteredRegions.map((region, index) => (
                <a
                  href={`/regions/${region.name.toLowerCase().replace(' ', '-')}`}
                  className='relative flex h-[230px] w-[300px] min-w-0 flex-col items-center justify-center rounded-lg bg-purple-900/30 transition duration-500 ease-out hover:scale-105 '
                  key={index}
                >
                  <Image
                    className='aspect-[300/230] w-[300px] rounded-lg'
                    src={region.image}
                    alt=''
                    width={300}
                    height={230}
                    style={{ objectFit: 'cover' }}
                  />
                  {/* Symbol */}
                  <span className='absolute top-0 flex size-full items-center justify-center rounded-lg bg-black/40 opacity-100 transition duration-700 ease-out hover:opacity-0'>
                    <Image src={region.icon} alt='region icon' height={50} width={50} className='absolute top-[35%] ' />
                  </span>
                  <span className='absolute bottom-0 flex w-full flex-col items-center rounded-b-md bg-purple-950 px-3 py-2'>
                    <h1>{region.name}</h1>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
