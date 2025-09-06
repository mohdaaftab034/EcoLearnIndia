
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Sparkles, Bot, Share2, Calendar, Gamepad2, GraduationCap, MapPin, Brain, Trophy, Users2, Globe, Zap } from 'lucide-react'
import SeasonalChallenges from '../components/SeasonalChallenges'
import VirtualSimulation from '../components/VirtualSimulation'
import SocialShare from '../components/SocialShare'
import AIMentor from '../components/AIMentor'
import TeacherHub from '../components/TeacherHub'
import LocationAwareLearning from '../components/LocationAwareLearning'
import EnhancedAIMentor from '../components/EnhancedAIMentor'
import GamifiedLearning from '../components/GamifiedLearning'
import LanguageSwitcher from '../components/LanguageSwitcher'

const AdvancedFeatures = () => {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState('location-aware')
  const [showShareModal, setShowShareModal] = useState(false)

  const tabs = [
    {
      id: 'location-aware',
      name: 'Location-Aware Learning',
      icon: <MapPin className="w-5 h-5" />,
      description: 'Personalized challenges based on your location & season',
      component: LocationAwareLearning
    },
    {
      id: 'ai-mentor',
      name: 'AI-Powered Guidance',
      icon: <Brain className="w-5 h-5" />,
      description: 'Intelligent environmental mentor & assistant',
      component: EnhancedAIMentor
    },
    {
      id: 'gamified',
      name: 'Gamified Learning',
      icon: <Trophy className="w-5 h-5" />,
      description: 'Quests, achievements & interactive challenges',
      component: GamifiedLearning
    },
    {
      id: 'seasonal',
      name: 'Seasonal Challenges',
      icon: <Calendar className="w-5 h-5" />,
      description: 'Weather & season-based eco tasks',
      component: SeasonalChallenges
    },
    {
      id: 'simulation',
      name: 'Virtual Simulations',
      icon: <Gamepad2 className="w-5 h-5" />,
      description: 'Interactive eco-city management games',
      component: VirtualSimulation
    },
    {
      id: 'teacher-hub',
      name: 'Teacher Resources',
      icon: <GraduationCap className="w-5 h-5" />,
      description: 'Educational materials & lesson plans',
      component: TeacherHub
    }
  ]

  const sampleAchievement = {
    type: 'badge',
    title: 'Advanced Eco Champion',
    description: 'Mastered all advanced features and completed 50+ environmental challenges!',
    points: 1000,
    badge: '🏆'
  };



  const renderActiveComponent = () => {
    const activeTabData = tabs.find(tab => tab.id === activeTab)
    if (activeTabData && activeTabData.component) {
      const Component = activeTabData.component
      return <Component />
    }
    return <LocationAwareLearning />
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
        <div className="flex items-center justify-center mb-4">
          <Sparkles className="w-8 h-8 text-green-600 mr-3" />
          <h1 className="text-4xl font-bold text-gray-900">Advanced Environmental Learning</h1>
          <Sparkles className="w-8 h-8 text-green-600 ml-3" />
        </div>
        <p className="text-lg text-gray-600 max-w-4xl mx-auto mb-6">
          Experience next-generation environmental education with AI-powered guidance,
          location-aware challenges, gamified learning, and comprehensive teacher resources.
        </p>

        <div className="flex items-center justify-center space-x-4">
          <LanguageSwitcher />
          <button
            onClick={() => setShowShareModal(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-lg"
          >
            <Share2 className="w-5 h-5" />
            <span>Share Achievement</span>
          </button>
        </div>
      </motion.div>

      {/* Feature Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-8"
      >
        <div className="bg-white rounded-2xl shadow-lg p-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`p-4 rounded-xl text-left transition-all duration-300 ${activeTab === tab.id
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg transform scale-105'
                    : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100 hover:border-green-200'
                  }`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <div className={`p-2 rounded-lg ${activeTab === tab.id ? 'bg-white bg-opacity-20' : 'bg-gray-200'
                    }`}>
                    <div className={activeTab === tab.id ? 'text-white' : 'text-gray-600'}>
                      {tab.icon}
                    </div>
                  </div>
                  <h3 className={`font-bold ${activeTab === tab.id ? 'text-white' : 'text-gray-900'
                    }`}>
                    {tab.name}
                  </h3>
                </div>
                <p className={`text-sm ${activeTab === tab.id ? 'text-green-100' : 'text-gray-600'
                  }`}>
                  {tab.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Active Component */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        {renderActiveComponent()}
      </motion.div>

      {/* Feature Highlights Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Why Choose Our Advanced Platform?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
            <div className="text-3xl mb-3">🌍</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Location-Aware Learning</h3>
            <p className="text-gray-600 text-sm">
              Challenges automatically adapt to your local climate, season, and environmental conditions with real-time weather integration.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
            <div className="text-3xl mb-3">🤖</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">AI-Powered Guidance</h3>
            <p className="text-gray-600 text-sm">
              Multiple AI personalities provide personalized environmental advice and instant answers to sustainability questions.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
            <div className="text-3xl mb-3">🎮</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Gamified Learning</h3>
            <p className="text-gray-600 text-sm">
              Complete quests, unlock achievements, and compete on leaderboards while learning about sustainability.
            </p>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-100">
            <div className="text-3xl mb-3">🌐</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Multilingual Support</h3>
            <p className="text-gray-600 text-sm">
              Access content in 8+ Indian languages to make environmental education inclusive for all communities.
            </p>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 border border-red-100">
            <div className="text-3xl mb-3">📱</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Social Integration</h3>
            <p className="text-gray-600 text-sm">
              Share achievements across platforms and inspire others to join the environmental movement with customizable templates.
            </p>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
            <div className="text-3xl mb-3">👩‍🏫</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Teacher Resources</h3>
            <p className="text-gray-600 text-sm">
              Comprehensive lesson plans, activities, and downloadable materials to bring environmental education to classrooms.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Impact Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-8 text-white text-center"
      >
        <h2 className="text-3xl font-bold mb-6">Platform Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <div className="text-4xl font-bold mb-2">50,000+</div>
            <div className="text-green-100">Active Students</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">2,500+</div>
            <div className="text-green-100">Schools Connected</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">1M+</div>
            <div className="text-green-100">Trees Planted</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">28</div>
            <div className="text-green-100">States Covered</div>
          </div>
        </div>
      </motion.div>

      {/* Social Share Modal */}
      {showShareModal && (
        <SocialShare
          achievement={sampleAchievement}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </div>
  )
}

export default AdvancedFeatures
