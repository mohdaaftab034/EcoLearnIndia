import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, Clock, Star, Search, CheckCircle, Play, Target } from 'lucide-react'
import { useStore } from '../store/useStore'

const Lessons = () => {
  const { lessons } = useStore()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = [
    { id: 'all', name: 'All Topics', icon: '🌍' },
    { id: 'Climate', name: 'Climate Change', icon: '🌡️' },
    { id: 'Water', name: 'Water Conservation', icon: '💧' },
    { id: 'Energy', name: 'Renewable Energy', icon: '⚡' },
    { id: 'Wildlife', name: 'Biodiversity', icon: '🦋' },
  ]

  const difficulties = [
    { id: 'all', name: 'All Levels' },
    { id: 'beginner', name: 'Beginner' },
    { id: 'intermediate', name: 'Intermediate' },
    { id: 'advanced', name: 'Advanced' },
  ]

  const filteredLessons = lessons.filter((lesson) => {
    const matchesCategory = selectedCategory === 'all' || lesson.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === 'all' || lesson.difficulty === selectedDifficulty
    const matchesSearch =
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesDifficulty && matchesSearch
  })

  const completedCount = lessons.filter((lesson) => lesson.completed).length
  const totalPoints = lessons.reduce((sum, lesson) => (lesson.completed ? sum + lesson.points : sum), 0)

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-700'
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-700'
      case 'advanced':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Environmental Learning Hub 📚</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover interactive lessons designed to make environmental education engaging and practical
        </p>

        {/* Stats */}
        <div className="flex justify-center space-x-8 mt-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{completedCount}</div>
            <div className="text-sm text-gray-500">Lessons Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{totalPoints}</div>
            <div className="text-sm text-gray-500">Points Earned</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {Math.round((completedCount / lessons.length) * 100)}%
            </div>
            <div className="text-sm text-gray-500">Progress</div>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-white rounded-2xl shadow-lg p-6 mb-8"
      >
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search lessons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        {/* Category Filter */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
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

        {/* Difficulty Filter */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Difficulty Level</h3>
          <div className="flex flex-wrap gap-2">
            {difficulties.map((difficulty) => (
              <button
                key={difficulty.id}
                onClick={() => setSelectedDifficulty(difficulty.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedDifficulty === difficulty.id
                    ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {difficulty.name}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons.map((lesson, index) => (
          <motion.div
            key={lesson.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 * index }}
          >
            <Link
              to={`/lessons/${lesson.id}`}
              className="block bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className="relative">
                <img
                  src={lesson.image}
                  alt={lesson.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(
                      lesson.difficulty
                    )}`}
                  >
                    {lesson.difficulty}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  {lesson.completed ? (
                    <CheckCircle className="w-6 h-6 text-green-500 bg-white rounded-full" />
                  ) : (
                    <Play className="w-6 h-6 text-white bg-green-500 rounded-full p-1" />
                  )}
                </div>
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                  <div className="flex items-center space-x-1 text-xs font-semibold text-green-600">
                    <Star className="w-3 h-3" />
                    <span>{lesson.points}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                  {lesson.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{lesson.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{lesson.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{lesson.category}</span>
                  </div>
                </div>

                {lesson.sdgGoals && lesson.sdgGoals.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-blue-500" />
                      <span className="text-xs font-medium text-gray-700">SDG Goals:</span>
                      <div className="flex space-x-1">
                        {lesson.sdgGoals.map((goal) => (
                          <span
                            key={goal}
                            className="inline-block w-6 h-6 bg-blue-100 text-blue-700 text-xs font-bold rounded-full flex items-center justify-center"
                          >
                            {goal}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {lesson.completed && (
                  <div className="mt-4 flex items-center space-x-2 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Completed</span>
                  </div>
                )}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {filteredLessons.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No lessons found</h3>
          <p className="text-gray-600">Try adjusting your filters or search terms</p>
        </motion.div>
      )}
    </div>
  )
}

export default Lessons
