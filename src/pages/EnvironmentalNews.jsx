import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Eye, Heart, Share2, Search, BookOpen } from 'lucide-react'
import toast from 'react-hot-toast'
// import { lumi } from '../lib/lumi'

const EnvironmentalNews = () => {
  const [news, setNews] = useState([])
  const [filteredNews, setFilteredNews] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedRegion, setSelectedRegion] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  const categories = [
    { id: 'all', name: 'All News', icon: '📰', color: 'gray' },
    { id: 'climate_change', name: 'Climate Change', icon: '🌡️', color: 'red' },
    { id: 'biodiversity', name: 'Biodiversity', icon: '🦋', color: 'green' },
    { id: 'pollution', name: 'Pollution', icon: '🏭', color: 'orange' },
    { id: 'renewable_energy', name: 'Renewable Energy', icon: '⚡', color: 'yellow' },
    { id: 'conservation', name: 'Conservation', icon: '🌳', color: 'emerald' },
    { id: 'policy', name: 'Policy', icon: '📋', color: 'blue' },
    { id: 'technology', name: 'Technology', icon: '💡', color: 'purple' }
  ]

  const regions = [
    { id: 'all', name: 'All Regions' },
    { id: 'global', name: 'Global' },
    { id: 'india', name: 'India' },
    { id: 'north_india', name: 'North India' },
    { id: 'south_india', name: 'South India' },
    { id: 'east_india', name: 'East India' },
    { id: 'west_india', name: 'West India' }
  ]

  useEffect(() => {
    fetchNews()
  }, [])

  useEffect(() => {
    filterNews()
  }, [news, selectedCategory, selectedRegion, searchTerm])

  const fetchNews = async () => {
    try {
      setLoading(true)
      const { list } = await lumi.entities.environmental_news.list({
        filter: { status: 'published' },
        sort: { published_at: -1 }
      })
      setNews(list || [])
    } catch (error) {
      console.error('Failed to fetch news:', error)
      toast.error('Failed to load news')
    } finally {
      setLoading(false)
    }
  }

  const filterNews = () => {
    let filtered = news

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article => article.category === selectedCategory)
    }

    if (selectedRegion !== 'all') {
      filtered = filtered.filter(article => article.region === selectedRegion)
    }

    if (searchTerm) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.summary?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    setFilteredNews(filtered)
  }

  const handleEngagement = async (articleId, action) => {
    try {
      const updatedNews = news.map(article => {
        if (article._id === articleId) {
          const stats = { ...article.engagement_stats }
          if (action === 'view') stats.views = (stats.views || 0) + 1
          if (action === 'like') stats.likes = (stats.likes || 0) + 1
          if (action === 'share') stats.shares = (stats.shares || 0) + 1
          return { ...article, engagement_stats: stats }
        }
        return article
      })
      setNews(updatedNews)

      if (action === 'like') toast.success('Article liked!')
      if (action === 'share') toast.success('Article shared!')
    } catch (error) {
      toast.error('Action failed')
    }
  }

  const getCategoryInfo = category => {
    return categories.find(c => c.id === category) || categories[0]
  }

  const getDifficultyColor = level => {
    switch (level) {
      case 'elementary': return 'bg-green-100 text-green-700'
      case 'middle': return 'bg-yellow-100 text-yellow-700'
      case 'high': return 'bg-orange-100 text-orange-700'
      case 'adult': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading environmental news...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Environmental News Hub 📰
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Stay updated with the latest environmental news, climate stories, and conservation updates from around the world
        </p>
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
            placeholder="Search news articles..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        {/* Category Filter */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
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

        {/* Region Filter */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Region</h3>
          <div className="flex flex-wrap gap-2">
            {regions.map(region => (
              <button
                key={region.id}
                onClick={() => setSelectedRegion(region.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedRegion === region.id
                    ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {region.name}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* News Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.map((article, index) => {
          const categoryInfo = getCategoryInfo(article.category)
          return (
            <motion.div
              key={article._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer"
              onClick={() => handleEngagement(article._id, 'view')}
            >
              <div className="relative">
                <img
                  src={article.image_url || 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400'}
                  alt={article.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    categoryInfo.color === 'red' ? 'bg-red-100 text-red-700' :
                    categoryInfo.color === 'green' ? 'bg-green-100 text-green-700' :
                    categoryInfo.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                    categoryInfo.color === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
                    categoryInfo.color === 'purple' ? 'bg-purple-100 text-purple-700' :
                    categoryInfo.color === 'orange' ? 'bg-orange-100 text-orange-700' :
                    categoryInfo.color === 'emerald' ? 'bg-emerald-100 text-emerald-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {categoryInfo.icon} {categoryInfo.name}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(article.difficulty_level)}`}>
                    {article.difficulty_level}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                
                {article.summary && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {article.summary}
                  </p>
                )}

                {article.tags && article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {article.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(article.published_at).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {article.region}
                    </div>
                  </div>
                </div>

                <div className="text-xs text-gray-500 mb-4">
                  Source: {article.source}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={e => {
                        e.stopPropagation()
                        handleEngagement(article._id, 'view')
                      }}
                      className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">{article.engagement_stats?.views || 0}</span>
                    </button>
                    <button
                      onClick={e => {
                        e.stopPropagation()
                        handleEngagement(article._id, 'like')
                      }}
                      className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors"
                    >
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">{article.engagement_stats?.likes || 0}</span>
                    </button>
                    <button
                      onClick={e => {
                        e.stopPropagation()
                        handleEngagement(article._id, 'share')
                      }}
                      className="flex items-center space-x-1 text-gray-600 hover:text-green-500 transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      <span className="text-sm">{article.engagement_stats?.shares || 0}</span>
                    </button>
                  </div>
                  
                  {article.source_url && (
                    <a
                      href={article.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="flex items-center text-blue-600 hover:text-blue-700 text-sm"
                    >
                      <BookOpen className="w-4 h-4 mr-1" />
                      Read Full
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {filteredNews.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-6xl mb-4">📰</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No news articles found</h3>
          <p className="text-gray-600">Try adjusting your filters or search terms</p>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">News Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">{news.length}</div>
            <div className="text-blue-100">Total Articles</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">
              {news.reduce((sum, article) => sum + (article.engagement_stats?.views || 0), 0)}
            </div>
            <div className="text-blue-100">Total Views</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">
              {[...new Set(news.map(article => article.category))].length}
            </div>
            <div className="text-blue-100">Categories Covered</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">
              {[...new Set(news.map(article => article.region))].length}
            </div>
            <div className="text-blue-100">Regions Covered</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default EnvironmentalNews
