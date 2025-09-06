import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  BookOpen,
  Users,
  TrendingUp,
  Award,
  Settings
} from 'lucide-react'
import { useStore } from '../store/useStore'
import toast from 'react-hot-toast'

const AdminDashboard = () => {
  const { lessons, challenges, user } = useStore()
  const [activeTab, setActiveTab] = useState('overview')
  const [showLessonForm, setShowLessonForm] = useState(false)
  const [editingLesson, setEditingLesson] = useState(null)
  const [lessonForm, setLessonForm] = useState({
    title: '',
    description: '',
    category: 'Climate',
    duration: '15 min',
    difficulty: 'beginner',
    points: 100,
    image: '',
    sdgGoals: [],
    content: {
      sections: [{ title: '', content: '', image: '' }],
      quiz: [{ question: '', options: ['', '', '', ''], correct: '' }]
    }
  })

  const categories = ['Climate', 'Water', 'Energy', 'Wildlife', 'Waste', 'Air Quality']
  const sdgGoals = [6, 7, 11, 12, 13, 14, 15]

  const isAdmin = user?.email?.includes('admin') || true // Demo only

  if (!isAdmin) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
        <p className="text-gray-600">
          You don't have permission to access the admin dashboard.
        </p>
      </div>
    )
  }

  const handleSaveLesson = () => {
    if (!lessonForm.title || !lessonForm.description) {
      toast.error('Please fill in all required fields')
      return
    }

    const newLesson = {
      id: editingLesson || Date.now().toString(),
      ...lessonForm,
      completed: false
    }

    toast.success(editingLesson ? 'Lesson updated successfully!' : 'Lesson created successfully!')
    setShowLessonForm(false)
    setEditingLesson(null)
    resetForm()
  }

  const resetForm = () => {
    setLessonForm({
      title: '',
      description: '',
      category: 'Climate',
      duration: '15 min',
      difficulty: 'beginner',
      points: 100,
      image: '',
      sdgGoals: [],
      content: {
        sections: [{ title: '', content: '', image: '' }],
        quiz: [{ question: '', options: ['', '', '', ''], correct: '' }]
      }
    })
  }

  const addSection = () => {
    setLessonForm({
      ...lessonForm,
      content: {
        ...lessonForm.content,
        sections: [...lessonForm.content.sections, { title: '', content: '', image: '' }]
      }
    })
  }

  const addQuizQuestion = () => {
    setLessonForm({
      ...lessonForm,
      content: {
        ...lessonForm.content,
        quiz: [
          ...lessonForm.content.quiz,
          { question: '', options: ['', '', '', ''], correct: '' }
        ]
      }
    })
  }

  const updateSection = (index, field, value) => {
    const updatedSections = [...lessonForm.content.sections]
    updatedSections[index] = { ...updatedSections[index], [field]: value }
    setLessonForm({
      ...lessonForm,
      content: { ...lessonForm.content, sections: updatedSections }
    })
  }

  const updateQuizQuestion = (index, field, value) => {
    const updatedQuiz = [...lessonForm.content.quiz]
    updatedQuiz[index] = { ...updatedQuiz[index], [field]: value }
    setLessonForm({
      ...lessonForm,
      content: { ...lessonForm.content, quiz: updatedQuiz }
    })
  }

  const stats = {
    totalLessons: lessons.length,
    totalChallenges: challenges.length,
    totalStudents: 15420,
    completionRate: 78
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <button className="text-black px-2 bg-green-500 rounded-full absolute right-20  ">Logout</button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Teacher Dashboard</h1>
        <p className="text-gray-600">
          Manage lessons, challenges, and monitor platform analytics
        </p>
      </motion.div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8">
        {[
          { id: 'overview', name: 'Overview', icon: TrendingUp },
          { id: 'lessons', name: 'Lessons', icon: BookOpen },
          { id: 'analytics', name: 'Analytics', icon: TrendingUp },
          { id: 'settings', name: 'Settings', icon: Settings }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === tab.id
                ? 'bg-white text-green-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
              }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Lessons</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalLessons}</p>
                </div>
                <BookOpen className="w-8 h-8 text-blue-500" />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Challenges</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalChallenges}</p>
                </div>
                <Award className="w-8 h-8 text-green-500" />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Students</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalStudents.toLocaleString()}
                  </p>
                </div>
                <Users className="w-8 h-8 text-purple-500" />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.completionRate}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-500" />
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">
                  New lesson "Climate Change Basics" completed by 45 students
                </span>
                <span className="text-xs text-gray-500 ml-auto">2 hours ago</span>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-700">
                  Challenge "Plant 100 Trees" reached 1000 participants
                </span>
                <span className="text-xs text-gray-500 ml-auto">5 hours ago</span>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-gray-700">
                  Delhi Public School ranked #1 in monthly leaderboard
                </span>
                <span className="text-xs text-gray-500 ml-auto">1 day ago</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Lessons Tab */}
      {activeTab === 'lessons' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Lesson Management</h2>
            <button
              onClick={() => setShowLessonForm(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Lesson</span>
            </button>
          </div>

          {/* Lessons Table */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Lesson
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Difficulty
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Points
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {lessons.map((lesson) => (
                    <tr key={lesson.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={lesson.image}
                            alt={lesson.title}
                            className="w-10 h-10 rounded-lg object-cover mr-3"
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {lesson.title}
                            </div>
                            <div className="text-sm text-gray-500">{lesson.duration}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
                          {lesson.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${lesson.difficulty === 'beginner'
                              ? 'bg-green-100 text-green-800'
                              : lesson.difficulty === 'intermediate'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                        >
                          {lesson.difficulty}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {lesson.points}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setEditingLesson(lesson.id)
                              setLessonForm(lesson)
                              setShowLessonForm(true)
                            }}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm('Are you sure you want to delete this lesson?')) {
                                toast.success('Lesson deleted successfully!')
                              }
                            }}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* Lesson Form Modal */}
      {showLessonForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  {editingLesson ? 'Edit Lesson' : 'Create New Lesson'}
                </h3>
                <button
                  onClick={() => {
                    setShowLessonForm(false)
                    setEditingLesson(null)
                    resetForm()
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lesson Title *
                  </label>
                  <input
                    type="text"
                    value={lessonForm.title}
                    onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter lesson title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={lessonForm.category}
                    onChange={(e) =>
                      setLessonForm({ ...lessonForm, category: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={lessonForm.duration}
                    onChange={(e) =>
                      setLessonForm({ ...lessonForm, duration: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., 15 min"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Difficulty
                  </label>
                  <select
                    value={lessonForm.difficulty}
                    onChange={(e) =>
                      setLessonForm({ ...lessonForm, difficulty: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Points
                  </label>
                  <input
                    type="number"
                    value={lessonForm.points}
                    onChange={(e) =>
                      setLessonForm({
                        ...lessonForm,
                        points: parseInt(e.target.value) || 0
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cover Image URL
                  </label>
                  <input
                    type="url"
                    value={lessonForm.image}
                    onChange={(e) => setLessonForm({ ...lessonForm, image: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="https://images.pexels.com/..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={lessonForm.description}
                  onChange={(e) =>
                    setLessonForm({ ...lessonForm, description: e.target.value })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter lesson description"
                />
              </div>

              {/* SDG Goals */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SDG Goals
                </label>
                <div className="flex flex-wrap gap-2">
                  {sdgGoals.map((goal) => (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => {
                        const updatedGoals = lessonForm.sdgGoals.includes(goal)
                          ? lessonForm.sdgGoals.filter((g) => g !== goal)
                          : [...lessonForm.sdgGoals, goal]
                        setLessonForm({ ...lessonForm, sdgGoals: updatedGoals })
                      }}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${lessonForm.sdgGoals.includes(goal)
                          ? 'bg-blue-600 text-white'
                          : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                        }`}
                    >
                      Goal {goal}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content Sections */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-md font-medium text-gray-900">Content Sections</h4>
                  <button
                    type="button"
                    onClick={addSection}
                    className="text-sm text-green-600 hover:text-green-700"
                  >
                    + Add Section
                  </button>
                </div>

                {lessonForm.content.sections.map((section, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                    <div className="grid grid-cols-1 gap-4">
                      <input
                        type="text"
                        value={section.title}
                        onChange={(e) => updateSection(index, 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Section title"
                      />
                      <textarea
                        value={section.content}
                        onChange={(e) => updateSection(index, 'content', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Section content"
                      />
                      <input
                        type="url"
                        value={section.image}
                        onChange={(e) => updateSection(index, 'image', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Section image URL"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Quiz Questions */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-md font-medium text-gray-900">Quiz Questions</h4>
                  <button
                    type="button"
                    onClick={addQuizQuestion}
                    className="text-sm text-green-600 hover:text-green-700"
                  >
                    + Add Question
                  </button>
                </div>

                {lessonForm.content.quiz.map((question, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                    <input
                      type="text"
                      value={question.question}
                      onChange={(e) =>
                        updateQuizQuestion(index, 'question', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent mb-3"
                      placeholder="Question"
                    />

                    <div className="grid grid-cols-2 gap-2 mb-3">
                      {question.options.map((option, optionIndex) => (
                        <input
                          key={optionIndex}
                          type="text"
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...question.options]
                            newOptions[optionIndex] = e.target.value
                            updateQuizQuestion(index, 'options', newOptions)
                          }}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder={`Option ${optionIndex + 1}`}
                        />
                      ))}
                    </div>

                    <select
                      value={question.correct}
                      onChange={(e) => updateQuizQuestion(index, 'correct', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Select correct answer</option>
                      {question.options.map((option, optionIndex) => (
                        <option key={optionIndex} value={option}>
                          {option || `Option ${optionIndex + 1}`}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
              <button
                onClick={() => {
                  setShowLessonForm(false)
                  setEditingLesson(null)
                  resetForm()
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveLesson}
                className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>{editingLesson ? 'Update' : 'Create'} Lesson</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
