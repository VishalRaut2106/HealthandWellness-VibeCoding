'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Heart, 
  TrendingUp, 
  Calendar, 
  Brain, 
  Plus, 
  BarChart3,
  LogOut,
  User,
  MessageCircle,
  Wind,
  Eye,
  Phone
} from 'lucide-react'

interface PatientDashboardProps {
  onLogout: () => void
  onStartLogging: () => void
  onViewDashboard: () => void
  onViewInsights: () => void
}

export function PatientDashboard({ 
  onLogout, 
  onStartLogging, 
  onViewDashboard, 
  onViewInsights 
}: PatientDashboardProps) {
  const [moodData, setMoodData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Mock data for demonstration
  useEffect(() => {
    const mockData = [
      { date: '2024-01-15', sentiment: 'positive', score: 0.85, text: 'Feeling great today!' },
      { date: '2024-01-14', sentiment: 'positive', score: 0.78, text: 'Had a good day at work' },
      { date: '2024-01-13', sentiment: 'neutral', score: 0.52, text: 'Just an average day' },
      { date: '2024-01-12', sentiment: 'negative', score: 0.35, text: 'Feeling overwhelmed' },
      { date: '2024-01-11', sentiment: 'positive', score: 0.68, text: 'Better day today' }
    ]
    
    setTimeout(() => {
      setMoodData(mockData)
      setLoading(false)
    }, 1000)
  }, [])

  const stats = [
    {
      label: "Total Entries",
      value: moodData.length,
      icon: <Heart className="w-5 h-5" />,
      color: "text-rose-500"
    },
    {
      label: "Positive Days",
      value: moodData.filter(m => m.sentiment === 'positive').length,
      icon: <TrendingUp className="w-5 h-5" />,
      color: "text-green-500"
    },
    {
      label: "Days Tracked",
      value: Math.ceil(moodData.length / 3),
      icon: <Calendar className="w-5 h-5" />,
      color: "text-blue-500"
    }
  ]

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-600 bg-green-50'
      case 'negative':
        return 'text-red-600 bg-red-50'
      default:
        return 'text-yellow-600 bg-yellow-50'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-calm-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-lg text-gray-600">
            Your personal mood tracking dashboard
          </p>
        </div>
        <Button
          onClick={onLogout}
          variant="outline"
          className="flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center ${stat.color}`}>
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            onClick={onStartLogging}
          >
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-calm-100 to-calm-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-calm-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Log Your Mood
              </h3>
              <p className="text-gray-600 mb-4">
                Share how you're feeling right now
              </p>
              <Button className="w-full">
                Start Logging
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            onClick={onViewDashboard}
          >
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                View Trends
              </h3>
              <p className="text-gray-600 mb-4">
                See your mood patterns and analytics
              </p>
              <Button variant="outline" className="w-full">
                View Dashboard
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            onClick={onViewInsights}
          >
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                AI Insights
              </h3>
              <p className="text-gray-600 mb-4">
                Get personalized recommendations
              </p>
              <Button variant="outline" className="w-full">
                View Insights
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Entries */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-calm-600" />
              Recent Mood Entries
            </CardTitle>
            <CardDescription>
              Your latest mood logs and insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {moodData.slice(0, 3).map((entry, index) => (
                <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge className={getSentimentColor(entry.sentiment)}>
                        {entry.sentiment}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {Math.round(entry.score * 100)}% confidence
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(entry.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700">{entry.text}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Mental Health Support */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <Card className="bg-gradient-to-r from-rose-50 to-pink-50 border-rose-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-rose-800">
              <MessageCircle className="w-5 h-5" />
              Mental Health Support
            </CardTitle>
            <CardDescription>
              Your AI companion is always here to help with support, exercises, and resources
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white/60 rounded-lg text-center">
                <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Wind className="w-6 h-6 text-rose-600" />
                </div>
                <h4 className="font-medium text-rose-700 mb-2">Breathing Exercises</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Guided breathing techniques to reduce stress and anxiety
                </p>
                <Button size="sm" variant="outline" className="text-rose-600 border-rose-300 hover:bg-rose-50">
                  Try Now
                </Button>
              </div>
              
              <div className="p-4 bg-white/60 rounded-lg text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Eye className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-medium text-blue-700 mb-2">Grounding Techniques</h4>
                <p className="text-sm text-gray-600 mb-3">
                  5-4-3-2-1 grounding exercise for anxiety relief
                </p>
                <Button size="sm" variant="outline" className="text-blue-600 border-blue-300 hover:bg-blue-50">
                  Start Exercise
                </Button>
              </div>
              
              <div className="p-4 bg-white/60 rounded-lg text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-medium text-green-700 mb-2">Crisis Resources</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Immediate help and professional support resources
                </p>
                <Button size="sm" variant="outline" className="text-green-600 border-green-300 hover:bg-green-50">
                  View Resources
                </Button>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-white/80 rounded-lg border border-rose-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-rose-600" />
                </div>
                <div>
                  <h4 className="font-medium text-rose-800">Need immediate support?</h4>
                  <p className="text-sm text-rose-700">
                    Click the chat button in the bottom right corner to talk with your AI mental health companion.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Wellness Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Card className="bg-gradient-to-r from-calm-50 to-mint/20 border-calm-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-calm-800">
              <Heart className="w-5 h-5" />
              Daily Wellness Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white/60 rounded-lg">
                <h4 className="font-medium text-calm-700 mb-2">Morning Routine</h4>
                <p className="text-sm text-gray-600">
                  Start your day with 5 minutes of deep breathing or meditation to set a positive tone.
                </p>
              </div>
              <div className="p-4 bg-white/60 rounded-lg">
                <h4 className="font-medium text-calm-700 mb-2">Evening Reflection</h4>
                <p className="text-sm text-gray-600">
                  Take time each evening to reflect on your day and log your mood for better insights.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
