'use client'
import { useState, useEffect, useRef } from 'react'
import DropdownComponent from './DropDownMenu'
import { MdClear } from 'react-icons/md'

interface CountryData {
  name: string
  code: string
}

const continentCountryMap: { [key: string]: CountryData[] } = {
  'North America': [
    { name: 'United States', code: 'US' },
    { name: 'Canada', code: 'CA' },
    { name: 'Mexico', code: 'MX' },
    { name: 'Cuba', code: 'CU' },
    { name: 'Jamaica', code: 'JM' },
    { name: 'Haiti', code: 'HT' },
    { name: 'Bahamas', code: 'BS' },
    { name: 'Costa Rica', code: 'CR' },
  ],
  Europe: [
    { name: 'United Kingdom', code: 'GB' },
    { name: 'Germany', code: 'DE' },
    { name: 'France', code: 'FR' },
    { name: 'Portugal', code: 'PT' },
    { name: 'Spain', code: 'ES' },
    { name: 'Italy', code: 'IT' },
    { name: 'Netherlands', code: 'NL' },
    { name: 'Switzerland', code: 'CH' },
    { name: 'Sweden', code: 'SE' },
    { name: 'Poland', code: 'PL' },
    { name: 'Norway', code: 'NO' },
    { name: 'Finland', code: 'FI' },
    { name: 'Denmark', code: 'DK' },
    { name: 'Belgium', code: 'BE' },
  ],
  Asia: [
    { name: 'Nepal', code: 'NP' },
    { name: 'Japan', code: 'JP' },
    { name: 'China', code: 'CN' },
    { name: 'India', code: 'IN' },
    { name: 'South Korea', code: 'KR' },
    { name: 'Thailand', code: 'TH' },
    { name: 'Vietnam', code: 'VN' },
    { name: 'Indonesia', code: 'ID' },
    { name: 'Philippines', code: 'PH' },
    { name: 'Malaysia', code: 'MY' },
    { name: 'Singapore', code: 'SG' },
    { name: 'Pakistan', code: 'PK' },
    { name: 'Bangladesh', code: 'BD' },
    { name: 'Sri Lanka', code: 'LK' },
    { name: 'Afghanistan', code: 'AF' },
    { name: 'Iran', code: 'IR' },
    { name: 'Iraq', code: 'IQ' },
    { name: 'Saudi Arabia', code: 'SA' },
    { name: 'Turkey', code: 'TR' },
  ],
  'South America': [
    { name: 'Brazil', code: 'BR' },
    { name: 'Argentina', code: 'AR' },
    { name: 'Colombia', code: 'CO' },
    { name: 'Peru', code: 'PE' },
    { name: 'Chile', code: 'CL' },
    { name: 'Venezuela', code: 'VE' },
    { name: 'Ecuador', code: 'EC' },
    { name: 'Bolivia', code: 'BO' },
    { name: 'Paraguay', code: 'PY' },
    { name: 'Uruguay', code: 'UY' },
  ],
  Africa: [
    { name: 'South Africa', code: 'ZA' },
    { name: 'Egypt', code: 'EG' },
    { name: 'Nigeria', code: 'NG' },
    { name: 'Kenya', code: 'KE' },
    { name: 'Morocco', code: 'MA' },
    { name: 'Ghana', code: 'GH' },
    { name: 'Tanzania', code: 'TZ' },
    { name: 'Algeria', code: 'DZ' },
    { name: 'Uganda', code: 'UG' },
    { name: 'Sudan', code: 'SD' },
    { name: 'Mozambique', code: 'MZ' },
    { name: 'Angola', code: 'AO' },
    { name: 'Zimbabwe', code: 'ZW' },
    { name: 'Zambia', code: 'ZM' },
    { name: 'Tunisia', code: 'TN' },
  ],
  'Australia & Oceania': [
    { name: 'Australia', code: 'AU' },
    { name: 'New Zealand', code: 'NZ' },
    { name: 'Fiji', code: 'FJ' },
    { name: 'Papua New Guinea', code: 'PG' },
    { name: 'Solomon Islands', code: 'SB' },
    { name: 'Vanuatu', code: 'VU' },
    { name: 'Samoa', code: 'WS' },
    { name: 'Tonga', code: 'TO' },
    { name: 'Micronesia', code: 'FM' },
    { name: 'Marshall Islands', code: 'MH' },
    { name: 'Palau', code: 'PW' },
  ],
}

