
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, MessageCircleDashed as MessageCircle, Heart, Share2, Camera, MapPin, Calendar, Award, Plus, Filter, Search } from 'lucide-react'

const Community = () => {
  const [selectedTab, setSelectedTab] = useState('feed')
  const [selectedFilter, setSelectedFilter] = useState('all')

  const tabs = [
    { id: 'feed', name: 'Activity Feed', icon: '📱' },
    { id: 'clubs', name: 'Eco Clubs', icon: '🌱' },
    { id: 'events', name: 'Events', icon: '📅' },
    { id: 'stories', name: 'Success Stories', icon: '✨' },
  ]

  const filters = [
    { id: 'all', name: 'All Posts' },
    { id: 'achievements', name: 'Achievements' },
    { id: 'challenges', name: 'Challenges' },
    { id: 'tips', name: 'Eco Tips' },
    { id: 'photos', name: 'Photos' },
  ]

  const feedPosts = [
    {
      id: '1',
      user: {
        name: 'Priya Sharma',
        school: 'Delhi Public School, Mumbai',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
      },
      type: 'achievement',
      content: 'Just completed the Plant 100 Trees Challenge! 🌳 Our school team planted 150 saplings in the local park. So proud of our environmental impact!',
      image: 'https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=500',
      timestamp: '2 hours ago',
      likes: 45,
      comments: 12,
      shares: 8,
      badge: 'Tree Planter'
    },
    {
      id: '2',
      user: {
        name: 'Rahul Verma',
        school: 'Kendriya Vidyalaya, Delhi',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
      },
      type: 'tip',
      content: 'Pro tip for water conservation: Install aerators on your taps! They can reduce water usage by up to 50% while maintaining the same pressure. 💧',
      timestamp: '4 hours ago',
      likes: 32,
      comments: 8,
      shares: 15
    },
    {
      id: '3',
      user: {
        name: 'Ananya Patel',
        school: 'DAV Public School, Bangalore',
        avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
      },
      type: 'challenge',
      content: 'Starting the Zero Waste Week challenge tomorrow! Who wants to join me? Let\'s see who can reduce their waste the most! ♻️',
      timestamp: '6 hours ago',
      likes: 28,
      comments: 15,
      shares: 6
    }
  ]

  const ecoClubs = [
    {
      id: '1',
      name: 'Green Warriors Mumbai',
      school: 'Delhi Public School, Mumbai',
      members: 145,
      description: 'Leading environmental initiatives in Mumbai schools',
      image: 'https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=300',
      activities: ['Tree Plantation', 'Waste Management', 'Awareness Campaigns'],
      joined: true
    },
    {
      id: '2',
      name: 'Eco Champions Delhi',
      school: 'Kendriya Vidyalaya, Delhi',
      members: 120,
      description: 'Promoting sustainable practices in the capital',
      image: 'https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg?auto=compress&cs=tinysrgb&w=300',
      activities: ['Air Quality Monitoring', 'Clean Energy', 'Urban Gardening'],
      joined: false
    },
    {
      id: '3',
      name: 'Nature Guardians Bangalore',
      school: 'DAV Public School, Bangalore',
      members: 98,
      description: 'Protecting biodiversity in South India',
      image: 'https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg?auto=compress&cs=tinysrgb&w=300',
      activities: ['Wildlife Conservation', 'Lake Restoration', 'Biodiversity Surveys'],
      joined: false
    }
  ]

  const upcomingEvents = [
    {
      id: '1',
      title: 'World Environment Day Celebration',
      organizer: 'Green Warriors Mumbai',
      date: '2024-06-05',
      time: '10:00 AM',
      location: 'Shivaji Park, Mumbai',
      participants: 250,
      image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=300',
      type: 'Awareness Campaign'
    },
    {
      id: '2',
      title: 'Community Tree Plantation Drive',
      organizer: 'Eco Champions Delhi',
      date: '2024-06-15',
      time: '7:00 AM',
      location: 'Lodhi Gardens, Delhi',
      participants: 180,
      image: 'https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=300',
      type: 'Tree Plantation'
    },
    {
      id: '3',
      title: 'Lake Cleanup Initiative',
      organizer: 'Nature Guardians Bangalore',
      date: '2024-06-22',
      time: '6:30 AM',
      location: 'Ulsoor Lake, Bangalore',
      participants: 120,
      image: 'https://images.pexels.com/photos/2402235/pexels-photo-2402235.jpeg?auto=compress&cs=tinysrgb&w=300',
      type: 'Cleanup Drive'
    }
  ]

  const successStories = [
    {
      id: '1',
      title: 'From Waste to Wonder: School Transforms Playground',
      school: 'St. Mary\'s School, Chennai',
      summary: 'Students converted their school\'s waste dump into a beautiful garden using recycled materials.',
      image: 'https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg?auto=compress&cs=tinysrgb&w=400',
      impact: '2 tons waste recycled, 50 plants grown',
      featured: true
    },
    {
      id: '2',
      title: 'Solar Power Success: Rural School Goes Green',
      school: 'Government High School, Rajasthan',
      summary: 'Students led initiative to install solar panels, making their school energy independent.',
      image: 'https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=400',
      impact: '100% renewable energy, ₹50,000 savings annually'
    },
    {
      id: '3',
      title: 'Water Warriors: Community Well Revival',
      school: 'Zilla Parishad School, Maharashtra',
      summary: 'Students revived 5 traditional wells, solving water crisis in their village.',
      image: 'https://images.pexels.com/photos/1113816/pexels-photo-1113816.jpeg?auto=compress&cs=tinysrgb&w=400',
      impact: '500 families benefited, 50,000L water saved daily'
    }
  ]

  const getPostTypeIcon = (type) => {
    switch (type) {
      case 'achievement': return '🏆'
      case 'tip': return '💡'
      case 'challenge': return '🎯'
      case 'photo': return '📸'
      default: return '📝'
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Community Hub 🤝
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Connect with fellow environmental champions, share your achievements, and collaborate on green initiatives
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-white rounded-2xl shadow-lg p-6 mb-8"
      >
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedTab === tab.id
                  ? 'bg-green-100 text-green-700 border-2 border-green-300'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Content */}
      {selectedTab === 'feed' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-2">
            {/* Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl shadow-md p-4 mb-6"
            >
              <div className="flex items-center space-x-4">
                <Filter className="w-5 h-5 text-gray-500" />
                <div className="flex flex-wrap gap-2">
                  {filters.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setSelectedFilter(filter.id)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${selectedFilter === filter.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                      {filter.name}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Posts */}
            <div className="space-y-6">
              {feedPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden"
                >
                  {/* Post Header */}
                  <div className="p-6 pb-4">
                    <div className="flex items-start space-x-3">
                      <img
                        src={post.user.avatar}
                        alt={post.user.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-gray-900">{post.user.name}</h3>
                          <span className="text-sm">{getPostTypeIcon(post.type)}</span>
                          {post.badge && (
                            <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium">
                              {post.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{post.user.school}</p>
                        <p className="text-xs text-gray-500">{post.timestamp}</p>
                      </div>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="px-6 pb-4">
                    <p className="text-gray-800 leading-relaxed">{post.content}</p>
                  </div>

                  {/* Post Image */}
                  {post.image && (
                    <div className="px-6 pb-4">
                      <img
                        src={post.image}
                        alt="Post content"
                        className="w-full h-64 object-cover rounded-xl"
                      />
                    </div>
                  )}

                  {/* Post Actions */}
                  <div className="px-6 py-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors">
                          <Heart className="w-5 h-5" />
                          <span className="text-sm">{post.likes}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors">
                          <MessageCircle className="w-5 h-5" />
                          <span className="text-sm">{post.comments}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-green-500 transition-colors">
                          <Share2 className="w-5 h-5" />
                          <span className="text-sm">{post.shares}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                  <Plus className="w-5 h-5" />
                  <span>Share Achievement</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                  <Camera className="w-5 h-5" />
                  <span>Upload Photo</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
                  <Users className="w-5 h-5" />
                  <span>Find Eco Club</span>
                </button>
              </div>
            </motion.div>

            {/* Trending Topics */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="font-bold text-gray-900 mb-4">Trending Topics</h3>
              <div className="space-y-2">
                {['#PlantTrees', '#ZeroWaste', '#CleanEnergy', '#WaterConservation', '#BiodiversityProtection'].map((topic) => (
                  <button
                    key={topic}
                    className="block w-full text-left px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {selectedTab === 'clubs' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ecoClubs.map((club, index) => (
            <motion.div
              key={club.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <img
                src={club.image}
                alt={club.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-bold text-gray-900 mb-2">{club.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{club.school}</p>
                <p className="text-gray-700 text-sm mb-4">{club.description}</p>

                <div className="flex items-center space-x-1 text-sm text-gray-600 mb-4">
                  <Users className="w-4 h-4" />
                  <span>{club.members} members</span>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {club.activities.map((activity) => (
                    <span
                      key={activity}
                      className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs"
                    >
                      {activity}
                    </span>
                  ))}
                </div>

                <button
                  className={`w-full py-2 rounded-lg font-medium transition-colors ${club.joined
                      ? 'bg-green-100 text-green-700'
                      : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                >
                  {club.joined ? 'Joined' : 'Join Club'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {selectedTab === 'events' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                    {event.type}
                  </span>
                </div>

                <h3 className="font-bold text-gray-900 mb-2">{event.title}</h3>
                <p className="text-sm text-gray-600 mb-4">by {event.organizer}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date} at {event.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{event.participants} registered</span>
                  </div>
                </div>

                <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Register for Event
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {selectedTab === 'stories' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {successStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden ${story.featured ? 'ring-2 ring-yellow-400' : ''
                }`}
            >
              {story.featured && (
                <div className="bg-yellow-400 text-yellow-900 px-4 py-2 text-center text-sm font-medium">
                  ⭐ Featured Story
                </div>
              )}

              <img
                src={story.image}
                alt={story.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-bold text-gray-900 mb-2">{story.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{story.school}</p>
                <p className="text-gray-700 text-sm mb-4">{story.summary}</p>

                <div className="bg-green-50 rounded-lg p-3 mb-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <Award className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-900">Impact</span>
                  </div>
                  <p className="text-sm text-green-800">{story.impact}</p>
                </div>

                <button className="w-full bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                  Read Full Story
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Community
