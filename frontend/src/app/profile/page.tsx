'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Footer } from '@/components/layout/footer'
import { 
  Heart, 
  User, 
  Calendar, 
  TrendingUp, 
  Award,
  ArrowLeft,
  Edit,
  Share,
  Download,
  BarChart3,
  Brain,
  MessageCircle,
  Star,
  Target
} from 'lucide-react'
import Link from 'next/link'

export default function ProfilePage() {
  const [userStats, setUserStats] = useState({
    totalEntries: 45,
    streak: 12,
    averageScore: 0.78,
    positiveDays: 32,
    negativeDays: 8,
    neutralDays: 5,
    joinDate: '2024-01-15',
    lastActive: '2024-01-27'
  })

  const [achievements, setAchievements] = useState([
    {
      id: 1,
      title: "First Entry",
      description: "Logged your first mood",
      icon: <Heart className="w-6 h-6 text-rose-500" />,
      earned: true,
      date: "2024-01-15"
    },
    {
      id: 2,
      title: "Week Warrior",
      description: "Logged mood for 7 consecutive days",
      icon: <Calendar className="w-6 h-6 text-blue-500" />,
      earned: true,
      date: "2024-01-22"
    },
    {
      id: 3,
      title: "Positive Thinker",
      description: "Had 10 positive mood entries",
      icon: <TrendingUp className="w-6 h-6 text-green-500" />,
      earned: true,
      date: "2024-01-25"
    },
    {
      id: 4,
      title: "Month Master",
      description: "Logged mood for 30 consecutive days",
      icon: <Award className="w-6 h-6 text-purple-500" />,
      earned: false,
      date: null
    },
    {
      id: 5,
      title: "Insight Seeker",
      description: "Viewed 50 AI insights",
      icon: <Brain className="w-6 h-6 text-orange-500" />,
      earned: false,
      date: null
    }
  ])

  const [recentMoods, setRecentMoods] = useState([
    {
      date: '2024-01-27',
      sentiment: 'positive',
      score: 0.85,
      text: 'Feeling great today! Had a productive day at work.',
      emoji: '😊'
    },
    {
      date: '2024-01-26',
      sentiment: 'neutral',
      score: 0.52,
      text: 'Just an average day, nothing special.',
      emoji: '😐'
    },
    {
      date: '2024-01-25',
      sentiment: 'positive',
      score: 0.78,
      text: 'Good day overall, spent time with friends.',
      emoji: '😄'
    }
  ])

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

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return '😊'
      case 'negative':
        return '😔'
      default:
        return '😐'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-mint/10 via-sky/10 to-rose/10">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <Heart className="w-8 h-8 text-calm-600" />
              <h1 className="text-xl font-bold text-calm-700">MoodMate AI</h1>
            </Link>
            <Link href="/">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to App
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Profile Header */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-calm-100 to-calm-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="w-12 h-12 text-calm-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              John Doe
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Mental Health Advocate
            </p>
            <div className="flex items-center justify-center gap-4 mb-6">
              <Badge className="bg-calm-100 text-calm-700">
                Member since {new Date(userStats.joinDate).toLocaleDateString()}
              </Badge>
              <Badge className="bg-green-100 text-green-700">
                {userStats.streak} day streak
              </Badge>
            </div>
            <div className="flex gap-4 justify-center">
              <Button variant="outline">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
              <Button variant="outline">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <BarChart3 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{userStats.totalEntries}</div>
                  <div className="text-sm text-gray-600">Total Entries</div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{userStats.streak}</div>
                  <div className="text-sm text-gray-600">Day Streak</div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{Math.round(userStats.averageScore * 100)}%</div>
                  <div className="text-sm text-gray-600">Avg Score</div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{achievements.filter(a => a.earned).length}</div>
                  <div className="text-sm text-gray-600">Achievements</div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Recent Moods */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-500" />
                  Recent Mood Entries
                </CardTitle>
                <CardDescription>
                  Your latest mood logs and insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentMoods.map((mood, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{mood.emoji}</span>
                          <Badge className={getSentimentColor(mood.sentiment)}>
                            {mood.sentiment}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            {Math.round(mood.score * 100)}% confidence
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(mood.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700">{mood.text}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-500" />
                  Achievements
                </CardTitle>
                <CardDescription>
                  Your progress and accomplishments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`p-4 rounded-lg border-2 ${
                        achievement.earned 
                          ? 'border-green-200 bg-green-50' 
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          achievement.earned ? 'bg-green-100' : 'bg-gray-100'
                        }`}>
                          {achievement.icon}
                        </div>
                        <div>
                          <h3 className={`font-semibold ${
                            achievement.earned ? 'text-green-800' : 'text-gray-600'
                          }`}>
                            {achievement.title}
                          </h3>
                          {achievement.earned && achievement.date && (
                            <p className="text-xs text-green-600">
                              Earned {new Date(achievement.date).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                      <p className={`text-sm ${
                        achievement.earned ? 'text-green-700' : 'text-gray-500'
                      }`}>
                        {achievement.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Goals & Insights */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-500" />
                    Current Goals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">30-day streak</span>
                      <span className="text-sm text-gray-600">12/30 days</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">50 mood entries</span>
                      <span className="text-sm text-gray-600">45/50 entries</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-purple-500" />
                    AI Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-800">
                        <strong>Positive Trend:</strong> Your mood has been improving over the last week!
                      </p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Consistency:</strong> You're logging your mood regularly. Keep it up!
                      </p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <p className="text-sm text-purple-800">
                        <strong>Pattern:</strong> You tend to feel better on weekends. Consider why!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
