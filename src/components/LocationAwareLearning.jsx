import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { MapPin, Droplets, Wind, Sun, CloudRain, Leaf, AlertTriangle } from 'lucide-react'

const LocationAwareLearning = () => {
  const { t } = useTranslation()
  const [location, setLocation] = useState(null)
  const [localChallenges, setLocalChallenges] = useState([])
  const [loading, setLoading] = useState(true)
  const [permissionGranted, setPermissionGranted] = useState(false)

  useEffect(() => {
    requestLocationPermission()
  }, [])

  const requestLocationPermission = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPermissionGranted(true)
          fetchLocationData(position.coords.latitude, position.coords.longitude)
        },
        (error) => {
          console.error('Location access denied:', error)
          setPermissionGranted(false)
          loadDefaultLocation()
        }
      )
    } else {
      loadDefaultLocation()
    }
  }

  const fetchLocationData = async (lat, lon) => {
    try {
      // Simulated API call
      const mockLocationData = {
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'India',
        lat,
        lon,
        weather: {
          temperature: 32,
          humidity: 78,
          condition: 'Partly Cloudy',
          windSpeed: 15,
          airQuality: 65
        },
        season: 'monsoon',
        environmentalConcerns: ['Air Pollution', 'Water Conservation', 'Waste Management']
      }

      setLocation(mockLocationData)
      generateLocalChallenges(mockLocationData)
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch location data:', error)
      loadDefaultLocation()
    }
  }

  const loadDefaultLocation = () => {
    const defaultLocation = {
      city: 'Delhi',
      state: 'Delhi',
      country: 'India',
      lat: 28.6139,
      lon: 77.209,
      weather: {
        temperature: 35,
        humidity: 60,
        condition: 'Sunny',
        windSpeed: 10,
        airQuality: 45
      },
      season: 'summer',
      environmentalConcerns: ['Air Pollution', 'Heat Waves', 'Water Scarcity']
    }
    setLocation(defaultLocation)
    generateLocalChallenges(defaultLocation)
    setLoading(false)
  }

  const generateLocalChallenges = (locationData) => {
    const challenges = [
      {
        id: '1',
        title: `Plant Native Trees in ${locationData.city}`,
        description: `Plant indigenous trees suitable for ${locationData.season} season in your local area`,
        difficulty: 'medium',
        points: 250,
        category: 'Biodiversity',
        locationSpecific: true,
        seasonalRelevance: 95
      },
      {
        id: '2',
        title: 'Monitor Local Air Quality',
        description: `Track and report air quality levels in ${locationData.city} for one week`,
        difficulty: 'easy',
        points: 150,
        category: 'Air Quality',
        locationSpecific: true,
        seasonalRelevance: 80
      },
      {
        id: '3',
        title: 'Water Conservation Drive',
        description: `Implement water-saving techniques suitable for ${locationData.season} season`,
        difficulty: 'hard',
        points: 300,
        category: 'Water',
        locationSpecific: true,
        seasonalRelevance: 90
      }
    ]
    setLocalChallenges(challenges)
  }

  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'sunny': return <Sun className="w-6 h-6 text-yellow-500" />
      case 'rainy': return <CloudRain className="w-6 h-6 text-blue-500" />
      case 'cloudy': return <Wind className="w-6 h-6 text-gray-500" />
      default: return <Sun className="w-6 h-6 text-yellow-500" />
    }
  }

  const getAQIColor = (aqi) => {
    if (aqi <= 50) return 'text-green-600 bg-green-100'
    if (aqi <= 100) return 'text-yellow-600 bg-yellow-100'
    if (aqi <= 150) return 'text-orange-600 bg-orange-100'
    return 'text-red-600 bg-red-100'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        <span className="ml-3 text-gray-600">Loading location data...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Location Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <MapPin className="w-5 h-5" />
              <h3 className="text-xl font-bold">{location?.city}, {location?.state}</h3>
            </div>
            <p className="text-green-100">
              Personalized challenges for your location and season
            </p>
          </div>
          {!permissionGranted && (
            <button
              onClick={requestLocationPermission}
              className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-green-50 transition-colors"
            >
              Enable Location
            </button>
          )}
        </div>
      </motion.div>

      {/* Environmental Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div className="bg-white rounded-xl p-4 shadow-md">
          <div className="flex items-center space-x-3">
            {getWeatherIcon(location?.weather.condition || '')}
            <div>
              <p className="text-sm text-gray-600">Temperature</p>
              <p className="text-xl font-bold text-gray-900">{location?.weather.temperature}°C</p>
            </div>
          </div>
        </motion.div>

        <motion.div className="bg-white rounded-xl p-4 shadow-md">
          <div className="flex items-center space-x-3">
            <Droplets className="w-6 h-6 text-blue-500" />
            <div>
              <p className="text-sm text-gray-600">Humidity</p>
              <p className="text-xl font-bold text-gray-900">{location?.weather.humidity}%</p>
            </div>
          </div>
        </motion.div>

        <motion.div className="bg-white rounded-xl p-4 shadow-md">
          <div className="flex items-center space-x-3">
            <Wind className="w-6 h-6 text-gray-500" />
            <div>
              <p className="text-sm text-gray-600">Wind Speed</p>
              <p className="text-xl font-bold text-gray-900">{location?.weather.windSpeed} km/h</p>
            </div>
          </div>
        </motion.div>

        <motion.div className="bg-white rounded-xl p-4 shadow-md">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-6 h-6 text-orange-500" />
            <div>
              <p className="text-sm text-gray-600">Air Quality</p>
              <span className={`text-sm px-2 py-1 rounded-full ${getAQIColor(location?.weather.airQuality || 0)}`}>
                AQI {location?.weather.airQuality}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Environmental Concerns */}
      <motion.div className="bg-white rounded-xl p-6 shadow-md">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Local Environmental Priorities</h3>
        <div className="flex flex-wrap gap-2">
          {location?.environmentalConcerns.map((concern, index) => (
            <span key={index} className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
              {concern}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Challenges */}
      <motion.div className="bg-white rounded-xl p-6 shadow-md">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Challenges for {location?.city} - {location?.season} Season
        </h3>
        <div className="space-y-4">
          {localChallenges.map((challenge, index) => (
            <motion.div key={challenge.id} className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-bold text-gray-900">{challenge.title}</h4>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${challenge.difficulty === 'easy'
                          ? 'bg-green-100 text-green-700'
                          : challenge.difficulty === 'medium'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                    >
                      {challenge.difficulty}
                    </span>
                    {challenge.locationSpecific && (
                      <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                        <MapPin className="w-3 h-3 inline mr-1" />
                        Local
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{challenge.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Category: {challenge.category}</span>
                    <span>Points: {challenge.points}</span>
                    <span>Seasonal Relevance: {challenge.seasonalRelevance}%</span>
                  </div>
                </div>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Start Challenge
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Seasonal Tips */}
      <motion.div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-6 border border-green-200">
        <div className="flex items-center space-x-2 mb-4">
          <Leaf className="w-6 h-6 text-green-600" />
          <h3 className="text-lg font-bold text-gray-900">
            {location?.season.charAt(0).toUpperCase() + location?.season.slice(1)} Season Tips for {location?.city}
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-green-800">Best Practices:</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Plant native species during monsoon</li>
              <li>• Harvest rainwater for dry seasons</li>
              <li>• Use natural ventilation to reduce AC usage</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-green-800">Local Resources:</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Mumbai Municipal Corporation tree plantation</li>
              <li>• Local environmental NGOs</li>
              <li>• Community composting centers</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default LocationAwareLearning
