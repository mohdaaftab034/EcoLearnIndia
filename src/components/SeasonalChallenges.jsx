import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { MapPin, Thermometer, Cloud, Sun, CloudRain, Award, Calendar } from 'lucide-react'
// import { lumi } from '../lib/lumi'

const SeasonalChallenges = () => {
  const { t } = useTranslation()
  const [location, setLocation] = useState(null)
  const [weather, setWeather] = useState(null)
  const [challenges, setChallenges] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCurrentLocationAndWeather()
  }, [])

  const getCurrentLocationAndWeather = async () => {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords

            const mockWeather = {
              temperature: Math.floor(Math.random() * 35) + 15,
              condition: ['sunny', 'cloudy', 'rainy', 'humid'][Math.floor(Math.random() * 4)],
              humidity: Math.floor(Math.random() * 40) + 40,
              season: getCurrentSeason()
            }

            const mockLocation = {
              city: 'Mumbai',
              state: 'Maharashtra'
            }

            setWeather(mockWeather)
            setLocation(mockLocation)
            generateSeasonalChallenges(mockWeather, mockLocation)
          },
          () => {
            const defaultWeather = {
              temperature: 28,
              condition: 'sunny',
              humidity: 65,
              season: getCurrentSeason()
            }

            setWeather(defaultWeather)
            setLocation({ city: 'Delhi', state: 'Delhi' })
            generateSeasonalChallenges(defaultWeather, { city: 'Delhi', state: 'Delhi' })
          }
        )
      }
    } catch (error) {
      console.error('Error getting location/weather:', error)
      setLoading(false)
    }
  }

  const getCurrentSeason = () => {
    const month = new Date().getMonth() + 1
    if (month >= 3 && month <= 5) return 'summer'
    if (month >= 6 && month <= 9) return 'monsoon'
    if (month >= 10 || month <= 2) return 'winter'
    return 'spring'
  }

  const generateSeasonalChallenges = (weather, location) => {
    const challengeTemplates = {
      summer: [
        {
          title: 'Solar Cooker Challenge',
          description: 'Build and use a solar cooker to prepare one meal using only solar energy',
          icon: '☀️',
          impact: 'Saves 2kg CO2 emissions',
          duration: '1 day'
        },
        {
          title: 'Water Conservation Drive',
          description: 'Implement rainwater harvesting system in your home or school',
          icon: '💧',
          impact: 'Saves 500L water daily',
          duration: '1 week'
        },
        {
          title: 'Cool Roof Initiative',
          description: 'Paint rooftops white or install reflective materials to reduce heat',
          icon: '🏠',
          impact: 'Reduces 15% cooling energy',
          duration: '3 days'
        }
      ],
      monsoon: [
        {
          title: 'Native Tree Plantation',
          description: `Plant ${weather.humidity > 70 ? '10' : '5'} native trees suitable for ${location.state}`,
          icon: '🌳',
          impact: 'Absorbs 22kg CO2 annually',
          duration: '2 days'
        },
        {
          title: 'Rainwater Collection',
          description: 'Set up rainwater collection system and measure daily collection',
          icon: '🌧️',
          impact: 'Collects 100L+ rainwater',
          duration: '1 week'
        },
        {
          title: 'Flood Prevention Garden',
          description: 'Create a rain garden to prevent waterlogging in your area',
          icon: '🌿',
          impact: 'Prevents local flooding',
          duration: '5 days'
        }
      ],
      winter: [
        {
          title: 'Compost Heater',
          description: 'Build a compost pile that generates natural heat for winter warmth',
          icon: '♻️',
          impact: 'Reduces heating costs 30%',
          duration: '1 week'
        },
        {
          title: 'Solar Water Heater',
          description: 'Install or build a solar water heating system',
          icon: '🔥',
          impact: 'Saves 40% heating energy',
          duration: '3 days'
        },
        {
          title: 'Insulation Challenge',
          description: 'Use eco-friendly materials to insulate your home naturally',
          icon: '🏡',
          impact: 'Reduces energy use 25%',
          duration: '2 days'
        }
      ]
    }

    const seasonChallenges = challengeTemplates[weather.season] || challengeTemplates.summer

    const generatedChallenges = seasonChallenges.map((template, index) => ({
      id: `seasonal-${weather.season}-${index}`,
      title: template.title,
      description: template.description,
      points: Math.floor(Math.random() * 200) + 100,
      difficulty: ['easy', 'medium', 'hard'][Math.floor(Math.random() * 3)],
      season: weather.season,
      weatherCondition: weather.condition,
      location: `${location.city}, ${location.state}`,
      icon: template.icon,
      duration: template.duration,
      impact: template.impact
    }))

    setChallenges(generatedChallenges)
    setLoading(false)
  }

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'sunny': return <Sun className="w-5 h-5 text-yellow-500" />
      case 'cloudy': return <Cloud className="w-5 h-5 text-gray-500" />
      case 'rainy': return <CloudRain className="w-5 h-5 text-blue-500" />
      default: return <Thermometer className="w-5 h-5 text-green-500" />
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700'
      case 'medium': return 'bg-yellow-100 text-yellow-700'
      case 'hard': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const joinChallenge = async (challenge) => {
    try {
      await lumi.entities.real_world_activities.create({
        user_id: 'current_user',
        activity_type: 'seasonal_challenge',
        title: challenge.title,
        description: challenge.description,
        season: challenge.season,
        location: challenge.location,
        points_potential: challenge.points,
        status: 'active',
        created_at: new Date().toISOString()
      })
      alert(`Joined challenge: ${challenge.title}!`)
    } catch (error) {
      console.error('Error joining challenge:', error)
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            🌍 {t('seasonalChallenges')}
          </h2>
          <p className="text-gray-600">Personalized challenges based on your location and season</p>
        </div>

        {weather && location && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-2">
              <MapPin className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-gray-700">
                {location.city}, {location.state}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              {getWeatherIcon(weather.condition)}
              <span className="text-sm text-gray-600">
                {weather.temperature}°C • {weather.condition} • {weather.season}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((challenge, index) => (
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-3xl">{challenge.icon}</div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                {challenge.difficulty}
              </span>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-2">{challenge.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{challenge.description}</p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-1">
                  <Award className="w-4 h-4 text-yellow-500" />
                  <span className="text-gray-600">{challenge.points} points</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <span className="text-gray-600">{challenge.duration}</span>
                </div>
              </div>

              <div className="bg-green-100 rounded-lg p-2">
                <p className="text-xs text-green-700 font-medium">🌱 Impact: {challenge.impact}</p>
              </div>
            </div>

            <button
              onClick={() => joinChallenge(challenge)}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
            >
              {t('join')} Challenge
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default SeasonalChallenges
