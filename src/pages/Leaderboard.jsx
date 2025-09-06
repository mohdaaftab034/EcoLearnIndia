
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {Trophy, Medal, Crown, Star, TrendingUp, Users, School, MapPin, Filter} from 'lucide-react'
import { useStore } from '../store/useStore'

const Leaderboard = () => {
  const { user } = useStore()
  const [selectedTab, setSelectedTab] = useState('individual')
  const [selectedRegion, setSelectedRegion] = useState('all')

  const tabs = [
    { id: 'individual', name: 'Individual', icon: '👤' },
    { id: 'school', name: 'Schools', icon: '🏫' },
    { id: 'regional', name: 'Regional', icon: '🌍' },
  ]

  const regions = [
    { id: 'all', name: 'All India' },
    { id: 'north', name: 'North India' },
    { id: 'south', name: 'South India' },
    { id: 'east', name: 'East India' },
    { id: 'west', name: 'West India' },
  ]

  const individualLeaders = [
    {
      id: '1',
      name: 'Priya Sharma',
      school: 'Delhi Public School, Mumbai',
      points: 4250,
      level: 12,
      badges: 15,
      streak: 45,
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rank: 1,
      change: 0
    },
    {
      id: '2',
      name: 'Rahul Verma',
      school: 'Kendriya Vidyalaya, Delhi',
      points: 3980,
      level: 11,
      badges: 12,
      streak: 38,
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rank: 2,
      change: 1
    },
    {
      id: '3',
      name: 'Ananya Patel',
      school: 'DAV Public School, Bangalore',
      points: 3750,
      level: 10,
      badges: 14,
      streak: 32,
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rank: 3,
      change: -1
    },
    {
      id: '4',
      name: user?.name || 'Arjun Sharma',
      school: user?.school || 'Delhi Public School, Mumbai',
      points: user?.points || 2450,
      level: user?.level || 8,
      badges: user?.badges?.length || 8,
      streak: user?.streak || 12,
      avatar: user?.avatar || 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rank: 8,
      change: 2,
      isCurrentUser: true
    }
  ]

  const schoolLeaders = [
    {
      id: '1',
      name: 'Delhi Public School, Mumbai',
      students: 1247,
      totalPoints: 125840,
      avgPoints: 101,
      location: 'Mumbai, Maharashtra',
      rank: 1,
      change: 0
    },
    {
      id: '2',
      name: 'Kendriya Vidyalaya, Delhi',
      students: 980,
      totalPoints: 98750,
      avgPoints: 101,
      location: 'New Delhi',
      rank: 2,
      change: 1
    },
    {
      id: '3',
      name: 'DAV Public School, Bangalore',
      students: 856,
      totalPoints: 87650,
      avgPoints: 102,
      location: 'Bangalore, Karnataka',
      rank: 3,
      change: -1
    }
  ]

  const regionalLeaders = [
    {
      id: '1',
      name: 'Maharashtra',
      schools: 245,
      students: 45678,
      totalPoints: 2456780,
      avgPoints: 54,
      rank: 1,
      change: 0
    },
    {
      id: '2',
      name: 'Karnataka',
      schools: 198,
      students: 38924,
      totalPoints: 2234560,
      avgPoints: 57,
      rank: 2,
      change: 1
    },
    {
      id: '3',
      name: 'Tamil Nadu',
      schools: 167,
      students: 34567,
      totalPoints: 1987650,
      avgPoints: 57,
      rank: 3,
      change: -1
    }
  ]

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-500" />
      case 2: return <Medal className="w-6 h-6 text-gray-400" />
      case 3: return <Medal className="w-6 h-6 text-amber-600" />
      default: return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-500">#{rank}</span>
    }
  }

  const getChangeIcon = (change) => {
    if (change > 0) return <TrendingUp className="w-4 h-4 text-green-500" />
    if (change < 0) return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />
    return <span className="w-4 h-4 text-gray-400">—</span>
  }

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
          Leaderboard 🏆
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          See how you and your school rank among environmental champions across India
        </p>
      </motion.div>

      {/* Current User Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 mb-8 text-white"
      >
        <div className="flex items-center space-x-4">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-16 h-16 rounded-full border-4 border-white/30"
          />
          <div className="flex-1">
            <h2 className="text-xl font-bold">{user?.name}</h2>
            <p className="text-green-100">{user?.school}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{user?.points}</div>
            <div className="text-green-100 text-sm">points</div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">#{8}</div>
            <div className="text-green-100 text-sm">rank</div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/20">
          <div className="text-center">
            <div className="text-lg font-bold">{user?.level}</div>
            <div className="text-green-100 text-sm">Level</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold">{user?.badges?.length || 0}</div>
            <div className="text-green-100 text-sm">Badges</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold">{user?.streak}</div>
            <div className="text-green-100 text-sm">Day Streak</div>
          </div>
        </div>
      </motion.div>

      {/* Tabs and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white rounded-2xl shadow-lg p-6 mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  selectedTab === tab.id
                    ? 'bg-white text-green-700 shadow-sm'
                    : 'text-gray-600 hover:text-green-600'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </div>

          {/* Region Filter */}
          <div className="flex items-center space-x-3">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {regions.map((region) => (
                <option key={region.id} value={region.id}>
                  {region.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Leaderboard Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden"
      >
        {selectedTab === 'individual' && (
          <div className="divide-y divide-gray-100">
            {individualLeaders.map((leader, index) => (
              <div
                key={leader.id}
                className={`p-6 hover:bg-gray-50 transition-colors ${
                  leader.isCurrentUser ? 'bg-green-50 border-l-4 border-green-500' : ''
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3">
                    {getRankIcon(leader.rank)}
                    <img
                      src={leader.avatar}
                      alt={leader.name}
                      className="w-12 h-12 rounded-full"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className={`font-semibold ${leader.isCurrentUser ? 'text-green-700' : 'text-gray-900'}`}>
                      {leader.name}
                      {leader.isCurrentUser && <span className="ml-2 text-sm text-green-600">(You)</span>}
                    </h3>
                    <p className="text-sm text-gray-600">{leader.school}</p>
                  </div>

                  <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">{leader.level}</div>
                      <div>Level</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">{leader.badges}</div>
                      <div>Badges</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">{leader.streak}</div>
                      <div>Streak</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">{leader.points.toLocaleString()}</div>
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      {getChangeIcon(leader.change)}
                      <span>points</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedTab === 'school' && (
          <div className="divide-y divide-gray-100">
            {schoolLeaders.map((school) => (
              <div key={school.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3">
                    {getRankIcon(school.rank)}
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <School className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{school.name}</h3>
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <MapPin className="w-3 h-3" />
                      <span>{school.location}</span>
                    </div>
                  </div>

                  <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">{school.students}</div>
                      <div>Students</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">{school.avgPoints}</div>
                      <div>Avg Points</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">{school.totalPoints.toLocaleString()}</div>
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      {getChangeIcon(school.change)}
                      <span>total points</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedTab === 'regional' && (
          <div className="divide-y divide-gray-100">
            {regionalLeaders.map((region) => (
              <div key={region.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3">
                    {getRankIcon(region.rank)}
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{region.name}</h3>
                    <p className="text-sm text-gray-600">{region.schools} schools participating</p>
                  </div>

                  <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">{region.students.toLocaleString()}</div>
                      <div>Students</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">{region.avgPoints}</div>
                      <div>Avg Points</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">{region.totalPoints.toLocaleString()}</div>
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      {getChangeIcon(region.change)}
                      <span>total points</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default Leaderboard
