'use client'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import useUserAndGuildData from '@/components/CustomHooks/useUserAndGuildData'
import SearchComponent from '@/components/MyComponents/SearchComponent'
import RegionHudComponent from '@/components/MyComponents/RegionHudComponent'

const ShowRegionCesium = dynamic(() => import('@/components/Regions/RegionsPageComponents/ShowRegionCesium'), {
  ssr: false,
})

const continents = [
  {
    continent_name: 'AFRICA',
    continent_code: 'AF',
  },
  {
    continent_name: 'ANTARCTICA',
    continent_code: 'AN',
  },
  {
    continent_name: 'ASIA',
    continent_code: 'AS',
  },
  {
    continent_name: 'EUROPE',
    continent_code: 'EU',
  },
  {
    continent_name: 'NORTH AMERICA',
    continent_code: 'NA',
  },
  {
    continent_name: 'AUSTRALIA & OCEANIA',
    continent_code: 'OC',
  },
  {
    continent_name: 'SOUTH AMERICA',
    continent_code: 'SA',
  },
]

const Regions = () => {
  const { users, guilds } = useUserAndGuildData()
  const [selectedRegionFilter, setSelectedRegionFilter] = useState('') // Nothing as the default region
  const [selectedGuildFilter, setSelectedGuildFilter] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [mappedGuilds, setMappedGuilds] = useState([])
  const [selectedCountryFilter, setSelectedCountryFilter] = useState('')

  const handleRegionFilterChange = (filter) => {
    setSelectedRegionFilter(filter.toUpperCase())
  }

  const handleCountryFilterChange = (filter) => {
    setSelectedCountryFilter(filter)
  }

  const handleGuildFilterChange = (filter) => {
    setSelectedGuildFilter(filter)
  }

  // Map the user data to the format needed for the Cesium component
  useEffect(() => {
    if (users.length && guilds.length) {
      const mappedData = users.map((user) => {
        const guild = guilds.find((g) => g.id === user.guild_id)
        const continent = continents.find((continent) => continent.continent_code === user.region.continent_code)
        const avatarUrl = user.avatar.length > 0 ? user.avatar[0].avatar_url : ''

        return {
          name: `${user.first_name} ${user.last_name}`,
          username: user.username,
          user_image:
            user.image_urls.length > 0 ? user.image_urls[user.image_urls.length - 1] : '/card/defaultbuddha.svg',
          description: user.description,
          guild: guild ? guild.guild_name : 'Unknown Guild',
          avatarimg: avatarUrl.replace('glb', 'png'),
          continent: continent ? continent.continent_name : 'Unknown Continent',
          country: user.region.country, // country as country code
          city: user.region.city,
        }
      })
      setMappedGuilds(mappedData)
    }
  }, [users, guilds])

  // Filter the guilds based on the selected region, country, guild, and search term
  const filteredGuilds = mappedGuilds.filter((guild) => {
    const matchesRegion = selectedRegionFilter ? guild.continent === selectedRegionFilter : true
    const matchesCountry = selectedCountryFilter ? guild.country === selectedCountryFilter : true
    const matchesGuild = selectedGuildFilter ? guild.guild === selectedGuildFilter : true
    const matchesSearch = searchTerm
      ? guild.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guild.username.toLowerCase().includes(searchTerm.toLowerCase())
      : true

    return matchesRegion && matchesCountry && matchesGuild && matchesSearch
  })

  return (
    <>
      {users && guilds ? (
        <div className='relative'>
          <div className='absolute top-[88px] flex w-full justify-center'>
            <div className='z-30 w-[50%]'>
              <SearchComponent searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
          </div>
          <div className='flex flex-col justify-center lg:justify-start'>
            <ShowRegionCesium
              selectedRegionFilter={selectedRegionFilter}
              guilds={filteredGuilds}
              selectedGuildFilter={selectedGuildFilter}
              selectedCountryFilter={selectedCountryFilter}
              searchTerm={searchTerm}
            />
          </div>
          <div className='absolute bottom-6 flex w-full justify-center'>
            <div className='z-50 w-full md:w-1/2'>
              <RegionHudComponent
                onRegionChange={handleRegionFilterChange}
                onCountryChange={handleCountryFilterChange}
                onGuildChange={handleGuildFilterChange}
                guilds={guilds.map((g) => g.guild_name)}
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div>loading...</div>
        </>
      )}
    </>
  )
}

export default Regions
