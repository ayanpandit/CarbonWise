import React, { useState, useRef, useEffect } from 'react'
import { 
  User, 
  LogOut, 
  Settings, 
  Award, 
  BarChart3, 
  Leaf, 
  ChevronDown,
  Edit3,
  Save,
  X,
  Shield,
  Activity
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import ProfileManager from './ProfileManager'

const UserProfile = () => {
  const { user, signOut } = useAuth()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showProfileManager, setShowProfileManager] = useState(false)
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const dropdownRef = useRef(null)

  // Load user profile from database
  useEffect(() => {
    if (user) {
      loadUserProfile()
    }
  }, [user])

  const loadUserProfile = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) {
        // If profile doesn't exist, create it
        if (error.code === 'PGRST116') {
          console.log('Profile not found, creating new profile...')
          await createUserProfile()
          return
        }
        console.error('Error loading profile:', error)
        return
      }

      setUserProfile(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const createUserProfile = async () => {
    try {
      const username = user.email ? user.email.split('@')[0] : ''
      
      const { data, error } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          full_name: user.user_metadata?.full_name || '',
          username: username,
          avatar_url: user.user_metadata?.avatar_url || ''
        })
        .select()
        .single()

      if (error) throw error

      setUserProfile(data)
    } catch (error) {
      console.error('Error creating profile:', error)
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut()
      setIsDropdownOpen(false)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const openProfileManager = () => {
    setShowProfileManager(true)
    setIsDropdownOpen(false)
  }

  if (!user) return null

  const displayName = userProfile?.full_name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'
  const avatarLetter = displayName.charAt(0).toUpperCase()

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        {/* User Avatar Button */}
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center space-x-3 p-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 group"
        >
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-white/40 transition-all duration-300 group-hover:scale-105">
            {userProfile?.avatar_url ? (
              <img 
                src={userProfile.avatar_url} 
                alt={displayName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center text-white font-semibold shadow-lg">
                {avatarLetter}
              </div>
            )}
          </div>
          
          {/* User Info (Hidden on mobile) */}
          <div className="hidden sm:block text-left">
            <p className="text-gray-800 font-medium text-sm truncate max-w-32">
              {displayName}
            </p>
            <p className="text-gray-600 text-xs truncate max-w-32">
              {user.email}
            </p>
          </div>
          
          {/* Dropdown Arrow */}
          <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
            isDropdownOpen ? 'rotate-180' : ''
          }`} />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in slide-in-from-top duration-200">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-4 text-white">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/30">
                  {userProfile?.avatar_url ? (
                    <img 
                      src={userProfile.avatar_url} 
                      alt={displayName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-white/20 flex items-center justify-center text-lg font-bold">
                      {avatarLetter}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold truncate">{displayName}</h3>
                    <button
                      onClick={openProfileManager}
                      className="p-1 rounded hover:bg-white/20 transition-colors duration-200"
                      title="Edit Profile"
                    >
                      <Edit3 className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-emerald-100 text-sm truncate">{user.email}</p>
                  {userProfile?.username && (
                    <p className="text-emerald-200 text-xs">@{userProfile.username}</p>
                  )}
                </div>
              </div>
            </div>

            {/* User Stats/Info */}
            <div className="px-6 py-4 bg-gray-50">
              {loading ? (
                <div className="animate-pulse">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    {[1, 2, 3].map((i) => (
                      <div key={i}>
                        <div className="w-8 h-8 bg-gray-200 rounded-lg mb-2 mx-auto"></div>
                        <div className="h-3 bg-gray-200 rounded mb-1"></div>
                        <div className="h-4 bg-gray-200 rounded"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="flex items-center justify-center w-8 h-8 bg-emerald-100 rounded-lg mb-2 mx-auto">
                      <Leaf className="w-4 h-4 text-emerald-600" />
                    </div>
                    <p className="text-xs text-gray-600">Carbon Saved</p>
                    <p className="font-semibold text-gray-900">
                      {userProfile?.carbon_saved || 0}kg
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg mb-2 mx-auto">
                      <BarChart3 className="w-4 h-4 text-blue-600" />
                    </div>
                    <p className="text-xs text-gray-600">Tracked Days</p>
                    <p className="font-semibold text-gray-900">
                      {userProfile?.tracked_days || 0}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center w-8 h-8 bg-amber-100 rounded-lg mb-2 mx-auto">
                      <Award className="w-4 h-4 text-amber-600" />
                    </div>
                    <p className="text-xs text-gray-600">Level</p>
                    <p className="font-semibold text-gray-900">
                      {userProfile?.level || 'Beginner'}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Menu Items */}
            <div className="py-2">
              <button 
                onClick={openProfileManager}
                className="w-full flex items-center space-x-3 px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                <User className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium">Edit Profile</span>
              </button>
              
              <button className="w-full flex items-center space-x-3 px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                <BarChart3 className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium">My Dashboard</span>
              </button>
              
              <button className="w-full flex items-center space-x-3 px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                <Activity className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium">My Activities</span>
              </button>
              
              <button className="w-full flex items-center space-x-3 px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                <Settings className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium">Preferences</span>
              </button>

              <hr className="my-2 border-gray-200" />
              
              <button
                onClick={handleSignOut}
                className="w-full flex items-center space-x-3 px-6 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-sm font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Profile Manager Modal */}
      <ProfileManager 
        isOpen={showProfileManager}
        onClose={() => setShowProfileManager(false)}
      />
    </>
  )
}

export default UserProfile
