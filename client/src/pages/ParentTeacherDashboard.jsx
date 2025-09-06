import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, BookOpen, Award, TrendingUp, Download } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import toast from 'react-hot-toast'
// import { lumi } from '../lib/lumi'

const ParentTeacherDashboard = () => {
  const [reports, setReports] = useState([])
  const [selectedStudent, setSelectedStudent] = useState('all')
  const [selectedPeriod, setSelectedPeriod] = useState('monthly')
  const [userRole, setUserRole] = useState('teacher')
  const [loading, setLoading] = useState(true)

  const periods = [
    { id: 'weekly', name: 'Weekly' },
    { id: 'monthly', name: 'Monthly' },
    { id: 'quarterly', name: 'Quarterly' },
    { id: 'annual', name: 'Annual' }
  ]

  const students = [
    { id: 'all', name: 'All Students' },
    { id: 'student_001', name: 'Arjun Sharma' },
    { id: 'student_002', name: 'Priya Patel' },
    { id: 'student_003', name: 'Rahul Verma' }
  ]

  useEffect(() => {
    fetchReports()
  }, [selectedStudent, selectedPeriod])

  const fetchReports = async () => {
    // try {
    //   setLoading(true)
    //   const filter = { report_type: selectedPeriod }
    //   if (selectedStudent !== 'all') {
    //     filter.student_id = selectedStudent
    //   }
    //   const { list } = await lumi.entities.parent_teacher_reports.list({
    //     filter,
    //     sort: { generated_at: -1 }
    //   })
    //   setReports(list || [])
    // } catch (error) {
    //   console.error('Failed to fetch reports:', error)
    //   toast.error('Failed to load reports')
    // } finally {
    //   setLoading(false)
    // }
  }

  const generateReport = async () => {
    try {
      toast.loading('Generating new report...', { id: 'generate' })
      await new Promise(resolve => setTimeout(resolve, 2000))
      toast.success('Report generated successfully!', { id: 'generate' })
      fetchReports()
    } catch (error) {
      toast.error('Failed to generate report', { id: 'generate' })
    }
  }

  const downloadReport = (reportId) => {
    toast.success('Report download started')
  }

  const aggregateData = () => {
    if (reports.length === 0) return null
    const totalMetrics = reports.reduce((acc, report) => {
      Object.keys(report.metrics || {}).forEach(key => {
        acc[key] = (acc[key] || 0) + (report.metrics[key] || 0)
      })
      return acc
    }, {})
    const totalImpact = reports.reduce((acc, report) => {
      Object.keys(report.environmental_impact || {}).forEach(key => {
        acc[key] = (acc[key] || 0) + (report.environmental_impact[key] || 0)
      })
      return acc
    }, {})
    return { totalMetrics, totalImpact }
  }

  const data = aggregateData()

  const activityData = [
    { name: 'Lessons', value: data?.totalMetrics?.lessons_completed || 0, color: '#10b981' },
    { name: 'Challenges', value: data?.totalMetrics?.challenges_participated || 0, color: '#3b82f6' },
    { name: 'Activities', value: data?.totalMetrics?.activities_submitted || 0, color: '#f59e0b' },
    { name: 'Community', value: data?.totalMetrics?.community_posts || 0, color: '#8b5cf6' }
  ]

  const impactData = [
    { name: 'Trees Planted', value: data?.totalImpact?.trees_planted || 0, icon: '🌳' },
    { name: 'Waste Collected (kg)', value: data?.totalImpact?.waste_collected_kg || 0, icon: '♻️' },
    { name: 'Energy Saved (kWh)', value: data?.totalImpact?.energy_saved_kwh || 0, icon: '⚡' },
    { name: 'Water Saved (L)', value: data?.totalImpact?.water_saved_liters || 0, icon: '💧' }
  ]

  const progressData = reports.map((report, index) => ({
    period: `Period ${index + 1}`,
    points: report.metrics?.points_earned || 0,
    lessons: report.metrics?.lessons_completed || 0,
    activities: report.metrics?.activities_submitted || 0
  }))

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {userRole === 'parent' ? 'Parent' : 'Teacher'} Dashboard 📊
            </h1>
            <p className="text-lg text-gray-600">
              Monitor student environmental education progress and impact
            </p>
          </div>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setUserRole('teacher')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${userRole === 'teacher'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              Teacher View
            </button>
            <button
              onClick={() => setUserRole('parent')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${userRole === 'parent'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              Parent View
            </button>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      {/* Rest of your JSX remains unchanged */}
    </div>
  )
}

export default ParentTeacherDashboard
