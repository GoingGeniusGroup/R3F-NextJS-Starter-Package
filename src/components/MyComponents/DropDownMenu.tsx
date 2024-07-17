'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MdExpandLess } from 'react-icons/md'
import * as CountryFlags from 'country-flag-icons/react/3x2'
import Image from 'next/image'

interface DropdownComponentProps<T> {
  data: T[]
  onSelect: (selected: T) => void
  placeholder: string
  disabled: boolean
  value: string
  displayProperty?: keyof T
  flagProperty?: keyof T
  imagePath?: string
  symbolPath?: string
}

const DropdownComponent = <T extends string | object>({
  data,
  onSelect,
  placeholder,
  disabled,
  value,
  displayProperty,
  flagProperty,
  imagePath,
  symbolPath,
}: DropdownComponentProps<T>) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (item: T) => {
    setIsOpen(false)
    onSelect(item)
  }

  // Flag rendering
  const renderFlag = (item: T) => {
    if (typeof item === 'object' && flagProperty && item[flagProperty]) {
      const code = item[flagProperty] as string
      if (CountryFlags[code as keyof typeof CountryFlags]) {
        const FlagComponent = CountryFlags[code as keyof typeof CountryFlags]
        return <FlagComponent className='mr-2 h-4 w-6' />
      }
    }
    return null
  }

  // Display value
  const getDisplayValue = (item: T): string => {
    if (typeof item === 'string') {
      return item
    } else if (typeof item === 'object' && displayProperty) {
      return item[displayProperty] as string
    }
    return ''
  }

  return (
    <div ref={dropdownRef}>
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`flex items-center justify-between whitespace-nowrap rounded-full bg-black p-2 text-xs font-semibold text-white shadow transition-all duration-300 ease-in-out hover:bg-gray-700 focus:text-violet-300 focus:outline-none focus:ring-1 focus:ring-violet-300 ${
          disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
        }`}
        disabled={disabled}
      >
        <p>{value.toUpperCase() || placeholder}</p>
        <span className={`${isOpen ? 'rotate-0' : 'rotate-180'} text-lg transition-all duration-300 ease-in-out`}>
          <MdExpandLess />
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className='absolute bottom-16 left-0 z-20 grid max-h-[450px] w-full grid-cols-3 justify-center gap-4 overflow-auto rounded-2xl border border-gray-300 bg-white p-4 text-black shadow-lg '
          >
            {data.map((item, index) => (
              <motion.li
                key={index}
                whileHover={{ backgroundColor: '#f3f4f6' }}
                onClick={() => handleSelect(item)}
                className='relative flex h-32 cursor-pointer items-center justify-center overflow-hidden rounded-lg border bg-gray-200 px-4 py-2'
              >
                {imagePath && getDisplayValue(item) !== 'All' && (
                  <Image
                    src={`${imagePath}/${getDisplayValue(item)}.svg`}
                    alt={getDisplayValue(item)}
                    fill
                    objectFit='contain'
                    className='z-0'
                  />
                )}
                {symbolPath && getDisplayValue(item) !== 'All' && (
                  <Image
                    src={`${symbolPath}/${getDisplayValue(item)}.svg`}
                    alt={getDisplayValue(item)}
                    height={30}
                    width={30}
                    objectFit='contain'
                    className='absolute bottom-2 left-2 z-0 drop-shadow'
                  />
                )}
                <p className='absolute bottom-2 left-2 drop-shadow-md'>{renderFlag(item)}</p>
                <p className='z-10 font-semibold'>{getDisplayValue(item).toUpperCase()}</p>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DropdownComponent
