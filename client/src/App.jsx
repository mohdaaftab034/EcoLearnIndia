import React, { useState } from 'react'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Lessons from './pages/Lessons'
import LessonDetail from './pages/LessonDetail'
import Challenges from './pages/Challenges'
import ChallengeDetail from './pages/ChallengeDetail'
import Leaderboard from './pages/Leaderboard'
import Community from './pages/Community'
import Profile from './pages/Profile'
import AdminDashboard from './pages/AdminDashboard'
import AdvancedFeatures from './pages/AdvancedFeatures'
import ARScanner from './pages/ARScanner'
import RealWorldActivities from './pages/RealWorldActivities'
import Partnerships from './pages/Partnerships'
import EnvironmentalNews from './pages/EnvironmentalNews'
import EcoClubs from './pages/EcoClubs'
import AIRecommendations from './pages/AIRecommendations'
import ParentTeacherDashboard from './pages/ParentTeacherDashboard'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'
import { Route, Router, Routes } from 'react-router-dom'

const App = () => {


  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 flex flex-col">
        <Header />
        <main className="flex-1 pb-20">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/lessons/:id" element={<LessonDetail />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="/challenges/:id" element={<ChallengeDetail />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/community" element={<Community />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<AdminDashboard />} />

            {/* Advanced Features */}
            <Route path="/advanced" element={<AdvancedFeatures />} />
            <Route path="/ar-scanner" element={<ARScanner />} />
            <Route path="/activities" element={<RealWorldActivities />} />
            <Route path="/partnerships" element={<Partnerships />} />
            <Route path="/news" element={<EnvironmentalNews />} />
            <Route path="/eco-clubs" element={<EcoClubs />} />
            <Route path="/recommendations" element={<AIRecommendations />} />
            <Route path="/dashboard/parent-teacher" element={<ParentTeacherDashboard />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="bottom-center" />
      </div>
    </>
  )
}

export default App