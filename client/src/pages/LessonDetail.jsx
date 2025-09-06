import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Clock,
  Star,
  CheckCircle,
  Play,
  Target,
  Award,
  BookOpen
} from 'lucide-react'
import { useStore } from '../store/useStore'
import toast from 'react-hot-toast'

const LessonDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { lessons, completeLesson, updateUserPoints, earnBadge } = useStore()
  const [currentSection, setCurrentSection] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [showQuiz, setShowQuiz] = useState(false)

  const lesson = lessons.find(l => l.id === id)

  if (!lesson) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Lesson not found</h1>
        <button
          onClick={() => navigate('/lessons')}
          className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Back to Lessons
        </button>
      </div>
    )
  }

  const lessonContent = {
    '1': {
      sections: [
        {
          title: 'What is Climate Change?',
          content:
            'Climate change refers to long-term shifts in global temperatures and weather patterns. While climate variations are natural, human activities since the 1800s have been the main driver of climate change.',
          image:
            'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=600'
        },
        {
          title: 'Impact on India',
          content:
            'India faces severe climate impacts including rising temperatures, erratic monsoons, melting glaciers, and extreme weather events. These changes affect agriculture, water resources, and millions of livelihoods.',
          image:
            'https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?auto=compress&cs=tinysrgb&w=600'
        },
        {
          title: 'What Can We Do?',
          content:
            'Individual actions like using renewable energy, reducing waste, choosing sustainable transport, and supporting climate-friendly policies can make a significant difference.',
          image:
            'https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg?auto=compress&cs=tinysrgb&w=600'
        }
      ],
      quiz: [
        {
          question: 'What is the main driver of climate change since the 1800s?',
          options: [
            'Natural variations',
            'Human activities',
            'Solar radiation',
            'Ocean currents'
          ],
          correct: 'Human activities'
        },
        {
          question:
            'Which of these is NOT mentioned as a climate impact on India?',
          options: [
            'Rising temperatures',
            'Erratic monsoons',
            'Volcanic eruptions',
            'Melting glaciers'
          ],
          correct: 'Volcanic eruptions'
        }
      ]
    },
    '2': {
      sections: [
        {
          title: 'Why Water Conservation Matters',
          content:
            'Water is essential for all life on Earth. With growing population and climate change, water scarcity is becoming a critical issue. India faces severe water stress in many regions.',
          image:
            'https://images.pexels.com/photos/1113816/pexels-photo-1113816.jpeg?auto=compress&cs=tinysrgb&w=600'
        },
        {
          title: 'Simple Conservation Techniques',
          content:
            'Turn off taps while brushing, fix leaks promptly, use water-efficient appliances, collect rainwater, and reuse greywater for plants.',
          image:
            'https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg?auto=compress&cs=tinysrgb&w=600'
        }
      ],
      quiz: [
        {
          question: "What percentage of Earth's water is freshwater?",
          options: ['2.5%', '10%', '25%', '50%'],
          correct: '2.5%'
        }
      ]
    }
  }

  const currentLessonContent = lessonContent[id] || lessonContent['1']

  const handleCompleteLesson = () => {
    if (!lesson.completed) {
      completeLesson(lesson.id)
      updateUserPoints(lesson.points)

      const completedLessons = lessons.filter(l => l.completed).length + 1
      if (completedLessons === 5) {
        earnBadge('1')
        toast.success('🏆 Badge earned: Climate Champion!')
      }

      toast.success(`🎉 Lesson completed! +${lesson.points} points`)
    }
    navigate('/lessons')
  }

  const handleQuizSubmit = () => {
    const correctAnswers = currentLessonContent.quiz.filter(
      (q, index) => quizAnswers[index] === q.correct
    ).length

    const score =
      (correctAnswers / currentLessonContent.quiz.length) * 100

    if (score >= 70) {
      toast.success(`🎯 Great job! You scored ${score}%`)
      handleCompleteLesson()
    } else {
      toast.error(
        `📚 Score: ${score}%. You need 70% to pass. Try again!`
      )
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-4 mb-8"
      >
        <button
          onClick={() => navigate('/lessons')}
          className="p-2 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>

        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {lesson.title}
          </h1>
          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{lesson.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>{lesson.points} points</span>
            </div>
            <div className="flex items-center space-x-1">
              <BookOpen className="w-4 h-4" />
              <span>{lesson.difficulty}</span>
            </div>
          </div>
        </div>

        {lesson.completed && (
          <div className="flex items-center space-x-2 bg-green-100 px-3 py-2 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-green-700">
              Completed
            </span>
          </div>
        )}
      </motion.div>

      {/* Lesson Content */}
      {!showQuiz ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          {/* Progress Bar */}
          <div className="bg-gray-100 p-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>
                {currentSection + 1} of{' '}
                {currentLessonContent.sections.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${
                    ((currentSection + 1) /
                      currentLessonContent.sections.length) *
                    100
                  }%`
                }}
              ></div>
            </div>
          </div>

          {/* Section Content */}
          <div className="p-8">
            <div className="mb-6">
              <img
                src={currentLessonContent.sections[currentSection].image}
                alt={
                  currentLessonContent.sections[currentSection].title
                }
                className="w-full h-64 object-cover rounded-xl mb-6"
              />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {currentLessonContent.sections[currentSection].title}
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {
                  currentLessonContent.sections[currentSection]
                    .content
                }
              </p>
            </div>

            {/* SDG Goals */}
            {lesson.sdgGoals && lesson.sdgGoals.length > 0 && (
              <div className="bg-blue-50 rounded-xl p-6 mb-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Target className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-blue-900">
                    Related UN SDG Goals
                  </h3>
                </div>
                <div className="flex space-x-2">
                  {lesson.sdgGoals.map(goal => (
                    <div
                      key={goal}
                      className="flex items-center space-x-2 bg-blue-100 px-3 py-2 rounded-lg"
                    >
                      <span className="w-6 h-6 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                        {goal}
                      </span>
                      <span className="text-sm font-medium text-blue-800">
                        {goal === 6
                          ? 'Clean Water'
                          : goal === 7
                          ? 'Clean Energy'
                          : goal === 13
                          ? 'Climate Action'
                          : goal === 14
                          ? 'Life Below Water'
                          : goal === 15
                          ? 'Life on Land'
                          : `Goal ${goal}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between">
              <button
                onClick={() =>
                  setCurrentSection(Math.max(0, currentSection - 1))
                }
                disabled={currentSection === 0}
                className="px-6 py-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              {currentSection <
              currentLessonContent.sections.length - 1 ? (
                <button
                  onClick={() =>
                    setCurrentSection(currentSection + 1)
                  }
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={() => setShowQuiz(true)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Take Quiz
                </button>
              )}
            </div>
          </div>
        </motion.div>
      ) : (
        /* Quiz Section */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Knowledge Check
            </h2>
            <p className="text-gray-600">
              Answer the questions below to complete the lesson
            </p>
          </div>

          <div className="space-y-6">
            {currentLessonContent.quiz.map((question, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl p-6"
              >
                <h3 className="font-semibold text-gray-900 mb-4">
                  {index + 1}. {question.question}
                </h3>
                <div className="space-y-2">
                  {question.options.map(option => (
                    <label
                      key={option}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={option}
                        onChange={e =>
                          setQuizAnswers({
                            ...quizAnswers,
                            [index]: e.target.value
                          })
                        }
                        className="text-green-600 focus:ring-green-500"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={() => setShowQuiz(false)}
              className="px-6 py-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
            >
              Back to Lesson
            </button>

            <button
              onClick={handleQuizSubmit}
              disabled={
                Object.keys(quizAnswers).length <
                currentLessonContent.quiz.length
              }
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Quiz
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default LessonDetail
