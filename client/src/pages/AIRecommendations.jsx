import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, MapPin, Cloud, TrendingUp, Clock, Star, CheckCircle, X } from 'lucide-react';
import toast from 'react-hot-toast';
// import { lumi } from '../lib/lumi';

const AIRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const priorityFilters = [
    { id: 'all', name: 'All Recommendations', color: 'gray' },
    { id: 'urgent', name: 'Urgent', color: 'red' },
    { id: 'high', name: 'High Priority', color: 'orange' },
    { id: 'medium', name: 'Medium Priority', color: 'yellow' },
    { id: 'low', name: 'Low Priority', color: 'green' }
  ];

  const recommendationTypes = [
    { id: 'activity', name: 'Activity', icon: '🎯', color: 'blue' },
    { id: 'lesson', name: 'Lesson', icon: '📚', color: 'green' },
    { id: 'challenge', name: 'Challenge', icon: '🏆', color: 'purple' },
    { id: 'news', name: 'News', icon: '📰', color: 'indigo' },
    { id: 'partnership', name: 'Partnership', icon: '🤝', color: 'pink' }
  ];

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      const { list } = await lumi.entities.ai_recommendations.list({
        filter: {
          user_id: 'current_user',
          status: { $in: ['pending', 'viewed'] }
        },
        sort: { priority: 1, generated_at: -1 }
      });
      setRecommendations(list || []);
    } catch (error) {
      console.error('Failed to fetch recommendations:', error);
      toast.error('Failed to load recommendations');
    } finally {
      setLoading(false);
    }
  };

  const updateRecommendationStatus = async (recommendationId, status) => {
    try {
      await lumi.entities.ai_recommendations.update(recommendationId, {
        status,
        viewed_at: status === 'viewed' ? new Date().toISOString() : undefined
      });

      setRecommendations(prev =>
        prev.map(rec =>
          rec._id === recommendationId
            ? { ...rec, status, viewed_at: status === 'viewed' ? new Date().toISOString() : rec.viewed_at }
            : rec
        )
      );

      if (status === 'accepted') toast.success('Recommendation accepted!');
      if (status === 'dismissed') toast.success('Recommendation dismissed');
    } catch (error) {
      toast.error('Failed to update recommendation');
    }
  };

  const getTypeInfo = type => recommendationTypes.find(t => t.id === type) || recommendationTypes[0];

  const getPriorityColor = priority => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'high':
        return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-700 border-green-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getTypeColor = color => {
    switch (color) {
      case 'blue':
        return 'bg-blue-100 text-blue-700';
      case 'green':
        return 'bg-green-100 text-green-700';
      case 'purple':
        return 'bg-purple-100 text-purple-700';
      case 'indigo':
        return 'bg-indigo-100 text-indigo-700';
      case 'pink':
        return 'bg-pink-100 text-pink-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredRecommendations = recommendations.filter(
    rec => filter === 'all' || rec.priority === filter
  );

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading AI recommendations...</p>
        </div>
      </div>
    );
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">AI-Powered Recommendations 🤖</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Get personalized environmental activities and learning suggestions based on your location,
          weather, and interests
        </p>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-white rounded-2xl shadow-lg p-6 mb-8"
      >
        <div className="flex flex-wrap gap-2">
          {priorityFilters.map(priorityFilter => (
            <button
              key={priorityFilter.id}
              onClick={() => setFilter(priorityFilter.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === priorityFilter.id
                  ? 'bg-green-100 text-green-700 border-2 border-green-300'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {priorityFilter.name}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Recommendations List */}
      <div className="space-y-6">
        {filteredRecommendations.map((recommendation, index) => {
          const typeInfo = getTypeInfo(recommendation.recommendation_type);
          return (
            <motion.div
              key={recommendation._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getTypeColor(typeInfo.color)}`}>
                    <span className="text-xl">{typeInfo.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{recommendation.title}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                          typeInfo.color
                        )}`}
                      >
                        {typeInfo.name}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
                          recommendation.priority
                        )}`}
                      >
                        {recommendation.priority} priority
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateRecommendationStatus(recommendation._id, 'accepted')}
                    className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                    title="Accept recommendation"
                  >
                    <CheckCircle className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => updateRecommendationStatus(recommendation._id, 'dismissed')}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                    title="Dismiss recommendation"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-4">{recommendation.description}</p>

              {/* AI Reasoning */}
              {recommendation.reasoning && (
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                    <Brain className="w-4 h-4 mr-2" />
                    AI Analysis
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-blue-700 font-medium">Confidence Score:</span>
                      <div className="flex items-center mt-1">
                        <div className="w-full bg-blue-200 rounded-full h-2 mr-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{
                              width: `${(recommendation.reasoning.confidence_score || 0) * 100}%`
                            }}
                          ></div>
                        </div>
                        <span className="text-blue-800 font-bold">
                          {Math.round((recommendation.reasoning.confidence_score || 0) * 100)}%
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="text-blue-700 font-medium">Based on:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {recommendation.reasoning.location_based && (
                          <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded text-xs">
                            📍 Location
                          </span>
                        )}
                        {recommendation.reasoning.weather_based && (
                          <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded text-xs">
                            🌤️ Weather
                          </span>
                        )}
                        {recommendation.reasoning.behavior_based && (
                          <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded text-xs">
                            📊 Behavior
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Context */}
              {recommendation.context && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* Location */}
                  {recommendation.context.location && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <h5 className="font-medium text-gray-900 mb-2 flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        Location Context
                      </h5>
                      <div className="text-sm text-gray-700 space-y-1">
                        <div>📍 {recommendation.context.location.city}</div>
                        {recommendation.context.location.weather && (
                          <div className="flex items-center">
                            <Cloud className="w-3 h-3 mr-1" />
                            {recommendation.context.location.weather}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Interests */}
                  {recommendation.context.user_history &&
                    recommendation.context.user_history.length > 0 && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <h5 className="font-medium text-gray-900 mb-2 flex items-center">
                          <TrendingUp className="w-4 h-4 mr-2" />
                          Your Interests
                        </h5>
                        <div className="flex flex-wrap gap-1">
                          {recommendation.context.user_history
                            .slice(0, 3)
                            .map((interest, idx) => (
                              <span
                                key={idx}
                                className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs"
                              >
                                {interest.replace(/_/g, ' ')}
                              </span>
                            ))}
                        </div>
                      </div>
                    )}
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    Generated {new Date(recommendation.generated_at).toLocaleDateString()}
                  </div>
                  {recommendation.expires_at && (
                    <div className="flex items-center text-orange-600">
                      <Star className="w-4 h-4 mr-1" />
                      Expires {new Date(recommendation.expires_at).toLocaleDateString()}
                    </div>
                  )}
                </div>

                <div className="text-xs">
                  Status: <span className="capitalize">{recommendation.status}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredRecommendations.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-6xl mb-4">🤖</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No recommendations found</h3>
          <p className="text-gray-600">
            {filter === 'all'
              ? 'AI is analyzing your activity to generate personalized recommendations'
              : `No ${filter} priority recommendations at the moment`}
          </p>
        </motion.div>
      )}

      {/* AI Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">AI Recommendation Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">{recommendations.length}</div>
            <div className="text-purple-100">Total Recommendations</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">
              {recommendations.filter(r => r.status === 'accepted').length}
            </div>
            <div className="text-purple-100">Accepted</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">
              {recommendations.filter(r => r.reasoning?.confidence_score > 0.8).length}
            </div>
            <div className="text-purple-100">High Confidence</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">
              {recommendations.filter(r => r.reasoning?.location_based).length}
            </div>
            <div className="text-purple-100">Location-Based</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AIRecommendations;
