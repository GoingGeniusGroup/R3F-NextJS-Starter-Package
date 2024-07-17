'use client'

import { Ion, Viewer, CesiumWidget, Cartesian3 } from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'
import { useEffect, useState, useRef } from 'react'

import './css/main.css'

const CesiumMap = ({ filteredContinent, filteredCountry }: { filteredContinent: string; filteredCountry: string }) => {
  const cesiumRef = useRef<CesiumWidget | null>(null)
  const [countriesData, setCountriesData] = useState<any[]>([])

  const cameraZoom: number = 9500000 // Adjust this as needed

  const handleZoomToCountry = (countryArea: number) => {
    if (countryArea < 150000) {
      return 850000
    } else if (countryArea < 300000) {
      return 1100000
    } else {
      return 1500000
    }
  }

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

  // Fly to the selected country's location
  useEffect(() => {
    if (filteredCountry && countriesData.length > 0) {
      const country = countriesData.find((country) => country.cca2.toUpperCase() === filteredCountry.toUpperCase())
      const countryArea = country.area

      if (country) {
        const { latlng } = country

        // Fly to the country's location
        cesiumRef.current?.camera.flyTo({
          destination: Cartesian3.fromDegrees(latlng[1], latlng[0], handleZoomToCountry(countryArea)),
        })
      }
    }
  }, [filteredCountry, countriesData])

  // Initialize the Cesium Viewer
  useEffect(() => {
    const initializeCesiumViewer = async () => {
      // Check if the CesiumWidget has already been initialized
      if (!cesiumRef.current) {
        // CesiumJS has a default access token built in but it's not meant for active use.
        // Please set your own access token can be found at: https://cesium.com/ion/tokens.
        Ion.defaultAccessToken =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkZGUzY2FhOC00M2ViLTQ2ZmQtYWQ1Yy1kYzNhYzFhZmVkZjIiLCJpZCI6MjAwOTU1LCJpYXQiOjE3MTAyMjkxNDF9.09cBca1kjkwB2lSOjuJMFMjOUV1DWT75cHXqT3zGxIU'

        // Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
        cesiumRef.current = new CesiumWidget('cesiumContainer')
      }

      // Fly to the continent's location
      if (cesiumRef.current) {
        switch (filteredContinent) {
          case 'NORTH AMERICA':
            cesiumRef.current.camera.flyTo({
              destination: Cartesian3.fromDegrees(-98.5795, 39.8282, cameraZoom), // Example coordinates for North America
            })
            break
          case 'SOUTH AMERICA':
            cesiumRef.current.camera.flyTo({
              destination: Cartesian3.fromDegrees(-56.1819, -14.235, cameraZoom), // Example coordinates for South America
            })
            break
          case 'EUROPE':
            cesiumRef.current.camera.flyTo({
              destination: Cartesian3.fromDegrees(9.1859, 48.8566, cameraZoom), // Example coordinates for Europe
            })
            break
          case 'AFRICA':
            cesiumRef.current.camera.flyTo({
              destination: Cartesian3.fromDegrees(23.4162, 8.7832, cameraZoom), // Example coordinates for Africa
            })
            break
          case 'ASIA':
            cesiumRef.current.camera.flyTo({
              destination: Cartesian3.fromDegrees(104.1954, 35.8617, cameraZoom), // Example coordinates for Asia
            })
            break
          case 'AUSTRALIA & OCEANIA':
            cesiumRef.current.camera.flyTo({
              destination: Cartesian3.fromDegrees(134.755, -25.2744, cameraZoom), // Example coordinates for Australia & Oceania
            })
            break
          case 'ANTARCTICA':
            cesiumRef.current.camera.flyTo({
              destination: Cartesian3.fromDegrees(0, -90, cameraZoom), // Example coordinates for Antarctica
            })
            break
          default:
            break
        }
      }
    }

    initializeCesiumViewer()

    // Cleanup function (optional)
    return () => {
      // Any cleanup code if needed
    }
  }, [filteredContinent]) // Empty dependency array to run the effect only once

  return (
    <div id='cesiumContainer' className='h-screen w-full'>
      {/* Cesium Viewer container */}
    </div>
  )
}

export default CesiumMap
