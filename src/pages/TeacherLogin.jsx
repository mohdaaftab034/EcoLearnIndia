

import React,  { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
//import { useTranslation } from 'react-i18next'
import { User, Mail, Lock, School, GraduationCap, Phone, MapPin, BookOpen } from 'lucide-react'
import { toast } from 'react-hot-toast'

const TeacherLogin = () => {
  const navigate = useNavigate()
  
    const [formData, setFormData] = useState({ 
      name: '',
      email: '',
      password: '',
        })
       const [loading, setLoading] = useState(false)
        const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        
        
        
        // Simulate API call
        setTimeout(() => {
          console.log('Teacher Login data:', formData)
          toast.success('Teacher Login successfully!')
          setLoading(false)
          navigate('/admin')
          // Reset form
          setFormData({
            name: '',
            email: '',
            password: '',
            
          })
        }, 1500)
      }
     
    
      
  return (
     
     <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center mb-4">
          <GraduationCap className="w-10 h-10 text-green-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Teacher Login</h1>
          <GraduationCap className="w-10 h-10 text-green-600 ml-3" />
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Join our platform to access exclusive teaching resources, lesson plans, and environmental education materials.
        </p>
      </motion.div>

      {/* Login Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
      >
        {/* <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ duration: 0.5, type: 'spring' }}
      className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg"
    > */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              
             
              
              
            </div>
            
            {/* Account Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900">Account Information</h2>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Create a strong password"
                  />
                </div>
              </div>
              
             
              
              
              
             
              
             
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white py-4 px-6 rounded-lg font-bold text-lg transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </span>
              ) : (
                ' Teacher Login'
              )}
            </button>
          </div>
        </form>
        
        <div className="mt-8 text-center text-sm text-gray-600">
          {/* <p>By creating an account, you agree to our Terms of Service and Privacy Policy.</p> */}
          {/* <p className="mt-2">Already have an account? <Link to="/teacher-login" className="text-green-600 hover:underline">Login here</Link></p> */}
        </div>
      </motion.div>
      
      {/* Benefits Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-12 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8"
      >
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Benefits for Teachers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-3">📚</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Lesson Plans</h3>
            <p className="text-gray-600">
              Access comprehensive, curriculum-aligned lesson plans for environmental education.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Activities & Projects</h3>
            <p className="text-gray-600">
              Engaging hands-on activities and projects to bring environmental concepts to life.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">📊</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Student Progress Tracking</h3>
            <p className="text-gray-600">
              Monitor your students' environmental learning journey and achievements.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
    
   
  )
}

export default TeacherLogin
