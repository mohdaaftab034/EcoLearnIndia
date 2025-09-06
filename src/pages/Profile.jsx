
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Trophy, Star, Calendar, MapPin, School, Edit3, Award, Target, TrendingUp, Leaf, Droplets, Zap, Recycle } from 'lucide-react'
import { useStore } from '../store/useStore'

const Profile = () => {
  const { user, lessons, challenges, badges } = useStore()
  const [selectedTab, setSelectedTab] = useState('overview')

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'achievements', name: 'Achievements', icon: '🏆' },
    { id: 'progress', name: 'Progress', icon: '📈' },
    { id: 'impact', name: 'Impact', icon: '🌍' },
  ]

  const completedLessons = lessons.filter(lesson => lesson.completed)
  const activeChallenges = challenges.filter(challenge => challenge.status === 'active')

  const stats = [
    { label: 'Total Points', value: user?.points || 0, icon: Star, color: 'text-yellow-600', bg: 'bg-yellow-100' },
    { label: 'Current Level', value: user?.level || 0, icon: Trophy, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Day Streak', value: user?.streak || 0, icon: Calendar, color: 'text-orange-600', bg: 'bg-orange-100' },
    { label: 'Badges Earned', value: user?.badges?.length || 0, icon: Award, color: 'text-green-600', bg: 'bg-green-100' },
  ]

  const impactMetrics = [
    {
      label: 'Trees Planted',
      value: 47,
      unit: 'trees',
      icon: Leaf,
      color: 'text-green-600',
      bg: 'bg-green-100',
      description: 'Contributing to carbon absorption and oxygen production'
    },
    {
      label: 'Water Saved',
      value: 2840,
      unit: 'liters',
      icon: Droplets,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
      description: 'Through conservation practices and awareness'
    },
    {
      label: 'Energy Saved',
      value: 156,
      unit: 'kWh',
      icon: Zap,
      color: 'text-yellow-600',
      bg: 'bg-yellow-100',
      description: 'By promoting renewable energy usage'
    },
    {
      label: 'Waste Reduced',
      value: 23,
      unit: 'kg',
      icon: Recycle,
      color: 'text-purple-600',
      bg: 'bg-purple-100',
      description: 'Through recycling and waste management initiatives'
    },
  ]

  const recentAchievements = [
    {
      id: '1',
      title: 'Climate Champion',
      description: 'Completed 5 climate-related lessons',
      icon: '🌍',
      date: '2024-01-15',
      points: 100,
      rarity: 'common'
    },
    {
      id: '2',
      title: 'Tree Hugger',
      description: 'Planted 50 trees',
      icon: '🌳',
      date: '2024-01-10',
      points: 200,
      rarity: 'rare'
    },
    {
      id: '3',
      title: 'Water Warrior',
      description: 'Saved 1000 liters of water',
      icon: '💧',
      date: '2024-01-05',
      points: 150,
      rarity: 'epic'
    }
  ]

  const learningProgress = [
    { category: 'Climate Change', completed: 5, total: 8, percentage: 62 },
    { category: 'Water Conservation', completed: 3, total: 6, percentage: 50 },
    { category: 'Renewable Energy', completed: 2, total: 5, percentage: 40 },
    { category: 'Biodiversity', completed: 1, total: 4, percentage: 25 },
  ]

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'border-gray-300 bg-gray-50'
      case 'rare': return 'border-blue-300 bg-blue-50'
      case 'epic': return 'border-purple-300 bg-purple-50'
      case 'legendary': return 'border-yellow-300 bg-yellow-50'
      default: return 'border-gray-300 bg-gray-50'
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 mb-8 text-white"
      >
        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
          <div className="relative">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-32 h-32 rounded-full border-4 border-white/30"
            />
            <button className="absolute bottom-2 right-2 bg-white text-green-600 p-2 rounded-full hover:bg-green-50 transition-colors">
              <Edit3 className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">{user?.name}</h1>
            <div className="space-y-2 text-green-100">
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <School className="w-4 h-4" />
                <span>{user?.school}</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <User className="w-4 h-4" />
                <span>Grade {user?.grade}</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Mumbai, Maharashtra</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold">{user?.points}</div>
              <div className="text-green-100 text-sm">Total Points</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold">#{8}</div>
              <div className="text-green-100 text-sm">Global Rank</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-white rounded-2xl shadow-lg p-6 mb-8"
      >
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedTab === tab.id
                  ? 'bg-green-100 text-green-700 border-2 border-green-300'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Tab Content */}
      {selectedTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stats Cards */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white rounded-xl shadow-lg p-6">
                  <div className={`w-12 h-12 ${stat.bg} rounded-lg flex items-center justify-center mb-4`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">Learning Progress</h2>
              <div className="space-y-4">
                {learningProgress.map((progress) => (
                  <div key={progress.category}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">{progress.category}</span>
                      <span className="text-sm text-gray-600">
                        {progress.completed}/{progress.total} lessons
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-green-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${progress.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Achievements */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="font-bold text-gray-900 mb-4">Recent Achievements</h3>
              <div className="space-y-3">
                {recentAchievements.slice(0, 3).map((achievement) => (
                  <div key={achievement.id} className="flex items-start space-x-3">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">{achievement.title}</h4>
                      <p className="text-xs text-gray-600">{achievement.description}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-500">{achievement.date}</span>
                        <span className="text-xs font-semibold text-green-600">+{achievement.points} pts</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                  <Target className="w-5 h-5" />
                  <span>Continue Learning</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                  <Trophy className="w-5 h-5" />
                  <span>Join Challenge</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
                  <Edit3 className="w-5 h-5" />
                  <span>Edit Profile</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {selectedTab === 'achievements' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`bg-white rounded-2xl shadow-lg p-6 border-2 ${getRarityColor(badge.rarity)}`}
            >
              <div className="text-center">
                <div className="text-4xl mb-4">{badge.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{badge.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{badge.description}</p>
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge.rarity === 'common' ? 'bg-gray-100 text-gray-700' :
                      badge.rarity === 'rare' ? 'bg-blue-100 text-blue-700' :
                        badge.rarity === 'epic' ? 'bg-purple-100 text-purple-700' :
                          'bg-yellow-100 text-yellow-700'
                    }`}>
                    {badge.rarity}
                  </span>
                  {badge.earnedAt && (
                    <span className="text-xs text-gray-500">
                      {new Date(badge.earnedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {selectedTab === 'progress' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Learning Categories</h2>
            <div className="space-y-6">
              {learningProgress.map((progress) => (
                <div key={progress.category}>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium text-gray-900">{progress.category}</h3>
                    <span className="text-sm text-gray-600">{progress.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-4 rounded-full transition-all duration-500"
                      style={{ width: `${progress.percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{progress.completed} completed</span>
                    <span>{progress.total - progress.completed} remaining</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Monthly Progress</h2>
            <div className="space-y-4">
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-green-900">This Month</span>
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-green-700 mb-1">+450 points</div>
                <div className="text-sm text-green-600">3 lessons completed, 2 challenges joined</div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-blue-900">Last Month</span>
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-blue-700 mb-1">+380 points</div>
                <div className="text-sm text-blue-600">2 lessons completed, 1 challenge completed</div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {selectedTab === 'impact' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {impactMetrics.map((metric) => (
            <div key={metric.label} className="bg-white rounded-2xl shadow-lg p-8">
              <div className={`w-16 h-16 ${metric.bg} rounded-2xl flex items-center justify-center mb-6`}>
                <metric.icon className={`w-8 h-8 ${metric.color}`} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {metric.value} <span className="text-lg font-normal text-gray-600">{metric.unit}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{metric.label}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{metric.description}</p>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  )
}

export default Profile
