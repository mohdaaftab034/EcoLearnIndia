import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  Share2,
  Instagram,
  Linkedin,
  MessageCircleDashed as MessageCircle,
  Twitter,
  Facebook,
  Copy,
  Download
} from 'lucide-react'
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton
} from 'react-share'
import Confetti from 'react-confetti'

const SocialShare = ({ achievement, onClose }) => {
  const { t } = useTranslation()
  const [showConfetti, setShowConfetti] = useState(true)
  const [selectedTemplate, setSelectedTemplate] = useState(0)

  const shareUrl = window.location.href

  const templates = [
    {
      id: 'achievement',
      title: '🏆 Achievement Unlocked!',
      getMessage: () =>
        `🌱 Just ${achievement.type === 'badge' ? 'earned' : 'completed'} "${achievement.title
        }" on EcoLearn India! 🎉\n\n${achievement.description}\n\n${achievement.points ? `+${achievement.points} eco-points earned! 🌟` : ''
        }\n\nJoin me in making India greener! 🇮🇳\n\n#EcoLearnIndia #EnvironmentalEducation #SustainabilityIndia #ClimateAction`
    },
    {
      id: 'challenge',
      title: '🌍 Environmental Challenge',
      getMessage: () =>
        `🚀 Taking action for our planet! Just completed "${achievement.title}" challenge!\n\n💚 ${achievement.description}\n\n🌱 Small actions, big impact! Every step counts towards a sustainable India.\n\nWho's joining me in this green journey? 🌿\n\n#EcoChallenge #SustainableIndia #ClimateAction #EcoLearnIndia`
    },
    {
      id: 'milestone',
      title: '📈 Eco Milestone',
      getMessage: () =>
        `🎯 Milestone achieved! ${achievement.level
          ? `Reached Level ${achievement.level}`
          : `Earned ${achievement.points} eco-points`
        } on EcoLearn India! 🌟\n\n🌱 "${achievement.title}"\n\n💡 Learning about sustainability while making a real difference! Join thousands of students creating a greener India! 🇮🇳\n\n#EcoEducation #SustainabilityGoals #EnvironmentalLearning #EcoLearnIndia`
    }
  ]

  const generateShareImage = () => {
    return 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=800'
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(templates[selectedTemplate].getMessage())
      alert('Message copied to clipboard!')
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const downloadImage = () => {
    alert('Feature coming soon! Custom achievement images will be available for download.')
  }

  const shareToInstagram = () => {
    copyToClipboard()
    alert('Text copied! Open Instagram and paste in your story or post.')
  }

  const currentTemplate = templates[selectedTemplate]
  const shareMessage = currentTemplate.getMessage()

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        {showConfetti && (
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={200}
            onConfettiComplete={() => setShowConfetti(false)}
          />
        )}

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Share2 className="w-6 h-6 mr-2 text-green-600" />
              {t('share')} Your Achievement!
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Achievement Preview */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 mb-6 border border-green-100">
            <div className="text-center">
              <div className="text-6xl mb-4">{achievement.badge || '🏆'}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{achievement.title}</h3>
              <p className="text-gray-600 mb-4">{achievement.description}</p>

              <div className="flex justify-center space-x-6">
                {achievement.points && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{achievement.points}</div>
                    <div className="text-sm text-gray-500">Eco Points</div>
                  </div>
                )}
                {achievement.level && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{achievement.level}</div>
                    <div className="text-sm text-gray-500">Level</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Template Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Choose Share Template</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {templates.map((template, index) => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(index)}
                  className={`p-3 rounded-lg text-left transition-all ${selectedTemplate === index
                    ? 'bg-green-100 border-2 border-green-500'
                    : 'bg-gray-50 border-2 border-gray-200 hover:bg-gray-100'
                    }`}
                >
                  <div className="font-medium text-gray-900">{template.title}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Message Preview */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Message Preview</h3>
            <div className="bg-gray-50 rounded-lg p-4 border">
              <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">
                {shareMessage}
              </pre>
            </div>
          </div>

          {/* Social Media Buttons */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">Share On</h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {/* WhatsApp */}
              <WhatsappShareButton url={shareUrl} title={shareMessage} className="w-full">
                <div className="flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-medium">WhatsApp</span>
                </div>
              </WhatsappShareButton>

              {/* LinkedIn */}
              <LinkedinShareButton
                url={shareUrl}
                title={achievement.title}
                summary={shareMessage}
                className="w-full"
              >
                <div className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors">
                  <Linkedin className="w-5 h-5" />
                  <span className="font-medium">LinkedIn</span>
                </div>
              </LinkedinShareButton>

              {/* Twitter */}
              <TwitterShareButton url={shareUrl} title={shareMessage} className="w-full">
                <div className="flex items-center justify-center space-x-2 bg-sky-500 hover:bg-sky-600 text-white p-3 rounded-lg transition-colors">
                  <Twitter className="w-5 h-5" />
                  <span className="font-medium">Twitter</span>
                </div>
              </TwitterShareButton>

              {/* Instagram */}
              <button
                onClick={shareToInstagram}
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-3 rounded-lg transition-colors"
              >
                <Instagram className="w-5 h-5" />
                <span className="font-medium">Instagram</span>
              </button>

              {/* Facebook */}
              <FacebookShareButton
                url={shareUrl}
                quote={shareMessage}
                className="w-full md:col-span-2"
              >
                <div className="flex items-center justify-center space-x-2 bg-blue-700 hover:bg-blue-800 text-white p-3 rounded-lg transition-colors w-full">
                  <Facebook className="w-5 h-5" />
                  <span className="font-medium">Facebook</span>
                </div>
              </FacebookShareButton>

              {/* Copy Text */}
              <button
                onClick={copyToClipboard}
                className="flex items-center justify-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white p-3 rounded-lg transition-colors"
              >
                <Copy className="w-5 h-5" />
                <span className="font-medium">Copy Text</span>
              </button>

              {/* Download Image */}
              <button
                onClick={downloadImage}
                className="flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-lg transition-colors"
              >
                <Download className="w-5 h-5" />
                <span className="font-medium">Download</span>
              </button>
            </div>
          </div>

          {/* Tips */}
          <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h4 className="font-bold text-blue-900 mb-2">💡 Sharing Tips</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Tag friends to inspire them to join the eco-movement</li>
              <li>• Use relevant hashtags to reach more people</li>
              <li>• Share your story about how this achievement impacted you</li>
              <li>• Encourage others to take similar environmental actions</li>
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default SocialShare
