import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Users,
  Calendar,
  Star,
  Target,
  CheckCircle,
  Share2,
  Camera
} from 'lucide-react'
import { useStore } from '../store/useStore'
import toast from 'react-hot-toast'

const ChallengeDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { challenges, joinChallenge, updateUserPoints } = useStore()
  const [hasJoined, setHasJoined] = useState(false)
  const [uploadedProof, setUploadedProof] = useState([])

  const challenge = challenges.find((c) => c.id === id)

  if (!challenge) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Challenge not found</h1>
        <button
          onClick={() => navigate('/challenges')}
          className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Back to Challenges
        </button>
      </div>
    )
  }

  const challengeDetails = {
    '1': {
      steps: [
        'Identify a suitable location for tree planting',
        'Organize a team of 5-10 volunteers',
        'Contact local nurseries for saplings',
        'Prepare the planting site',
        'Plant trees with proper spacing',
        'Document the activity with photos',
        'Set up a maintenance schedule'
      ],
      requirements: [
        'Minimum 5 trees to be planted',
        'Photo documentation required',
        'Location coordinates must be shared',
        'Follow-up report after 30 days'
      ],
      impact:
        'Each tree can absorb 22kg of CO₂ annually and provide oxygen for 2 people',
      tips: [
        'Choose native species for better survival rates',
        'Plant during monsoon season for natural watering',
        'Involve local communities for long-term care',
        'Create awareness about the importance of trees'
      ]
    },
    '2': {
      steps: [
        'Audit your current waste generation',
        'Set up recycling and composting systems',
        'Reduce single-use items',
        'Repurpose materials creatively',
        'Track daily waste reduction',
        'Share tips with family and friends',
        'Document your journey'
      ],
      requirements: [
        'Daily waste tracking for 7 days',
        'Before and after photos',
        'List of changes implemented',
        'Weight/volume reduction achieved'
      ],
      impact:
        'Average household can reduce waste by 50-70% with proper practices',
      tips: [
        'Start with the biggest waste sources',
        'Use reusable containers and bags',
        'Compost organic waste',
        'Donate items instead of discarding'
      ]
    }
  }

  const currentChallengeDetails = challengeDetails[id] || challengeDetails['1']

  const handleJoinChallenge = () => {
    if (!hasJoined) {
      joinChallenge(challenge.id)
      setHasJoined(true)
      toast.success('🎯 Challenge joined successfully!')
    }
  }

  const handleUploadProof = () => {
    const newProof = `https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=400&t=${Date.now()}`
    setUploadedProof([...uploadedProof, newProof])
    updateUserPoints(50)
    toast.success('📸 Photo uploaded! +50 bonus points')
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'hard':
        return 'bg-red-100 text-red-700 border-red-200'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700'
      case 'upcoming':
        return 'bg-blue-100 text-blue-700'
      case 'completed':
        return 'bg-gray-100 text-gray-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-4 mb-8"
      >
        <button
          onClick={() => navigate('/challenges')}
          className="p-2 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>

        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(
                challenge.difficulty
              )}`}
            >
              {challenge.difficulty}
            </span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                challenge.status
              )}`}
            >
              {challenge.status}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {challenge.title}
          </h1>
          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{challenge.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>{challenge.points} points</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{challenge.participants.toLocaleString()} participants</span>
            </div>
          </div>
        </div>

        <button className="p-2 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow">
          <Share2 className="w-5 h-5 text-gray-600" />
        </button>
      </motion.div>

      {/* Hero Image and Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8"
      >
        <img
          src={challenge.image}
          alt={challenge.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-8">
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            {challenge.description}
          </p>

          {/* Impact Statement */}
          <div className="bg-green-50 rounded-xl p-6 mb-6">
            <div className="flex items-center space-x-2 mb-3">
              <Target className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-green-900">Environmental Impact</h3>
            </div>
            <p className="text-green-800">{currentChallengeDetails.impact}</p>
          </div>

          {/* Progress Bar */}
          {challenge.progress !== undefined && (
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Community Progress</span>
                <span>{challenge.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${challenge.progress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Action Button */}
          {!hasJoined ? (
            <button
              onClick={handleJoinChallenge}
              className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-green-700 transition-colors"
            >
              Join Challenge
            </button>
          ) : (
            <div className="flex items-center justify-center space-x-2 bg-green-100 text-green-700 py-4 rounded-xl">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold">Challenge Joined!</span>
            </div>
          )}
        </div>
      </motion.div>

      {hasJoined && (
        <>
          {/* Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-8"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Steps to Complete
            </h2>
            <div className="space-y-4">
              {currentChallengeDetails.steps.map((step, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 pt-1">{step}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Requirements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-8"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Requirements</h2>
            <div className="space-y-3">
              {currentChallengeDetails.requirements.map((requirement, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">{requirement}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-8"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Pro Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentChallengeDetails.tips.map((tip, index) => (
                <div key={index} className="bg-blue-50 rounded-lg p-4">
                  <p className="text-blue-800 text-sm">{tip}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Upload Proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Upload Proof</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center mb-6">
              <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">
                Upload photos of your environmental action
              </p>
              <button
                onClick={handleUploadProof}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Upload Photo
              </button>
            </div>

            {uploadedProof.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">
                  Uploaded Photos
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {uploadedProof.map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`Proof ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </div>
  )
}

export default ChallengeDetail
