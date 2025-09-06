import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { TrendingUp, Target, BookOpen, Users, Award, Calendar, Flame, ChevronRight, Play, Clock } from 'lucide-react'
import { useStore } from '../store/useStore'


const Dashboard = () => {

  const { user, lessons, challenges } = useStore()

  const completedLessons = lessons.filter(lesson => lesson.completed).length
  const activeChallenges = challenges.filter(challenge => challenge.status === 'active').length
  const progressPercentage = (completedLessons / lessons.length) * 100

  const recentActivities = [
    { type: 'lesson', title: 'Climate Change Basics', points: 100, time: '2 hours ago' },
    { type: 'badge', title: 'Earned Climate Champion badge', points: 50, time: '1 day ago' },
    { type: 'challenge', title: 'Joined Plant 100 Trees Challenge', points: 0, time: '3 days ago' },
  ]

  const sdgGoals = [
    { id: 6, name: 'Clean Water', color: 'bg-blue-500', progress: 75 },
    { id: 7, name: 'Clean Energy', color: 'bg-yellow-500', progress: 45 },
    { id: 13, name: 'Climate Action', color: 'bg-green-500', progress: 90 },
    { id: 14, name: 'Life Below Water', color: 'bg-cyan-500', progress: 30 },
    { id: 15, name: 'Life on Land', color: 'bg-emerald-500', progress: 60 },
  ]


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-green-600 via-emerald-600 to-blue-600 rounded-3xl p-8 mb-8 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Welcome back, {user?.name?.split(' ')[0]}! 🌱
            </h1>
            <p className="text-lg text-green-100 mb-6">
              Continue your journey towards becoming an environmental champion
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center space-x-2">
                  <Flame className="w-5 h-5 text-orange-300" />
                  <span className="text-sm font-medium">Streak</span>
                </div>
                <p className="text-2xl font-bold mt-1">{user?.streak} days</p>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-blue-300" />
                  <span className="text-sm font-medium">Lessons</span>
                </div>
                <p className="text-2xl font-bold mt-1">{completedLessons}/{lessons.length}</p>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-purple-300" />
                  <span className="text-sm font-medium">Challenges</span>
                </div>
                <p className="text-2xl font-bold mt-1">{activeChallenges}</p>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-yellow-300" />
                  <span className="text-sm font-medium">Badges</span>
                </div>
                <p className="text-2xl font-bold mt-1">{user?.badges?.length || 0}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-4 left-4 w-24 h-24 bg-green-300/20 rounded-full blur-lg"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Progress Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Learning Progress</h2>
              <Link
                to="/lessons"
                className="flex items-center space-x-1 text-green-600 hover:text-green-700 text-sm font-medium"
              >
                <span>View all</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Overall Progress</span>
                <span>{Math.round(progressPercentage)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lessons.slice(0, 4).map((lesson) => (
                <Link
                  key={lesson.id}
                  to={`/lessons/${lesson.id}`}
                  className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <img
                    src={lesson.image}
                    alt={lesson.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 text-sm">{lesson.title}</h3>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{lesson.duration}</span>
                      {lesson.completed && <span className="text-green-600">✓ Completed</span>}
                    </div>
                  </div>
                  {!lesson.completed && <Play className="w-4 h-4 text-green-600" />}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Featured Challenges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Active Challenges</h2>
              <Link
                to="/challenges"
                className="flex items-center space-x-1 text-green-600 hover:text-green-700 text-sm font-medium"
              >
                <span>View all</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-4">
              {challenges.filter(c => c.status === 'active').slice(0, 3).map((challenge) => (
                <Link
                  key={challenge.id}
                  to={`/challenges/${challenge.id}`}
                  className="block p-4 rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={challenge.image}
                      alt={challenge.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{challenge.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{challenge.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span className="flex items-center space-x-1">
                            <Users className="w-3 h-3" />
                            <span>{challenge.participants}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{challenge.duration}</span>
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-green-600">
                          +{challenge.points} pts
                        </span>
                      </div>
                      {challenge.progress && (
                        <div className="mt-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${challenge.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${activity.type === 'lesson' ? 'bg-blue-100 text-blue-600' :
                      activity.type === 'badge' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-green-100 text-green-600'
                    }`}>
                    {activity.type === 'lesson' ? '📚' :
                      activity.type === 'badge' ? '🏆' : '🎯'}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500">{activity.time}</p>
                      {activity.points > 0 && (
                        <span className="text-xs font-semibold text-green-600">
                          +{activity.points} pts
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* SDG Progress */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-lg font-bold text-gray-900 mb-4">SDG Goals Progress</h2>
            <div className="space-y-3">
              {sdgGoals.map((goal) => (
                <div key={goal.id}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">SDG {goal.id}: {goal.name}</span>
                    <span className="text-xs text-gray-500">{goal.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${goal.color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard