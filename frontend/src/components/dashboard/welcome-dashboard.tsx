'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Heart, BarChart3, Brain, Plus, Calendar, TrendingUp } from 'lucide-react'

interface WelcomeDashboardProps {
  onStartLogging: () => void
  onViewDashboard: () => void
  onViewInsights: () => void
  moodCount: number
}

export function WelcomeDashboard({ 
  onStartLogging, 
  onViewDashboard, 
  onViewInsights, 
  moodCount 
}: WelcomeDashboardProps) {
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome to Your Mood Journey! 🌟
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          You've logged <span className="font-semibold text-calm-600">{moodCount}</span> mood entries. 
          Keep tracking to unlock deeper insights about your emotional patterns.
        </p>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={onStartLogging}>
          <CardHeader className="text-center">
            <div className="w-12 h-12 bg-calm-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Plus className="w-6 h-6 text-calm-600" />
            </div>
            <CardTitle>Log Your Mood</CardTitle>
            <CardDescription>
              Share how you're feeling right now
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">
              Start Logging
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={onViewDashboard}>
          <CardHeader className="text-center">
            <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-6 h-6 text-sky-600" />
            </div>
            <CardTitle>View Dashboard</CardTitle>
            <CardDescription>
              See your mood patterns and trends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">
              View Analytics
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={onViewInsights}>
          <CardHeader className="text-center">
            <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Brain className="w-6 h-6 text-rose-600" />
            </div>
            <CardTitle>AI Insights</CardTitle>
            <CardDescription>
              Get personalized recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">
              View Insights
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Progress Summary */}
      {moodCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-calm-600" />
                Your Progress
              </CardTitle>
              <CardDescription>
                Keep up the great work! Regular mood tracking helps you understand your patterns.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-calm-50 rounded-lg">
                  <div className="text-2xl font-bold text-calm-600">{moodCount}</div>
                  <div className="text-sm text-gray-600">Total Entries</div>
                </div>
                <div className="text-center p-4 bg-sky-50 rounded-lg">
                  <div className="text-2xl font-bold text-sky-600">
                    {Math.ceil(moodCount / 7)}
                  </div>
                  <div className="text-sm text-gray-600">Weeks Tracked</div>
                </div>
                <div className="text-center p-4 bg-rose-50 rounded-lg">
                  <div className="text-2xl font-bold text-rose-600">
                    {moodCount >= 7 ? '🎉' : '📈'}
                  </div>
                  <div className="text-sm text-gray-600">
                    {moodCount >= 7 ? 'Great Progress!' : 'Keep Going!'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-calm-600" />
              Daily Wellness Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-mint/10 rounded-lg">
                <h4 className="font-medium text-calm-700 mb-2">Morning Routine</h4>
                <p className="text-sm text-gray-600">
                  Start your day with 5 minutes of deep breathing or meditation to set a positive tone.
                </p>
              </div>
              <div className="p-4 bg-sky/10 rounded-lg">
                <h4 className="font-medium text-sky-700 mb-2">Evening Reflection</h4>
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