export default function RegionHudComponent({
  onRegionChange,
  onCountryChange,
  onGuildChange,
  guilds,
}: {
  onRegionChange: (region: string) => void
  onCountryChange: (country: string) => void
  onGuildChange: (guild: string) => void
  guilds: string[]
}) {
  const [selectedContinent, setSelectedContinent] = useState('')
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null)
  const [selectedGuild, setSelectedGuild] = useState('')
  const [availableCountries, setAvailableCountries] = useState<CountryData[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  const continents = ['All', ...Object.keys(continentCountryMap)] // ['All', 'North America', 'Europe', 'Asia', 'South America', 'Africa', 'Oceania']

  // When selectedContinent changes
  useEffect(() => {
    if (selectedContinent && selectedContinent !== 'All') {
      setAvailableCountries([{ name: 'All', code: '' }, ...continentCountryMap[selectedContinent]])
    } else {
      setAvailableCountries([{ name: 'All', code: '' }])
    }
    setSelectedCountry(null)
  }, [selectedContinent])

  // When continent is selected
  const handleContinentSelect = (continent: string) => {
    const newContinent = continent === 'All' ? '' : continent
    setSelectedContinent(newContinent)
    setSelectedCountry(null) // Reset country
    onCountryChange('') // Reset country
    onRegionChange(newContinent)
  }

  // When country is selected
  const handleCountrySelect = (country: CountryData) => {
    setSelectedCountry(country)
    onCountryChange(country.code)
  }

  // When guild is selected
  const handleGuildSelect = (guild: string) => {
    const newGuild = guild === 'All' ? '' : guild
    setSelectedGuild(newGuild)
    onGuildChange(newGuild)
  }

  const clearAll = () => {
    setSelectedContinent('')
    setSelectedCountry(null)
    setSelectedGuild('')
    onRegionChange('')
    onCountryChange('')
    onGuildChange('')
  }

  return (
    <div ref={containerRef} className={`flex w-full flex-col items-center transition-all duration-500 ease-in-out`}>
      <div className='relative flex w-full items-center justify-center gap-x-2 '>
        <div className='flex items-center space-x-2 rounded-full bg-white/20 p-2 shadow-xl'>
          <DropdownComponent
            data={continents}
            onSelect={handleContinentSelect}
            placeholder='CONTINENTS'
            disabled={false}
            value={selectedContinent}
            imagePath='/continents/continentmaps'
          />

          <DropdownComponent
            data={availableCountries}
            onSelect={handleCountrySelect}
            placeholder='COUNTRIES'
            disabled={!selectedContinent || selectedContinent === 'All'}
            value={selectedCountry?.name || ''}
            displayProperty='name'
            flagProperty='code'
            imagePath='/continents/countrymaps'
          />

          <DropdownComponent
            data={['All', ...guilds]}
            onSelect={handleGuildSelect}
            placeholder='GUILDS'
            disabled={false}
            value={selectedGuild}
            // imagePath='/guild'
            symbolPath='/guild/symbols'
          />
        </div>
        {(selectedContinent || selectedCountry || selectedGuild) && (
          <button
            onClick={clearAll}
            className='whitespace-nowrap rounded-full bg-black p-2 text-xs font-bold text-white hover:bg-gray-600'
          >
            <MdClear />
          </button>
        )}
      </div>
    </div>
  )
}
