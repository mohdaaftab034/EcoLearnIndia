import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  Menu,
  X,
  Leaf,
  Camera,
  Upload,
  Handshake,
  Newspaper,
  Users,
  Brain,
  BarChart3,
  Sparkles,
  User2,
  LogOut
} from 'lucide-react'
import LanguageSwitcher from './LanguageSwitcher'
import { useStore } from '../store/useStore'

const Header = () => {
  const { t } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const { user } = useStore()
  const [open, setOpen] = useState(false);

  const mainNavItems = [
    { path: '/', label: t('dashboard'), icon: '🏠' },
    { path: '/lessons', label: t('lessons'), icon: '📚' },
    { path: '/challenges', label: t('challenges'), icon: '🏆' },
    { path: '/leaderboard', label: t('leaderboard'), icon: '🥇' },
    { path: '/community', label: t('community'), icon: '👥' },
    {path:'/teacher-signup', label: t('TeacherSignup'), icon: '👩‍🏫'}
  ]

  const advancedFeatures = [
    { path: '/advanced', label: 'Advanced Features', icon: Sparkles },
    { path: '/ar-scanner', label: 'AR Scanner', icon: Camera },
    { path: '/activities', label: 'Real Activities', icon: Upload },
    { path: '/partnerships', label: 'Partnerships', icon: Handshake },
    { path: '/news', label: 'News', icon: Newspaper },
    { path: '/eco-clubs', label: 'Eco Clubs', icon: Users },
    { path: '/recommendations', label: 'AI Recommendations', icon: Brain },
    { path: '/dashboard/parent-teacher', label: 'Progress Dashboard', icon: BarChart3 }
  ]

  const isActive = (path) => location.pathname === path

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">EcoLearn India</h1>
              <p className="text-xs text-gray-500">Environmental Education Platform</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {mainNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive(item.path)
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                  }`}
              >
                <span className="mr-1">{item.icon}</span>
                {item.label}
              </Link>
            ))}

            {/* Advanced Features Dropdown */}
            <div className="relative group">
              <button className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors">
                <span className="mr-1">🚀</span>
                Advanced Features
              </button>

              <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="p-2">
                  {advancedFeatures.map((feature) => (
                    <Link
                      key={feature.path}
                      to={feature.path}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors ${isActive(feature.path)
                          ? 'bg-green-100 text-green-700'
                          : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                        }`}
                    >
                      <feature.icon className="w-4 h-4" />
                      <span>{feature.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* User Profile & Language Switcher */}
          {open && <div className='absolute flex flex-col items-start justify-center mt-[150px] right-40 bg-white w-40 h-20 shadow-md rounded-lg gap-2 '>
            <button className='flex cursor-pointer gap-2 ml-3 font-medium justify-center items-center'><User2 className='h-4 w-4'/> Profile</button>
            <button className='flex cursor-pointer gap-2 ml-3 font-medium justify-center items-center'><LogOut className='h-4 w-4'/> Logout</button>
          </div>}

          <div className="hidden cursor-pointer lg:flex items-center space-x-4">
            <LanguageSwitcher />
            
            <div  className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.points} {t('points')} • {t('level')} {user?.level}</p>
              </div>
              <Link>
                <img onClick={()=> setOpen(previous => !previous)} 
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-10 h-10 rounded-full border-2 border-green-300"
                />
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-green-600 hover:bg-green-50"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden bg-white border-t border-gray-200"
        >
          <div className="px-4 py-4 space-y-2">
            {/* Language Switcher */}
            <div className="pb-4 border-b border-gray-200">
              <LanguageSwitcher />
            </div>

            {/* Main Navigation */}
            <div className="space-y-1">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Main
              </h3>
              {mainNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive(item.path)
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                    }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>

            {/* Advanced Features */}
            <div className="space-y-1 pt-4 border-t border-gray-200">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Advanced Features
              </h3>
              {advancedFeatures.map((feature) => (
                <Link
                  key={feature.path}
                  to={feature.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive(feature.path)
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                    }`}
                >
                  <feature.icon className="w-4 h-4" />
                  <span>{feature.label}</span>
                </Link>
              ))}
            </div>

            {/* Mobile User Profile */}
            <div className="pt-4 border-t border-gray-200">
              <Link
                to="/profile"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-green-600 hover:bg-green-50"
              >
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-8 h-8 rounded-full border-2 border-green-300"
                />
                <div>
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-xs text-gray-500">
                    {user?.points} {t('points')} • {t('level')} {user?.level}
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  )
}

export default Header
