
import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Leaf } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Leaf className="w-8 h-8 text-green-400" />
              <span className="text-xl font-bold">EcoLearn India</span>
            </div>
            <p className="text-gray-300 text-sm">
              Empowering Indian students through gamified environmental education.
              Building a sustainable future, one lesson at a time.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/lessons" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
                  Lessons
                </Link>
              </li>
              <li>
                <Link to="/challenges" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
                  Challenges
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
                  Community
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Educational Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
                  SDG Goals
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
                  NEP 2020 Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
                  Teacher's Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
                  Research Papers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
                  Impact Reports
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-green-400" />
                <span className="text-gray-300 text-sm">info@ecolearnindia.org</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-green-400" />
                <span className="text-gray-300 text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-green-400" />
                <span className="text-gray-300 text-sm">New Delhi, India</span>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2">Stay Updated</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button className="px-4 py-2 bg-green-600 text-white rounded-r-lg hover:bg-green-700 transition-colors text-sm">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © 2024 EcoLearn India. All rights reserved. |
              <a href="#" className="hover:text-green-400 ml-1">Privacy Policy</a> |
              <a href="#" className="hover:text-green-400 ml-1">Terms of Service</a>
            </div>
            <div className="text-gray-400 text-sm mt-4 md:mt-0">
              Aligned with UN SDG Goals & NEP 2020
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
