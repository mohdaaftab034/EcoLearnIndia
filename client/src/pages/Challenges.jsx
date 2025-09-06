
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {Target, Users, Calendar, Star, Filter, Search, Trophy, Clock, TrendingUp} from 'lucide-react'
import { useStore } from '../store/useStore'

const Challenges = () => {
  const { challenges, user } = useStore()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = [
    { id: 'all', name: 'All Challenges', icon: '🌍' },
    { id: 'Action', name: 'Environmental Action', icon: '🌱' },
    { id: 'Lifestyle', name: 'Sustainable Lifestyle', icon: '♻️' },
    { id: 'Community', name: 'Community Impact', icon: '🤝' },
    { id: 'Education', name: 'Awareness Building', icon: '📢' },
  ]

  const statuses = [
    { id: 'all', name: 'All Status' },
    { id: 'active', name: 'Active' },
    { id: 'upcoming', name: 'Upcoming' },
    { id: 'completed', name: 'Completed' },
  ]

  const filteredChallenges = challenges.filter(challenge => {
    const matchesCategory = selectedCategory === 'all' || challenge.category === selectedCategory
    const matchesStatus = selectedStatus === 'all' || challenge.status === selectedStatus
    const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         challenge.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesStatus && matchesSearch
  })

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700 border-green-200'
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'hard': return 'bg-red-100 text-red-700 border-red-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700'
      case 'upcoming': return 'bg-blue-100 text-blue-700'
      case 'completed': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const totalParticipants = challenges.reduce((sum, challenge) => sum + challenge.participants, 0)
  const activeCount = challenges.filter(c => c.status === 'active').length

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Environmental Challenges 🎯
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Take part in real-world sustainability challenges and make a positive impact on the environment
        </p>
        
        {/* Stats */}
        <div className="flex justify-center space-x-8 mt-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{activeCount}</div>
            <div className="text-sm text-gray-500">Active Challenges</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{totalParticipants.toLocaleString()}</div>
            <div className="text-sm text-gray-500">Total Participants</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{user?.level || 0}</div>
            <div className="text-sm text-gray-500">Your Level</div>
          </div>
        </div>
      </motion.div>

      {/* Featured Challenge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 mb-8 text-white"
      >
        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Trophy className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-green-100">FEATURED CHALLENGE</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Plant 100 Trees Challenge
            </h2>
            <p className="text-green-100 mb-6">
              Join thousands of students across India in our massive tree plantation drive. 
              Organize events in your school or community and help us reach our goal!
            </p>
            <div className="flex items-center space-x-6 mb-6">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>1,247 participants</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>30 days left</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-300" />
                <span>500 points</span>
              </div>
            </div>
            <Link
              to="/challenges/1"
              className="inline-block bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
            >
              Join Challenge
            </Link>
          </div>
          <div className="w-full md:w-64 h-48 md:h-64">
            <img
              src="https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="Tree Planting"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white rounded-2xl shadow-lg p-6 mb-8"
      >
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search challenges..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category Filter */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-green-100 text-green-700 border-2 border-green-300'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Status</h3>
            <div className="flex flex-wrap gap-2">
              {statuses.map((status) => (
                <button
                  key={status.id}
                  onClick={() => setSelectedStatus(status.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedStatus === status.id
                      ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {status.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChallenges.map((challenge, index) => (
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 * index }}
          >
            <Link
              to={`/challenges/${challenge.id}`}
              className="block bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className="relative">
                <img
                  src={challenge.image}
                  alt={challenge.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 flex space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficulty}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(challenge.status)}`}>
                    {challenge.status}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                  <div className="flex items-center space-x-1 text-xs font-semibold text-green-600">
                    <Star className="w-3 h-3" />
                    <span>{challenge.points}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                  {challenge.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {challenge.description}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1 text-gray-500">
                      <Users className="w-4 h-4" />
                      <span>{challenge.participants.toLocaleString()} participants</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{challenge.duration}</span>
                    </div>
                  </div>

                  {challenge.progress !== undefined && (
                    <div>
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{challenge.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${challenge.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                {challenge.status === 'active' && (
                  <div className="mt-4 flex items-center justify-center bg-green-50 text-green-700 py-2 rounded-lg">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">Join Now</span>
                  </div>
                )}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {filteredChallenges.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-6xl mb-4">🎯</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No challenges found</h3>
          <p className="text-gray-600">Try adjusting your filters or search terms</p>
        </motion.div>
      )}
    </div>
  )
}

export default Challenges
