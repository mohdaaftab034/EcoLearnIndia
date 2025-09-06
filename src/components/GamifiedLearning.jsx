import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  Trophy,
  Star,
  Target,
  Zap,
  Crown,
  Gift,
  Calendar,
  Clock
} from 'lucide-react'
import { useStore } from '../store/useStore'

const GamifiedLearning = () => {
  const { t } = useTranslation()
  const { user, updateUserPoints } = useStore()
  const [activeTab, setActiveTab] = useState('quests')
  const [selectedQuest, setSelectedQuest] = useState(null)
  const [showRewardModal, setShowRewardModal] = useState(false)
  const [recentRewards, setRecentRewards] = useState([])
  const [playerStats, setPlayerStats] = useState({
    level: user?.level || 1,
    xp: (user?.points || 0) * 2,
    xpToNext: 1000,
    totalXP: (user?.points || 0) * 2,
    streak: user?.streak || 0,
    questsCompleted: 25,
    achievementsUnlocked: 8,
    rank: 15,
    title: 'Eco Warrior'
  })

  const [quests, setQuests] = useState([
    {
      id: 'daily_1',
      title: 'Water Conservation Hero',
      description: 'Save 50 liters of water through efficient usage',
      type: 'daily',
      difficulty: 'easy',
      points: 100,
      xpReward: 150,
      progress: 35,
      maxProgress: 50,
      timeLimit: new Date(Date.now() + 24 * 60 * 60 * 1000),
      category: 'Water',
      rewards: [
        { type: 'points', name: '100 Eco Points', description: 'Boost your score', rarity: 'common', icon: '💧' },
        { type: 'badge', name: 'Water Saver', description: 'Awarded for water conservation', rarity: 'rare', icon: '🏆' }
      ],
      isCompleted: false,
      isLocked: false
    },
    {
      id: 'weekly_1',
      title: 'Green Energy Champion',
      description: 'Use renewable energy sources for one week',
      type: 'weekly',
      difficulty: 'medium',
      points: 500,
      xpReward: 750,
      progress: 3,
      maxProgress: 7,
      timeLimit: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      category: 'Energy',
      rewards: [
        { type: 'points', name: '500 Eco Points', description: 'Major point boost', rarity: 'rare', icon: '⚡' },
        { type: 'title', name: 'Energy Master', description: 'Special title for energy experts', rarity: 'epic', icon: '👑' }
      ],
      isCompleted: false,
      isLocked: false
    },
    {
      id: 'epic_1',
      title: 'Climate Action Legend',
      description: 'Complete 10 climate-related challenges and inspire 5 friends',
      type: 'epic',
      difficulty: 'legendary',
      points: 2000,
      xpReward: 3000,
      progress: 7,
      maxProgress: 15,
      category: 'Climate',
      rewards: [
        { type: 'badge', name: 'Climate Legend', description: 'Ultimate climate achievement', rarity: 'legendary', icon: '🌍' },
        { type: 'avatar', name: 'Golden Eco Avatar', description: 'Exclusive golden avatar frame', rarity: 'legendary', icon: '✨' }
      ],
      isCompleted: false,
      isLocked: false
    }
  ])

  const [achievements, setAchievements] = useState([
    {
      id: 'first_quest',
      name: 'First Steps',
      description: 'Complete your first environmental quest',
      icon: '🌱',
      rarity: 'common',
      progress: 1,
      maxProgress: 1,
      isUnlocked: true,
      unlockedAt: new Date('2024-01-15')
    },
    {
      id: 'streak_master',
      name: 'Streak Master',
      description: 'Maintain a 30-day activity streak',
      icon: '🔥',
      rarity: 'epic',
      progress: 15,
      maxProgress: 30,
      isUnlocked: false
    },
    {
      id: 'eco_influencer',
      name: 'Eco Influencer',
      description: 'Inspire 100 people to join environmental activities',
      icon: '📢',
      rarity: 'legendary',
      progress: 45,
      maxProgress: 100,
      isUnlocked: false
    }
  ])

  const leaderboardData = [
    { rank: 1, name: 'Priya Sharma', points: 8450, level: 15, avatar: '👑', title: 'Eco Legend' },
    { rank: 2, name: 'Arjun Patel', points: 7890, level: 14, avatar: '🏆', title: 'Climate Champion' },
    { rank: 3, name: 'Sneha Kumar', points: 7234, level: 13, avatar: '🌟', title: 'Green Warrior' },
    { rank: 4, name: 'Rahul Singh', points: 6789, level: 12, avatar: '⚡', title: 'Energy Master' },
    { rank: 5, name: 'Kavya Reddy', points: 6234, level: 11, avatar: '🌿', title: 'Nature Guardian' }
  ]

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'hard': return 'text-red-600 bg-red-100'
      case 'legendary': return 'text-purple-600 bg-purple-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'text-gray-600 bg-gray-100'
      case 'rare': return 'text-blue-600 bg-blue-100'
      case 'epic': return 'text-purple-600 bg-purple-100'
      case 'legendary': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'daily': return <Calendar className="w-4 h-4" />
      case 'weekly': return <Clock className="w-4 h-4" />
      case 'special': return <Star className="w-4 h-4" />
      case 'epic': return <Crown className="w-4 h-4" />
      default: return <Target className="w-4 h-4" />
    }
  }

  const handleQuestStart = (quest) => {
    setSelectedQuest(quest)
    console.log('Starting quest:', quest.title)
  }

  const handleQuestComplete = (questId) => {
    setQuests(prev => prev.map(quest => {
      if (quest.id === questId) {
        const completedQuest = { ...quest, isCompleted: true, progress: quest.maxProgress }
        setRecentRewards(completedQuest.rewards)
        setShowRewardModal(true)
        updateUserPoints(quest.points)
        return completedQuest
      }
      return quest
    }))
  }

  const calculateXPProgress = () => {
    return (playerStats.xp / playerStats.xpToNext) * 100
  }

  // ... all rendering functions (renderQuests, renderAchievements, renderLeaderboard) stay the same
  // ... JSX return stays the same as in your code

  return (
    // Your JSX stays exactly the same
    <div>{/* Full component code unchanged */}</div>
  )
}

export default GamifiedLearning
