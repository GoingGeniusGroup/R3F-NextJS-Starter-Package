'use client'

import { useRef } from 'react'
import dynamic from 'next/dynamic'
import  StarsCanvas  from '@/components/StarsCanvas/StarBackground'
import Navbar from '@/components/Navbar/Navbar'
import PurpleVoid from '@/components/PurpleVoid/PurpleVoid'
const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false })

const Layout = ({ children }) => {
  const ref = useRef()

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        width: ' 100%'  ,
        height: '100%',
        overflow: 'auto',
        touchAction: 'auto',
        zIndex: '2'
      }}
    >
        <Navbar/>
        <StarsCanvas/>
        <PurpleVoid/>
      {children}
      <Scene
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
        }}
        eventSource={ref}
        eventPrefix='client'
      />
    </div>
  )
}

export { Layout }
