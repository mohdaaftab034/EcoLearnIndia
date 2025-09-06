import React, { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Upload, Camera, MapPin, Award, Clock, CheckCircle, XCircle } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'
// import { lumi } from '../lib/lumi'

const RealWorldActivities = () => {
  const [activities, setActivities] = useState([])
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [formData, setFormData] = useState({
    activity_type: '',
    title: '',
    description: '',
    impact_metrics: {}
  })
  const [uploadedFiles, setUploadedFiles] = useState([])

  const activityTypes = [
    { id: 'tree_planting', name: 'Tree Planting', icon: '🌳', color: 'green' },
    { id: 'cleanup', name: 'Cleanup Drive', icon: '🧹', color: 'blue' },
    { id: 'recycling', name: 'Recycling Project', icon: '♻️', color: 'emerald' },
    { id: 'energy_saving', name: 'Energy Conservation', icon: '⚡', color: 'yellow' },
    { id: 'water_conservation', name: 'Water Conservation', icon: '💧', color: 'cyan' },
    { id: 'awareness_campaign', name: 'Awareness Campaign', icon: '📢', color: 'purple' }
  ]

  const onDrop = useCallback((acceptedFiles) => {
    setUploadedFiles((prev) => [...prev, ...acceptedFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
      'video/*': ['.mp4', '.mov', '.avi']
    },
    maxSize: 50 * 1024 * 1024 // 50MB
  })

  const removeFile = (index) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // if (!formData.activity_type || !formData.title || !formData.description) {
    //   toast.error('Please fill in all required fields')
    //   return
    // }

    // try {
    //   toast.loading('Uploading activity...', { id: 'upload' })

    //   let mediaFiles = []
    //   if (uploadedFiles.length > 0) {
    //     const uploadResults = await lumi.tools.file.upload(uploadedFiles)
    //     mediaFiles = uploadResults.map((result, index) => ({
    //       url: result.fileUrl || '',
    //       type: uploadedFiles[index].type.startsWith('image/') ? 'image' : 'video',
    //       caption: `${formData.activity_type} evidence`
    //     }))
    //   }

    //   const location = await new Promise((resolve) => {
    //     if (navigator.geolocation) {
    //       navigator.geolocation.getCurrentPosition(
    //         (pos) =>
    //           resolve({
    //             latitude: pos.coords.latitude,
    //             longitude: pos.coords.longitude,
    //             address: `Lat: ${pos.coords.latitude.toFixed(4)}, Lng: ${pos.coords.longitude.toFixed(4)}`
    //           }),
    //         () => resolve({ latitude: 0, longitude: 0, address: 'Unknown' })
    //       )
    //     } else {
    //       resolve({ latitude: 0, longitude: 0, address: 'Unknown' })
    //     }
    //   })

    //   const activityData = {
    //     user_id: 'current_user',
    //     activity_type: formData.activity_type,
    //     title: formData.title,
    //     description: formData.description,
    //     media_files: mediaFiles,
    //     location,
    //     impact_metrics: formData.impact_metrics,
    //     status: 'pending',
    //     points_earned: 0,
    //     badges_earned: [],
    //     created_at: new Date().toISOString(),
    //     updated_at: new Date().toISOString()
    //   }

    //   await lumi.entities.real_world_activities.create(activityData)
    //   setActivities((prev) => [activityData, ...prev])
    //   setShowUploadForm(false)
    //   setFormData({ activity_type: '', title: '', description: '', impact_metrics: {} })
    //   setUploadedFiles([])
    //   toast.success('Activity submitted for verification!', { id: 'upload' })
    // } catch (err) {
    //   console.error(err)
    //   toast.error('Failed to upload activity. Please try again.', { id: 'upload' })
    // }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return <Clock className="w-5 h-5 text-yellow-500" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-700'
      case 'rejected':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-yellow-100 text-yellow-700'
    }
  }

  const getActivityTypeInfo = (type) => {
    return activityTypes.find((t) => t.id === type) || { name: type, icon: '📋', color: 'gray' }
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Real-World Environmental Activities 🌍</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Upload photos and videos of your environmental actions to earn points, badges, and inspire others!
        </p>
      </motion.div>

      {/* Upload Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex justify-center mb-8"
      >
        <button
          onClick={() => setShowUploadForm(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-colors"
        >
          <Upload className="w-5 h-5" />
          <span>Upload New Activity</span>
        </button>
      </motion.div>

      {/* Activity Types */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8"
      >
        {activityTypes.map((type) => (
          <div
            key={type.id}
            className="bg-white rounded-xl p-4 text-center shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="text-3xl mb-2">{type.icon}</div>
            <h3 className="font-medium text-gray-900 text-sm">{type.name}</h3>
          </div>
        ))}
      </motion.div>

      {/* Upload Form */}
      {showUploadForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Form Contents */}
            {/* ... Your existing form remains unchanged */}
          </motion.div>
        </div>
      )}

      {/* Activities */}
      {/* ... Activities List rendering remains unchanged */}
    </div>
  )
}

export default RealWorldActivities
