'use client'

import 'leaflet/dist/leaflet.css'
import { useState, useEffect } from 'react'
import worldGeoJSON from 'geojson-world-map'

import { GeoJsonObject } from 'geojson'

import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'

const calculateZoom = (area) => {
  if (area < 150000) {
    // Adjust thresholds as needed
    return 7
  } else if (area < 300000) {
    return 6
  } else {
    return 5
  }
}

const MapComponent = ({
  filteredContinent,
  filteredCountry,
}: {
  filteredContinent: string
  filteredCountry: string
}) => {
  const [mapCenter, setMapCenter] = useState<[number, number]>([30, 100]) // Initial map center to Asia
  const [countriesData, setCountriesData] = useState<any[]>([])

  const handleFlyTo = (center: [number, number], zoom: number) => {
    setMapCenter(center) // Update the map center state
    setZoomLevel(zoom) // Update the zoom level state
  }

  const [zoomLevel, setZoomLevel] = useState<number>(3) // Initial zoom level for continents

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (filteredContinent === 'NORTH AMERICA') {
        handleFlyTo([47.0902, -115.7129], 3)
      } else if (filteredContinent === 'ASIA') {
        handleFlyTo([26, 80], 4)
      } else if (filteredContinent === 'AFRICA') {
        handleFlyTo([0, 20], 3)
      } else if (filteredContinent === 'SOUTH AMERICA') {
        handleFlyTo([-25.235, -56.9253], 3)
      } else if (filteredContinent === 'EUROPE') {
        handleFlyTo([54.526, 15.2551], 3)
      } else if (filteredContinent === 'AUSTRALIA & OCEANIA') {
        handleFlyTo([-25.2744, 133.7751], 3)
      } else if (filteredContinent === 'ANTARCTICA') {
        handleFlyTo([-62.8628, 135], 3)
      }
    }
  }, [filteredContinent])

  // Fetch countries data
  useEffect(() => {
    const fetchCountriesData = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all')
        const data = await response.json()
        setCountriesData(data)
      } catch (error) {
        console.error('Error fetching countries data:', error)
      }
    }

    fetchCountriesData()
  }, [])

  useEffect(() => {
    if (filteredCountry && countriesData.length > 0) {
      const country = countriesData.find((country) => country.cca2.toUpperCase() === filteredCountry.toUpperCase())
      const countryArea = country.area

      if (country) {
        const { latlng } = country
        const zoomLevel = calculateZoom(countryArea)
        handleFlyTo([latlng[0], latlng[1]], zoomLevel)
      }
    }
  }, [filteredCountry, countriesData])

  return (
    <div className='h-screen w-full'>
      {/* Map */}
      <MapContainer
        key={`${mapCenter[0]}-${zoomLevel}`}
        center={mapCenter}
        zoom={zoomLevel}
        className='h-full rounded-lg'
        // scrollWheelZoom={false}
      >
        <GeoJSON
          data={worldGeoJSON as GeoJsonObject} // Cast worldGeoJSON to GeoJsonObject
          style={() => ({
            color: '#4a83ec',
            weight: 0.5,
            fillColor: '#1a1d62',
            fillOpacity: 0,
          })}
        />
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      </MapContainer>
    </div>
  )
}

export default MapComponent
