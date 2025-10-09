'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { LoginForm } from '@/components/auth/login-form'
import { PatientDashboard } from '@/components/patient/patient-dashboard'
import { AdminDashboard } from '@/components/admin/admin-dashboard'
import { MoodLogger } from '@/components/mood/mood-logger'
import { MoodChart } from '@/components/dashboard/mood-chart'
import { AIInsights } from '@/components/insights/ai-insights'
import { HeroSection } from '@/components/landing/hero-section'
import { Footer } from '@/components/layout/footer'
import { ChatbotButton } from '@/components/chatbot/chatbot-button'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { LogOut, Heart, BarChart3, Brain, Plus, Home as HomeIcon, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface MoodData {
  date: string
  sentiment: string
  score: number
  text: string
}

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [userType, setUserType] = useState<'patient' | 'admin' | null>(null)
  const [loading, setLoading] = useState(true)
  const [moodData, setMoodData] = useState<MoodData[]>([])
  const [activeTab, setActiveTab] = useState<'home' | 'log' | 'dashboard' | 'insights'>('home')

  useEffect(() => {
    // Set a timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      setLoading(false)
    }, 3000)

    // Check if user is logged in
    const checkUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
      } catch (error) {
        console.log('Supabase not configured, using mock authentication')
        // If Supabase fails, just set loading to false
      } finally {
        setLoading(false)
        clearTimeout(timeout)
      }
    }

    checkUser()

    // Listen for auth changes
    try {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        setUser(session?.user ?? null)
        if (session?.user) {
          fetchMoodData()
        }
      })

      return () => {
        subscription.unsubscribe()
        clearTimeout(timeout)
      }
    } catch (error) {
      console.log('Supabase auth listener not available')
      clearTimeout(timeout)
    }
  }, [])

  const handlePatientLogin = () => {
    setUserType('patient')
    setUser({ id: 'patient-1', email: 'patient@example.com' })
  }

  const handleAdminLogin = () => {
    setUserType('admin')
    setUser({ id: 'admin-1', email: 'admin@moodmate.com' })
  }

  const handleLogout = () => {
    setUser(null)
    setUserType(null)
    setMoodData([])
  }

  const fetchMoodData = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('mood_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setMoodData(data || [])
    } catch (error) {
      console.log('Supabase not configured, using mock data')
      // Mock data for demonstration
      setMoodData([
        { date: '2024-01-27', sentiment: 'positive', score: 0.85, text: 'Feeling great today!' },
        { date: '2024-01-26', sentiment: 'neutral', score: 0.52, text: 'Just an average day' },
        { date: '2024-01-25', sentiment: 'positive', score: 0.78, text: 'Good day overall' }
      ])
    }
  }


  const handleLogSaved = () => {
    fetchMoodData()
    setActiveTab('home') // Go back to home after logging
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-calm-600"></div>
      </div>
    )
  }

  if (!user) {
    return <LoginForm onPatientLogin={handlePatientLogin} onAdminLogin={handleAdminLogin} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-mint/10 via-sky/10 to-rose/10">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Heart className="w-8 h-8 text-calm-600" />
              <h1 className="text-xl font-bold text-calm-700">MoodMate AI</h1>
              {userType === 'admin' && (
                <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                  Admin
                </span>
              )}
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation - Only show for patients */}
      {userType === 'patient' && (
        <nav className="bg-white/60 backdrop-blur-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-8">
              {[
                { id: 'home', label: 'Home', icon: HomeIcon },
                { id: 'log', label: 'Log Mood', icon: Plus },
                { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
                { id: 'insights', label: 'Insights', icon: Brain },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-calm-500 text-calm-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </nav>
      )}

      {/* Additional Navigation Links */}
      <nav className="bg-white/40 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 py-3">
            <Link href="/about" className="text-sm text-gray-600 hover:text-calm-600 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-sm text-gray-600 hover:text-calm-600 transition-colors">
              Contact
            </Link>
            <Link href="/help" className="text-sm text-gray-600 hover:text-calm-600 transition-colors">
              Help
            </Link>
            <Link href="/privacy" className="text-sm text-gray-600 hover:text-calm-600 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-gray-600 hover:text-calm-600 transition-colors">
              Terms
            </Link>
            {userType === 'patient' && (
              <>
                <Link href="/profile" className="text-sm text-gray-600 hover:text-calm-600 transition-colors">
                  Profile
                </Link>
                <Link href="/settings" className="text-sm text-gray-600 hover:text-calm-600 transition-colors">
                  Settings
                </Link>
                <Link href="/notifications" className="text-sm text-gray-600 hover:text-calm-600 transition-colors">
                  Notifications
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {userType === 'admin' ? (
          <AdminDashboard />
        ) : (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'home' && (
              <PatientDashboard 
                onLogout={handleLogout}
                onStartLogging={() => setActiveTab('log')}
                onViewDashboard={() => setActiveTab('dashboard')}
                onViewInsights={() => setActiveTab('insights')}
              />
            )}
            {activeTab === 'log' && (
              <MoodLogger onLogSaved={handleLogSaved} />
            )}
            {activeTab === 'dashboard' && (
              <MoodChart data={moodData} />
            )}
            {activeTab === 'insights' && (
              <AIInsights data={moodData} />
            )}
          </motion.div>
        )}
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Chatbot */}
      <ChatbotButton />
    </div>
  )
}
