import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, MapPin, Settings, Search } from 'lucide-react'
import toast from 'react-hot-toast'
// import { lumi } from '../lib/lumi'


const EcoClubs = () => {
  const [clubs, setClubs] = useState([])
  const [myClubs, setMyClubs] = useState([])
  const [selectedTab, setSelectedTab] = useState('discover')
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    school: '',
    focus_areas: []
  })

  const tabs = [
    { id: 'discover', name: 'Discover Clubs', icon: '🔍' },
    { id: 'my_clubs', name: 'My Clubs', icon: '👥' },
    { id: 'create', name: 'Create Club', icon: '➕' }
  ]

  const focusAreas = [
    { id: 'climate_action', name: 'Climate Action', icon: '🌡️', color: 'red' },
    { id: 'biodiversity', name: 'Biodiversity', icon: '🦋', color: 'green' },
    { id: 'waste_management', name: 'Waste Management', icon: '♻️', color: 'blue' },
    { id: 'water_conservation', name: 'Water Conservation', icon: '💧', color: 'cyan' },
    { id: 'renewable_energy', name: 'Renewable Energy', icon: '⚡', color: 'yellow' },
    { id: 'awareness', name: 'Awareness Campaigns', icon: '📢', color: 'purple' }
  ]

  useEffect(() => {
    fetchClubs()
  }, [])

  const fetchClubs = async () => {
    // try {
    //   setLoading(true)
    //   const { list } = await lumi.entities.eco_clubs.list({
    //     filter: { status: 'active' },
    //     sort: { created_at: -1 }
    //   })

    //   const allClubs = list || []
    //   setClubs(allClubs)

    //   const userClubs = allClubs.filter(club =>
    //     club.members?.some(member => member.user_id === 'current_user')
    //   )
    //   setMyClubs(userClubs)
    // } catch (error) {
    //   console.error('Failed to fetch clubs:', error)
    //   toast.error('Failed to load eco clubs')
    // } finally {
    //   setLoading(false)
    // }
  }

  const createClub = async e => {
    e.preventDefault()
    if (!formData.name || !formData.description || !formData.school || formData.focus_areas.length === 0) {
      toast.error('Please fill in all required fields')
      return
    }

    try {
      toast.loading('Creating eco club...', { id: 'create' })
      const clubData = {
        name: formData.name,
        description: formData.description,
        created_by: 'current_user',
        school: formData.school,
        location: { city: 'Unknown', state: 'Unknown', country: 'India' },
        focus_areas: formData.focus_areas,
        members: [{ user_id: 'current_user', role: 'admin', joined_at: new Date().toISOString() }],
        projects: [],
        status: 'active',
        stats: { member_count: 1, projects_completed: 0, total_impact_points: 0 },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      const newClub = await lumi.entities.eco_clubs.create(clubData)
      setClubs(prev => [newClub, ...prev])
      setMyClubs(prev => [newClub, ...prev])
      setFormData({ name: '', description: '', school: '', focus_areas: [] })
      setSelectedTab('my_clubs')
      toast.success('Eco club created successfully!', { id: 'create' })
    } catch (error) {
      console.error('Create club error:', error)
      toast.error('Failed to create club. Please try again.', { id: 'create' })
    }
  }

  const joinClub = async (clubId, clubName) => {
    try {
      toast.success(`Successfully joined ${clubName}!`)
      fetchClubs()
    } catch (error) {
      toast.error('Failed to join club')
    }
  }

  const toggleFocusArea = areaId => {
    setFormData(prev => ({
      ...prev,
      focus_areas: prev.focus_areas.includes(areaId)
        ? prev.focus_areas.filter(id => id !== areaId)
        : [...prev.focus_areas, areaId]
    }))
  }

  const getFocusAreaInfo = areaId => {
    return focusAreas.find(area => area.id === areaId) || { name: areaId, icon: '🌱', color: 'gray' }
  }

  const getFocusAreaColor = color => {
    switch (color) {
      case 'red': return 'bg-red-100 text-red-700'
      case 'green': return 'bg-green-100 text-green-700'
      case 'blue': return 'bg-blue-100 text-blue-700'
      case 'cyan': return 'bg-cyan-100 text-cyan-700'
      case 'yellow': return 'bg-yellow-100 text-yellow-700'
      case 'purple': return 'bg-purple-100 text-purple-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const filteredClubs = clubs.filter(club =>
    club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    club.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    club.school.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading eco clubs...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Eco Clubs & Community 🌱</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Join or create environmental clubs to collaborate on sustainability projects and make a collective impact
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex flex-wrap gap-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium ${
                selectedTab === tab.id
                  ? 'bg-green-100 text-green-700 border-2 border-green-300'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {/* ...rest of your JSX for discover, my_clubs, create stays the same... */}
    </div>
  )
}

export default EcoClubs
