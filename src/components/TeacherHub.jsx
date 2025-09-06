import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  Download,
  FileText,
  Users,
  Target,
  Clock,
  Star,
  Search,
  Filter,
  BookOpen,
  Lightbulb,
  Award
} from 'lucide-react'

const TeacherHub = () => {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedGrade, setSelectedGrade] = useState('all')
  const [selectedSubject, setSelectedSubject] = useState('all')

  const resourceTypes = [
    { id: 'all', name: 'All Resources', icon: '📚' },
    { id: 'lesson_plan', name: 'Lesson Plans', icon: '📖' },
    { id: 'activity', name: 'Activities', icon: '🎯' },
    { id: 'project', name: 'Projects', icon: '🏗️' },
    { id: 'assessment', name: 'Assessments', icon: '📝' }
  ]

  const grades = [
    { id: 'all', name: 'All Grades' },
    { id: '1-5', name: 'Classes 1-5' },
    { id: '6-8', name: 'Classes 6-8' },
    { id: '9-10', name: 'Classes 9-10' },
    { id: '11-12', name: 'Classes 11-12' }
  ]

  const subjects = [
    { id: 'all', name: 'All Subjects' },
    { id: 'science', name: 'Science' },
    { id: 'geography', name: 'Geography' },
    { id: 'social_studies', name: 'Social Studies' },
    { id: 'mathematics', name: 'Mathematics' },
    { id: 'language', name: 'Language Arts' }
  ]

  const resources = [
    {
      id: '1',
      title: 'Climate Change and Weather Patterns',
      description:
        'Comprehensive lesson plan exploring climate change impacts on Indian weather systems with hands-on experiments.',
      type: 'lesson_plan',
      grade: ['6-8', '9-10'],
      duration: '60 minutes',
      difficulty: 'medium',
      subject: ['science', 'geography'],
      sdgGoals: [13, 14, 15],
      downloads: 1247,
      rating: 4.8,
      fileUrl: '/resources/climate-change-lesson.pdf',
      thumbnailUrl:
        'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=300',
      tags: ['climate', 'weather', 'experiment', 'interactive']
    },
    {
      id: '2',
      title: 'Plastic Pollution Solutions Workshop',
      description:
        'Interactive activity where students design solutions to reduce plastic waste in their community.',
      type: 'activity',
      grade: ['9-10', '11-12'],
      duration: '90 minutes',
      difficulty: 'hard',
      subject: ['science', 'social_studies'],
      sdgGoals: [14, 15, 11],
      downloads: 892,
      rating: 4.9,
      fileUrl: '/resources/plastic-pollution-activity.pdf',
      thumbnailUrl:
        'https://images.pexels.com/photos/3850512/pexels-photo-3850512.jpeg?auto=compress&cs=tinysrgb&w=300',
      tags: ['pollution', 'innovation', 'problem-solving', 'group-work']
    },
    {
      id: '3',
      title: 'School Garden Project Guide',
      description:
        'Step-by-step guide to establishing and maintaining a school garden for environmental education.',
      type: 'project',
      grade: ['1-5', '6-8'],
      duration: '4 weeks',
      difficulty: 'easy',
      subject: ['science', 'mathematics'],
      sdgGoals: [2, 15, 4],
      downloads: 2156,
      rating: 4.7,
      fileUrl: '/resources/school-garden-project.pdf',
      thumbnailUrl:
        'https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=300',
      tags: ['gardening', 'hands-on', 'long-term', 'outdoor']
    },
    {
      id: '4',
      title: 'Water Conservation Math Problems',
      description:
        'Real-world math problems using water conservation data to teach mathematical concepts.',
      type: 'assessment',
      grade: ['6-8'],
      duration: '45 minutes',
      difficulty: 'medium',
      subject: ['mathematics'],
      sdgGoals: [6, 13],
      downloads: 743,
      rating: 4.6,
      fileUrl: '/resources/water-math-problems.pdf',
      thumbnailUrl:
        'https://images.pexels.com/photos/1113816/pexels-photo-1113816.jpeg?auto=compress&cs=tinysrgb&w=300',
      tags: ['mathematics', 'water', 'problem-solving', 'real-world']
    },
    {
      id: '5',
      title: 'Renewable Energy Science Fair Projects',
      description:
        'Collection of renewable energy experiments perfect for science fairs and demonstrations.',
      type: 'project',
      grade: ['9-10', '11-12'],
      duration: '2-3 weeks',
      difficulty: 'hard',
      subject: ['science'],
      sdgGoals: [7, 13],
      downloads: 1089,
      rating: 4.8,
      fileUrl: '/resources/renewable-energy-projects.pdf',
      thumbnailUrl:
        'https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=300',
      tags: ['renewable-energy', 'experiments', 'science-fair', 'technology']
    },
    {
      id: '6',
      title: 'Biodiversity Storytelling Activity',
      description:
        'Creative writing and storytelling activity to help students understand biodiversity concepts.',
      type: 'activity',
      grade: ['1-5', '6-8'],
      duration: '60 minutes',
      difficulty: 'easy',
      subject: ['language', 'science'],
      sdgGoals: [15, 4],
      downloads: 567,
      rating: 4.5,
      fileUrl: '/resources/biodiversity-storytelling.pdf',
      thumbnailUrl:
        'https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg?auto=compress&cs=tinysrgb&w=300',
      tags: ['biodiversity', 'creative-writing', 'storytelling', 'imagination']
    }
  ]

  const filteredResources = resources.filter(resource => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesType = selectedType === 'all' || resource.type === selectedType
    const matchesGrade = selectedGrade === 'all' || resource.grade.includes(selectedGrade)
    const matchesSubject =
      selectedSubject === 'all' || resource.subject.includes(selectedSubject)

    return matchesSearch && matchesType && matchesGrade && matchesSubject
  })

  const getDifficultyColor = difficulty => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-700'
      case 'medium':
        return 'bg-yellow-100 text-yellow-700'
      case 'hard':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getTypeIcon = type => {
    switch (type) {
      case 'lesson_plan':
        return <BookOpen className="w-4 h-4" />
      case 'activity':
        return <Lightbulb className="w-4 h-4" />
      case 'project':
        return <Target className="w-4 h-4" />
      case 'assessment':
        return <Award className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const downloadResource = resource => {
    alert(`Downloading: ${resource.title}`)
    console.log(`Downloaded: ${resource.title}`)
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">👩‍🏫 {t('teacherHub')}</h2>
        <p className="text-gray-600">
          Comprehensive resources to bring environmental education to life in your classroom
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search lesson plans, activities, and resources..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>

          <select
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
            className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          >
            {resourceTypes.map(type => (
              <option key={type.id} value={type.id}>
                {type.icon} {type.name}
              </option>
            ))}
          </select>

          <select
            value={selectedGrade}
            onChange={e => setSelectedGrade(e.target.value)}
            className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          >
            {grades.map(grade => (
              <option key={grade.id} value={grade.id}>
                {grade.name}
              </option>
            ))}
          </select>

          <select
            value={selectedSubject}
            onChange={e => setSelectedSubject(e.target.value)}
            className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          >
            {subjects.map(subject => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Resource Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource, index) => (
          <motion.div
            key={resource.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            <div
              className="h-40 bg-cover bg-center relative"
              style={{ backgroundImage: `url(${resource.thumbnailUrl})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              <div className="absolute top-3 left-3 flex space-x-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                    resource.difficulty
                  )}`}
                >
                  {resource.difficulty}
                </span>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-white bg-opacity-90 text-gray-700">
                  {getTypeIcon(resource.type)}
                  <span className="ml-1 capitalize">{resource.type.replace('_', ' ')}</span>
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <div className="flex items-center space-x-1 bg-white bg-opacity-90 px-2 py-1 rounded-full">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span className="text-xs font-medium text-gray-700">{resource.rating}</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                {resource.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{resource.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{resource.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-3 h-3" />
                    <span>{resource.grade.join(', ')}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Download className="w-3 h-3" />
                    <span>{resource.downloads} downloads</span>
                  </div>
                  <div className="flex space-x-1">
                    {resource.sdgGoals.slice(0, 3).map(goal => (
                      <span
                        key={goal}
                        className="w-5 h-5 bg-blue-100 text-blue-700 rounded-full text-xs flex items-center justify-center font-bold"
                      >
                        {goal}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {resource.tags.slice(0, 3).map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                {resource.tags.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    +{resource.tags.length - 3} more
                  </span>
                )}
              </div>

              <button
                onClick={() => downloadResource(resource)}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Resource</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No resources found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Help Section */}
      <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-200">
        <h3 className="text-lg font-bold text-blue-900 mb-3">💡 How to Use These Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <h4 className="font-semibold mb-2">📖 Lesson Plans</h4>
            <ul className="space-y-1">
              <li>• Complete with learning objectives and activities</li>
              <li>• Aligned with curriculum standards</li>
              <li>• Include assessment rubrics</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">🎯 Activities</h4>
            <ul className="space-y-1">
              <li>• Hands-on and interactive experiences</li>
              <li>• Materials list and setup instructions</li>
              <li>• Adaptable for different class sizes</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">🏗️ Projects</h4>
            <ul className="space-y-1">
              <li>• Long-term investigative assignments</li>
              <li>• Step-by-step implementation guides</li>
              <li>• Community engagement opportunities</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">📝 Assessments</h4>
            <ul className="space-y-1">
              <li>• Formative and summative evaluations</li>
              <li>• Multiple assessment formats</li>
              <li>• Answer keys and grading guides</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeacherHub
