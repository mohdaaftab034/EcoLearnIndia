import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Building2, Award, Users, Calendar, ExternalLink, Gift, Target } from 'lucide-react'
import toast from 'react-hot-toast'
// import { lumi } from '../lib/lumi'

const Partnerships = () => {
  const [partnerships, setPartnerships] = useState([])
  const [selectedType, setSelectedType] = useState('all')
  const [loading, setLoading] = useState(true)

  const organizationTypes = [
    { id: 'all', name: 'All Partners', icon: '🤝' },
    { id: 'ngo', name: 'NGOs', icon: '🌱' },
    { id: 'brand', name: 'Brands', icon: '🏢' },
    { id: 'government', name: 'Government', icon: '🏛️' },
    { id: 'educational', name: 'Educational', icon: '🎓' }
  ]

  const focusAreas = [
    { id: 'climate_change', name: 'Climate Change', color: 'bg-red-100 text-red-700' },
    { id: 'biodiversity', name: 'Biodiversity', color: 'bg-green-100 text-green-700' },
    { id: 'water_conservation', name: 'Water Conservation', color: 'bg-blue-100 text-blue-700' },
    { id: 'renewable_energy', name: 'Renewable Energy', color: 'bg-yellow-100 text-yellow-700' },
    { id: 'waste_management', name: 'Waste Management', color: 'bg-purple-100 text-purple-700' },
    { id: 'education', name: 'Education', color: 'bg-indigo-100 text-indigo-700' }
  ]

  useEffect(() => {
    fetchPartnerships()
  }, [])

  const fetchPartnerships = async () => {
    // try {
    //   setLoading(true)
    //   const { list } = await lumi.entities.ngo_partnerships.list({
    //     filter: { status: 'active' },
    //     sort: { created_at: -1 }
    //   })
    //   setPartnerships(list || [])
    // } catch (error) {
    //   console.error('Failed to fetch partnerships:', error)
    //   toast.error('Failed to load partnerships')
    // } finally {
    //   setLoading(false)
    // }
  }

  const filteredPartnerships = partnerships.filter(
    partnership => selectedType === 'all' || partnership.organization_type === selectedType
  )

  const joinCampaign = async (campaignId, organizationName) => {
    try {
      toast.success(`Successfully joined ${organizationName} campaign!`)
    } catch (error) {
      toast.error('Failed to join campaign')
    }
  }

  const getTypeIcon = type => {
    const typeInfo = organizationTypes.find(t => t.id === type)
    return typeInfo?.icon || '🤝'
  }

  const getFocusAreaColor = area => {
    const areaInfo = focusAreas.find(a => a.id === area)
    return areaInfo?.color || 'bg-gray-100 text-gray-700'
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading partnerships...</p>
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Environmental Partnerships 🤝</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Collaborate with leading NGOs, brands, and organizations to make a greater environmental impact through campaigns and challenges
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
          {organizationTypes.map(type => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedType === type.id
                  ? 'bg-green-100 text-green-700 border-2 border-green-300'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              <span>{type.icon}</span>
              <span>{type.name}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Partnerships Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPartnerships.map((partnership, index) => (
          <motion.div
            key={partnership._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 * index }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            {/* Card Content */}
            {/* ...Rest of code unchanged */}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Partnerships
