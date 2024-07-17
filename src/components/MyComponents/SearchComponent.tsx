'use client'

import { useState } from 'react'
import { IoSearch } from 'react-icons/io5'
import { motion } from 'framer-motion'

export default function SearchComponent({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: string
  setSearchTerm: (searchTerm: string) => void
}) {
  const [value, setValue] = useState('')

  // When search
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  // On search button click
  const handleSearchButtonClick = () => {
    setSearchTerm(value)
  }

  // On enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchButtonClick()
    }
  }

  return (
    <div className='flex w-full items-center justify-between gap-x-2 rounded-full bg-white/20 p-1 shadow-xl backdrop-blur-lg'>
      <div className='relative flex w-full items-center'>
        <IoSearch className='absolute left-4 z-10 size-5 text-black drop-shadow' />
        <input
          type='search'
          placeholder='SEARCH'
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          className='w-full rounded-full bg-white/20 py-2 pl-12 pr-4 text-gray-700 shadow backdrop-blur-sm transition-all duration-300 ease-in-out placeholder:text-black hover:bg-white/30 hover:text-black focus:outline-none focus:ring-2 focus:ring-black/50'
        />
        <motion.button
          whileTap={{ scale: 0.95 }}
          className='absolute right-2 rounded-full px-2 py-1 text-xs font-bold text-black shadow shadow-black backdrop-blur-lg transition-colors duration-300 ease-in-out hover:bg-black hover:text-white'
          onClick={handleSearchButtonClick}
        >
          SEARCH
        </motion.button>
      </div>
    </div>
  )
}
