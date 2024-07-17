'use client'
import React, { useRef, ReactNode } from 'react'
import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar/Navbar'
import Hud from '@/components/Hud/Hud'
import RightSidebar2 from '../RightSidebarComponent/RightSidebar2'
import { SidebarProvider, useSidebar } from './SidebarProvider'
import { useLoadingState } from '@/components/CustomHooks/useLoadingState'
import Loading from '@/loading'

const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false })

interface LayoutProps {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null)
  const { isSidebarOpen, setIsSidebarOpen, showSignUp, setShowSignUp, showSignIn, setShowSignIn } = useSidebar()
  const isLoading = useLoadingState(1200)

  return (
    <div ref={ref}>
      <Navbar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        setShowSignIn={setShowSignIn}
        setShowSignUp={setShowSignUp}
        showSignIn={showSignIn}
        showSignUp={showSignUp}
      />
      {isLoading && <Loading />}
      {children}
      <div>
        <RightSidebar2
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          setShowSignIn={setShowSignIn}
          setShowSignUp={setShowSignUp}
          showSignIn={showSignIn}
          showSignUp={showSignUp}
        />
      </div>
      {/* <div className='absolute bottom-0 w-full'>
        <div className='flex justify-center'>
          <Hud />
        </div>
      </div> */}
    </div>
  )
}

const LayoutWithProvider: React.FC<LayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <Layout>{children}</Layout>
    </SidebarProvider>
  )
}

export { LayoutWithProvider as Layout }
